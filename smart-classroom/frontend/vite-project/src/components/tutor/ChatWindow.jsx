// frontend/src/components/tutor/ChatWindow.jsx
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Input, Button } from '@/components/ui/primitives';
import { api } from '@/lib/api';
import { Send } from 'lucide-react';

export default function ChatWindow({ subjectId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const res = await api('/tutor/ask', { method: 'POST', body: JSON.stringify({ subjectId, question: input }) });
      setMessages(prev => [...prev, { role: 'assistant', content: res.answer }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error getting response.' }]);
    }
    setLoading(false);
  };

  return (
    <Card className="flex flex-col h-[600px]">
      <CardHeader><CardTitle>AI Tutor</CardTitle></CardHeader>
      <CardContent className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-[var(--radius-lg)] p-3 text-sm ${m.role === 'user' ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--color-canvas-soft)] text-[var(--color-ink-secondary)]'}`}>
              {m.content}
            </div>
          </div>
        ))}
      </CardContent>
      <div className="flex gap-2 border-t border-[var(--color-hairline)] p-4">
        <Input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask a question..." onKeyDown={e => e.key === 'Enter' && send()} />
        <Button onClick={send} disabled={loading}><Send className="h-4 w-4" /></Button>
      </div>
    </Card>
  );
}
