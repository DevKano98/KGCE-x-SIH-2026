import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/primitives';

export default function ManageUsers({ role }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', password: '', classSection: '' });

  const loadUsers = async () => {
    setLoading(true);
    try {
      setUsers(await api(`/users?role=${role}`));
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [role]);

  const submit = async (event) => {
    event.preventDefault();
    await api('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ ...form, role }),
    });
    setForm({ name: '', email: '', password: '', classSection: '' });
    await loadUsers();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-[40px] font-bold leading-[1.1] tracking-[-1px] capitalize">Manage {role}s</h1>
        <p className="text-base leading-7 text-[var(--color-ink-muted)]">
          Create user accounts and review the current {role} roster stored in Neon.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add {role}</CardTitle>
          <CardDescription>Passwords are hashed on the backend before they are stored.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Input placeholder="Full name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required />
            <Input placeholder="Email" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required />
            <Input placeholder="Password" type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required />
            {role === 'student' ? (
              <Input placeholder="Class section" value={form.classSection} onChange={(event) => setForm({ ...form, classSection: event.target.value })} required />
            ) : (
              <div />
            )}
            <Button type="submit" className="md:col-span-2 xl:col-span-4">Create {role}</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <CardTitle>Current {role}s</CardTitle>
            <CardDescription>Live data from the `users` table.</CardDescription>
          </div>
          <Badge variant="secondary">{users.length} records</Badge>
        </CardHeader>
        <CardContent>
          {error ? <p className="rounded-[var(--radius-md)] bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}
          {loading ? <p className="text-sm text-[var(--color-ink-muted)]">Loading users…</p> : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  {role === 'student' ? <TableHead>Section</TableHead> : null}
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium text-[var(--color-ink)]">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell className="capitalize">{user.role}</TableCell>
                    {role === 'student' ? <TableCell>{user.class_section || '-'}</TableCell> : null}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
