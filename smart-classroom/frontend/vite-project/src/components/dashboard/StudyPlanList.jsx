// frontend/src/components/dashboard/StudyPlanList.jsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/primitives';
import { BookOpen, Clock } from 'lucide-react';

export default function StudyPlanList({ plan }) {
  if (!plan) return null;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommended Study Plan</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {plan.prioritySubjects.length > 0 ? (
          <div>
            <h3 className="mb-2 flex items-center gap-2 text-sm font-medium"><BookOpen className="h-4 w-4" /> Priority Subjects</h3>
            <ul className="list-disc list-inside text-sm text-[var(--color-ink-muted)]">
              {plan.prioritySubjects.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>
        ) : <p className="text-sm text-[var(--color-ink-muted)]">No high priority subjects.</p>}
        <div>
          <h3 className="mb-2 flex items-center gap-2 text-sm font-medium"><Clock className="h-4 w-4" /> Timetable Slots</h3>
          <ul className="space-y-1 text-sm text-[var(--color-ink-muted)]">
            {plan.freeSlots.slice(0, 5).map((s, i) => <li key={i}>{s.day_of_week} {s.start_time} - {s.end_time}</li>)}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
