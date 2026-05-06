import './Badge.css';

const METHOD_COLORS = {
  mind_map: { bg: 'rgba(139, 92, 246, 0.15)', color: '#A78BFA', label: 'Mind Map' },
  cornell: { bg: 'rgba(59, 130, 246, 0.15)', color: '#60A5FA', label: 'Cornell' },
  boxing: { bg: 'rgba(45, 212, 191, 0.15)', color: '#2DD4BF', label: 'Boxing' },
  charting: { bg: 'rgba(251, 191, 36, 0.15)', color: '#FBBF24', label: 'Charting' },
  zettelkasten: { bg: 'rgba(244, 114, 182, 0.15)', color: '#F472B6', label: 'Zettelkasten' },
  sketchnoting: { bg: 'rgba(52, 211, 153, 0.15)', color: '#34D399', label: 'Sketchnoting' },
  feynman: { bg: 'rgba(251, 146, 60, 0.15)', color: '#FB923C', label: 'Feynman' },
};

export default function Badge({ method, variant = 'method', children, className = '' }) {
  if (variant === 'method' && method) {
    const config = METHOD_COLORS[method] || { bg: 'var(--accent-subtle)', color: 'var(--accent-primary)', label: method };
    return (
      <span
        className={`badge ${className}`}
        style={{ background: config.bg, color: config.color }}
      >
        {config.label}
      </span>
    );
  }

  return (
    <span className={`badge badge-${variant} ${className}`}>
      {children}
    </span>
  );
}
