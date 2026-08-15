// frontend/src/components/layout/Topbar.jsx
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/primitives';
import { LogOut } from 'lucide-react';

export default function Topbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => { logout(); navigate('/login'); };
  
  return (
    <header className="flex h-18 items-center justify-between border-b border-[var(--color-hairline)] bg-white px-6">
      <div>
        <h2 className="text-lg font-semibold tracking-[-0.3px]">{user?.name}</h2>
        <p className="text-sm capitalize text-[var(--color-ink-muted)]">{user?.role}</p>
      </div>
      <Button variant="subtle" onClick={handleLogout}>
        <LogOut className="h-4 w-4" />
        Log out
      </Button>
    </header>
  );
}
