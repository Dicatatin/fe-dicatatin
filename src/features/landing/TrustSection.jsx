import { ShieldCheck, FileText, Lock } from 'lucide-react';
import './TrustSection.css';

export default function TrustSection() {
  return (
    <section className="landing-section trust-section">
      <div className="container">
        <div className="text-center">
          <span className="section-label">🔒 Trust & Technology</span>
          <h2 className="section-title">Dibangun dengan <span className="gradient-text">Teknologi Terbaik</span></h2>
        </div>
        <div className="trust-grid">
          <div className="trust-card">
            <ShieldCheck size={28} className="text-accent" />
            <h4>Powered by Advanced AI</h4>
            <p>OCR + GPT-4 Analysis untuk konteks bahasa Indonesia yang tidak baku.</p>
          </div>
          <div className="trust-card">
            <Lock size={28} style={{ color: 'var(--accent-teal)' }} />
            <h4>Data Aman & Terenkripsi</h4>
            <p>Catatan Anda disimpan di Object Storage terenkripsi. Privasi terjaga.</p>
          </div>
          <div className="trust-card">
            <FileText size={28} style={{ color: 'var(--accent-amber)' }} />
            <h4>PDF Vector Export</h4>
            <p>Hasil kerja bisa diprint tanpa pecah — kualitas vektor, bukan screenshot.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
