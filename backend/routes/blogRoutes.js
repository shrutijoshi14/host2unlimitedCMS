import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { getPool } from '../db.js';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer file upload destination and naming
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Images files only (jpg, jpeg, png, gif, webp).'));
  }
});

// GET all blogs with search, filter, and pagination
router.get('/', async (req, res) => {
  try {
    const db = getPool();
    const page = parseInt(req.query.page || '1', 10);
    const limit = parseInt(req.query.limit || '6', 10);
    const offset = (page - 1) * limit;

    const { category, search, status } = req.query;

    let query = 'SELECT * FROM blogs WHERE 1=1';
    let countQuery = 'SELECT COUNT(*) as total FROM blogs WHERE 1=1';
    const params = [];
    const countParams = [];

    if (category && category !== 'All') {
      query += ' AND category = ?';
      countQuery += ' AND category = ?';
      params.push(category);
      countParams.push(category);
    }

    if (search) {
      const searchWild = `%${search}%`;
      query += ' AND (title LIKE ? OR content LIKE ? OR tags LIKE ?)';
      countQuery += ' AND (title LIKE ? OR content LIKE ? OR tags LIKE ?)';
      params.push(searchWild, searchWild, searchWild);
      countParams.push(searchWild, searchWild, searchWild);
    }

    if (status) {
      query += ' AND status = ?';
      countQuery += ' AND status = ?';
      params.push(status);
      countParams.push(status);

      if (status === 'Published') {
        query += ' AND published_at <= NOW()';
        countQuery += ' AND published_at <= NOW()';
      }
    }

    // Sort by created_at descending
    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const [rows] = await db.query(query, params);
    const [countRows] = await db.query(countQuery, countParams);

    const total = countRows[0].total;
    const totalPages = Math.ceil(total / limit);

    res.json({
      blogs: rows,
      total,
      page,
      totalPages,
      limit
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET a single blog by slug
router.get('/:slug', async (req, res) => {
  const { slug } = req.params;
  try {
    const db = getPool();
    const [rows] = await db.query(
      'SELECT * FROM blogs WHERE slug = ? AND (status != ? OR published_at <= NOW())', 
      [slug, 'Published']
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create a blog post
router.post('/', async (req, res) => {
  const {
    title,
    content,
    category,
    tags,
    image_url,
    slug,
    seo_title,
    meta_description,
    author,
    status,
    read_time,
    published_at
  } = req.body;

  if (!title || !content || !category || !slug || !author) {
    return res.status(400).json({ error: 'Title, Content, Category, Slug, and Author are required fields.' });
  }

  try {
    const db = getPool();
    
    // Check if slug is unique
    const [existing] = await db.query('SELECT id FROM blogs WHERE slug = ?', [slug]);
    if (existing.length > 0) {
      return res.status(400).json({ error: 'A blog post with this URL slug already exists.' });
    }

    const isFuture = status === 'Published' && published_at && new Date(published_at) > new Date();
    const sseNotified = isFuture ? 0 : 1;

    const [result] = await db.query(
      `INSERT INTO blogs (title, content, category, tags, image_url, slug, seo_title, meta_description, author, status, read_time, published_at, sse_notified)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        content,
        category,
        tags || '',
        image_url || '',
        slug,
        seo_title || title,
        meta_description || '',
        author,
        status || 'Draft',
        read_time || '5 min read',
        published_at ? new Date(published_at) : new Date(),
        sseNotified
      ]
    );

    if (global.broadcastSSE) {
      global.broadcastSSE({ type: 'blog_update' });
    }

    res.status(201).json({
      message: 'Blog post created successfully.',
      id: result.insertId,
      slug
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update a blog post by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    title,
    content,
    category,
    tags,
    image_url,
    slug,
    seo_title,
    meta_description,
    author,
    status,
    read_time,
    published_at
  } = req.body;

  if (!title || !content || !category || !slug || !author) {
    return res.status(400).json({ error: 'Title, Content, Category, Slug, and Author are required fields.' });
  }

  try {
    const db = getPool();

    // Check slug uniqueness excluding current ID
    const [existing] = await db.query('SELECT id FROM blogs WHERE slug = ? AND id != ?', [slug, id]);
    if (existing.length > 0) {
      return res.status(400).json({ error: 'A blog post with this URL slug already exists.' });
    }

    const isFuture = status === 'Published' && published_at && new Date(published_at) > new Date();
    const sseNotified = isFuture ? 0 : 1;

    const [result] = await db.query(
      `UPDATE blogs SET 
        title = ?, content = ?, category = ?, tags = ?, image_url = ?, 
        slug = ?, seo_title = ?, meta_description = ?, author = ?, 
        status = ?, read_time = ?, published_at = ?, sse_notified = ?
       WHERE id = ?`,
      [
        title,
        content,
        category,
        tags || '',
        image_url || '',
        slug,
        seo_title || title,
        meta_description || '',
        author,
        status || 'Draft',
        read_time || '5 min read',
        published_at ? new Date(published_at) : new Date(),
        sseNotified,
        id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    if (global.broadcastSSE) {
      global.broadcastSSE({ type: 'blog_update' });
    }

    res.json({ message: 'Blog post updated successfully.', id, slug });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE a blog post by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const db = getPool();
    const [result] = await db.query('DELETE FROM blogs WHERE id = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    if (global.broadcastSSE) {
      global.broadcastSSE({ type: 'blog_update' });
    }

    res.json({ message: 'Blog post deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST upload file
router.post('/upload', (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'File size exceeds maximum allowed limit.' });
      }
      return res.status(400).json({ error: err.message || 'File upload failed.' });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'No file was uploaded.' });
    }
    const relativePath = `/uploads/${req.file.filename}`;
    res.json({ image_url: relativePath });
  });
});

export default router;
