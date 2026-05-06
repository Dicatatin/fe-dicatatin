import './AccessibilitySpotlight.css';

export default function AccessibilitySpotlight() {
  return (
    <section className="landing-section a11y-section">
      <div className="container">
        <div className="a11y-grid">
          <div className="a11y-text">
            <span className="section-label" style={{ background: 'var(--accent-teal-subtle)', color: 'var(--accent-teal)' }}>
              ♿ Aksesibilitas
            </span>
            <h2 className="section-title">Dyslexia-Friendly <span className="gradient-text">Mode</span></h2>
            <p className="section-subtitle">
              Platform ini dirancang inklusif. Pelajar dengan disleksia mendapat akses ke font 
              OpenDyslexic, spacing yang lebih lega, dan visual yang membantu pemrosesan informasi.
            </p>
            <div className="a11y-badge">
              🎓 SDG 4: Quality Education — Inclusive & Equitable Learning
            </div>
          </div>
          <div className="a11y-compare">
            <div className="a11y-card">
              <span className="a11y-card-label">Font Standar</span>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', lineHeight: 1.6 }}>
                Mahasiswa sering mencatat dengan cepat dan berantakan. OCR standar gagal menangkap konteks bahasa Indonesia.
              </p>
            </div>
            <div className="a11y-card a11y-card-dyslexia">
              <span className="a11y-card-label" style={{ color: 'var(--accent-teal)' }}>OpenDyslexic</span>
              <p style={{ fontFamily: "'Comic Sans MS', cursive", fontSize: '15px', lineHeight: 2, letterSpacing: '0.05em', wordSpacing: '0.1em' }}>
                Mahasiswa sering mencatat dengan cepat dan berantakan. OCR standar gagal menangkap konteks bahasa Indonesia.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
