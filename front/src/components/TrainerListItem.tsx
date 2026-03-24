import type { ReactNode } from 'react'
import { IconStarFilled } from './Icons'

interface TrainerListItemProps {
  imageUrl: string
  name: string
  category: string
  categoryColor: 'bareton' | 'hit35' | 'gymground' | 'pt'
  description: string
  todayTime: string
  rating: number
  reviewCount: number
  trialInfo?: string
  rightAction?: ReactNode
  onClick?: () => void
}

const categoryStyles: Record<string, string> = {
  bareton: 'bg-category-bareton-bg text-category-bareton-text',
  hit35: 'bg-category-hit35-bg text-category-hit35-text',
  gymground: 'bg-category-gymground-bg text-category-gymground-text',
  pt: 'bg-primary-50 text-primary',
}

export const TrainerListItem = ({
  imageUrl,
  name,
  category,
  categoryColor,
  description,
  todayTime,
  rating,
  reviewCount,
  trialInfo,
  rightAction,
  onClick,
}: TrainerListItemProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex gap-4 py-4 border-b border-border-light last:border-b-0 hover:bg-surface-subtle transition-colors text-left"
    >
      <div className="relative flex-shrink-0 w-16">
        <div className="w-16 h-16 rounded-card overflow-hidden">
          <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        </div>
        <span className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 badge whitespace-nowrap ${categoryStyles[categoryColor] || categoryStyles.pt}`}>
          {category}
        </span>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className="text-title text-ink leading-tight">{name}</span>
          {rightAction || (
            <div className="flex items-center gap-1">
              <IconStarFilled className="w-3.5 h-3.5 text-semantic-star" />
              <span className="text-body font-semibold text-ink-tertiary">
                {rating} ({reviewCount})
              </span>
            </div>
          )}
        </div>
        <p className="text-label text-ink-secondary truncate">{description}</p>
        <div className="flex items-center justify-between mt-0.5">
          <div className="flex items-center gap-1">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-primary stroke-[1.5] fill-none">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            <span className="text-label font-medium text-primary">{todayTime}</span>
          </div>
          {trialInfo && <span className="text-body font-bold text-ink">{trialInfo}</span>}
        </div>
      </div>
    </button>
  )
}
