import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Shield } from 'lucide-react';
import Button from '@/components/ui/Button';
import './HeroSection.css';

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="hero-section" id="hero">
      {/* Background effects */}
      <div className="hero-bg-glow" />
      <div className="hero-bg-grid" />

      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            {/* Badges */}
            <div className="hero-badges">
              <span className="section-label">
                <Sparkles size={14} /> Competition Ready
              </span>
              <span className="section-label" style={{ background: 'var(--accent-teal-subtle)', color: 'var(--accent-teal)' }}>
                <Shield size={14} /> Designed for Accessibility
              </span>
            </div>

            <h1 className="hero-title">
              Ubah Catatan Berantakan Menjadi{' '}
              <span className="gradient-text">Pengetahuan Terstruktur</span>{' '}
              dalam Hitungan Detik
            </h1>

            <p className="hero-subtitle">
              Platform AI yang memahami tulisan tangan bahasa Indonesia — bukan sekadar OCR biasa. 
              Pilih dari 6 metode belajar dan transformasi catatan Anda menjadi alat belajar aktif.
            </p>

            <div className="hero-cta-group">
              <Button size="xl" onClick={() => navigate('/signup')}>
                Mulai Gratis
                <ArrowRight size={20} />
              </Button>
              <Button variant="ghost" size="lg" onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}>
                Lihat Cara Kerja
              </Button>
            </div>

            {/* Stats */}
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-value">&lt;30s</span>
                <span className="hero-stat-label">Transformasi</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <span className="hero-stat-value">90%</span>
                <span className="hero-stat-label">Akurasi OCR</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <span className="hero-stat-value">6+</span>
                <span className="hero-stat-label">Metode Belajar</span>
              </div>
            </div>
          </div>

          {/* Visual preview */}
          <div className="hero-visual">
            <div className="hero-card hero-card-before animate-fade-in-left">
              <div className="hero-card-label">📝 Sebelum</div>
              <div className="hero-card-content hero-messy">
                <div className="messy-line" style={{ transform: 'rotate(-2deg)', width: '80%' }} />
                <div className="messy-line" style={{ transform: 'rotate(1deg)', width: '65%' }} />
                <div className="messy-line" style={{ transform: 'rotate(-1.5deg)', width: '90%' }} />
                <div className="messy-line" style={{ transform: 'rotate(0.5deg)', width: '70%' }} />
                <div className="messy-line" style={{ transform: 'rotate(-3deg)', width: '55%' }} />
                <div className="messy-line short" style={{ transform: 'rotate(2deg)', width: '40%' }} />
              </div>
            </div>

            <div className="hero-arrow animate-pulse">
              <Sparkles size={28} className="text-accent" />
            </div>

            <div className="hero-card hero-card-after animate-fade-in-right">
              <div className="hero-card-label">✨ Sesudah</div>
              <div className="hero-card-content hero-clean">
                {/* Mini mind map visualization */}
                <div className="mini-mindmap">
                  <div className="mm-center">Biologi Sel</div>
                  <div className="mm-branch mm-branch-1">Mitosis</div>
                  <div className="mm-branch mm-branch-2">Meiosis</div>
                  <div className="mm-branch mm-branch-3">Organel</div>
                  <div className="mm-branch mm-branch-4">Membran</div>
                  <svg className="mm-lines" viewBox="0 0 240 160">
                    <line x1="120" y1="80" x2="50" y2="25" stroke="var(--accent-primary)" strokeWidth="2" opacity="0.5" />
                    <line x1="120" y1="80" x2="190" y2="25" stroke="var(--accent-teal)" strokeWidth="2" opacity="0.5" />
                    <line x1="120" y1="80" x2="40" y2="135" stroke="var(--accent-purple)" strokeWidth="2" opacity="0.5" />
                    <line x1="120" y1="80" x2="200" y2="135" stroke="var(--accent-pink)" strokeWidth="2" opacity="0.5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
