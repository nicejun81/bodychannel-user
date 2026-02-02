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
      className="flex-shrink-0 w-[140px] bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-[var(--black)] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] transition-all text-left"
    >
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-[85px] object-cover"
      />
      <div className="p-2.5">
        <span className="inline-block px-2 py-0.5 bg-[var(--black)] text-white text-[10px] font-semibold rounded mb-1.5">
          PT
        </span>
        <h3 className="text-sm font-bold text-[var(--black)] mb-0.5 leading-tight">{name}</h3>
        <p className="text-xs text-gray-600 mb-1.5">{gym}</p>
        <div className="flex items-center gap-[3px] text-[11px] text-gray-600 mb-1.5">
          <IconStarFilled className="w-3 h-3 text-[#fbbf24]" />
          <span>
            {rating} ({reviewCount})
          </span>
        </div>
        <div className="flex flex-col items-start gap-1 pt-1.5 border-t border-gray-100">
          <span className="text-sm font-semibold text-[var(--primary)]">체험권</span>
          <span className="text-sm font-bold text-[var(--black)]">{trialInfo}</span>
        </div>
      </div>
    </button>
  )
}
