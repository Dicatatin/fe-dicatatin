import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button';
import { FileQuestion, Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center p-8 bg-background">
      <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center text-5xl shadow-xl shadow-black/10 border border-border mb-4">
        <FileQuestion size={44} className="text-primary" />
      </div>
      <div className="space-y-2">
        <h1 className="text-6xl font-black tracking-tighter text-primary">
          404
        </h1>
        <p className="text-xl text-muted-foreground font-medium">
          Halaman tidak ditemukan.
        </p>
      </div>
      <p className="text-sm text-muted-foreground max-w-xs mb-4">
        Mungkin halaman telah dipindah atau tautan yang Anda gunakan salah.
      </p>
      <Link to="/">
        <Button size="lg" className="px-8 shadow-lg shadow-primary/20 group">
          <Home size={18} className="mr-2 group-hover:-translate-y-0.5 transition-transform" />
          Kembali ke Beranda
        </Button>
      </Link>
    </div>
  );
}

