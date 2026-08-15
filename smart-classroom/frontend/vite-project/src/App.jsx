// frontend/src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import AppShell from '@/components/layout/AppShell';
import LandingPage from '@/pages/LandingPage';
import Login from '@/pages/auth/Login';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import ManageSubjects from '@/pages/admin/ManageSubjects';
import ManageTeachers from '@/pages/admin/ManageTeachers';
import ManageStudents from '@/pages/admin/ManageStudents';
import GenerateTimetable from '@/pages/admin/GenerateTimetable';
import TeacherDashboard from '@/pages/teacher/TeacherDashboard';
import EnterMarks from '@/pages/teacher/EnterMarks';
import StudentDashboard from '@/pages/student/StudentDashboard';
import Timetable from '@/pages/student/Timetable';
import Tutor from '@/pages/student/Tutor';

function ProtectedRoute({ role, children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/login" />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute><AppShell /></ProtectedRoute>}>
            <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/subjects" element={<ProtectedRoute role="admin"><ManageSubjects /></ProtectedRoute>} />
            <Route path="/admin/teachers" element={<ProtectedRoute role="admin"><ManageTeachers /></ProtectedRoute>} />
            <Route path="/admin/students" element={<ProtectedRoute role="admin"><ManageStudents /></ProtectedRoute>} />
            <Route path="/admin/timetable" element={<ProtectedRoute role="admin"><GenerateTimetable /></ProtectedRoute>} />
            
            <Route path="/teacher" element={<ProtectedRoute role="teacher"><TeacherDashboard /></ProtectedRoute>} />
            <Route path="/teacher/marks" element={<ProtectedRoute role="teacher"><EnterMarks /></ProtectedRoute>} />
            
            <Route path="/student" element={<ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>} />
            <Route path="/student/timetable" element={<ProtectedRoute role="student"><Timetable /></ProtectedRoute>} />
            <Route path="/student/tutor" element={<ProtectedRoute role="student"><Tutor /></ProtectedRoute>} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
