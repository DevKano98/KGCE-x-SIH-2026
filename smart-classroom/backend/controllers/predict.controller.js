// backend/controllers/predict.controller.js
import { pool } from '../config/db.js';
export async function getMyRisk(req, res) {
  const { id } = req.user;
  const { rows } = await pool.query(
    `SELECT DISTINCT ON (r.subject_id) r.*, s.name as subject_name 
     FROM risk_predictions r JOIN subjects s ON r.subject_id = s.id 
     WHERE r.student_id = $1 ORDER BY r.subject_id, r.computed_at DESC`,
    [id]
  );
  res.json(rows);
}
export async function getSubjectRisk(req, res) {
  const { id } = req.params;
  const { rows } = await pool.query(
    `SELECT DISTINCT ON (r.student_id)
        r.*,
        u.name AS student_name,
        u.class_section
     FROM risk_predictions r
     JOIN users u ON r.student_id = u.id
     JOIN subjects s ON r.subject_id = s.id
     WHERE r.subject_id = $1 AND s.teacher_id = $2
     ORDER BY r.student_id, r.computed_at DESC`,
    [id, req.user.id]
  );
  res.json(rows);
}
