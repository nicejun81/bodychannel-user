import { IconStarFilled } from './Icons'

interface TrainerListItemProps {
  imageUrl: string
  name: string
  category: string
  categoryColor: 'bareton' | 'hit35' | 'gymground'
  gym: string
  rating: number
  reviewCount: number
  trialInfo: string
  onClick?: () => void
}

const categoryStyles = {
  bareton: 'bg-category-bareton-bg text-category-bareton-text',
  hit35: 'bg-category-hit35-bg text-category-hit35-text',
  gymground: 'bg-category-gymground-bg text-category-gymground-text',
}

export const TrainerListItem = ({
  imageUrl,
  name,
  category,
  categoryColor,
  gym,
  rating,
  reviewCount,
  trialInfo,
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
        <span
          className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 badge whitespace-nowrap ${categoryStyles[categoryColor]}`}
        >
          {category}
        </span>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className="text-title text-ink leading-tight">{name}</span>
          <div className="flex items-center gap-1">
            <IconStarFilled className="w-3.5 h-3.5 text-[#FFD700]" />
            <span className="text-body font-semibold text-ink-tertiary">
              {rating} ({reviewCount})
            </span>
          </div>
        </div>
        <span className="text-body text-ink-placeholder">{gym}</span>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-body font-semibold text-primary">체험권</span>
          <span className="text-body font-bold text-ink">{trialInfo}</span>
        </div>
      </div>
    </button>
  )
}
