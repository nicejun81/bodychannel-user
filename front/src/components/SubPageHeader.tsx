import type { ReactNode } from 'react'

interface SubPageHeaderProps {
  title: string
  onBack?: () => void
  right?: ReactNode
  children?: ReactNode
}

export const SubPageHeader = ({
  title,
  onBack = () => window.history.back(),
  right,
  children,
}: SubPageHeaderProps) => {
  return (
    <header className="sticky top-0 z-50 bg-surface border-b border-border">
      <div className="flex items-center justify-between px-page py-3.5">
        <button
          onClick={onBack}
          className="icon-btn"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-ink stroke-2 fill-none">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex-1 text-center text-heading">{title}</div>
        {right || <div className="w-10" />}
      </div>
      {children}
    </header>
  )
}
