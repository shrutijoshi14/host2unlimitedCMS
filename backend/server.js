import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
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
import { cacheMiddleware, cacheInvalidate, cacheStats } from './cache.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Allowed origins — production domain + local dev
const ALLOWED_ORIGINS = [
  'https://host2unlimited.com',
  'https://www.host2unlimited.com',
  'https://host2unlimitedcms-backend.onrender.com',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
];

// Security headers via helmet (prevents clickjacking, XSS, MIME sniffing, etc.)
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      imgSrc: ["'self'", 'data:', 'https:', 'blob:'],
      connectSrc: ["'self'", ...ALLOWED_ORIGINS],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
  crossOriginEmbedderPolicy: false, // Allow cross-origin embeds (images etc.)
}));

// Additional headers for Google Safe Browsing compliance
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  if (process.env.RENDER === 'true' || process.env.NODE_ENV === 'production') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  }
  next();
});

// Enable CORS — restricted to known domains only (never wildcard)
app.use(cors({
  origin: (origin, callback) => {
    // Allow server-to-server calls (no origin) and whitelisted origins
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS policy: origin ${origin} is not allowed.`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

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
// Apply cache middleware to public read-only API routes (5 min TTL = 300s)
app.use('/api/modules', cacheMiddleware(300), moduleRoutes);
app.use('/api/blogs', cacheMiddleware(300), blogRoutes);
app.use('/api/services', cacheMiddleware(300), serviceRoutes);
app.use('/api/auth', authRoutes); // No cache for auth routes
app.use('/api/pages', cacheMiddleware(300), pageRoutes);
app.use('/api/team', cacheMiddleware(300), teamRoutes);

// Google Reviews Integration Proxy Endpoint (Live sync with Google Business Profile API)
app.get('/api/google-reviews', async (req, res) => {
  try {
    const placeId = process.env.GOOGLE_PLACE_ID;
    const apiKey = process.env.GOOGLE_API_KEY;

    if (placeId && apiKey) {
      const googleUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews,user_ratings_total&key=${apiKey}`;
      const response = await fetch(googleUrl);
      if (response.ok) {
        const data = await response.json();
        const rawReviews = data.result?.reviews || [];
        const formattedReviews = rawReviews.map((r, idx) => ({
          id: `google_${idx}`,
          name: r.author_name,
          company: 'Google Reviewer',
          designation: 'Verified Google Review',
          photo: r.profile_photo_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150',
          rating: r.rating || 5,
          review: r.text
        }));
        return res.json({
          source: 'google_places_api',
          rating: data.result?.rating || 4.9,
          total_reviews: data.result?.user_ratings_total || 50,
          reviews: formattedReviews
        });
      }
    }

    // Return fallback notification
    res.json({
      source: 'fallback',
      status: 'unconfigured_key',
      message: 'Set GOOGLE_PLACE_ID and GOOGLE_API_KEY in .env to pull live Google Reviews directly from Google Business Profile API.',
      reviews: []
    });
  } catch (err) {
    console.error('Failed to fetch Google Reviews:', err);
    res.status(500).json({ error: 'Failed to fetch Google Reviews' });
  }
});

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

// Cache Stats Endpoint (Admin only - for debugging)
// Simple token guard — set CACHE_ADMIN_TOKEN env var to secure these
const requireCacheToken = (req, res, next) => {
  const token = req.headers['x-cache-token'] || req.query.token;
  const adminToken = process.env.CACHE_ADMIN_TOKEN;
  if (!adminToken || token !== adminToken) {
    return res.status(403).json({ error: 'Forbidden: invalid or missing cache token.' });
  }
  next();
};

app.get('/api/cache/stats', requireCacheToken, (req, res) => {
  res.json(cacheStats());
});

// Cache Flush Endpoint (Admin only - for manual cache clearing)
app.post('/api/cache/flush', requireCacheToken, (req, res) => {
  cacheInvalidate('');
  res.json({ success: true, message: 'All cache cleared.' });
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

        // 1. Invalidate blog cache on new published post
        cacheInvalidate('/api/blogs');
        cacheInvalidate('/api/pages');

        // 2. Broadcast update to active listeners
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
