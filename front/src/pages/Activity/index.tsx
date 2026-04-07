import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageLayout, SubPageHeader, FilterTabs } from '../../components'
import { IconSearch, IconHeart, IconMessage, IconCalendar, IconMapPin } from '../../components/Icons'

/* ── Stories ── */
const stories = [
  { id: 0, name: '내 피드', imageUrl: '', isAdd: true },
  { id: 1, name: '김트레이너', imageUrl: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=100&h=100&fit=crop&crop=face' },
  { id: 2, name: '헬스왕', imageUrl: 'https://images.unsplash.com/photo-1597347316205-36f6c451902a?w=100&h=100&fit=crop&crop=face' },
  { id: 3, name: '운동하는직..', imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=face' },
  { id: 4, name: '바레톤요정', imageUrl: 'https://images.unsplash.com/photo-1549476464-37392f717541?w=100&h=100&fit=crop&crop=face' },
  { id: 5, name: '크로스핏러', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' },
  { id: 6, name: '러닝매니아', imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face' },
]

/* ── Feed Posts ── */
const feeds = [
  {
    id: 1,
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=800&fit=crop',
    authorImageUrl: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=100&h=100&fit=crop&crop=face',
    authorName: '김트레이너',
    location: '바디채널 강남점',
    text: '오늘도 열심히 운동 완료! 💪 꾸준히 하니까 확실히 달라지는 게 느껴져요. 여러분도 함께해요!',
    likeCount: 128,
    commentCount: 24,
    isLiked: true,
    timeAgo: '2시간 전',
    isMine: true,
  },
  {
    id: 2,
    imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=800&fit=crop',
    authorImageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=face',
    authorName: '헬스왕',
    location: '바디채널 서초점',
    text: '바레톤 수업 후기 🧘‍♀️ 정말 시원하네요. 코어가 단단해지는 느낌!',
    likeCount: 89,
    commentCount: 12,
    isLiked: false,
    timeAgo: '4시간 전',
  },
  {
    id: 3,
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=800&fit=crop',
    authorImageUrl: 'https://images.unsplash.com/photo-1597347316205-36f6c451902a?w=100&h=100&fit=crop&crop=face',
    authorName: '운동하는직장인',
    location: '바디채널 역삼점',
    text: '3개월 벌크업 결과! 드디어 목표 달성 🎉',
    likeCount: 256,
    commentCount: 48,
    isLiked: true,
    timeAgo: '6시간 전',
  },
  {
    id: 4,
    imageUrl: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&h=800&fit=crop',
    authorImageUrl: 'https://images.unsplash.com/photo-1549476464-37392f717541?w=100&h=100&fit=crop&crop=face',
    authorName: '바레톤요정',
    location: '바디채널 판교점',
    text: '오늘의 운동 루틴 공유해요 ✨ 상체 + 코어 조합 최고예요',
    likeCount: 67,
    commentCount: 8,
    isLiked: false,
    timeAgo: '8시간 전',
  },
]

/* ── Meetup Categories ── */
const meetupCategories = ['전체', '러닝', '헬스', '크로스핏', '바레톤', '등산', '자전거']


/* ── Meetup Data ── */
const meetups = [
  {
    id: 1,
    imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=400&fit=crop',
    badge: 'HOT' as const,
    category: '러닝',
    title: '한강 러닝 크루 🏃 매주 토요일 아침 달리기',
    description: '함께 뛰면 더 즐거워요! 초보부터 중급까지 누구나 환영하는 러닝 크루입니다.',
    schedule: '매주 토요일 07:00',
    location: '여의도 한강공원 물빛광장',
    host: { name: '김트레이너', imageUrl: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=50&h=50&fit=crop&crop=face' },
    memberCount: 15,
    maxMembers: 20,
    memberAvatars: [
      'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=50&h=50&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=50&h=50&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1597347316205-36f6c451902a?w=50&h=50&fit=crop&crop=face',
    ],
  },
  {
    id: 2,
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=400&fit=crop',
    badge: 'NEW' as const,
    category: '헬스',
    title: '강남 벌크업 챌린지 💪 30일 함께 도전',
    description: '30일간 함께하는 벌크업 프로그램. 식단 관리부터 운동 루틴까지 공유해요.',
    schedule: '매일 저녁 20:00',
    location: '바디채널 강남점',
    host: { name: '헬스왕', imageUrl: 'https://images.unsplash.com/photo-1597347316205-36f6c451902a?w=50&h=50&fit=crop&crop=face' },
    memberCount: 28,
    maxMembers: 40,
    memberAvatars: [
      'https://images.unsplash.com/photo-1549476464-37392f717541?w=50&h=50&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
    ],
  },
  {
    id: 3,
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=400&fit=crop',
    badge: '' as const,
    category: '바레톤',
    title: '모닝 바레톤 클럽 🧘 아침을 여는 습관',
    description: '아침 6시, 상쾌한 바레톤으로 하루를 시작하세요. 소수정예 클래스로 진행됩니다.',
    schedule: '매주 수/금 06:00',
    location: '바디채널 서초점',
    host: { name: '바레톤요정', imageUrl: 'https://images.unsplash.com/photo-1549476464-37392f717541?w=50&h=50&fit=crop&crop=face' },
    memberCount: 18,
    maxMembers: 20,
    memberAvatars: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=50&h=50&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1549476464-37392f717541?w=50&h=50&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=50&h=50&fit=crop&crop=face',
    ],
  },
  {
    id: 4,
    imageUrl: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&h=400&fit=crop',
    badge: 'HOT' as const,
    category: '크로스핏',
    title: '크로스핏 초보 모임 🔥 함께 시작해요',
    description: '크로스핏이 처음이라도 괜찮아요! 기초부터 차근차근 함께 성장하는 모임입니다.',
    schedule: '매주 화/목 19:00',
    location: '바디채널 역삼점',
    host: { name: '운동하는직장인', imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=50&h=50&fit=crop&crop=face' },
    memberCount: 32,
    maxMembers: 30,
    memberAvatars: [
      'https://images.unsplash.com/photo-1597347316205-36f6c451902a?w=50&h=50&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
    ],
  },
]

export const ActivityPage = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'feed' | 'meetup'>('feed')
  const [selectedCategory, setSelectedCategory] = useState('전체')
  const [menuFeedId, setMenuFeedId] = useState<number | null>(null)
  const [blockTarget, setBlockTarget] = useState<string | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null)

  const filteredMeetups = selectedCategory === '전체'
    ? meetups
    : meetups.filter(m => m.category === selectedCategory)

  const header = (
    <SubPageHeader
      title="피드"
      right={
        <button className="icon-btn">
          <IconSearch className="w-5 h-5 stroke-ink stroke-2 fill-none" />
        </button>
      }
    >
      <div className="flex">
        {(['feed', 'meetup'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-body font-semibold text-center border-b-2 transition-colors ${
              activeTab === tab
                ? 'text-ink border-ink'
                : 'text-ink-placeholder border-transparent hover:text-ink-secondary'
            }`}
          >
            {tab === 'feed' ? '피드' : '모임'}
          </button>
        ))}
      </div>
    </SubPageHeader>
  )

  return (
    <PageLayout header={header} noPadding>
      {activeTab === 'feed' ? (
        <>
          {/* Stories Row */}
          <div className="px-page py-4 border-b border-border-light">
            <div className="flex gap-4 overflow-x-auto hide-scrollbar">
              {stories.map((story) => (
                <button key={story.id} className="flex flex-col items-center gap-1.5 flex-shrink-0">
                  {story.isAdd ? (
                    <div className="w-[60px] h-[60px] rounded-full border-2 border-dashed border-ink-placeholder flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-ink-placeholder stroke-2 fill-none">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-[60px] h-[60px] rounded-full p-[2px] bg-gradient-to-br from-primary to-[#FF9F1C]">
                      <img
                        src={story.imageUrl}
                        alt={story.name}
                        className="w-full h-full rounded-full object-cover border-2 border-white"
                      />
                    </div>
                  )}
                  <span className="text-label text-ink-secondary w-[60px] text-center truncate">{story.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Feed Posts */}
          <div className="flex flex-col">
            {feeds.map((feed) => (
              <div key={feed.id} className="border-b border-border-light">
                {/* Author Row */}
                <div className="flex items-center justify-between px-page py-3">
                  <button
                    onClick={() => navigate('/mypage?tab=profile')}
                    className="flex items-center gap-3"
                  >
                    <img
                      src={feed.authorImageUrl}
                      alt={feed.authorName}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    <div className="text-left">
                      <div className="text-body font-semibold text-ink leading-tight">{feed.authorName}</div>
                      <div className="text-label text-ink-placeholder">{feed.location}</div>
                    </div>
                  </button>
                  <button className="p-2" onClick={() => setMenuFeedId(feed.id)}>
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-ink">
                      <circle cx="5" cy="12" r="1.5" />
                      <circle cx="12" cy="12" r="1.5" />
                      <circle cx="19" cy="12" r="1.5" />
                    </svg>
                  </button>
                </div>

                {/* Post Image */}
                <button
                  onClick={() => navigate(`/feed/${feed.id}`)}
                  className="w-full"
                >
                  <img
                    src={feed.imageUrl}
                    alt="피드"
                    className="w-full aspect-square object-cover"
                  />
                </button>

                {/* Actions + Text */}
                <div className="px-page py-3">
                  <div className="flex items-center gap-4 mb-2.5">
                    <button className="flex items-center gap-1.5">
                      <IconHeart className={`w-[22px] h-[22px] ${feed.isLiked ? 'fill-semantic-like stroke-semantic-like' : 'fill-none stroke-ink'} stroke-2`} />
                    </button>
                    <button className="flex items-center gap-1.5">
                      <IconMessage className="w-[22px] h-[22px] fill-none stroke-ink stroke-2" />
                    </button>
                  </div>
                  <div className="text-body font-semibold text-ink mb-1.5">좋아요 {feed.likeCount}개</div>
                  <div className="text-body text-ink leading-relaxed mb-1">
                    <span className="font-semibold">{feed.authorName}</span>{' '}
                    <span className="text-ink-secondary">{feed.text}</span>
                  </div>
                  <button className="text-label text-ink-placeholder mt-1">
                    댓글 {feed.commentCount}개 모두 보기
                  </button>
                  <div className="text-label text-ink-placeholder mt-1">{feed.timeAgo}</div>
                </div>
              </div>
            ))}
          </div>

          {/* FAB Button (피드 등록) */}
          <button onClick={() => navigate('/feed/new')} className="fixed bottom-24 right-5 w-14 h-14 bg-primary text-white rounded-full shadow-elevated flex items-center justify-center hover:bg-primary-dark transition-colors z-50">
            <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-white stroke-2 fill-none">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
        </>
      ) : (
        <>
          {/* Category Filter Pills */}
          <FilterTabs
            tabs={meetupCategories.map(cat => ({ key: cat, label: cat }))}
            active={selectedCategory}
            onSelect={setSelectedCategory}
            scrollable
            className="border-b border-border-light"
          />

          {/* Meetup Cards */}
          <div className="px-page py-5 flex flex-col gap-4">
            {filteredMeetups.map((meetup) => {
              const isFull = meetup.memberCount >= meetup.maxMembers
              const progress = Math.min((meetup.memberCount / meetup.maxMembers) * 100, 100)

              return (
                <button
                  key={meetup.id}
                  onClick={() => navigate(`/meetup/${meetup.id}`)}
                  className="text-left bg-surface rounded-card-lg shadow-card overflow-hidden hover:shadow-card-hover transition-shadow"
                >
                  {/* Image */}
                  <div className="relative">
                    <img
                      src={meetup.imageUrl}
                      alt={meetup.title}
                      className="w-full h-[160px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    {meetup.badge && (
                      <span className={`absolute top-3 left-3 text-caption font-bold text-white px-2 py-0.5 rounded-md ${
                        meetup.badge === 'HOT' ? 'bg-primary' : 'bg-semantic-online'
                      }`}>
                        {meetup.badge}
                      </span>
                    )}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                      <span className="text-caption text-white/90 bg-black/40 px-2 py-0.5 rounded-pill font-medium">
                        {meetup.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-card-lg">
                    {/* Title */}
                    <h3 className="text-title font-bold text-ink mb-1.5 leading-snug line-clamp-1">{meetup.title}</h3>
                    <p className="text-label text-ink-secondary leading-relaxed mb-3 line-clamp-2">{meetup.description}</p>

                    {/* Schedule & Location */}
                    <div className="flex flex-col gap-1.5 mb-3">
                      <div className="flex items-center gap-2 text-label text-ink-secondary">
                        <IconCalendar className="w-3.5 h-3.5 stroke-ink-tertiary stroke-[1.5] fill-none flex-shrink-0" />
                        {meetup.schedule}
                      </div>
                      <div className="flex items-center gap-2 text-label text-ink-secondary">
                        <IconMapPin className="w-3.5 h-3.5 stroke-ink-tertiary stroke-[1.5] fill-none flex-shrink-0" />
                        {meetup.location}
                      </div>
                    </div>

                    {/* Host */}
                    <div className="flex items-center gap-2 mb-3 pb-3 border-b border-border-light">
                      <img src={meetup.host.imageUrl} alt={meetup.host.name} className="w-5 h-5 rounded-full object-cover" />
                      <span className="text-label text-ink-secondary">{meetup.host.name}</span>
                      <span className="text-caption text-ink-placeholder">· 모임장</span>
                    </div>

                    {/* Members Progress */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-1.5">
                          {meetup.memberAvatars.map((avatar, j) => (
                            <img
                              key={j}
                              src={avatar}
                              alt=""
                              className="w-6 h-6 rounded-full object-cover border-[1.5px] border-white"
                            />
                          ))}
                        </div>
                        <span className="text-label text-ink-placeholder">
                          <span className="font-semibold text-primary">{meetup.memberCount}</span>/{meetup.maxMembers}명
                        </span>
                      </div>
                      <div className={`text-label font-semibold px-4 py-1.5 rounded-pill ${
                        isFull
                          ? 'bg-surface-muted text-ink-placeholder'
                          : 'bg-ink text-white'
                      }`}>
                        {isFull ? '마감' : '참여하기'}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-1.5 bg-surface-muted rounded-pill overflow-hidden">
                      <div
                        className={`h-full rounded-pill transition-all ${isFull ? 'bg-ink-placeholder' : 'bg-primary'}`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* FAB Button */}
          <button onClick={() => navigate('/meetup/new')} className="fixed bottom-24 right-5 w-14 h-14 bg-primary text-white rounded-full shadow-elevated flex items-center justify-center hover:bg-primary-dark transition-colors z-50">
            <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-white stroke-2 fill-none">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
        </>
      )}

      {/* More menu bottom sheet (shared across tabs) */}
      {menuFeedId !== null && (() => {
        const menuFeed = feeds.find(f => f.id === menuFeedId)
        const isMine = menuFeed?.isMine === true
        const iconCls = "w-5 h-5 stroke-ink stroke-2 fill-none"
        const items = isMine
          ? [
              {
                label: '수정하기',
                icon: (
                  <svg viewBox="0 0 24 24" className={iconCls}>
                    <path d="M12 20h9" strokeLinecap="round" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" strokeLinejoin="round" />
                  </svg>
                ),
                action: () => navigate(`/feed/${menuFeedId}/edit`),
              },
              {
                label: '삭제하기',
                icon: (
                  <svg viewBox="0 0 24 24" className={iconCls}>
                    <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6M5 6l1 14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-14" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
                action: () => setDeleteTarget(menuFeedId),
              },
            ]
          : [
              {
                label: '신고하기',
                icon: (
                  <svg viewBox="0 0 24 24" className={iconCls}>
                    <path d="M4 21V4M4 4h13l-2 5 2 5H4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
                action: () => navigate('/report?target=피드'),
              },
              {
                label: '차단하기',
                icon: (
                  <svg viewBox="0 0 24 24" className={iconCls}>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M5.6 5.6l12.8 12.8" strokeLinecap="round" />
                  </svg>
                ),
                action: () => setBlockTarget(menuFeed?.authorName || '사용자'),
              },
            ]
        return (
        <div className="fixed inset-0 z-[60] flex items-end" onClick={() => setMenuFeedId(null)}>
          <div className="absolute inset-0 bg-black/40" />
          <div
            className="relative w-full bg-surface rounded-t-2xl pb-6 pt-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 bg-ink-disabled rounded-full mx-auto mb-2" />
            {items.map((item) => (
              <button
                key={item.label}
                onClick={() => { item.action(); setMenuFeedId(null) }}
                className="w-full px-page py-4 flex items-center gap-3 text-body text-ink hover:bg-surface-subtle"
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
            <button
              onClick={() => setMenuFeedId(null)}
              className="w-full px-page py-4 text-center text-body text-ink-secondary border-t border-border-light"
            >
              취소
            </button>
          </div>
        </div>
        )
      })()}

      {/* Delete confirmation modal */}
      {deleteTarget !== null && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center px-page" onClick={() => setDeleteTarget(null)}>
          <div className="absolute inset-0 bg-black/50" />
          <div
            className="relative w-full max-w-sm bg-surface rounded-card-lg p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-heading font-bold text-ink mb-2">게시물을 삭제할까요?</h3>
            <p className="text-body text-ink-secondary leading-relaxed mb-5">
              삭제한 게시물은 복구할 수 없으며, 게시물에 달린 좋아요와 댓글도 함께 사라져요.
              정말 삭제하시겠어요?
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 py-3 bg-surface-muted text-ink font-semibold rounded-card hover:bg-surface-subtle transition-colors"
              >
                취소
              </button>
              <button
                onClick={() => {
                  alert('게시물이 삭제되었어요')
                  setDeleteTarget(null)
                }}
                className="flex-1 py-3 bg-primary text-white font-semibold rounded-card hover:bg-primary-dark transition-colors"
              >
                삭제하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Block confirmation modal */}
      {blockTarget !== null && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center px-page" onClick={() => setBlockTarget(null)}>
          <div className="absolute inset-0 bg-black/50" />
          <div
            className="relative w-full max-w-sm bg-surface rounded-card-lg p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-heading font-bold text-ink mb-2">{blockTarget}님을 차단할까요?</h3>
            <p className="text-body text-ink-secondary leading-relaxed mb-5">
              차단하면 이 사용자의 피드와 모임이 더 이상 보이지 않으며, 서로 메시지를 주고받을 수 없어요.
              차단은 마이페이지 &gt; 설정에서 언제든 해제할 수 있습니다.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setBlockTarget(null)}
                className="flex-1 py-3 bg-surface-muted text-ink font-semibold rounded-card hover:bg-surface-subtle transition-colors"
              >
                취소
              </button>
              <button
                onClick={() => {
                  const list: string[] = JSON.parse(localStorage.getItem('blockedUsers') || '[]')
                  if (!list.includes(blockTarget)) list.push(blockTarget)
                  localStorage.setItem('blockedUsers', JSON.stringify(list))
                  alert(`${blockTarget}님을 차단했어요`)
                  setBlockTarget(null)
                }}
                className="flex-1 py-3 bg-primary text-white font-semibold rounded-card hover:bg-primary-dark transition-colors"
              >
                차단하기
              </button>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  )
}
