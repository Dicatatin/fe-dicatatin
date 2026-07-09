import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '@/stores/useAuthStore';
import { getSession, onAuthStateChange } from '@/services/authService';
import { PageLoader } from '@/components/ui/Loader';

export default function AuthGuard({ children, requireRole = 'user' }) {
  const { user, isLoading, setUser, setSession, setLoading } = useAuthStore();

  useEffect(() => {
    // Check existing session
    getSession().then(({ user, session }) => {
      setUser(user);
      setSession(session);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });

    // Listen for auth changes
    const { data } = onAuthStateChange((event, session) => {
      setUser(session?.user || null);
      setSession(session || null);
      setLoading(false);
    });

    return () => {
      data?.subscription?.unsubscribe();
    };
  }, [setUser, setSession, setLoading]);

  if (isLoading) {
    return <PageLoader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const isAdmin = user.role === 'admin' || (user.email && user.email.includes('admin'));

  if (requireRole === 'admin' && !isAdmin) {
    return <Navigate to="/home" replace />;
  }

  if (requireRole === 'user' && isAdmin) {
    return <Navigate to="/cms" replace />;
  }

  return children;
}
