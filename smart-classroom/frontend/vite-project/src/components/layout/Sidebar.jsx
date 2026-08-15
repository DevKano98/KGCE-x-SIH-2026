// frontend/src/components/layout/Sidebar.jsx
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { LayoutDashboard, BookOpen, Users, Calendar, GraduationCap, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Sidebar() {
  const { user } = useAuth();
  const links = {
    admin: [
      { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
      { to: '/admin/subjects', label: 'Subjects', icon: BookOpen },
      { to: '/admin/teachers', label: 'Teachers', icon: Users },
      { to: '/admin/students', label: 'Students', icon: Users },
      { to: '/admin/timetable', label: 'Timetable', icon: Calendar },
    ],
    teacher: [
      { to: '/teacher', label: 'Dashboard', icon: LayoutDashboard, end: true },
      { to: '/teacher/marks', label: 'Enter Marks', icon: GraduationCap },
    ],
    student: [
      { to: '/student', label: 'Dashboard', icon: LayoutDashboard, end: true },
      { to: '/student/timetable', label: 'Timetable', icon: Calendar },
      { to: '/student/tutor', label: 'AI Tutor', icon: MessageSquare },
    ]
  };

  return (
    <aside className="hidden w-72 flex-col border-r border-[var(--color-hairline)] bg-[var(--color-canvas-soft)] p-4 md:flex">
      <div className="mb-8 rounded-[var(--radius-lg)] border border-[var(--color-hairline)] bg-white p-4">
        <h1 className="text-xl font-bold tracking-[-0.4px]">Smart Classroom</h1>
        <p className="mt-1 text-xs uppercase tracking-[0.12em] text-[var(--color-ink-muted)]">{user?.role} panel</p>
      </div>
      <nav className="flex flex-1 flex-col space-y-1">
        {links[user?.role]?.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) => cn(
              'relative flex items-center gap-3 rounded-[var(--radius-md)] px-4 py-3 text-sm font-medium transition-colors',
              isActive
                ? 'bg-white text-[var(--color-ink)] shadow-[0_8px_20px_rgba(17,17,17,0.04)] before:absolute before:bottom-3 before:left-1 before:top-3 before:w-1 before:rounded-full before:bg-[var(--color-primary)]'
                : 'text-[var(--color-ink-muted)] hover:bg-white/70 hover:text-[var(--color-ink)]'
            )}
          >
            <link.icon className="h-4 w-4" />
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
