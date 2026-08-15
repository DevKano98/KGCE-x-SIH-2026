// backend/controllers/marks.controller.js
import { pool } from '../config/db.js';
import { computeAndSaveRisk } from '../services/risk.service.js';
export async function getMarks(req, res) {
  const { subjectId } = req.query;
  if (!subjectId) {
    return res.status(400).json({ error: 'subjectId is required' });
  }

  const query = `
    SELECT m.*, u.name AS student_name, u.class_section
    FROM marks_records m
    JOIN users u ON m.student_id = u.id
    JOIN subjects s ON m.subject_id = s.id
    WHERE m.subject_id = $1 AND s.teacher_id = $2
    ORDER BY u.name
  `;
  const params = [subjectId, req.user.id];
  const { rows } = await pool.query(query, params);
  res.json(rows);
}
export async function enterMarks(req, res) {
  const { student_id, subject_id, attendance_percentage, internal_marks, assignment_score, study_hours_per_week } = req.body;
  const subjectCheck = await pool.query(
    'SELECT id FROM subjects WHERE id = $1 AND teacher_id = $2',
    [subject_id, req.user.id],
  );

  if (!subjectCheck.rows[0]) {
    return res.status(403).json({ error: 'You can only enter marks for your own subjects' });
  }

  await pool.query(
    `INSERT INTO marks_records (student_id, subject_id, attendance_percentage, internal_marks, assignment_score, study_hours_per_week)
     VALUES ($1, $2, $3, $4, $5, $6)
     ON CONFLICT (student_id, subject_id) DO UPDATE SET
     attendance_percentage = $3, internal_marks = $4, assignment_score = $5, study_hours_per_week = $6, updated_at = NOW()`,
    [student_id, subject_id, attendance_percentage, internal_marks, assignment_score, study_hours_per_week],
  );
  const result = await computeAndSaveRisk(student_id, subject_id, req.body);
  res.json({ message: 'Marks saved and risk computed', result });
}
