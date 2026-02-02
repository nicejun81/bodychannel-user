interface RecentChatProps {
  avatarUrl: string
  name: string
  message: string
  time: string
  unreadCount?: number
  onClick?: () => void
}

export const RecentChat = ({
  avatarUrl,
  name,
  message,
  time,
  unreadCount = 0,
  onClick,
}: RecentChatProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 py-3 px-4 bg-gray-100 rounded-xl mb-4 hover:bg-gray-200 transition-colors text-left"
    >
      <img
        src={avatarUrl}
        alt={name}
        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <span className="text-[13px] font-semibold text-[var(--black)]">{name}</span>
          <span className="text-[11px] text-gray-400">{time}</span>
        </div>
        <p className="text-xs text-gray-600 truncate">{message}</p>
      </div>
      {unreadCount > 0 && (
        <span className="w-5 h-5 bg-[var(--primary)] text-white text-[11px] font-semibold rounded-full flex items-center justify-center flex-shrink-0">
          {unreadCount}
        </span>
      )}
    </button>
  )
}
