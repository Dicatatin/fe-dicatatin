import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Settings, User, BookOpen } from 'lucide-react';
import useAuthStore from '@/stores/useAuthStore';
import { signOutUser } from '@/services/authService';
import Toggle from '@/components/ui/Toggle';
import Button from '@/components/ui/Button';
import './Navbar.css';

export default function Navbar({ showAuth = true }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { user, isDyslexiaMode, setDyslexiaMode, signOut } = useAuthStore();

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

  const getInitials = () => {
    const name = user?.user_metadata?.full_name || user?.email || 'U';
    return name.charAt(0).toUpperCase();
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Brand */}
        <Link to={user ? '/home' : '/'} className="navbar-brand">
          <span className="navbar-logo">
            DICATAT<span>.IN</span>
          </span>
        </Link>

        {/* Nav links (landing page) */}
        {!user && (
          <div className="navbar-nav">
            <a href="#features" className="navbar-link">Fitur</a>
            <a href="#methods" className="navbar-link">Metode</a>
            <a href="#how-it-works" className="navbar-link">Cara Kerja</a>
          </div>
        )}

        {/* Actions */}
        <div className="navbar-actions">
          <Toggle
            checked={isDyslexiaMode}
            onChange={setDyslexiaMode}
            label="Dyslexia"
            size="sm"
          />

          {showAuth && !user && (
            <Button size="sm" onClick={() => navigate('/login')}>
              Masuk
            </Button>
          )}

          {user && (
            <div className="navbar-user-menu" ref={dropdownRef}>
              <div
                className="navbar-avatar"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {user?.user_metadata?.avatar_url ? (
                  <img src={user.user_metadata.avatar_url} alt="Avatar" />
                ) : (
                  getInitials()
                )}
              </div>

              {dropdownOpen && (
                <div className="navbar-dropdown">
                  <div style={{ padding: 'var(--space-2) var(--space-3)', marginBottom: 'var(--space-1)' }}>
                    <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {user?.user_metadata?.full_name || 'User'}
                    </p>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                      {user?.email}
                    </p>
                  </div>
                  <div className="navbar-dropdown-divider" />
                  <button className="navbar-dropdown-item" onClick={() => navigate('/home')}>
                    <BookOpen size={16} /> Library
                  </button>
                  <button className="navbar-dropdown-item" onClick={() => {}}>
                    <Settings size={16} /> Settings
                  </button>
                  <div className="navbar-dropdown-divider" />
                  <button className="navbar-dropdown-item" onClick={handleSignOut} style={{ color: 'var(--error)' }}>
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
