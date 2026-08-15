import { ArrowRight, Bot, CalendarDays, LineChart, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/primitives';

const features = [
  {
    icon: CalendarDays,
    accent: 'bg-[var(--color-accent-sky)]',
    title: 'Smart Timetable',
    description: 'Generate class schedules for each section, keep rooms organized, and give every stakeholder one reliable weekly plan.',
  },
  {
    icon: LineChart,
    accent: 'bg-[var(--color-accent-orange)]',
    title: 'AI Risk Prediction',
    description: 'Use attendance, marks, assignments, and study-hours to flag students who need intervention before performance dips further.',
  },
  {
    icon: Bot,
    accent: 'bg-[var(--color-accent-purple)]',
    title: 'AI Study Tutor',
    description: 'Let students ask subject-specific questions, revise key concepts, and generate short quizzes without leaving the platform.',
  },
];

const steps = [
  {
    title: 'Timetable',
    description: 'Admins create subjects, assign teachers, and generate a practical timetable for each class section.',
  },
  {
    title: 'Risk Model',
    description: 'Teachers enter marks and attendance, then the rules-based model predicts expected scores and risk levels.',
  },
  {
    title: 'AI Tutor',
    description: 'Students get targeted help and revision support based on the subjects and risks attached to their profile.',
  },
];

const footerColumns = {
  Product: ['Timetable', 'Risk prediction', 'AI tutor'],
  Company: ['About', 'Privacy', 'Support'],
  Resources: ['Docs', 'Status', 'Contact'],
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--color-canvas-soft)] text-[var(--color-ink)]">
      <header className="sticky top-0 z-30 border-b border-[var(--color-hairline)] bg-white/95 backdrop-blur">
        <div className="app-container flex h-18 items-center justify-between gap-6">
          <Link to="/" className="text-lg font-bold tracking-[-0.4px]">Smart Classroom</Link>
          <nav className="hidden items-center gap-8 text-sm text-[var(--color-ink-muted)] md:flex">
            <a href="#features">Features</a>
            <a href="#how-it-works">How it works</a>
            <a href="#footer">Company</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-medium text-[var(--color-primary)]">Log in</Link>
            <Button asChild size="pill" className="px-5">
              <Link to="/login">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <section className="bg-[var(--color-secondary)] py-20 text-white md:py-28">
        <div className="app-container grid gap-12 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div className="space-y-8">
            <span className="inline-flex rounded-[var(--radius-full)] border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white/80">
              Timetables that think ahead
            </span>
            <div className="space-y-6">
              <h1 className="display-tight max-w-3xl text-[48px] font-bold leading-none md:text-[64px]">
                Coordinate classes, spot academic risk early, and tutor students in one flow.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-white/82 md:text-lg">
                Smart Classroom connects scheduling, academic signals, and AI study support so admins, teachers, and students work from the same system instead of scattered tools.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="pill" className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-active)]">
                <Link to="/login">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="pill" className="border-white bg-white text-[var(--color-secondary)] hover:bg-white/90">
                <a href="#how-it-works">See how it works</a>
              </Button>
            </div>
          </div>

          <Card className="border-white/10 bg-white/8 text-white shadow-none backdrop-blur">
            <CardHeader>
              <div className="flex items-center gap-3 text-white/85">
                <div className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-lg)] bg-white/12">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-white">Connected outcomes</CardTitle>
                  <CardDescription className="text-white/70">One admin action unlocks teacher and student workflows.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {['Subjects assigned to teachers', 'Timetable generated by section', 'Predicted score and risk saved after marks entry', 'Tutor answers and quizzes tied to real subjects'].map((item) => (
                <div key={item} className="rounded-[var(--radius-md)] border border-white/10 bg-white/6 p-4 text-sm text-white/88">
                  {item}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="features" className="py-20">
        <div className="app-container space-y-10">
          <div className="max-w-2xl space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--color-primary)]">Platform features</p>
            <h2 className="section-tight text-[34px] font-bold leading-[1.08] md:text-[40px]">
              One restrained interface for the core operational work of a modern classroom.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title}>
                <CardHeader className="space-y-5">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-[var(--radius-lg)] ${feature.accent}`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="space-y-2">
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription className="text-base leading-7">{feature.description}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-8 pb-24">
        <div className="app-container space-y-10">
          <div className="max-w-2xl space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--color-primary)]">How it works</p>
            <h2 className="section-tight text-[34px] font-bold leading-[1.08] md:text-[40px]">
              A simple sequence from scheduling to intervention.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <Card key={step.title}>
                <CardHeader className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-full)] bg-[var(--color-canvas-soft)] text-sm font-semibold text-[var(--color-primary)]">
                      0{index + 1}
                    </span>
                    {index < steps.length - 1 ? <ArrowRight className="hidden h-5 w-5 text-[var(--color-ink-faint)] md:block" /> : null}
                  </div>
                  <div className="space-y-2">
                    <CardTitle>{step.title}</CardTitle>
                    <CardDescription className="text-base leading-7">{step.description}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer id="footer" className="border-t border-[var(--color-hairline)] bg-[var(--color-canvas-soft)] py-14 text-[var(--color-ink-secondary)]">
        <div className="app-container grid gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
          <div className="space-y-3">
            <h3 className="text-lg font-bold tracking-[-0.3px]">Smart Classroom</h3>
            <p className="max-w-sm text-sm leading-6 text-[var(--color-ink-muted)]">
              Timetable management, academic risk prediction, and AI study support for one connected campus workflow.
            </p>
          </div>
          {Object.entries(footerColumns).map(([title, links]) => (
            <div key={title} className="space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-[0.08em]">{title}</h4>
              <div className="space-y-3 text-sm text-[var(--color-ink-muted)]">
                {links.map((item) => <p key={item}>{item}</p>)}
              </div>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}
