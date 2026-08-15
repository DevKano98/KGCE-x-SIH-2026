// backend/ml_model/risk_rules.js
import rules from './model_meta.json' with { type: 'json' };

export function predictRisk({
  attendance_percentage = 0,
  internal_marks = 0,
  assignment_score = 0,
  study_hours_per_week = 0,
}) {
  const { weights, thresholds } = rules;
  const normalizedStudyHours = Math.min(study_hours_per_week * 10, 100);
  const score =
    attendance_percentage * weights.attendance_percentage +
    internal_marks * weights.internal_marks +
    assignment_score * weights.assignment_score +
    normalizedStudyHours * weights.study_hours_per_week;
  let risk = 'Low';
  if (score < thresholds.high_risk_below) risk = 'High';
  else if (score < thresholds.medium_risk_below) risk = 'Medium';
  return { predictedScore: Math.round(score * 10) / 10, risk };
}
