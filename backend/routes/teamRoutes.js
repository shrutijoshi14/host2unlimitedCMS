import express from 'express';
import { getPool } from '../db.js';

const router = express.Router();

// GET team members (all for admin CMS, only active for public website)
router.get('/', async (req, res) => {
  try {
    const db = getPool();
    const showAll = req.query.all === 'true';

    let sql = 'SELECT * FROM team_members ORDER BY display_order ASC, id ASC';
    if (!showAll) {
      sql = "SELECT * FROM team_members WHERE status = 'Active' OR status IS NULL OR status = '' ORDER BY display_order ASC, id ASC";
    }

    const [rows] = await db.query(sql);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching team members:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET single team member
router.get('/:id', async (req, res) => {
  try {
    const db = getPool();
    const [rows] = await db.query('SELECT * FROM team_members WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Team member not found.' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create team member
router.post('/', async (req, res) => {
  const { name, role, image_url, display_order, status } = req.body;

  if (!name || !role) {
    return res.status(400).json({ error: 'Name and role/position are required.' });
  }

  const memberStatus = status || 'Active';

  try {
    const db = getPool();
    const [result] = await db.query(
      'INSERT INTO team_members (name, role, image_url, display_order, status) VALUES (?, ?, ?, ?, ?)',
      [name, role, image_url || '', display_order || 0, memberStatus]
    );

    const newId = result.insertId;

    if (global.broadcastSSE) {
      global.broadcastSSE({ type: 'team_update', action: 'create', id: newId });
    }

    res.status(201).json({
      message: 'Team member added successfully.',
      id: newId,
      name,
      role,
      image_url: image_url || '',
      display_order: display_order || 0,
      status: memberStatus
    });
  } catch (error) {
    console.error('Error creating team member:', error);
    res.status(500).json({ error: error.message });
  }
});

// PUT update team member
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, role, image_url, display_order, status } = req.body;

  if (!name || !role) {
    return res.status(400).json({ error: 'Name and role/position are required.' });
  }

  const memberStatus = status || 'Active';

  try {
    const db = getPool();
    const [result] = await db.query(
      'UPDATE team_members SET name = ?, role = ?, image_url = ?, display_order = ?, status = ? WHERE id = ?',
      [name, role, image_url || '', display_order || 0, memberStatus, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: `Team member with ID ${id} not found.` });
    }

    if (global.broadcastSSE) {
      global.broadcastSSE({ type: 'team_update', action: 'update', id: Number(id) });
    }

    res.json({
      message: 'Team member updated successfully.',
      id: Number(id),
      name,
      role,
      image_url: image_url || '',
      display_order: display_order || 0,
      status: memberStatus
    });
  } catch (error) {
    console.error('Error updating team member:', error);
    res.status(500).json({ error: error.message });
  }
});

// DELETE team member
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const db = getPool();
    const [result] = await db.query('DELETE FROM team_members WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: `Team member with ID ${id} not found.` });
    }

    if (global.broadcastSSE) {
      global.broadcastSSE({ type: 'team_update', action: 'delete', id: Number(id) });
    }

    res.json({ message: 'Team member deleted successfully.', id: Number(id) });
  } catch (error) {
    console.error('Error deleting team member:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
