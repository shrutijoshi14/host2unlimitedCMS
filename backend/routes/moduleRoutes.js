import express from 'express';
import { getPool } from '../db.js';

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

  try {
    const db = getPool();
    const [result] = await db.query(
      'UPDATE cms_modules SET enabled = ? WHERE id = ?',
      [enabled ? 1 : 0, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: `Module with ID "${id}" not found.` });
    }

    if (global.broadcastSSE) {
      global.broadcastSSE({ type: 'module_update', id, enabled: !!enabled });
    }

    res.json({ message: `Module "${id}" status updated.`, id, enabled: !!enabled });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
