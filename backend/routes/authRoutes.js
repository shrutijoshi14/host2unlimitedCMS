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

// POST request password reset initiation (verifies email only)
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email address is required.' });
  }

  try {
    const db = getPool();

    // Check if admin exists with this email
    const [rows] = await db.query('SELECT * FROM admins WHERE email = ?', [email.trim().toLowerCase()]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'No administrator account found with that email address.' });
    }

    res.json({
      success: true,
      message: 'Account verified. You can now reset your password.'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST reset password (email verified, direct reset)
router.post('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ error: 'Email and new password are required.' });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters.' });
  }

  try {
    const db = getPool();

    // Fetch user by email
    const [rows] = await db.query('SELECT * FROM admins WHERE email = ?', [email.trim().toLowerCase()]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'No administrator account found.' });
    }

    const admin = rows[0];

    // Hash the new password
    const hashedPassword = hashPassword(newPassword);

    // Update password and clear reset fields
    await db.query(
      'UPDATE admins SET password = ?, reset_code = NULL, reset_expires = NULL WHERE id = ?',
      [hashedPassword, admin.id]
    );

    res.json({
      success: true,
      message: 'Password reset successfully. You can now log in with your new credentials.'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
