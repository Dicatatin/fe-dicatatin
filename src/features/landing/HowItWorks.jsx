import { Camera, Cpu, MousePointer, Zap } from 'lucide-react';
import './HowItWorks.css';

const steps = [
  { icon: <Camera size={28} />, num: '01', title: 'Scan', desc: 'Upload foto catatan tangan Anda (JPG/PNG). Tulis sebebas mungkin.', color: 'var(--accent-primary)' },
  { icon: <Cpu size={28} />, num: '02', title: 'AI Transform', desc: 'AI membersihkan teks, memperbaiki singkatan, dan mengidentifikasi konsep kunci.', color: 'var(--accent-teal)' },
  { icon: <MousePointer size={28} />, num: '03', title: 'Interact', desc: 'Edit dan atur catatan di kanvas React Flow yang interaktif.', color: 'var(--accent-purple)' },
  { icon: <Zap size={28} />, num: '04', title: 'Recall', desc: 'Belajar aktif dengan Flashcards otomatis dari materi catatan Anda.', color: 'var(--accent-amber)' },
];

export default function HowItWorks() {
  return (
    <section className="landing-section" id="how-it-works">
      <div className="container">
        <div className="text-center">
          <span className="section-label">⚡ Cara Kerja</span>
          <h2 className="section-title">4 Langkah Menuju <span className="gradient-text">Catatan Cerdas</span></h2>
        </div>
        <div className="hiw-steps">
          {steps.map((s, i) => (
            <div key={i} className={`hiw-step animate-fade-in-up stagger-${i + 1}`}>
              <div className="hiw-num" style={{ color: s.color }}>{s.num}</div>
              <div className="hiw-icon" style={{ color: s.color, background: `${s.color}15` }}>{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              {i < steps.length - 1 && <div className="hiw-connector" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
