// frontend/src/pages/student/Timetable.jsx
import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import TimetableGrid from '@/components/timetable/TimetableGrid';

export default function Timetable() {
  const [slots, setSlots] = useState([]);
  useEffect(() => { api('/timetable/me').then(setSlots); }, []);
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-[40px] font-bold leading-[1.1] tracking-[-1px]">My Timetable</h1>
        <p className="text-base leading-7 text-[var(--color-ink-muted)]">Your section-wise class schedule from the backend timetable slots.</p>
      </div>
      <TimetableGrid slots={slots} />
    </div>
  );
}
