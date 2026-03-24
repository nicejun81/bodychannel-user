interface BadgeProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'muted'
  size?: 'sm' | 'md'
}

const variantStyles = {
  primary: 'bg-primary text-white',
  secondary: 'bg-primary-50 text-primary',
  success: 'bg-green-100 text-green-600',
  danger: 'bg-red-500 text-white',
  warning: 'bg-yellow-100 text-yellow-700',
  muted: 'bg-surface-muted text-ink-secondary',
}

const sizeStyles = {
  sm: 'px-1.5 py-0.5 text-caption',
  md: 'px-2 py-0.5 text-label',
}

export const Badge = ({ children, variant = 'primary', size = 'sm' }: BadgeProps) => {
  return (
    <span className={`inline-flex items-center font-bold rounded ${variantStyles[variant]} ${sizeStyles[size]}`}>
      {children}
    </span>
  )
}
