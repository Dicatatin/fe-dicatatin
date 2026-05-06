import { AlertCircle } from 'lucide-react';
import './Input.css';

export default function Input({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  iconLeft,
  iconRight,
  disabled = false,
  required = false,
  className = '',
  id,
  ...props
}) {
  const inputId = id || `input-${label?.toLowerCase().replace(/\s/g, '-')}`;

  return (
    <div className={`input-group ${error ? 'has-error' : ''} ${className}`}>
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
          {required && <span style={{ color: 'var(--error)', marginLeft: '2px' }}>*</span>}
        </label>
      )}
      <div className="input-wrapper">
        {iconLeft && <span className="input-icon-left">{iconLeft}</span>}
        <input
          id={inputId}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={`input-field ${iconRight ? 'has-icon-right' : ''}`}
          {...props}
        />
        {iconRight && <span className="input-icon-right">{iconRight}</span>}
      </div>
      {error && (
        <span className="input-error">
          <AlertCircle size={12} />
          {error}
        </span>
      )}
    </div>
  );
}
