import { IconStarFilled } from './Icons'

interface PTTrainerCardProps {
  imageUrl: string
  name: string
  description: string
  todayTime: string
  rating: number
  reviewCount: number
  trialInfo: string
  onClick?: () => void
}

export const PTTrainerCard = ({
  imageUrl,
  name,
  description,
  todayTime,
  rating,
  reviewCount,
  trialInfo,
  onClick,
}: PTTrainerCardProps) => {
  return (
    <button
      onClick={onClick}
      className="flex-shrink-0 w-[160px] bg-surface border border-border rounded-card overflow-hidden
                 hover:border-ink hover:-translate-y-1 hover:shadow-card-hover transition-all text-left"
    >
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-[95px] object-cover"
      />
      <div className="p-card">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-title text-ink leading-tight">{name}</h3>
          <div className="flex items-center gap-0.5">
            <IconStarFilled className="w-3.5 h-3.5 text-semantic-star" />
            <span className="text-label text-ink-tertiary">{rating}</span>
          </div>
        </div>
        <p className="text-label text-ink-secondary mb-2 line-clamp-2">{description}</p>
        <div className="flex items-center gap-1 mb-2">
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-primary stroke-[1.5] fill-none flex-shrink-0">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
          <span className="text-label font-medium text-primary truncate">{todayTime}</span>
        </div>
        <div className="pt-1.5 border-t border-border-light">
          <span className="text-body font-bold text-ink">{trialInfo}</span>
        </div>
      </div>
    </button>
  )
}
