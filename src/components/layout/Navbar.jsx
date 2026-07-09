import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Settings, BookOpen, ChevronDown } from 'lucide-react';
import useAuthStore from '@/stores/useAuthStore';
import { signOutUser } from '@/services/authService';
import Toggle from '@/components/ui/Toggle';
import Button from '@/components/ui/Button';
import logo from '@/assets/main-logo.png';

export default function Navbar({ showAuth = true }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { user, isDyslexiaMode, setDyslexiaMode, signOut } = useAuthStore();
  const isAdmin = user && (user.role === 'admin' || (user.email && user.email.includes('admin')));

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleSignOut = async () => {
    await signOutUser();
    signOut();
    navigate('/');
  };

  const handleLandingNav = (sectionId) => (event) => {
    event.preventDefault();
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const getInitials = () => {
    const name = user?.user_metadata?.full_name || user?.email || 'U';
    return name.charAt(0).toUpperCase();
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Brand */}
        <Link to={user ? (isAdmin ? '/cms' : '/home') : '/'} className="flex items-center gap-3 group">
          <img src={logo} alt="DICATAT.IN" className="h-9 w-auto object-contain" />
        </Link>

        {/* Nav links (landing page) */}
        {!user && (
          <div className="hidden md:flex gap-9">
            {[
              { label: 'Fitur', id: 'features' },
              { label: 'Metode', id: 'methods' },
              { label: 'Cara Kerja', id: 'how-it-works' },
            ].map((item) => (
              <a 
                key={item.id}
                href={`#${item.id}`}
                onClick={handleLandingNav(item.id)}
                className="text-base font-semibold text-muted-foreground transition-colors hover:text-primary"
              >
                {item.label}
              </a>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2 bg-muted/50 px-3 py-1 rounded-full border border-border">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hidden sm:inline">Dyslexia</span>
            <Toggle
              checked={isDyslexiaMode}
              onChange={setDyslexiaMode}
              size="sm"
            />
          </div>

          {showAuth && !user && (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                Masuk
              </Button>
              <Button size="sm" onClick={() => navigate('/signup')} className="shadow-lg shadow-primary/20">
                Daftar
              </Button>
            </div>
          )}

          {user && (
            <div className="relative" ref={dropdownRef}>
              <div
                className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full bg-muted/50 border border-border cursor-pointer hover:bg-muted transition-all group"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/20 overflow-hidden ring-offset-background group-hover:ring-2 group-hover:ring-primary/20 transition-all">
                  {user?.user_metadata?.avatar_url ? (
                    <img src={user.user_metadata.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs font-bold text-primary">{getInitials()}</span>
                  )}
                </div>
                <ChevronDown size={14} className={`text-muted-foreground transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </div>

              {dropdownOpen && (
                <div className="absolute right-0 top-[calc(100%+8px)] w-64 bg-secondary border border-border rounded-xl shadow-2xl p-2 animate-in fade-in zoom-in-95 duration-200">
                  <div className="px-3 py-2 mb-2">
                    <p className="text-sm font-bold text-foreground">
                      {user?.user_metadata?.full_name || 'Admin'}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user?.email}
                    </p>
                  </div>
                  <div className="my-1 h-px bg-border" />
                  {isAdmin ? (
                    <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors" onClick={() => { navigate('/cms'); setDropdownOpen(false); }}>
                      <Settings size={16} className="text-primary" /> CMS Editor
                    </button>
                  ) : (
                    <>
                      <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors" onClick={() => { navigate('/home'); setDropdownOpen(false); }}>
                        <BookOpen size={16} className="text-primary" /> Library
                      </button>
                      <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors" onClick={() => { setDropdownOpen(false); }}>
                        <Settings size={16} className="text-muted-foreground" /> Settings
                      </button>
                    </>
                  )}
                  <div className="my-1 h-px bg-border" />
                  <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors" onClick={handleSignOut}>
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

