import { FileX, BookOpen, Eye } from 'lucide-react';
import './ProblemSolution.css';

const problems = [
  {
    icon: <FileX size={32} />,
    title: 'Catatan Mati',
    desc: 'Catatan yang ditulis cepat dan berantakan — sulit dibaca ulang, akhirnya tidak pernah dipelajari kembali.',
    color: 'var(--error)',
  },
  {
    icon: <BookOpen size={32} />,
    title: 'Belajar Pasif',
    desc: 'Membaca ulang catatan berulang kali tanpa menguji ingatan. Metode ini terbukti tidak efektif.',
    color: 'var(--warning)',
  },
  {
    icon: <Eye size={32} />,
    title: 'Hambatan Belajar',
    desc: 'Pelajar dengan disleksia membutuhkan tipografi dan visual khusus yang jarang tersedia di tools belajar.',
    color: 'var(--accent-purple)',
  },
];

export default function ProblemSolution() {
  return (
    <section className="landing-section problem-section" id="features">
      <div className="container">
        <div className="text-center">
          <span className="section-label">💡 Masalah yang Kami Selesaikan</span>
          <h2 className="section-title">
            Kenapa Catatan Anda <span className="gradient-text">Tidak Bekerja?</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto var(--space-12)' }}>
            3 masalah utama yang dihadapi mahasiswa Indonesia dalam belajar
          </p>
        </div>

        <div className="problem-grid">
          {problems.map((p, i) => (
            <div key={i} className={`problem-card animate-fade-in-up stagger-${i + 1}`}>
              <div className="problem-icon" style={{ color: p.color, background: `${p.color}15` }}>
                {p.icon}
              </div>
              <h3 className="problem-title">{p.title}</h3>
              <p className="problem-desc">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="solution-bridge animate-fade-in-up">
          <div className="solution-arrow">↓</div>
          <div className="solution-box">
            <h3>Solusi: AI yang Memahami Konteks</h3>
            <p>
              DICATAT.IN tidak sekadar menyalin teks — AI kami memahami singkatan bahasa Indonesia 
              (<code>mhs</code> → mahasiswa, <code>tdk</code> → tidak), memperbaiki struktur kalimat, 
              dan mengorganisir materi ke dalam metode belajar yang terbukti efektif.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
