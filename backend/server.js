import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeDatabase, getPool } from './db.js';
import blogRoutes from './routes/blogRoutes.js';
import moduleRoutes from './routes/moduleRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import authRoutes from './routes/authRoutes.js';
import pageRoutes from './routes/pageRoutes.js';
import teamRoutes from './routes/teamRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend local development and production domains dynamically
app.use(cors({
  origin: (origin, callback) => {
    // Reflect request origin back to allow any client-side calls
    callback(null, origin || true);
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// SSE (Server-Sent Events) Setup for real-time updates without manual refresh
let sseClients = [];

app.get('/api/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  // Send initial ping connection check
  res.write('data: {"type":"init"}\n\n');

  sseClients.push(res);

  req.on('close', () => {
    sseClients = sseClients.filter(c => c !== res);
  });
});

global.broadcastSSE = (data) => {
  sseClients.forEach(client => {
    try {
      client.write(`data: ${JSON.stringify(data)}\n\n`);
    } catch (err) {
      console.warn('Failed to write to SSE client:', err.message);
    }
  });
};

// Ensure uploads folder exists and serve it statically
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));

// API Routing Setup
app.use('/api/modules', moduleRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/pages', pageRoutes);
app.use('/api/team', teamRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date() });
});

// Root API status endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Host2Unlimited CMS Backend API is running successfully.',
    environment: process.env.RENDER === 'true' ? 'production' : 'development'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

// Periodically check for scheduled blog posts that just went live
function startBlogScheduler() {
  console.log('[Blog Scheduler] Started background polling for scheduled posts.');
  setInterval(async () => {
    try {
      const db = getPool();
      if (!db) return;

      const [blogs] = await db.query(
        "SELECT id, title FROM blogs WHERE status = 'Published' AND published_at <= NOW() AND (sse_notified = 0 OR sse_notified IS NULL)"
      );

      if (blogs && blogs.length > 0) {
        console.log(`[Blog Scheduler] Found ${blogs.length} newly active scheduled blog post(s). Broadcasting updates...`);
        
        // 1. Broadcast update to active listeners
        if (global.broadcastSSE) {
          global.broadcastSSE({ type: 'blog_update' });
        }

        // 2. Mark as notified so we don't repeat broadcast
        const ids = blogs.map(b => b.id);
        for (const id of ids) {
          await db.query("UPDATE blogs SET sse_notified = 1 WHERE id = ?", [id]);
        }
      }
    } catch (err) {
      console.warn('[Blog Scheduler] Error checking scheduled posts:', err.message);
    }
  }, 10000); // Check every 10 seconds for highly responsive updates
}

// Initialize DB and start server
async function startServer() {
  app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    try {
      await initializeDatabase();
      console.log('Database initialized successfully.');
      startBlogScheduler();
    } catch (err) {
      console.error('Database initialization failed:', err);
    }
  });
}

startServer();
