// backend/controllers/auth.controller.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { pool } from '../config/db.js';
import { env } from '../config/env.js';
export async function login(req, res) {
  const { email, password } = req.body;
  const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  const user = rows[0];
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign(
    { id: user.id, role: user.role, name: user.name },
    env.jwtSecret,
    { expiresIn: '7d' }
  );
  res.json({ token, role: user.role, name: user.name, id: user.id });
}
export async function register(req, res) {
  const { name, email, password, role, classSection } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  try {
    const { rows } = await pool.query(
      `INSERT INTO users (name, email, password_hash, role, class_section) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, role`,
      [name, email, passwordHash, role, classSection || null]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(400).json({ error: 'User already exists or invalid data' });
  }
}