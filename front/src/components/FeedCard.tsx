import { IconHeart, IconMessage } from './Icons'

interface FeedCardProps {
  imageUrl: string
  authorImageUrl: string
  authorName: string
  text: string
  likeCount: number
  commentCount: number
  isLiked?: boolean
  onClick?: () => void
}

export const FeedCard = ({
  imageUrl,
  authorImageUrl,
  authorName,
  text,
  likeCount,
  commentCount,
  isLiked = false,
  onClick,
}: FeedCardProps) => {
  return (
    <button
      onClick={onClick}
      className="rounded-card overflow-hidden hover:scale-[1.02] transition-transform text-left bg-surface"
    >
      <img
        src={imageUrl}
        alt="피드"
        className="w-full aspect-square object-cover"
      />
      <div className="p-card">
        <div className="flex items-center gap-2 mb-1.5">
          <img
            src={authorImageUrl}
            alt={authorName}
            className="w-6 h-6 rounded-full object-cover"
          />
          <span className="text-label font-semibold text-ink">{authorName}</span>
        </div>
        <p className="text-label text-ink-secondary leading-snug line-clamp-2 mb-2">{text}</p>
        <div className="flex items-center gap-3 text-caption text-ink-placeholder">
          <span className={`flex items-center gap-1 ${isLiked ? 'text-[#ff5252]' : ''}`}>
            <IconHeart className={`w-3.5 h-3.5 ${isLiked ? 'fill-[#ff5252] stroke-[#ff5252]' : 'stroke-current'} stroke-2`} />
            {likeCount}
          </span>
          <span className="flex items-center gap-1">
            <IconMessage className="w-3.5 h-3.5 stroke-current stroke-2" />
            {commentCount}
          </span>
        </div>
      </div>
    </button>
  )
}
