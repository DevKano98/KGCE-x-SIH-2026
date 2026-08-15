// frontend/src/components/timetable/SlotEditor.jsx
import { useState } from 'react';
import { Dialog, Button, Input } from '@/components/ui/primitives';
import { api } from '@/lib/api';

export default function SlotEditor({ slot, onClose, onSave }) {
  const [room, setRoom] = useState(slot?.room || '');
  const handleSave = async () => {
    await api(`/timetable/${slot.id}`, { method: 'PUT', body: JSON.stringify({ room }) });
    onSave();
    onClose();
  };
  return (
    <Dialog open={!!slot} onClose={onClose}>
      <h3 className="text-lg font-semibold mb-4">Edit Slot</h3>
      <Input value={room} onChange={e => setRoom(e.target.value)} placeholder="Room number" className="mb-4" />
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </div>
    </Dialog>
  );
}