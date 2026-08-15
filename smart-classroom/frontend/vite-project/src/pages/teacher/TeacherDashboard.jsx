// frontend/src/pages/teacher/TeacherDashboard.jsx
import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/primitives';
import RiskCard from '@/components/dashboard/RiskCard';

export default function TeacherDashboard() {
  const [subjects, setSubjects] = useState([]);
  const [risks, setRisks] = useState([]);

  useEffect(() => {
    api('/subjects').then(setSubjects);
  }, []);

  const loadRisks = async (subId) => {
    const res = await api(`/predict/subject/${subId}`);
    setRisks(res);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-[40px] font-bold leading-[1.1] tracking-[-1px]">Teacher Dashboard</h1>
        <p className="text-base leading-7 text-[var(--color-ink-muted)]">Open one of your subjects to review the latest student risk predictions.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {subjects.map(s => (
          <Card key={s.id} className="cursor-pointer hover:bg-[var(--color-canvas-soft)]" onClick={() => loadRisks(s.id)}>
            <CardHeader><CardTitle>{s.name}</CardTitle></CardHeader>
            <CardContent><p className="text-sm text-[var(--color-ink-muted)]">Code: {s.code}</p></CardContent>
          </Card>
        ))}
      </div>
      {risks.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {risks.map(r => <RiskCard key={r.id} subject={r.student_name} risk={r.risk_level} score={r.predicted_score} />)}
        </div>
      )}
    </div>
  );
}
