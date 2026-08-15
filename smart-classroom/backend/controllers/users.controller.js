// backend/controllers/users.controller.js
import { pool } from '../config/db.js';

export async function getUsers(req, res) {
  const { role } = req.query;

  if (req.user.role === 'teacher' && role !== 'student') {
    return res.status(403).json({ error: 'Teachers can only access student lists' });
  }

  if (!['admin', 'teacher'].includes(req.user.role)) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  let query = 'SELECT id, name, email, role, class_section FROM users';
  const params = [];

  if (role) {
    query += ' WHERE role = $1';
    params.push(role);
  }

  const { rows } = await pool.query(query, params);
  res.json(rows);
}
