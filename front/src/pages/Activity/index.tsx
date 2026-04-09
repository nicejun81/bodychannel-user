import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageLayout, SubPageHeader, FilterTabs } from '../../components'
import { IconSearch, IconHeart, IconMessage, IconCalendar, IconMapPin, IconShare } from '../../components/Icons'

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
    imageUrls: [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=800&fit=crop',
    ],
    authorImageUrl: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=100&h=100&fit=crop&crop=face',
    authorName: '김트레이너',
    location: '바디채널 강남점',
    text: '오늘도 열심히 운동 완료! 💪 꾸준히 하니까 확실히 달라지는 게 느껴져요. 여러분도 함께해요!',
    likeCount: 128,
    commentCount: 24,
    isLiked: true,
    timeAgo: '2시간 전',
    isMine: true,
    workout: {
      title: '가슴 · 삼두',
      duration: '1시간 20분',
      totalVolume: 8420, // kg
      totalSets: 18,
      exercises: [
        { name: '벤치프레스', sets: [{ weight: 60, reps: 12 }, { weight: 80, reps: 10 }, { weight: 80, reps: 10 }, { weight: 80, reps: 8 }] },
        { name: '인클라인 덤벨프레스', sets: [{ weight: 22, reps: 12 }, { weight: 22, reps: 12 }, { weight: 24, reps: 10 }, { weight: 24, reps: 10 }] },
        { name: '체스트 플라이 머신', sets: [{ weight: 45, reps: 15 }, { weight: 45, reps: 15 }, { weight: 50, reps: 12 }] },
        { name: '딥스', sets: [{ weight: 0, reps: 15 }, { weight: 0, reps: 12 }, { weight: 10, reps: 10 }, { weight: 10, reps: 8 }] },
        { name: '케이블 푸시다운', sets: [{ weight: 25, reps: 15 }, { weight: 30, reps: 12 }, { weight: 30, reps: 12 }] },
      ],
      wearable: {
        device: 'Apple Watch',
        activeKcal: 412,
        avgHr: 132,
        maxHr: 168,
        zoneMinutes: { warmup: 12, fatBurn: 28, cardio: 32, peak: 8 },
      },
    },
  },
  {
    id: 2,
    imageUrls: ['https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=800&fit=crop'],
    authorImageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=face',
    authorName: '헬스왕',
    location: '바디채널 서초점',
    text: '바레톤 수업 후기 🧘‍♀️ 정말 시원하네요. 코어가 단단해지는 느낌!',
    likeCount: 89,
    commentCount: 12,
    isLiked: false,
    timeAgo: '4시간 전',
    workout: {
      title: '바레톤 그룹수업',
      duration: '55분',
      totalVolume: 0,
      totalSets: 12,
      exercises: [
        { name: '플리에 스쿼트', sets: [{ weight: 0, reps: 20 }, { weight: 0, reps: 20 }, { weight: 0, reps: 16 }] },
        { name: '레그 리프트', sets: [{ weight: 0, reps: 15 }, { weight: 0, reps: 15 }, { weight: 0, reps: 12 }] },
        { name: '플랭크 홀드', sets: [{ weight: 0, reps: 60 }, { weight: 0, reps: 45 }] },
        { name: '바 워크', sets: [{ weight: 0, reps: 24 }, { weight: 0, reps: 24 }] },
        { name: '브릿지', sets: [{ weight: 0, reps: 20 }, { weight: 0, reps: 20 }] },
      ],
      wearable: {
        device: 'Galaxy Watch',
        activeKcal: 285,
        avgHr: 118,
        maxHr: 152,
        zoneMinutes: { warmup: 8, fatBurn: 30, cardio: 15, peak: 2 },
      },
    },
  },
  {
    id: 3,
    imageUrls: [
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&h=800&fit=crop',
    ],
    authorImageUrl: 'https://images.unsplash.com/photo-1597347316205-36f6c451902a?w=100&h=100&fit=crop&crop=face',
    authorName: '운동하는직장인',
    location: '바디채널 역삼점',
    text: '3개월 벌크업 결과! 드디어 목표 달성 🎉',
    likeCount: 256,
    commentCount: 48,
    isLiked: true,
    timeAgo: '6시간 전',
    workout: {
      title: '하체 · 등',
      duration: '1시간 45분',
      totalVolume: 12680,
      totalSets: 22,
      exercises: [
        { name: '바벨 스쿼트', sets: [{ weight: 60, reps: 12 }, { weight: 100, reps: 8 }, { weight: 120, reps: 6 }, { weight: 120, reps: 6 }, { weight: 100, reps: 8 }] },
        { name: '루마니안 데드리프트', sets: [{ weight: 80, reps: 10 }, { weight: 100, reps: 8 }, { weight: 100, reps: 8 }, { weight: 100, reps: 8 }] },
        { name: '레그프레스', sets: [{ weight: 160, reps: 12 }, { weight: 180, reps: 10 }, { weight: 200, reps: 8 }] },
        { name: '랫 풀다운', sets: [{ weight: 55, reps: 12 }, { weight: 65, reps: 10 }, { weight: 70, reps: 8 }, { weight: 70, reps: 8 }] },
        { name: '시티드 로우', sets: [{ weight: 50, reps: 12 }, { weight: 60, reps: 10 }, { weight: 60, reps: 10 }] },
        { name: '레그 컬', sets: [{ weight: 40, reps: 15 }, { weight: 45, reps: 12 }, { weight: 45, reps: 12 }] },
      ],
      wearable: {
        device: 'Garmin Forerunner',
        activeKcal: 612,
        avgHr: 142,
        maxHr: 178,
        zoneMinutes: { warmup: 10, fatBurn: 32, cardio: 48, peak: 15 },
      },
    },
  },
  {
    id: 4,
    imageUrls: ['https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&h=800&fit=crop'],
    authorImageUrl: 'https://images.unsplash.com/photo-1549476464-37392f717541?w=100&h=100&fit=crop&crop=face',
    authorName: '바레톤요정',
    location: '바디채널 판교점',
    text: '오늘의 운동 루틴 공유해요 ✨ 상체 + 코어 조합 최고예요',
    likeCount: 67,
    commentCount: 8,
    isLiked: false,
    timeAgo: '8시간 전',
    workout: {
      title: '어깨 · 코어',
      duration: '50분',
      totalVolume: 3240,
      totalSets: 14,
      exercises: [
        { name: '오버헤드 프레스', sets: [{ weight: 30, reps: 12 }, { weight: 35, reps: 10 }, { weight: 35, reps: 10 }] },
        { name: '사이드 레터럴 레이즈', sets: [{ weight: 8, reps: 15 }, { weight: 10, reps: 12 }, { weight: 10, reps: 12 }] },
        { name: '페이스 풀', sets: [{ weight: 20, reps: 15 }, { weight: 25, reps: 12 }, { weight: 25, reps: 12 }] },
        { name: '행잉 레그레이즈', sets: [{ weight: 0, reps: 15 }, { weight: 0, reps: 12 }, { weight: 0, reps: 10 }] },
        { name: '러시안 트위스트', sets: [{ weight: 5, reps: 30 }, { weight: 5, reps: 30 }] },
      ],
      wearable: {
        device: 'Apple Watch',
        activeKcal: 320,
        avgHr: 124,
        maxHr: 158,
        zoneMinutes: { warmup: 8, fatBurn: 22, cardio: 16, peak: 4 },
      },
    },
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
  const [commentFeedId, setCommentFeedId] = useState<number | null>(null)
  const [commentInput, setCommentInput] = useState('')
  const [imageIdxMap, setImageIdxMap] = useState<Record<number, number>>({})
  const [expandedWorkout, setExpandedWorkout] = useState<number | null>(null)
  const [commentsMap, setCommentsMap] = useState<Record<number, { author: string; text: string }[]>>({
    1: [
      { author: '박지영', text: '대단해요! 저도 열심히 해야겠어요 👏' },
      { author: '이준혁', text: '꾸준함이 최고죠!' },
    ],
    2: [{ author: '김민수', text: '저도 들어보고 싶어요!' }],
    3: [],
    4: [],
  })
  const submitComment = () => {
    if (!commentInput.trim() || commentFeedId === null) return
    setCommentsMap(m => ({
      ...m,
      [commentFeedId]: [...(m[commentFeedId] || []), { author: '나', text: commentInput.trim() }],
    }))
    setCommentInput('')
  }
  const [likedMap, setLikedMap] = useState<Record<number, { liked: boolean; count: number }>>(
    () => Object.fromEntries(feeds.map(f => [f.id, { liked: f.isLiked, count: f.likeCount }]))
  )
  const toggleLike = (id: number) => setLikedMap(m => {
    const cur = m[id]
    return { ...m, [id]: { liked: !cur.liked, count: cur.liked ? cur.count - 1 : cur.count + 1 } }
  })
  const shareFeed = (id: number) => {
    const url = `${window.location.origin}/feed/${id}`
    if (navigator.share) {
      navigator.share({ title: '바디채널 피드', url }).catch(() => {})
    } else {
      navigator.clipboard?.writeText(url)
      alert('링크가 복사되었어요')
    }
  }

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
                <button
                  key={story.id}
                  onClick={() => navigate(story.isAdd ? '/feed/new' : `/profile/${encodeURIComponent(story.name)}`)}
                  className="flex flex-col items-center gap-1.5 flex-shrink-0"
                >
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

                {/* Post Images */}
                <div className="relative">
                  <div
                    className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar"
                    onScroll={(e) => {
                      const el = e.currentTarget
                      const idx = Math.round(el.scrollLeft / el.clientWidth)
                      setImageIdxMap(m => (m[feed.id] === idx ? m : { ...m, [feed.id]: idx }))
                    }}
                  >
                    {feed.imageUrls.map((url, i) => (
                      <img
                        key={i}
                        src={url}
                        alt="피드"
                        className="w-full flex-shrink-0 aspect-square object-cover snap-center"
                      />
                    ))}
                  </div>
                  {feed.workout && (() => {
                    const w = feed.workout
                    const isOpen = expandedWorkout === feed.id
                    const zoneTotal = w.wearable.zoneMinutes.warmup + w.wearable.zoneMinutes.fatBurn + w.wearable.zoneMinutes.cardio + w.wearable.zoneMinutes.peak
                    const zones = [
                      { key: 'warmup', label: '워밍업', min: w.wearable.zoneMinutes.warmup, color: 'bg-ink-disabled' },
                      { key: 'fatBurn', label: '지방연소', min: w.wearable.zoneMinutes.fatBurn, color: 'bg-accent-green' },
                      { key: 'cardio', label: '유산소', min: w.wearable.zoneMinutes.cardio, color: 'bg-primary' },
                      { key: 'peak', label: '최대', min: w.wearable.zoneMinutes.peak, color: 'bg-semantic-like' },
                    ]
                    return isOpen ? (
                      <div className="absolute inset-0 bg-black/85 backdrop-blur-md text-white overflow-y-auto">
                        <button
                          onClick={() => setExpandedWorkout(null)}
                          aria-label="닫기"
                          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-base z-10"
                        >
                          ✕
                        </button>
                        <div className="px-5 py-6 flex flex-col">
                          {/* Header */}
                          <div className="text-caption uppercase tracking-widest text-white/50 mb-1">Workout</div>
                          <div className="text-display font-extrabold leading-tight mb-0.5">{w.title}</div>
                          <div className="text-label text-white/60">{w.duration}</div>

                          {/* Hero stats */}
                          <div className="grid grid-cols-3 gap-4 my-5 py-4 border-y border-white/10">
                            <div>
                              <div className="text-display font-extrabold leading-none tabular-nums">
                                {w.totalVolume.toLocaleString()}
                                <span className="text-label font-semibold text-white/50 ml-1">kg</span>
                              </div>
                              <div className="text-caption text-white/50 mt-1.5">총 볼륨</div>
                            </div>
                            <div>
                              <div className="text-display font-extrabold leading-none tabular-nums">{w.totalSets}</div>
                              <div className="text-caption text-white/50 mt-1.5">세트</div>
                            </div>
                            <div>
                              <div className="text-display font-extrabold leading-none tabular-nums">
                                {w.wearable.activeKcal}
                                <span className="text-label font-semibold text-white/50 ml-1">kcal</span>
                              </div>
                              <div className="text-caption text-white/50 mt-1.5">활동 칼로리</div>
                            </div>
                          </div>

                          {/* Exercises */}
                          <div className="text-caption uppercase tracking-widest text-white/50 mb-2.5">종목</div>
                          <div className="flex flex-col">
                            {w.exercises.map((ex, i) => {
                              const minW = Math.min(...ex.sets.map(s => s.weight))
                              const maxW = Math.max(...ex.sets.map(s => s.weight))
                              const range = maxW === 0 ? '맨몸' : minW === maxW ? `${maxW}kg` : `${minW === 0 ? '맨몸' : minW + 'kg'} → ${maxW}kg`
                              const totalReps = ex.sets.reduce((a, s) => a + s.reps, 0)
                              return (
                                <div key={i} className="flex items-baseline justify-between py-2.5 border-b border-white/10 last:border-b-0">
                                  <div className="text-body font-semibold truncate pr-3">{ex.name}</div>
                                  <div className="flex items-baseline gap-2 shrink-0 tabular-nums">
                                    <span className="text-caption text-white/50">{ex.sets.length}세트 · {totalReps}회</span>
                                    <span className="text-label font-bold text-white">{range}</span>
                                  </div>
                                </div>
                              )
                            })}
                          </div>

                          {/* Wearable */}
                          <div className="mt-6">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
                                <span className="text-caption uppercase tracking-widest text-white/50">{w.wearable.device}</span>
                              </div>
                            </div>
                            <div className="flex items-baseline gap-5 mb-4">
                              <div>
                                <div className="text-display font-extrabold leading-none tabular-nums">
                                  {w.wearable.avgHr}
                                  <span className="text-label font-semibold text-white/50 ml-1">bpm</span>
                                </div>
                                <div className="text-caption text-white/50 mt-1.5">평균 심박</div>
                              </div>
                              <div className="w-px h-10 bg-white/15" />
                              <div>
                                <div className="text-display font-extrabold leading-none text-semantic-like tabular-nums">
                                  {w.wearable.maxHr}
                                  <span className="text-label font-semibold text-white/50 ml-1">bpm</span>
                                </div>
                                <div className="text-caption text-white/50 mt-1.5">최대 심박</div>
                              </div>
                            </div>
                            <div className="flex h-1.5 rounded-pill overflow-hidden mb-2">
                              {zones.map(z => (
                                <div key={z.key} className={z.color} style={{ width: `${(z.min / zoneTotal) * 100}%` }} />
                              ))}
                            </div>
                            <div className="grid grid-cols-4 gap-1 text-caption text-white/60">
                              {zones.map(z => (
                                <div key={z.key} className="flex items-center gap-1.5">
                                  <span className={`w-1 h-1 rounded-full ${z.color}`} />
                                  <span className="truncate">{z.label}</span>
                                  <span className="text-white/40 tabular-nums">{z.min}m</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setExpandedWorkout(feed.id)}
                        className="absolute inset-x-0 bottom-0 text-left bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-10 pb-3 px-4"
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="px-2 py-0.5 rounded-pill bg-primary text-white text-caption font-bold">운동기록</span>
                          <span className="text-white text-label font-semibold drop-shadow">{w.title}</span>
                        </div>
                        <div className="flex items-end justify-between">
                          <div className="flex items-end gap-4 text-white">
                            <div>
                              <div className="text-caption text-white/70 leading-none mb-0.5">시간</div>
                              <div className="text-body font-extrabold leading-none">{w.duration}</div>
                            </div>
                            <div className="w-px h-6 bg-white/30" />
                            <div>
                              <div className="text-caption text-white/70 leading-none mb-0.5">볼륨</div>
                              <div className="text-body font-extrabold leading-none">{w.totalVolume.toLocaleString()}<span className="text-caption font-semibold ml-0.5">kg</span></div>
                            </div>
                            <div className="w-px h-6 bg-white/30" />
                            <div>
                              <div className="text-caption text-white/70 leading-none mb-0.5">평균 심박</div>
                              <div className="text-body font-extrabold leading-none">{w.wearable.avgHr}<span className="text-caption font-semibold ml-0.5">bpm</span></div>
                            </div>
                          </div>
                          <span className="text-caption text-white/80 px-2 py-1 rounded-pill bg-white/15">자세히 ↗</span>
                        </div>
                      </button>
                    )
                  })()}
                  {feed.imageUrls.length > 1 && expandedWorkout !== feed.id && (
                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded-pill bg-black/60 text-white text-label font-semibold tabular-nums">
                      {(imageIdxMap[feed.id] ?? 0) + 1}/{feed.imageUrls.length}
                    </div>
                  )}
                </div>

                {/* Actions + Text */}
                <div className="px-page py-3">
                  <div className="flex items-center gap-4 mb-2.5">
                    <button onClick={() => toggleLike(feed.id)} className="flex items-center gap-1.5">
                      <IconHeart className={`w-[22px] h-[22px] ${likedMap[feed.id].liked ? 'fill-semantic-like stroke-semantic-like' : 'fill-none stroke-ink'} stroke-2`} />
                      <span className="text-label font-semibold text-ink">{likedMap[feed.id].count}</span>
                    </button>
                    <button onClick={() => setCommentFeedId(feed.id)} className="flex items-center gap-1.5">
                      <IconMessage className="w-[22px] h-[22px] fill-none stroke-ink stroke-2" />
                      <span className="text-label font-semibold text-ink">{(commentsMap[feed.id] || []).length || feed.commentCount}</span>
                    </button>
                    <button onClick={() => shareFeed(feed.id)} className="flex items-center gap-1.5">
                      <IconShare className="w-[22px] h-[22px] fill-none stroke-ink stroke-2" />
                      <span className="text-label font-semibold text-ink">공유</span>
                    </button>
                  </div>
                  <div className="text-body text-ink leading-relaxed mb-1">
                    <span className="font-semibold">{feed.authorName}</span>{' '}
                    <span className="text-ink-secondary">{feed.text}</span>
                  </div>
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
            className="relative w-full bg-surface rounded-t-2xl pb-6 pt-2 animate-sheet-up"
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

      {/* Comment bottom sheet */}
      {commentFeedId !== null && (
        <div className="fixed inset-0 z-[65] flex items-end" onClick={() => setCommentFeedId(null)}>
          <div className="absolute inset-0 bg-black/50" />
          <div
            className="relative w-full bg-surface rounded-t-2xl max-h-[80vh] flex flex-col animate-sheet-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 bg-ink-disabled rounded-full mx-auto mt-2" />
            <h3 className="text-title font-bold text-ink text-center py-3 border-b border-border-light">댓글</h3>
            <div className="flex-1 overflow-y-auto px-page py-3 space-y-4">
              {(commentsMap[commentFeedId] || []).length === 0 ? (
                <div className="text-center py-12 text-ink-tertiary text-body">아직 댓글이 없어요</div>
              ) : (
                (commentsMap[commentFeedId] || []).map((c, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-ink-disabled flex-shrink-0 flex items-center justify-center text-ink-secondary font-semibold">
                      {c.author.slice(0, 1)}
                    </div>
                    <div className="flex-1">
                      <p className="text-body text-ink leading-relaxed">
                        <span className="font-semibold">{c.author}</span> <span>{c.text}</span>
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="flex items-center gap-3 px-page py-3 border-t border-border-light bg-surface">
              <input
                type="text"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') submitComment() }}
                placeholder="댓글 달기..."
                autoFocus
                className="flex-1 text-body text-ink placeholder:text-ink-placeholder bg-transparent focus:outline-none"
              />
              {commentInput.trim().length > 0 && (
                <button onClick={submitComment} className="text-label font-bold text-primary">게시</button>
              )}
            </div>
          </div>
        </div>
      )}

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
