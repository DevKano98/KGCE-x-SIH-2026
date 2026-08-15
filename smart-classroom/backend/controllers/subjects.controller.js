// backend/controllers/subjects.controller.js
import { pool } from '../config/db.js';
export async function getSubjects(req, res) {
  let query = `
    SELECT s.*, u.name AS teacher_name
    FROM subjects s
    LEFT JOIN users u ON s.teacher_id = u.id
  `;
  const params = [];

  if (req.user.role === 'teacher') {
    query += ' WHERE s.teacher_id = $1';
    params.push(req.user.id);
  } else if (req.user.role === 'student') {
    query += `
      WHERE s.id IN (
        SELECT DISTINCT t.subject_id
        FROM timetable_slots t
        JOIN users stu ON stu.class_section = t.class_section
        WHERE stu.id = $1
      )
    `;
    params.push(req.user.id);
  }

  query += ' ORDER BY s.name';
  const { rows } = await pool.query(query, params);
  res.json(rows);
}
export async function createSubject(req, res) {
  const { name, code, teacher_id, semester, department } = req.body;
  try {
    const { rows } = await pool.query(
      'INSERT INTO subjects (name, code, teacher_id, semester, department) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, code, teacher_id, semester, department]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(400).json({ error: 'Subject code already exists' });
  }
}
