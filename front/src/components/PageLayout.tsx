import type { ReactNode } from 'react'
import { BottomNav } from './BottomNav'

interface PageLayoutProps {
  children: ReactNode
  header?: ReactNode
  hideBottomNav?: boolean
  className?: string
}

export const PageLayout = ({
  children,
  header,
  hideBottomNav = false,
  className = '',
}: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-surface">
      {header}
      <main className={`px-page py-4 pb-28 ${className}`}>
        {children}
      </main>
      {!hideBottomNav && <BottomNav />}
    </div>
  )
}
