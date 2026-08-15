// frontend/src/pages/admin/GenerateTimetable.jsx
import { useState } from 'react';
import { api } from '@/lib/api';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui/primitives';

export default function GenerateTimetable() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const generate = async () => {
    setLoading(true);
    try {
      const res = await api('/timetable/generate', { method: 'POST' });
      setMsg(`${res.message}. ${res.slots} slots are now stored.`);
    } catch (e) { setMsg('Error generating timetable'); }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-[40px] font-bold leading-[1.1] tracking-[-1px]">Generate Timetable</h1>
        <p className="text-base leading-7 text-[var(--color-ink-muted)]">Build section-wise slots from the subjects and teachers already stored in the database.</p>
      </div>
      <Card>
        <CardHeader><CardTitle>Algorithm Scheduler</CardTitle></CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-[var(--color-ink-muted)]">This overwrites the existing timetable for all student sections using the backend scheduler service.</p>
          <Button onClick={generate} disabled={loading}>{loading ? 'Generating...' : 'Generate Timetable'}</Button>
          {msg && <p className="mt-4 text-sm font-medium text-[var(--color-ink-secondary)]">{msg}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
