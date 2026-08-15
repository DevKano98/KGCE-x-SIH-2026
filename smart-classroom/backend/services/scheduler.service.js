// backend/services/scheduler.service.js
import { pool } from '../config/db.js';
export async function generateTimetable() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const times = ['09:00-10:00', '10:00-11:00', '11:00-12:00', '13:00-14:00', '14:00-15:00'];
  const sectionsRes = await pool.query("SELECT DISTINCT class_section FROM users WHERE role='student' AND class_section IS NOT NULL");
  const sections = sectionsRes.rows.map(r => r.class_section);
  const subjectsRes = await pool.query("SELECT id, teacher_id FROM subjects");
  const subjects = subjectsRes.rows;
  await pool.query("DELETE FROM timetable_slots");
  for (const section of sections) {
    let subIdx = 0;
    for (const day of days) {
      for (const time of times) {
        if (subjects.length === 0) break;
        const subject = subjects[subIdx % subjects.length];
        const [start, end] = time.split('-');
        await pool.query(
          `INSERT INTO timetable_slots (class_section, day_of_week, start_time, end_time, subject_id, teacher_id, room) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [section, day, start, end, subject.id, subject.teacher_id, 'Room-101']
        );
        subIdx++;
      }
    }
  }
}