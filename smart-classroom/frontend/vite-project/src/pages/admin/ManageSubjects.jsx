// frontend/src/pages/admin/ManageSubjects.jsx
import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Badge, Card, CardContent, CardHeader, CardTitle, Button, Input, Select, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/primitives';

export default function ManageSubjects() {
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState({ name: '', code: '', teacher_id: '', semester: '', department: '' });

  const loadData = async () => {
    setSubjects(await api('/subjects'));
    setTeachers(await api('/users?role=teacher'));
  };
  useEffect(() => { loadData(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    await api('/subjects', { method: 'POST', body: JSON.stringify({ ...form, teacher_id: parseInt(form.teacher_id), semester: parseInt(form.semester) }) });
    setForm({ name: '', code: '', teacher_id: '', semester: '', department: '' });
    loadData();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-[40px] font-bold leading-[1.1] tracking-[-1px]">Manage Subjects</h1>
        <p className="text-base leading-7 text-[var(--color-ink-muted)]">Assign each subject to a teacher and keep the timetable input data clean.</p>
      </div>
      <Card>
        <CardHeader><CardTitle>Add Subject</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={submit} className="grid grid-cols-1 gap-4 md:grid-cols-5">
            <Input placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
            <Input placeholder="Code" value={form.code} onChange={e => setForm({...form, code: e.target.value})} required />
            <Select value={form.teacher_id} onChange={e => setForm({...form, teacher_id: e.target.value})} required>
              <option value="">Select Teacher</option>
              {teachers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </Select>
            <Input placeholder="Semester" type="number" value={form.semester} onChange={e => setForm({...form, semester: e.target.value})} required />
            <Input placeholder="Department" value={form.department} onChange={e => setForm({...form, department: e.target.value})} required />
            <Button type="submit" className="md:col-span-5">Add subject</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Subject list</CardTitle>
          <Badge variant="secondary">{subjects.length} active</Badge>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow><TableHead>Code</TableHead><TableHead>Name</TableHead><TableHead>Teacher</TableHead><TableHead>Semester</TableHead><TableHead>Department</TableHead></TableRow>
            </TableHeader>
            <TableBody>
              {subjects.map(s => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium text-[var(--color-ink)]">{s.code}</TableCell>
                  <TableCell>{s.name}</TableCell>
                  <TableCell>{s.teacher_name || '-'}</TableCell>
                  <TableCell>{s.semester}</TableCell>
                  <TableCell>{s.department}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
