import express from 'express';
import { getPool } from '../db.js';

const router = express.Router();

// GET page content
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const db = getPool();
    const [rows] = await db.query('SELECT * FROM cms_pages WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: `Page content block for '${id}' not found.` });
    }
    
    // Parse the JSON data before sending
    const pageData = JSON.parse(rows[0].content_data);
    res.json(pageData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update page content
router.post('/:id', async (req, res) => {
  const { id } = req.params;
  const contentData = req.body;

  if (!contentData) {
    return res.status(400).json({ error: 'Page content payload is required.' });
  }

  try {
    const db = getPool();
    const stringified = JSON.stringify(contentData);

    // Upsert behavior: update if exists, insert if not
    const [result] = await db.query(
      `INSERT INTO cms_pages (id, content_data) VALUES (?, ?) 
       ON DUPLICATE KEY UPDATE content_data = ?`,
      [id, stringified, stringified]
    );

    if (global.broadcastSSE) {
      global.broadcastSSE({ type: 'page_update', page: id });
    }

    res.json({
      message: `Universal page content for '${id}' saved successfully.`,
      updated: result.affectedRows > 0
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Alias POST to PUT also for convenience
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const contentData = req.body;

  if (!contentData) {
    return res.status(400).json({ error: 'Page content payload is required.' });
  }

  try {
    const db = getPool();
    const stringified = JSON.stringify(contentData);

    await db.query(
      'UPDATE cms_pages SET content_data = ? WHERE id = ?',
      [stringified, id]
    );

    if (global.broadcastSSE) {
      global.broadcastSSE({ type: 'page_update', page: id });
    }

    res.json({
      message: `Universal page content for '${id}' updated successfully.`
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
