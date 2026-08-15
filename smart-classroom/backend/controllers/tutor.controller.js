// backend/controllers/tutor.controller.js
import { pool } from '../config/db.js';
import { askTutor, generateQuiz } from '../services/groq.service.js';
export async function ask(req, res) {
  const { subjectId, topic, question } = req.body;
  const subRes = await pool.query('SELECT name FROM subjects WHERE id = $1', [subjectId]);
  const subjectName = subRes.rows[0]?.name || 'General';
  const answer = await askTutor(subjectName, topic, question);
  await pool.query(
    'INSERT INTO tutor_logs (student_id, subject_id, question, answer) VALUES ($1, $2, $3, $4)',
    [req.user.id, subjectId, question, answer]
  );
  res.json({ answer });
}
export async function quiz(req, res) {
  const { subjectId, topic } = req.body;
  const subRes = await pool.query('SELECT name FROM subjects WHERE id = $1', [subjectId]);
  const subjectName = subRes.rows[0]?.name || 'General';
  const questions = await generateQuiz(subjectName, topic);
  res.json({ questions });
}