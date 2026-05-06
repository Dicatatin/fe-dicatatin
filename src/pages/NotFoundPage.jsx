import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button';
import { Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'var(--space-4)',
      textAlign: 'center',
      padding: 'var(--space-8)',
    }}>
      <span style={{ fontSize: '64px' }}>📝</span>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-4xl)', fontWeight: 800 }}>
        404
      </h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-lg)' }}>
        Halaman tidak ditemukan.
      </p>
      <Link to="/">
        <Button icon={<Home size={16} />}>Kembali ke Beranda</Button>
      </Link>
    </div>
  );
}
