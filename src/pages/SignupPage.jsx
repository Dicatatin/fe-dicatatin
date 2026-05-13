import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, GraduationCap } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Toggle from '@/components/ui/Toggle';
import useAuthStore from '@/stores/useAuthStore';
import { signUp } from '@/services/authService';

export default function SignupPage() {
  const navigate = useNavigate();
  const { setUser, setSession, isDyslexiaMode, setDyslexiaMode } = useAuthStore();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      setError('Mohon isi semua field');
      return;
    }
    if (password.length < 8) {
      setError('Password minimal 8 karakter');
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
      setError('Username/password incorrect.');
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
              <GraduationCap size={42} className="text-primary" />
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
                placeholder="Minimal 8 karakter"
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
