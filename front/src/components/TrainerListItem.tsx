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
  bareton: 'bg-[#fce7f3] text-[#db2777]',
  hit35: 'bg-[#dbeafe] text-[#2563eb]',
  gymground: 'bg-[#dcfce7] text-[#16a34a]',
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
      className="w-full flex gap-4 py-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors text-left"
    >
      <div className="relative flex-shrink-0 w-16">
        <div className="w-16 h-16 rounded-lg overflow-hidden">
          <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        </div>
        <span
          className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 px-2 py-[3px] rounded-[10px] text-[10px] font-semibold whitespace-nowrap ${categoryStyles[categoryColor]}`}
        >
          {category}
        </span>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className="text-base font-bold text-[var(--black)] leading-tight">{name}</span>
          <div className="flex items-center gap-1">
            <IconStarFilled className="w-3.5 h-3.5 text-[#FFD700]" />
            <span className="text-sm font-semibold text-gray-500">
              {rating} ({reviewCount})
            </span>
          </div>
        </div>
        <span className="text-sm text-gray-400">{gym}</span>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="text-sm font-semibold text-[var(--primary)]">체험권</span>
          <span className="text-sm font-bold text-[var(--black)]">{trialInfo}</span>
        </div>
      </div>
    </button>
  )
}
