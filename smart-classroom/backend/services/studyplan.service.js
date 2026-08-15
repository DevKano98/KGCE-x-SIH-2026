// backend/services/studyplan.service.js
import { pool } from '../config/db.js';
export async function getStudyPlan(studentId) {
  const risksRes = await pool.query(
    `SELECT r.risk_level, r.predicted_score, s.name as subject_name 
     FROM risk_predictions r JOIN subjects s ON r.subject_id = s.id 
     WHERE r.student_id = $1 ORDER BY r.computed_at DESC`,
    [studentId]
  );
  const timetableRes = await pool.query(
    `SELECT day_of_week, start_time, end_time, s.name as subject_name 
     FROM timetable_slots t JOIN subjects s ON t.subject_id = s.id 
     WHERE t.class_section = (SELECT class_section FROM users WHERE id = $1)`,
    [studentId]
  );
  const highRisk = risksRes.rows.filter(r => r.risk_level === 'High').map(r => r.subject_name);
  const medRisk = risksRes.rows.filter(r => r.risk_level === 'Medium').map(r => r.subject_name);
  return { prioritySubjects: [...highRisk, ...medRisk], freeSlots: timetableRes.rows };
}