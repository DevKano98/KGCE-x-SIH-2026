// backend/services/risk.service.js
import { pool } from '../config/db.js';
import { predictRisk } from '../ml_model/risk_rules.js';
export async function computeAndSaveRisk(studentId, subjectId, marks) {
  const result = predictRisk({
    attendance_percentage: marks.attendance_percentage || 0,
    internal_marks: marks.internal_marks || 0,
    assignment_score: marks.assignment_score || 0,
    study_hours_per_week: marks.study_hours_per_week || 0,
  });
  await pool.query(
    `INSERT INTO risk_predictions (student_id, subject_id, risk_level, predicted_score)
     VALUES ($1, $2, $3, $4)`,
    [studentId, subjectId, result.risk, result.predictedScore],
  );
  return result;
}
