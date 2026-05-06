import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '@/stores/useAuthStore';
import { getSession } from '@/services/authService';
import { PageLoader } from '@/components/ui/Loader';

export default function AuthCallback() {
  const navigate = useNavigate();
  const { setUser, setSession, setLoading } = useAuthStore();

  useEffect(() => {
    getSession().then(({ user, session }) => {
      if (user && session) {
        setUser(user);
        setSession(session);
        navigate('/home', { replace: true });
      } else {
        navigate('/login', { replace: true });
      }
      setLoading(false);
    }).catch(() => {
      navigate('/login', { replace: true });
      setLoading(false);
    });
  }, [navigate, setUser, setSession, setLoading]);

  return <PageLoader />;
}
