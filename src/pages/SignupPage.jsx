import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Toggle from '@/components/ui/Toggle';
import useAuthStore from '@/stores/useAuthStore';
import { signInWithGoogle, signUp } from '@/services/authService';

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
    <div className="flex min-h-screen bg-background">
      <div className="hidden md:flex flex-1 bg-secondary p-12 flex-col justify-between items-center text-center">
        <div className="flex flex-col max-w-md items-center justify-center h-full">
          <Link to="/" className="text-3xl font-bold mb-8 block tracking-tight">
            DICATAT<span className="text-primary">.IN</span>
          </Link>
          <h2 className="text-4xl font-bold text-foreground mb-4 leading-tight">Gabung DICATAT.IN<br />dan belajar lebih cerdas.</h2>
          <p className="text-lg text-muted-foreground mb-12">
            6+ metode belajar terbukti efektif. Flashcard otomatis. Aksesibilitas untuk semua.
          </p>
          <div className="mt-auto w-full">
            <div className="glass-card p-6 flex flex-col gap-4 items-center text-center">
              <span className="text-4xl">🎓</span>
              <p className="text-sm font-medium">Gratis untuk mahasiswa Indonesia</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-background">
        <div className="w-full max-w-sm">
          <div className="flex justify-end mb-8 items-center gap-2">
            <span className="text-xs text-muted-foreground font-medium">Dyslexia Friendly Font</span>
            <Toggle checked={isDyslexiaMode} onChange={setDyslexiaMode} size="sm" />
          </div>

          <h1 className="text-3xl font-bold mb-2">Buat Akun Baru</h1>
          <p className="text-muted-foreground mb-8">Mulai perjalanan belajar cerdasmu.</p>

          <Button variant="outline" className="w-full h-11" onClick={handleGoogleLogin}>
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Continue with Google
          </Button>

          <div className="relative flex items-center py-6">
            <div className="flex-grow border-t border-border"></div>
            <span className="flex-shrink-0 mx-4 text-muted-foreground text-xs uppercase tracking-wider">atau</span>
            <div className="flex-grow border-t border-border"></div>
          </div>

          <form onSubmit={handleSignup} className="flex flex-col gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Nama Lengkap</label>
              <Input
                type="text"
                placeholder="Nama lengkap"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                icon={<User size={16} />}
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail size={16} />}
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Password</label>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Minimal 6 karakter"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock size={16} />}
                required
              />
            </div>

            {error && <p className="text-destructive text-sm font-medium">{error}</p>}

            <Button type="submit" className="w-full mt-2" disabled={loading}>
              {loading ? 'Memuat...' : 'Daftar'}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Sudah punya akun? <Link to="/login" className="text-primary font-semibold hover:underline">Masuk</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
