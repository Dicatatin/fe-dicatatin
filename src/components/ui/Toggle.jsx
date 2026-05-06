import './Toggle.css';

export default function Toggle({ checked, onChange, label, id, size = 'md' }) {
  const toggleId = id || `toggle-${label?.toLowerCase().replace(/\s/g, '-')}`;

  return (
    <label className={`toggle-wrapper toggle-${size}`} htmlFor={toggleId}>
      <input
        type="checkbox"
        id={toggleId}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="toggle-input"
      />
      <span className="toggle-track">
        <span className="toggle-thumb" />
      </span>
      {label && <span className="toggle-label">{label}</span>}
    </label>
  );
}
