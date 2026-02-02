import { Link } from 'react-router-dom'
import { IconChevronRight } from './Icons'

interface SectionHeaderProps {
  title: string
  href?: string
  showMore?: boolean
}

export const SectionHeader = ({ title, href, showMore = true }: SectionHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-3">
      <h2 className="font-['Poppins'] text-lg font-bold text-[var(--black)]">{title}</h2>
      {showMore && href && (
        <Link
          to={href}
          className="flex items-center gap-1 text-[13px] text-gray-400 hover:text-[var(--primary)] transition-colors"
        >
          전체보기
          <IconChevronRight className="w-4 h-4 stroke-current stroke-[1.5]" />
        </Link>
      )}
    </div>
  )
}
