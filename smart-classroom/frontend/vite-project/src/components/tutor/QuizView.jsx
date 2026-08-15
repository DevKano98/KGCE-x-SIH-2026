// frontend/src/components/tutor/QuizView.jsx
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button, Input } from '@/components/ui/primitives';
import { api } from '@/lib/api';

export default function QuizView({ subjectId }) {
  const [topic, setTopic] = useState('');
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    const res = await api('/tutor/quiz', { method: 'POST', body: JSON.stringify({ subjectId, topic }) });
    setQuiz(res.questions);
    setLoading(false);
  };

  return (
    <Card>
      <CardHeader><CardTitle>Quiz Generator</CardTitle></CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4">
          <Input value={topic} onChange={e => setTopic(e.target.value)} placeholder="Enter topic..." />
          <Button onClick={generate} disabled={loading}>{loading ? 'Generating...' : 'Generate'}</Button>
        </div>
        {quiz && (
          <div className="space-y-4">
            {quiz.map((q, i) => (
              <div key={i} className="rounded-[var(--radius-lg)] border border-[var(--color-hairline)] p-4">
                <p className="font-medium mb-2">{i + 1}. {q.question}</p>
                <div className="space-y-1">
                  {q.options.map((opt, j) => (
                    <p key={j} className={`rounded-[var(--radius-md)] p-2 text-sm ${opt === q.answer ? 'bg-emerald-50 font-semibold text-emerald-700' : 'bg-[var(--color-canvas-soft)]'}`}>{opt}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
