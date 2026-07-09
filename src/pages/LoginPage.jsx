import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, FileText } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Toggle from '@/components/ui/Toggle';
import useAuthStore from '@/stores/useAuthStore';
import { signInWithEmail } from '@/services/authService';
import mainLogo from '@/assets/main-logo.png';

export default function LoginPage() {
  const navigate = useNavigate();
  const { setUser, setSession, isDyslexiaMode, setDyslexiaMode } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Mohon isi semua field');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const result = await signInWithEmail(email, password);
      if (result.user) {
        setUser(result.user);
        setSession(result.session);
        const isAdmin = result.user.role === 'admin' || (result.user.email && result.user.email.includes('admin'));
        if (isAdmin) {
          navigate('/cms');
        } else {
          navigate('/home');
        }
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
          <Link to="/" className="mb-8 block">
            <img src={mainLogo} alt="DICATAT.IN Logo" className="h-12 w-auto mx-auto" />
          </Link>
          <h2 className="text-4xl font-bold text-foreground mb-4 leading-tight">Catatan berantakan?<br />Biar AI yang urus.</h2>
          <p className="text-lg text-muted-foreground mb-12">
            Transformasi catatan tangan menjadi Mind Map, Cornell Notes, dan 5 metode lainnya — dalam hitungan detik.
          </p>
          <div className="mt-auto w-full">
            <div className="glass-card p-6 flex flex-col gap-4 items-center text-center">
              <FileText size={40} className="text-primary" />
              <p className="text-sm font-medium">Dari tulisan tangan ke pengetahuan terstruktur</p>
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

          <h1 className="text-3xl font-bold mb-2">Masuk ke Akun</h1>
          <p className="text-muted-foreground mb-8">Selamat datang kembali! Silakan masuk.</p>

          {/* Email form */}

          {/* Email form */}
          <form onSubmit={handleEmailLogin} className="flex flex-col gap-4">
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
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock size={16} />}
                required
              />
            </div>

            {error && <p className="text-destructive text-sm font-medium text-center bg-destructive/10 p-2 rounded-md">{error}</p>}
            <Button type="submit" className="w-full mt-2" disabled={loading}>
              {loading ? 'Masuk...' : 'Masuk'}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Belum punya akun? <Link to="/signup" className="text-primary font-semibold hover:underline">Daftar</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
