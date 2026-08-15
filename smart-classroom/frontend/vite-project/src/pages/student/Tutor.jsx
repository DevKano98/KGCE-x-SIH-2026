import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import ChatWindow from '@/components/tutor/ChatWindow';
import QuizView from '@/components/tutor/QuizView';
import { Card, CardContent, CardHeader, CardTitle, Select } from '@/components/ui/primitives';

export default function Tutor() {
  const [subjects, setSubjects] = useState([]);
  const [subjectId, setSubjectId] = useState('');

  useEffect(() => {
    api('/subjects').then((items) => {
      setSubjects(items);
      if (items[0]) {
        setSubjectId(String(items[0].id));
      }
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-[40px] font-bold leading-[1.1] tracking-[-1px]">AI Tutor</h1>
        <p className="text-base leading-7 text-[var(--color-ink-muted)]">Ask questions or generate a revision quiz for a subject already assigned to your timetable.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Select subject</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={subjectId} onChange={(event) => setSubjectId(event.target.value)}>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>{subject.name}</option>
            ))}
          </Select>
        </CardContent>
      </Card>
      {subjectId ? (
        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <ChatWindow subjectId={Number(subjectId)} />
          <QuizView subjectId={Number(subjectId)} />
        </div>
      ) : null}
    </div>
  );
}
