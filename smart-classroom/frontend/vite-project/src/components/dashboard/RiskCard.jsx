// frontend/src/components/dashboard/RiskCard.jsx
import { Card, CardContent, CardHeader, CardTitle, Badge } from '@/components/ui/primitives';

export default function RiskCard({ subject, risk, score }) {
  const variants = { High: 'danger', Medium: 'warning', Low: 'success' };
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">{subject}</CardTitle>
        <Badge variant={variants[risk]}>{risk}</Badge>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold tracking-[-0.8px]">{score}%</div>
        <p className="text-sm text-[var(--color-ink-muted)]">Predicted score</p>
      </CardContent>
    </Card>
  );
}
