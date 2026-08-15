// frontend/src/pages/teacher/EnterMarks.jsx
import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Select } from '@/components/ui/primitives';

export default function EnterMarks() {
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [subjectId, setSubjectId] = useState('');
  const [form, setForm] = useState({ student_id: '', attendance_percentage: '', internal_marks: '', assignment_score: '', study_hours_per_week: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    api('/subjects').then(setSubjects);
    api('/users?role=student').then(setStudents);
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const res = await api('/marks', { method: 'POST', body: JSON.stringify({ ...form, subject_id: parseInt(subjectId), student_id: parseInt(form.student_id), attendance_percentage: parseFloat(form.attendance_percentage), internal_marks: parseFloat(form.internal_marks), assignment_score: parseFloat(form.assignment_score), study_hours_per_week: parseFloat(form.study_hours_per_week) }) });
    setMessage(`Saved. Predicted score ${res.result.predictedScore}% with ${res.result.risk} risk.`);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-[40px] font-bold leading-[1.1] tracking-[-1px]">Enter Marks</h1>
        <p className="text-base leading-7 text-[var(--color-ink-muted)]">Marks entry triggers risk prediction immediately and stores the result for the dashboard and student view.</p>
      </div>
      <Card>
        <CardHeader><CardTitle>Input Academic Metrics</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select value={subjectId} onChange={e => setSubjectId(e.target.value)} required>
              <option value="">Select Subject</option>
              {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </Select>
            <Select value={form.student_id} onChange={e => setForm({...form, student_id: e.target.value})} required>
              <option value="">Select Student</option>
              {students.map(s => <option key={s.id} value={s.id}>{s.name} ({s.class_section})</option>)}
            </Select>
            <Input placeholder="Attendance %" type="number" value={form.attendance_percentage} onChange={e => setForm({...form, attendance_percentage: e.target.value})} required />
            <Input placeholder="Internal Marks" type="number" value={form.internal_marks} onChange={e => setForm({...form, internal_marks: e.target.value})} required />
            <Input placeholder="Assignment Score" type="number" value={form.assignment_score} onChange={e => setForm({...form, assignment_score: e.target.value})} required />
            <Input placeholder="Study Hours/Week" type="number" value={form.study_hours_per_week} onChange={e => setForm({...form, study_hours_per_week: e.target.value})} required />
            <Button type="submit" className="md:col-span-2">Save & Compute Risk</Button>
          </form>
          {message ? <p className="mt-4 text-sm text-[var(--color-ink-secondary)]">{message}</p> : null}
        </CardContent>
      </Card>
    </div>
  );
}
