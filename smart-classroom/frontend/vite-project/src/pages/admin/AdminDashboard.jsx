// frontend/src/pages/admin/AdminDashboard.jsx
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Badge, Card, CardContent, CardHeader } from '@/components/ui/primitives';

export default function AdminDashboard() {
  const [summary, setSummary] = useState({ teachers: 0, students: 0, subjects: 0 });

  useEffect(() => {
    Promise.all([
      api('/users?role=teacher'),
      api('/users?role=student'),
      api('/subjects'),
    ]).then(([teachers, students, subjects]) => {
      setSummary({
        teachers: teachers.length,
        students: students.length,
        subjects: subjects.length,
      });
    });
  }, []);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-[40px] font-bold leading-[1.1] tracking-[-1px]">Admin Dashboard</h1>
        <p className="text-base leading-7 text-[var(--color-ink-muted)]">
          Manage teachers, students, subjects, and timetable generation from one place.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          ['Teachers', summary.teachers],
          ['Students', summary.students],
          ['Subjects', summary.subjects],
        ].map(([label, value]) => (
          <Card key={label}>
            <CardHeader className="pb-3">
              <Badge variant="secondary" className="w-fit">{label}</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-[40px] font-bold tracking-[-1px]">{value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
