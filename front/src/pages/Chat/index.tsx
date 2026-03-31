import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageLayout, SubPageHeader, FilterTabs } from '../../components'
import { IconSearch } from '../../components/Icons'

const chatRooms = [
  {
    id: 1,
    type: 'trainer' as const,
    name: '김민수 트레이너',
    avatarUrl: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=100&h=100&fit=crop&crop=face',
    lastMessage: '내일 PT 수업 시간 변경 가능할까요?',
    time: '오후 2:30',
    unreadCount: 1,
    isOnline: true,
    gym: '바디채널 강남점',
  },
  {
    id: 2,
    type: 'trainer' as const,
    name: '정서연 트레이너',
    avatarUrl: 'https://images.unsplash.com/photo-1549476464-37392f717541?w=100&h=100&fit=crop&crop=face',
    lastMessage: '오늘 운동 루틴 보내드릴게요 💪',
    time: '오전 11:20',
    unreadCount: 0,
    isOnline: true,
    gym: '바디채널 서초점',
  },
  {
    id: 3,
    type: 'friend' as const,
    name: '이준혁',
    avatarUrl: 'https://images.unsplash.com/photo-1597347316205-36f6c451902a?w=100&h=100&fit=crop&crop=face',
    lastMessage: '내일 같이 운동하자!',
    time: '오전 9:45',
    unreadCount: 3,
    isOnline: false,
  },
  {
    id: 4,
    type: 'trainer' as const,
    name: '한동훈 트레이너',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    lastMessage: '식단 체크 완료했습니다. 잘 하고 계세요!',
    time: '어제',
    unreadCount: 0,
    isOnline: false,
    gym: '바디채널 역삼점',
  },
  {
    id: 5,
    type: 'friend' as const,
    name: '박지영',
    avatarUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=face',
    lastMessage: '바레톤 수업 같이 들을래?',
    time: '어제',
    unreadCount: 0,
    isOnline: true,
  },
  {
    id: 6,
    type: 'friend' as const,
    name: '윤미래',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    lastMessage: '다이어트 챌린지 같이 하자 🔥',
    time: '월요일',
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: 7,
    type: 'group' as const,
    name: '강남 러닝크루',
    avatarUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=100&h=100&fit=crop&crop=face',
    lastMessage: '이번 토요일 한강 코스로 달릴게요!',
    time: '월요일',
    unreadCount: 12,
    isOnline: false,
  },
]

export const ChatPage = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'all' | 'trainer' | 'friend'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)

  const filtered = chatRooms
    .filter(room => {
      if (activeTab === 'trainer') return room.type === 'trainer'
      if (activeTab === 'friend') return room.type === 'friend' || room.type === 'group'
      return true
    })
    .filter(room =>
      searchQuery ? room.name.includes(searchQuery) || room.lastMessage.includes(searchQuery) : true
    )

  const header = (
    <SubPageHeader
      title="채팅"
      right={
        <button className="icon-btn" onClick={() => setShowSearch(!showSearch)}>
          <IconSearch className="w-[22px] h-[22px] stroke-ink stroke-2" />
        </button>
      }
    >
      {/* Search Bar */}
      {showSearch && (
        <div className="px-page py-2 border-b border-border-light">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="이름 또는 메시지 검색"
            className="w-full px-4 py-3 border border-border rounded-[12px] text-body outline-none focus:border-ink transition-colors"
            autoFocus
          />
        </div>
      )}

      {/* Filter Tabs */}
      <FilterTabs
        tabs={[
          { key: 'all', label: '전체' },
          { key: 'trainer', label: '트레이너' },
          { key: 'friend', label: '친구' },
        ]}
        active={activeTab}
        onSelect={(key) => setActiveTab(key as 'all' | 'trainer' | 'friend')}
      />
    </SubPageHeader>
  )

  return (
    <PageLayout header={header}>
      <div className="flex flex-col">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-ink-placeholder">
            <svg viewBox="0 0 24 24" className="w-12 h-12 stroke-current stroke-[1.5] fill-none mb-4">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <p className="text-body">채팅 내역이 없습니다</p>
          </div>
        ) : (
          filtered.map((room) => (
            <button
              key={room.id}
              onClick={() => navigate(`/chat/${room.id}`)}
              className="flex items-center gap-3 px-page py-3 border-b border-border-light text-left hover:bg-surface-subtle transition-colors"
            >
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <img
                  src={room.avatarUrl}
                  alt={room.name}
                  className="w-[52px] h-[52px] rounded-full object-cover"
                />
                {room.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-semantic-online border-2 border-white rounded-full" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-title font-semibold text-ink">{room.name}</span>
                    {room.type === 'trainer' && (
                      <span className="text-label font-semibold text-primary bg-primary-50 px-1.5 py-0.5 rounded">트레이너</span>
                    )}
                    {room.type === 'group' && (
                      <span className="text-label font-semibold text-ink-secondary bg-surface-muted px-1.5 py-0.5 rounded">모임</span>
                    )}
                  </div>
                  <span className="text-label text-ink-placeholder flex-shrink-0">{room.time}</span>
                </div>
                {'gym' in room && room.gym && (
                  <p className="text-label text-ink-placeholder mb-0.5">{room.gym}</p>
                )}
                <p className="text-body text-ink-secondary truncate">{room.lastMessage}</p>
              </div>

              {/* Unread Badge */}
              {room.unreadCount > 0 && (
                <span className="flex-shrink-0 min-w-[22px] h-[22px] bg-primary text-white text-label font-bold rounded-full flex items-center justify-center px-1.5">
                  {room.unreadCount}
                </span>
              )}
            </button>
          ))
        )}
      </div>
    </PageLayout>
  )
}
