import express from 'express';
import crypto from 'crypto';
import { getPool } from '../db.js';

const router = express.Router();

// Helper to hash password with SHA-256
const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

// GET check if any admin exists
router.get('/check', async (req, res) => {
  try {
    const db = getPool();
    const [rows] = await db.query('SELECT COUNT(*) as count FROM admins');
    const exists = rows[0].count > 0;
    res.json({ exists });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST register first admin
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Username, email, and password are required.' });
  }

  try {
    const db = getPool();

    // Check if any admin already exists
    const [rows] = await db.query('SELECT COUNT(*) as count FROM admins');
    if (rows[0].count > 0) {
      return res.status(403).json({ error: 'Registration is restricted. Administrator account already exists.' });
    }

    // Hash password
    const hashedPassword = hashPassword(password);

    // Insert admin record
    await db.query(
      'INSERT INTO admins (username, email, password) VALUES (?, ?, ?)',
      [username.trim(), email.trim().toLowerCase(), hashedPassword]
    );

    res.status(201).json({
      message: 'First administrator account registered successfully.',
      user: { username, email }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST login admin
router.post('/login', async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  if (!usernameOrEmail || !password) {
    return res.status(400).json({ error: 'Username/Email and password are required.' });
  }

  try {
    const db = getPool();
    const target = usernameOrEmail.trim();

    // Fetch matching user
    const [rows] = await db.query(
      'SELECT * FROM admins WHERE username = ? OR email = ?',
      [target, target.toLowerCase()]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid username/email or password.' });
    }

    const admin = rows[0];
    const hashedPassword = hashPassword(password);

    if (admin.password !== hashedPassword) {
      return res.status(401).json({ error: 'Invalid username/email or password.' });
    }

    res.json({
      success: true,
      user: {
        username: admin.username,
        email: admin.email
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
