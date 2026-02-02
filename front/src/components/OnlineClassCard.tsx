interface OnlineClassCardProps {
  imageUrl: string
  title: string
  lessonCount: number
  level: string
  onClick?: () => void
}

export const OnlineClassCard = ({
  imageUrl,
  title,
  lessonCount,
  level,
  onClick,
}: OnlineClassCardProps) => {
  return (
    <button
      onClick={onClick}
      className="flex-shrink-0 min-w-[140px] text-left hover:-translate-y-1 active:scale-[0.98] transition-all"
    >
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-[100px] rounded-xl object-cover mb-2.5 bg-gray-100"
      />
      <h3 className="text-[13px] font-semibold text-[var(--black)] mb-1 whitespace-nowrap overflow-hidden text-ellipsis">{title}</h3>
      <p className="text-[11px] text-gray-400">
        {lessonCount}강 · {level}
      </p>
    </button>
  )
}
