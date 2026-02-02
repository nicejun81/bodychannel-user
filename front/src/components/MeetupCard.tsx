import { IconUsers } from './Icons'

interface MeetupCardProps {
  imageUrl: string
  category: string
  title: string
  schedule: string
  memberCount: number
  onClick?: () => void
}

export const MeetupCard = ({
  imageUrl,
  category,
  title,
  schedule,
  memberCount,
  onClick,
}: MeetupCardProps) => {
  return (
    <button
      onClick={onClick}
      className="flex-shrink-0 w-[200px] bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-[var(--black)] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] transition-all text-left"
    >
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-[100px] object-cover"
      />
      <div className="p-3">
        <span className="inline-block px-2 py-0.5 bg-[var(--primary)] text-white text-[10px] font-semibold rounded mb-2">
          {category}
        </span>
        <h3 className="text-sm font-bold text-[var(--black)] mb-1.5 leading-tight">{title}</h3>
        <p className="text-xs text-gray-600 mb-2">{schedule}</p>
        <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
          <IconUsers className="w-3.5 h-3.5 stroke-gray-400 stroke-2" />
          <span>멤버 {memberCount}명</span>
        </div>
      </div>
    </button>
  )
}
