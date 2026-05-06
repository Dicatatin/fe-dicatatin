import './Button.css';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconOnly = false,
  fullWidth = false,
  loading = false,
  disabled = false,
  type = 'button',
  className = '',
  onClick,
  ...props
}) {
  const classes = [
    'btn',
    `btn-${variant}`,
    size !== 'md' ? `btn-${size}` : '',
    iconOnly ? 'btn-icon' : '',
    fullWidth ? 'btn-full' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <span className="btn-spinner" />
      ) : icon ? (
        icon
      ) : null}
      {!iconOnly && children}
    </button>
  );
}
