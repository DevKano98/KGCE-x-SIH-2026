// backend/controllers/timetable.controller.js
import { pool } from '../config/db.js';
import { generateTimetable } from '../services/scheduler.service.js';
export async function getTimetable(req, res) {
  const { class_section } = req.query;
  let query = `SELECT t.*, s.name as subject_name, u.name as teacher_name 
               FROM timetable_slots t 
               JOIN subjects s ON t.subject_id = s.id 
               JOIN users u ON t.teacher_id = u.id`;
  const params = [];
  if (class_section) {
    query += ' WHERE t.class_section = $1';
    params.push(class_section);
  }
  const { rows } = await pool.query(query, params);
  res.json(rows);
}
export async function generate(req, res) {
  await generateTimetable();
  const { rows } = await pool.query('SELECT COUNT(*)::int AS count FROM timetable_slots');
  res.json({ message: 'Timetable generated successfully', slots: rows[0].count });
}
export async function updateSlot(req, res) {
  const { id } = req.params;
  const { room } = req.body;
  await pool.query('UPDATE timetable_slots SET room = $1 WHERE id = $2', [room, id]);
  res.json({ message: 'Slot updated' });
}
export async function getMyTimetable(req, res) {
  const { id } = req.user;
  const { rows } = await pool.query(
    `SELECT t.*, s.name as subject_name, u.name as teacher_name 
     FROM timetable_slots t 
     JOIN subjects s ON t.subject_id = s.id 
     JOIN users u ON t.teacher_id = u.id
     JOIN users stu ON t.class_section = stu.class_section
     WHERE stu.id = $1`,
    [id]
  );
  res.json(rows);
}
