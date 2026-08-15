// frontend/src/components/timetable/TimetableGrid.jsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/primitives';

export default function TimetableGrid({ slots }) {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const times = ['09:00', '10:00', '11:00', '13:00', '14:00'];
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Time</TableHead>
          {days.map(d => <TableHead key={d}>{d}</TableHead>)}
        </TableRow>
      </TableHeader>
      <TableBody>
        {times.map(t => (
          <TableRow key={t}>
            <TableCell className="font-medium">{t}</TableCell>
            {days.map(d => {
              const slot = slots.find(s => s.day_of_week === d && s.start_time === t);
              return (
                <TableCell key={d} className="text-xs">
                  {slot ? (
                    <div>
                      <p className="font-semibold">{slot.subject_name}</p>
                      <p className="text-muted-foreground">{slot.teacher_name}</p>
                      <p className="text-muted-foreground">{slot.room}</p>
                    </div>
                  ) : '-'}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}