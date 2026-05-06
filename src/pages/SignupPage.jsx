import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Toggle from '@/components/ui/Toggle';
import useAuthStore from '@/stores/useAuthStore';
import { signInWithGoogle, signUp } from '@/services/authService';
import './AuthPage.css';

export default function SignupPage() {
  const navigate = useNavigate();
  const { setUser, setSession, isDyslexiaMode, setDyslexiaMode } = useAuthStore();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      if (result.user) {
        setUser(result.user);
        setSession(result.session);
        navigate('/home');
      }
    } catch (err) {
      setError(err.message || 'Gagal login dengan Google');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      setError('Mohon isi semua field');
      return;
    }
    if (password.length < 6) {
      setError('Password minimal 6 karakter');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const result = await signUp(email, password, fullName);
      if (result.user) {
        setUser(result.user);
        setSession(result.session);
        navigate('/home');
      }
    } catch (err) {
      setError(err.message || 'Gagal mendaftar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-left-content">
          <Link to="/" className="navbar-logo" style={{ fontSize: '2rem', marginBottom: 'var(--space-6)', display: 'block' }}>
            DICATAT<span>.IN</span>
          </Link>
          <h2 className="auth-left-title">Gabung DICATAT.IN<br />dan belajar lebih cerdas.</h2>
          <p className="auth-left-desc">
            6+ metode belajar terbukti efektif. Flashcard otomatis. Aksesibilitas untuk semua.
          </p>
          <div className="auth-left-visual">
            <div className="auth-visual-card">
              <span>🎓</span>
              <p>Gratis untuk mahasiswa Indonesia</p>
            </div>
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-form-wrapper">
          <div className="auth-dyslexia-toggle">
            <Toggle checked={isDyslexiaMode} onChange={setDyslexiaMode} label="Dyslexia Friendly Font" size="sm" />
          </div>

          <h1 className="auth-title">Buat Akun Baru</h1>
          <p className="auth-subtitle">Mulai perjalanan belajar cerdasmu.</p>

          <Button variant="google" fullWidth onClick={handleGoogleLogin}>
            <svg className="google-icon" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Continue with Google
          </Button>

          <div className="auth-divider"><span>atau</span></div>

          <form onSubmit={handleSignup} className="auth-form">
            <Input
              label="Nama Lengkap"
              type="text"
              placeholder="Nama lengkap"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              iconLeft={<User size={18} />}
              required
            />
            <Input
              label="Email"
              type="email"
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              iconLeft={<Mail size={18} />}
              required
            />
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Minimal 6 karakter"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              iconLeft={<Lock size={18} />}
              iconRight={
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ display: 'flex', background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
              required
            />

            {error && <p className="auth-error">{error}</p>}

            <Button type="submit" fullWidth loading={loading}>
              Daftar
            </Button>
          </form>

          <p className="auth-switch">
            Sudah punya akun? <Link to="/login">Masuk</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
