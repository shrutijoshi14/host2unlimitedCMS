import express from 'express';
import { getPool } from '../db.js';
import { cacheInvalidate } from '../cache.js';

const router = express.Router();

// GET all modules configuration
router.get('/', async (req, res) => {
  try {
    const db = getPool();
    const [rows] = await db.query('SELECT * FROM cms_modules');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update status of a module
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { enabled } = req.body;
  
  if (enabled === undefined) {
    return res.status(400).json({ error: 'Field "enabled" (0 or 1) is required.' });
  }

  const numericVal = (enabled === true || enabled === 1 || enabled === '1') ? 1 : 0;

  try {
    const db = getPool();
    const [existing] = await db.query('SELECT id FROM cms_modules WHERE id = ?', [id]);

    if (existing && existing.length > 0) {
      await db.query('UPDATE cms_modules SET enabled = ? WHERE id = ?', [numericVal, id]);
    } else {
      const defaultName = id.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') + ' Management';
      await db.query('INSERT INTO cms_modules (id, name, enabled) VALUES (?, ?, ?)', [id, defaultName, numericVal]);
    }

    cacheInvalidate('/api/modules');
    if (global.broadcastSSE) {
      global.broadcastSSE({ type: 'module_update', id, enabled: numericVal === 1 });
    }

    res.json({ message: `Module "${id}" status updated.`, id, enabled: numericVal === 1 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
