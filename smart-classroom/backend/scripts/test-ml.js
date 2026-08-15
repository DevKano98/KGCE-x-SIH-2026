import { predictRisk } from '../ml_model/risk_rules.js';

const samples = [
  {
    label: 'Low',
    input: {
      attendance_percentage: 92,
      internal_marks: 88,
      assignment_score: 90,
      study_hours_per_week: 15,
    },
  },
  {
    label: 'Medium',
    input: {
      attendance_percentage: 66,
      internal_marks: 64,
      assignment_score: 62,
      study_hours_per_week: 6.5,
    },
  },
  {
    label: 'High',
    input: {
      attendance_percentage: 34,
      internal_marks: 28,
      assignment_score: 31,
      study_hours_per_week: 2,
    },
  },
  {
    label: 'Borderline',
    input: {
      attendance_percentage: 70,
      internal_marks: 60,
      assignment_score: 68,
      study_hours_per_week: 4.5,
    },
  },
];

for (const sample of samples) {
  console.log(
    JSON.stringify(
      {
        case: sample.label,
        input: sample.input,
        output: predictRisk(sample.input),
      },
      null,
      2,
    ),
  );
}
