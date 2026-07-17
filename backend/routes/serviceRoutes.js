import express from 'express';
import { getPool } from '../db.js';

const router = express.Router();

// GET all services (with optional search)
router.get('/', async (req, res) => {
  try {
    const db = getPool();
    const { search } = req.query;
    
    let query = 'SELECT * FROM services WHERE 1=1';
    const params = [];

    if (search) {
      const searchWild = `%${search}%`;
      query += ' AND (title LIKE ? OR description LIKE ?)';
      params.push(searchWild, searchWild);
    }
    
    query += ' ORDER BY id ASC';
    const [rows] = await db.query(query, params);
    
    // Parse JSON fields (features and faqs) for each service
    const formatted = rows.map(row => ({
      ...row,
      features: typeof row.features === 'string' ? JSON.parse(row.features) : row.features,
      faqs: typeof row.faqs === 'string' ? JSON.parse(row.faqs) : row.faqs
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET a single service by slug
router.get('/:slug', async (req, res) => {
  const { slug } = req.params;
  try {
    const db = getPool();
    const [rows] = await db.query('SELECT * FROM services WHERE slug = ?', [slug]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Service not found.' });
    }
    
    const service = rows[0];
    res.json({
      ...service,
      features: typeof service.features === 'string' ? JSON.parse(service.features) : service.features,
      faqs: typeof service.faqs === 'string' ? JSON.parse(service.faqs) : service.faqs
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create a service
router.post('/', async (req, res) => {
  const {
    title,
    description,
    banner_image_url,
    features, // expected to be an array from frontend
    faqs, // expected to be an array of { question, answer }
    slug,
    seo_title,
    meta_description,
    icon_name
  } = req.body;

  if (!title || !description || !slug) {
    return res.status(400).json({ error: 'Title, Description, and Slug are required fields.' });
  }

  try {
    const db = getPool();
    
    // Check slug uniqueness
    const [existing] = await db.query('SELECT id FROM services WHERE slug = ?', [slug]);
    if (existing.length > 0) {
      return res.status(400).json({ error: 'A service with this URL slug already exists.' });
    }

    const [result] = await db.query(
      `INSERT INTO services (title, description, banner_image_url, features, faqs, slug, seo_title, meta_description, icon_name)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        description,
        banner_image_url || '',
        JSON.stringify(features || []),
        JSON.stringify(faqs || []),
        slug,
        seo_title || title,
        meta_description || '',
        icon_name || 'Globe'
      ]
    );

    if (global.broadcastSSE) {
      global.broadcastSSE({ type: 'service_update' });
    }

    res.status(201).json({
      message: 'Service created successfully.',
      id: result.insertId,
      slug
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update a service by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    banner_image_url,
    features,
    faqs,
    slug,
    seo_title,
    meta_description,
    icon_name
  } = req.body;

  if (!title || !description || !slug) {
    return res.status(400).json({ error: 'Title, Description, and Slug are required fields.' });
  }

  try {
    const db = getPool();

    // Check slug uniqueness excluding current ID
    const [existing] = await db.query('SELECT id FROM services WHERE slug = ? AND id != ?', [slug, id]);
    if (existing.length > 0) {
      return res.status(400).json({ error: 'A service with this URL slug already exists.' });
    }

    const [result] = await db.query(
      `UPDATE services SET 
        title = ?, description = ?, banner_image_url = ?, 
        features = ?, faqs = ?, slug = ?, 
        seo_title = ?, meta_description = ?, icon_name = ?
       WHERE id = ?`,
      [
        title,
        description,
        banner_image_url || '',
        JSON.stringify(features || []),
        JSON.stringify(faqs || []),
        slug,
        seo_title || title,
        meta_description || '',
        icon_name || 'Globe',
        id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Service not found.' });
    }

    if (global.broadcastSSE) {
      global.broadcastSSE({ type: 'service_update' });
    }

    res.json({ message: 'Service updated successfully.', id, slug });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE a service by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const db = getPool();
    const [result] = await db.query('DELETE FROM services WHERE id = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Service not found.' });
    }

    if (global.broadcastSSE) {
      global.broadcastSSE({ type: 'service_update' });
    }

    res.json({ message: 'Service deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
