import './Card.css';

export default function Card({
  children,
  className = '',
  onClick,
  hoverable = true,
  padding = 'md',
  ...props
}) {
  return (
    <div
      className={`card ${hoverable ? 'card-hoverable' : ''} card-pad-${padding} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}
