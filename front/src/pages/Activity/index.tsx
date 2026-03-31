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
    badge: 'HOT',
    category: '러닝',
    title: '한강 러닝 크루 🏃 매주 토요일 아침 달리기',
    schedule: '매주 토요일 07:00',
    location: '여의도 한강공원 물빛광장',
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
    badge: 'NEW',
    category: '헬스',
    title: '강남 벌크업 챌린지 💪 30일 함께 도전',
    schedule: '매일 저녁 20:00',
    location: '바디채널 강남점',
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
    badge: '',
    category: '바레톤',
    title: '모닝 바레톤 클럽 🧘 아침을 여는 습관',
    schedule: '매주 수/금 06:00',
    location: '바디채널 서초점',
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
    badge: 'HOT',
    category: '크로스핏',
    title: '크로스핏 초보 모임 🔥 함께 시작해요',
    schedule: '매주 화/목 19:00',
    location: '바디채널 역삼점',
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
    <PageLayout header={header}>
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
                    onClick={() => navigate(`/feed/${feed.id}`)}
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
                  <button className="p-2">
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
          <div className="px-page py-5 flex flex-col gap-6">
            {filteredMeetups.map((meetup) => (
              <button
                key={meetup.id}
                onClick={() => navigate(`/meetup/${meetup.id}`)}
                className="text-left"
              >
                {/* Image */}
                <div className="relative mb-3">
                  <img
                    src={meetup.imageUrl}
                    alt={meetup.title}
                    className="w-full h-[200px] object-cover rounded-[16px]"
                  />
                  {meetup.badge && (
                    <span className={`absolute top-3 left-3 text-label font-bold text-white px-2.5 py-1 rounded-md ${
                      meetup.badge === 'HOT' ? 'bg-primary' : 'bg-semantic-online'
                    }`}>
                      {meetup.badge}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="px-1">
                  <span className="inline-block text-label text-ink-secondary bg-surface-muted px-2.5 py-1 rounded-md font-medium mb-2">
                    {meetup.category}
                  </span>
                  <h3 className="text-title font-bold text-ink mb-3 leading-snug">{meetup.title}</h3>

                  <div className="flex flex-col gap-2 mb-4">
                    <div className="flex items-center gap-2 text-body text-ink-secondary">
                      <IconCalendar className="w-4 h-4 stroke-ink-tertiary stroke-[1.5] fill-none" />
                      {meetup.schedule}
                    </div>
                    <div className="flex items-center gap-2 text-body text-ink-secondary">
                      <IconMapPin className="w-4 h-4 stroke-ink-tertiary stroke-[1.5] fill-none" />
                      {meetup.location}
                    </div>
                  </div>

                  {/* Members + Join */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="flex -space-x-2">
                        {meetup.memberAvatars.map((avatar, j) => (
                          <img
                            key={j}
                            src={avatar}
                            alt=""
                            className="w-7 h-7 rounded-full object-cover border-2 border-white"
                          />
                        ))}
                        <div className="w-7 h-7 rounded-full bg-primary text-white text-caption font-bold flex items-center justify-center border-2 border-white">
                          +{meetup.memberCount - 3}
                        </div>
                      </div>
                      <span className="text-body text-ink-placeholder">
                        <span className="font-semibold text-primary">{meetup.memberCount}</span>/{meetup.maxMembers}명
                      </span>
                    </div>
                    <div className="bg-ink text-white text-body font-semibold px-5 py-2.5 rounded-[10px] hover:bg-primary transition-colors">
                      참여하기
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* FAB Button */}
          <button className="fixed bottom-24 right-5 w-14 h-14 bg-primary text-white rounded-full shadow-elevated flex items-center justify-center hover:bg-primary-dark transition-colors z-50">
            <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-white stroke-2 fill-none">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
        </>
      )}
    </PageLayout>
  )
}
