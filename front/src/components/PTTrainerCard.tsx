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
  rating,
  reviewCount,
  trialInfo,
  onClick,
}: PTTrainerCardProps) => {
  return (
    <button
      onClick={onClick}
      className="flex-shrink-0 w-[160px] border border-border rounded-card overflow-hidden
                 hover:border-ink-disabled transition-colors text-left"
    >
      <img src={imageUrl} alt={name} className="w-full h-[120px] object-cover" />
      <div className="p-card">
        <p className="text-body font-bold text-ink mb-0.5 truncate">{name}</p>
        <p className="text-caption text-ink-tertiary mb-2 truncate">{description}</p>
        <div className="flex items-center gap-1 mb-2">
          <IconStarFilled className="w-3 h-3 text-semantic-star" />
          <span className="text-label font-semibold">{rating}</span>
          <span className="text-label text-ink-tertiary">({reviewCount})</span>
        </div>
        <span className="text-body font-bold text-primary">{trialInfo}</span>
      </div>
    </button>
  )
}
