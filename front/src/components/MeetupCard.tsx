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
      className="flex-shrink-0 w-[200px] bg-surface border border-border rounded-card-lg overflow-hidden
                 hover:border-ink hover:-translate-y-1 hover:shadow-card-hover transition-all text-left"
    >
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-[100px] object-cover"
      />
      <div className="p-card">
        <span className="badge bg-primary text-white mb-2">{category}</span>
        <h3 className="text-body font-bold text-ink mb-1 leading-tight">{title}</h3>
        <p className="text-label text-ink-secondary mb-2">{schedule}</p>
        <div className="flex items-center gap-1.5 text-label text-ink-placeholder">
          <IconUsers className="w-3.5 h-3.5 stroke-current stroke-2" />
          <span>멤버 {memberCount}명</span>
        </div>
      </div>
    </button>
  )
}
