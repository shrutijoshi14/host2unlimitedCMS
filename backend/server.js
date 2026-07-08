import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeDatabase } from './db.js';
import blogRoutes from './routes/blogRoutes.js';
import moduleRoutes from './routes/moduleRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import authRoutes from './routes/authRoutes.js';
import pageRoutes from './routes/pageRoutes.js';

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

// Initialize DB and start server
async function startServer() {
  app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    try {
      await initializeDatabase();
      console.log('Database initialized successfully.');
    } catch (err) {
      console.error('Database initialization failed:', err);
    }
  });
}

startServer();
