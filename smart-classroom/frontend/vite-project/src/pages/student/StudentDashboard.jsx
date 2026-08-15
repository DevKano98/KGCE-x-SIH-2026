// frontend/src/pages/student/StudentDashboard.jsx
import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import RiskCard from '@/components/dashboard/RiskCard';
import StudyPlanList from '@/components/dashboard/StudyPlanList';

export default function StudentDashboard() {
  const [risks, setRisks] = useState([]);
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    api('/predict/me').then(setRisks);
    api('/studyplan/me').then(setPlan).catch(() => setPlan({ prioritySubjects: [], freeSlots: [] }));
  }, []);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-[40px] font-bold leading-[1.1] tracking-[-1px]">My Dashboard</h1>
        <p className="text-base leading-7 text-[var(--color-ink-muted)]">Review the latest predicted scores across your subjects and use the study plan to prioritize effort.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {risks.map(r => <RiskCard key={r.id} subject={r.subject_name} risk={r.risk_level} score={r.predicted_score} />)}
      </div>
      <StudyPlanList plan={plan} />
    </div>
  );
}
