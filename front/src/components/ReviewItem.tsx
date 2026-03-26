import { IconStarFilled } from './Icons'

interface ReviewItemProps {
  avatar: string
  name: string
  rating: number
  date: string
  text: string
  badge?: string
  photos?: string[]
}

export const ReviewItem = ({ avatar, name, rating, date, text, badge, photos }: ReviewItemProps) => {
  return (
    <div className="pb-4 border-b border-border-light last:border-0 last:pb-0">
      <div className="flex items-center gap-2.5 mb-2">
        <img src={avatar} alt={name} className="w-8 h-8 rounded-full object-cover" />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-body font-semibold text-ink">{name}</span>
            {badge && <span className="px-1.5 py-0.5 bg-surface-muted text-label text-ink-secondary rounded">{badge}</span>}
            <span className="text-label text-ink-tertiary ml-auto">{date}</span>
          </div>
          <div className="flex gap-0.5 mt-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <IconStarFilled key={s} className={`w-2.5 h-2.5 ${s <= rating ? 'text-semantic-star' : 'text-ink-disabled'}`} />
            ))}
          </div>
        </div>
      </div>
      <p className="text-body text-ink-secondary leading-relaxed">{text}</p>
      {photos && photos.length > 0 && (
        <div className="flex gap-1.5 mt-2">
          {photos.map((photo, i) => (
            <img key={i} src={photo} alt="리뷰 사진" className="w-[72px] h-[72px] rounded-lg object-cover" />
          ))}
        </div>
      )}
    </div>
  )
}
