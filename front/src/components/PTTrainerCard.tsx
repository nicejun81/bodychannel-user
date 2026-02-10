import { IconStarFilled } from './Icons'

interface PTTrainerCardProps {
  imageUrl: string
  name: string
  gym: string
  rating: number
  reviewCount: number
  trialInfo: string
  onClick?: () => void
}

export const PTTrainerCard = ({
  imageUrl,
  name,
  gym,
  rating,
  reviewCount,
  trialInfo,
  onClick,
}: PTTrainerCardProps) => {
  return (
    <button
      onClick={onClick}
      className="flex-shrink-0 w-[140px] bg-surface border border-border rounded-card overflow-hidden
                 hover:border-ink hover:-translate-y-1 hover:shadow-card-hover transition-all text-left"
    >
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-[85px] object-cover"
      />
      <div className="p-card">
        <span className="badge bg-ink text-white mb-1.5">PT</span>
        <h3 className="text-body font-bold text-ink mb-0.5 leading-tight">{name}</h3>
        <p className="text-label text-ink-secondary mb-1.5">{gym}</p>
        <div className="flex items-center gap-1 text-caption text-ink-secondary mb-1.5">
          <IconStarFilled className="w-3 h-3 text-[#fbbf24]" />
          <span>{rating} ({reviewCount})</span>
        </div>
        <div className="flex flex-col items-start gap-1 pt-1.5 border-t border-border-light">
          <span className="text-body font-semibold text-primary">체험권</span>
          <span className="text-body font-bold text-ink">{trialInfo}</span>
        </div>
      </div>
    </button>
  )
}
