import './Loader.css';

export function Spinner({ size = 24, color = 'var(--accent-primary)' }) {
  return (
    <svg
      className="spinner"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.25" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function PipelineLoader({ stage = 'scanning' }) {
  const stages = [
    { key: 'scanning', label: 'Scanning', icon: '📷' },
    { key: 'sanitizing', label: 'AI Processing', icon: '🤖' },
    { key: 'visualizing', label: 'Visualizing', icon: '✨' },
  ];

  const currentIndex = stages.findIndex((s) => s.key === stage);

  return (
    <div className="pipeline-loader">
      <div className="pipeline-stages">
        {stages.map((s, i) => (
          <div key={s.key} className={`pipeline-stage ${i <= currentIndex ? 'active' : ''} ${i === currentIndex ? 'current' : ''}`}>
            <div className="pipeline-dot">
              {i < currentIndex ? '✓' : s.icon}
            </div>
            <span className="pipeline-label">{s.label}</span>
            {i < stages.length - 1 && <div className={`pipeline-line ${i < currentIndex ? 'filled' : ''}`} />}
          </div>
        ))}
      </div>
      <p className="pipeline-message">
        {stage === 'scanning' && 'Membaca catatan tangan Anda...'}
        {stage === 'sanitizing' && 'Memperbaiki dan menyusun ulang teks...'}
        {stage === 'visualizing' && 'Membuat visualisasi catatan...'}
      </p>
    </div>
  );
}

export function SkeletonBlock({ width = '100%', height = '20px', radius = 'var(--radius-md)' }) {
  return (
    <div
      className="skeleton"
      style={{ width, height, borderRadius: radius }}
    />
  );
}

export function PageLoader() {
  return (
    <div className="page-loader">
      <Spinner size={40} />
      <p>Memuat...</p>
    </div>
  );
}
