import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { checkAuth } from './store/slices/authSlice';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './pages/NotFound';
import ProjectDetails from './pages/ProjectDetails';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider, useTheme } from './context/ThemeContext';

function ToasterWithTheme() {
  const { isDark } = useTheme();
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: isDark ? '#0d0d2b' : '#ffffff',
          color: isDark ? '#ffffff' : '#1a0533',
          border: '1px solid rgba(124, 58, 237, 0.3)',
          fontFamily: "'Poppins', sans-serif",
          fontSize: '14px',
        },
      }}
    />
  );
}

function AppContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <ToasterWithTheme />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
