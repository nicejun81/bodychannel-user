import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { PageLayout, SubPageHeader, RatingSummary, ReviewItem, ReviewSort, BottomCTA, TrainerListItem, EmptyState } from '../../components'
import { IconShare, IconStarFilled, IconClock, IconMapPin } from '../../components/Icons'
import { gymsData } from '../GymDetail'
import { baItems } from '../GymDetail/BeforeAfter'

/* ── types ── */
interface ScheduleSlot { day: string; time: string }
interface ReviewData { name: string; avatar: string; rating: number; date: string; text: string; photos?: string[]; program?: string }

interface GroupLessonData {
  name: string
  category: string
  categoryColor: 'bareton' | 'hit35' | 'gymground' | 'pt'
  instructor: string
  instructorAvatar: string
  instructorBio: string
  gym: string
  gymId: string
  rating: number
  reviewCount: number
  imageUrl: string
  description: string
  highlights: string[]
  duration: string
  capacity: number
  difficulty: string
  location: string
  schedule: ScheduleSlot[]
  reviews: ReviewData[]
  hasTicket: boolean
}

/* ── mock data ── */
const lessonsData: Record<string, GroupLessonData> = {
  'morning-bareton': {
    name: '모닝 바레톤',
    category: '바레톤',
    categoryColor: 'gymground',
    instructor: '이수진',
    instructorAvatar: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200&h=200&fit=crop&crop=face',
    instructorBio: '바레톤 전문 강사 5년 경력. 발레와 필라테스를 결합한 체형 교정 전문가입니다. 아침 시간대 활력 넘치는 수업으로 하루를 시작해보세요.',
    gym: '바디채널 강남점',
    gymId: 'gym1',
    rating: 4.8,
    reviewCount: 86,
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=450&fit=crop',
    description: '아침 시간대에 진행되는 바레톤 수업입니다. 발레 동작을 기반으로 한 저강도 전신 운동으로, 코어 근력 강화와 유연성 향상에 효과적입니다. 은은한 음악과 함께 하루를 활기차게 시작해보세요.',
    highlights: ['코어 근력 강화', '유연성 향상', '체형 교정 효과', '스트레스 해소', '초보자도 참여 가능'],
    duration: '50분',
    capacity: 15,
    difficulty: '초급',
    location: 'GX룸 A',
    schedule: [
      { day: '월', time: '07:00' },
      { day: '화', time: '07:00' },
      { day: '목', time: '07:00' },
    ],
    reviews: [
      { name: '아침형인간', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face', rating: 5, date: '2025.12.18', text: '아침에 바레톤 하고 출근하면 하루가 달라져요! 이수진 선생님 수업이 정말 좋습니다. 초보자도 따라하기 쉽게 알려주세요.', program: '그룹 레슨권' },
      { name: '직장인C', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', rating: 5, date: '2025.12.10', text: '거북목이 심했는데 바레톤 하면서 많이 개선됐어요. 코어 운동이라 자세 교정에도 좋습니다.', program: '그룹 레슨권' },
      { name: '운동뉴비', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', rating: 4, date: '2025.11.25', text: '처음 해봤는데 생각보다 강도가 있어요. 그래도 선생님이 개인 레벨에 맞춰서 동작을 알려주셔서 좋았어요.', program: '그룹 레슨권' },
    ],
    hasTicket: false,
  },
  'bodypump': {
    name: '바디펌프',
    category: '히트35',
    categoryColor: 'hit35',
    instructor: '한동훈',
    instructorAvatar: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=200&h=200&fit=crop&crop=face',
    instructorBio: '히트35 전문 강사. 바디펌프, 크로스핏 등 고강도 그룹 운동 전문가입니다. 체계적인 프로그램으로 확실한 변화를 만들어드립니다.',
    gym: '바디채널 강남점',
    gymId: 'gym1',
    rating: 4.7,
    reviewCount: 62,
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=450&fit=crop',
    description: '바벨과 웨이트를 활용한 전신 근력 운동입니다. 음악에 맞춰 스쿼트, 런지, 프레스 등 다양한 동작을 반복하며, 근력과 지구력을 동시에 향상시킬 수 있습니다.',
    highlights: ['전신 근력 강화', '체지방 감소', '근지구력 향상', '바벨 기본기 학습', '에너지 소모 극대화'],
    duration: '50분',
    capacity: 20,
    difficulty: '중급',
    location: 'GX룸 B',
    schedule: [
      { day: '월', time: '09:00' },
      { day: '수', time: '09:00' },
      { day: '목', time: '09:00' },
    ],
    reviews: [
      { name: '근육맨', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', rating: 5, date: '2025.12.15', text: '바디펌프 최고! 한동훈 선생님 수업은 강도 조절을 잘 해주셔서 초보부터 상급자까지 다 만족할 수 있어요.', program: '그룹 레슨권' },
      { name: '다이어터', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face', rating: 4, date: '2025.12.01', text: '땀이 엄청 나요. 한 시간인데 칼로리 소모가 장난 아닙니다. 다이어트 중이라 효과 좋습니다.', program: '그룹 레슨권' },
    ],
    hasTicket: false,
  },
  'hiit': {
    name: 'HIIT 클래스',
    category: 'PT',
    categoryColor: 'pt',
    instructor: '최강민',
    instructorAvatar: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&h=200&fit=crop&crop=face',
    instructorBio: '10년 경력의 체계적인 PT 전문가. 고강도 인터벌 트레이닝으로 단시간 최대 효과를 이끌어냅니다.',
    gym: '바디채널 강남점',
    gymId: 'gym1',
    rating: 4.9,
    reviewCount: 94,
    imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=450&fit=crop',
    description: '고강도 인터벌 트레이닝(HIIT)으로 단시간에 최대 칼로리를 소모하는 수업입니다. 30초 운동 + 10초 휴식을 반복하며, 심폐 지구력과 근력을 동시에 향상시킵니다.',
    highlights: ['최대 칼로리 소모', '심폐 지구력 향상', '애프터번 효과', '전신 근력 강화', '짧은 시간 높은 효율'],
    duration: '50분',
    capacity: 15,
    difficulty: '상급',
    location: 'GX룸 A',
    schedule: [
      { day: '월', time: '18:30' },
      { day: '화', time: '18:30' },
      { day: '목', time: '18:30' },
      { day: '금', time: '18:30' },
    ],
    reviews: [
      { name: '헬스왕', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', rating: 5, date: '2025.12.20', text: 'HIIT 수업 강도가 장난 아닌데 최강민 트레이너가 잘 이끌어줍니다. 한 달 만에 체지방 3% 빠졌어요!', program: '그룹 레슨권' },
      { name: '운동중독', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', rating: 5, date: '2025.12.12', text: '이 수업 듣고 나면 진짜 살 빠지는 느낌이에요. 힘들지만 성취감이 대단합니다.', program: '그룹 레슨권' },
    ],
    hasTicket: true,
  },
  'lunch-pilates': {
    name: '점심 필라테스',
    category: '바레톤',
    categoryColor: 'bareton',
    instructor: '박지영',
    instructorAvatar: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face',
    instructorBio: '필라테스 & 바레톤 전문 강사. 섬세한 동작 교정과 호흡 지도로 정확한 운동 효과를 이끌어냅니다.',
    gym: '바디채널 강남점',
    gymId: 'gym1',
    rating: 4.7,
    reviewCount: 58,
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=450&fit=crop',
    description: '점심 시간을 활용한 필라테스 수업입니다. 매트 위에서 진행되는 코어 중심 운동으로, 자세 교정과 유연성 향상에 탁월합니다. 직장인들의 점심 시간 활용에 최적화된 프로그램입니다.',
    highlights: ['코어 강화', '자세 교정', '유연성 향상', '허리 통증 개선', '점심 시간 활용'],
    duration: '50분',
    capacity: 12,
    difficulty: '초급',
    location: 'GX룸 A',
    schedule: [
      { day: '화', time: '12:00' },
      { day: '수', time: '12:00' },
      { day: '금', time: '12:00' },
    ],
    reviews: [
      { name: '점심러너', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face', rating: 5, date: '2025.12.16', text: '점심 시간에 필라테스하고 오후 업무하면 집중력이 확 올라가요. 박지영 선생님 수업 강추합니다!', program: '그룹 레슨권' },
      { name: '허리아파', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', rating: 5, date: '2025.12.05', text: '오래 앉아있어서 허리가 아팠는데 필라테스 시작하고 많이 나아졌어요.', program: '그룹 레슨권' },
    ],
    hasTicket: true,
  },
  'spinning': {
    name: '스피닝',
    category: '짐그라운드',
    categoryColor: 'gymground',
    instructor: '김민수',
    instructorAvatar: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=200&h=200&fit=crop&crop=face',
    instructorBio: '스피닝 & 유산소 전문 강사. 에너지 넘치는 음악과 함께 최고의 유산소 운동을 경험해보세요.',
    gym: '바디채널 강남점',
    gymId: 'gym1',
    rating: 4.6,
    reviewCount: 45,
    imageUrl: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=800&h=450&fit=crop',
    description: '실내 사이클을 활용한 고강도 유산소 운동입니다. 신나는 음악에 맞춰 페달을 밟으며, 하체 근력과 심폐 지구력을 동시에 강화할 수 있습니다.',
    highlights: ['유산소 운동 최고', '하체 근력 강화', '심폐 지구력 향상', '스트레스 해소', '칼로리 대량 소모'],
    duration: '45분',
    capacity: 20,
    difficulty: '중급',
    location: '스피닝룸',
    schedule: [
      { day: '화', time: '20:00' },
      { day: '수', time: '20:00' },
      { day: '금', time: '20:00' },
    ],
    reviews: [
      { name: '사이클러', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', rating: 5, date: '2025.12.14', text: '스피닝 진짜 재밌어요! 김민수 선생님이 분위기를 너무 잘 이끌어주셔서 시간 가는 줄 모르고 운동합니다.', program: '그룹 레슨권' },
    ],
    hasTicket: false,
  },
  'weekend-bareton': {
    name: '주말 바레톤',
    category: '바레톤',
    categoryColor: 'gymground',
    instructor: '이수진',
    instructorAvatar: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200&h=200&fit=crop&crop=face',
    instructorBio: '바레톤 전문 강사 5년 경력. 발레와 필라테스를 결합한 체형 교정 전문가입니다.',
    gym: '바디채널 강남점',
    gymId: 'gym1',
    rating: 4.8,
    reviewCount: 52,
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=450&fit=crop',
    description: '주말 오전 시간에 여유롭게 즐기는 바레톤 수업입니다. 평일에 바쁜 분들을 위한 주말 전용 클래스로, 한 주의 피로를 풀고 활력을 되찾아보세요.',
    highlights: ['주말 전용 클래스', '여유로운 분위기', '코어 강화', '유연성 향상', '스트레스 해소'],
    duration: '50분',
    capacity: 15,
    difficulty: '초급',
    location: 'GX룸 A',
    schedule: [
      { day: '토', time: '10:00' },
      { day: '일', time: '10:00' },
    ],
    reviews: [
      { name: '주말운동러', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face', rating: 5, date: '2025.12.08', text: '평일에 못 오는데 주말 수업이 있어서 너무 좋아요. 이수진 선생님 수업은 항상 만족입니다!', program: '그룹 레슨권' },
    ],
    hasTicket: false,
  },
  'bareton': {
    name: '바레톤',
    category: '바레톤',
    categoryColor: 'bareton',
    instructor: '박지영',
    instructorAvatar: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face',
    instructorBio: '필라테스 & 바레톤 전문 강사. 섬세한 동작 교정과 호흡 지도로 정확한 운동 효과를 이끌어냅니다.',
    gym: '바디채널 강남점',
    gymId: 'gym1',
    rating: 4.7,
    reviewCount: 41,
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=450&fit=crop',
    description: '발레의 우아한 동작과 필라테스의 코어 운동을 결합한 바레톤 수업입니다. 근력, 유연성, 밸런스를 동시에 향상시킬 수 있는 종합 운동 프로그램입니다.',
    highlights: ['발레 기반 동작', '코어 강화', '밸런스 향상', '체형 교정', '전신 토닝'],
    duration: '50분',
    capacity: 12,
    difficulty: '초급 ~ 중급',
    location: 'GX룸 A',
    schedule: [
      { day: '토', time: '14:00' },
    ],
    reviews: [
      { name: '바레톤매니아', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', rating: 5, date: '2025.12.11', text: '박지영 선생님 바레톤 수업은 동작 하나하나 꼼꼼하게 잡아주셔서 정말 효과가 좋아요.', program: '그룹 레슨권' },
    ],
    hasTicket: true,
  },
}

/* ── lesson ID mapping (name → id) ── */
export const lessonIdMap: Record<string, string> = {
  '모닝 바레톤': 'morning-bareton',
  '바디펌프': 'bodypump',
  'HIIT 클래스': 'hiit',
  '점심 필라테스': 'lunch-pilates',
  '스피닝': 'spinning',
  '주말 바레톤': 'weekend-bareton',
  '바레톤': 'bareton',
}

/* ── category color helper ── */
const categoryBadgeClass = (color: string) => {
  switch (color) {
    case 'bareton': return 'bg-category-bareton-bg text-category-bareton-text'
    case 'hit35': return 'bg-category-hit35-bg text-category-hit35-text'
    case 'gymground': return 'bg-category-gymground-bg text-category-gymground-text'
    default: return 'bg-primary-50 text-primary'
  }
}

export const GroupLessonDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const data = lessonsData[id || '']
  const [showAllReviews, setShowAllReviews] = useState(false)
  const [showFullImage, setShowFullImage] = useState(false)
  const [selectedDateIdx, setSelectedDateIdx] = useState(0)
  const [reviewSort, setReviewSort] = useState<'latest' | 'high' | 'low'>('latest')
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviewRating, setReviewRating] = useState(0)
  const [reviewText, setReviewText] = useState('')
  const [reviewSubmitted, setReviewSubmitted] = useState(false)
  const [reviewImages, setReviewImages] = useState<string[]>([])

  if (!data) {
    return (
      <PageLayout header={<SubPageHeader title="수업 상세" />}>
        <div className="flex items-center justify-center h-64">
          <p className="text-body text-ink-secondary">수업 정보를 찾을 수 없습니다.</p>
        </div>
      </PageLayout>
    )
  }

  const gymData = gymsData[data.gymId]
  const scheduleDays = (() => {
    const result: { date: Date; label: string; dayKey: string; isToday: boolean }[] = []
    const now = new Date()
    for (let i = 0; i < 14; i++) {
      const d = new Date(now)
      d.setDate(now.getDate() + i)
      result.push({
        date: d,
        label: `${d.getMonth() + 1}/${d.getDate()}`,
        dayKey: ['일', '월', '화', '수', '목', '금', '토'][d.getDay()],
        isToday: i === 0,
      })
    }
    return result
  })()
  const selectedDay = scheduleDays[selectedDateIdx].dayKey
  const filteredSchedule = gymData
    ? (gymData.schedule[selectedDay] || []).filter(s => s.instructor === data.instructor)
    : []
  const trainerBaItems = baItems.filter(item => item.trainer.name === data.instructor)

  const ratingDist = [
    { stars: 5, pct: 72 },
    { stars: 4, pct: 18 },
    { stars: 3, pct: 7 },
    { stars: 2, pct: 2 },
    { stars: 1, pct: 1 },
  ]
  const sortedReviews = [...data.reviews].sort((a, b) => {
    if (reviewSort === 'high') return b.rating - a.rating
    if (reviewSort === 'low') return a.rating - b.rating
    return b.date.localeCompare(a.date)
  })
  const visibleReviews = showAllReviews ? sortedReviews : sortedReviews.slice(0, 3)

  const header = (
    <SubPageHeader
      title={data.name}
      rightAction={
        <button className="w-9 h-9 flex items-center justify-center"><IconShare className="w-5 h-5 text-ink-secondary" /></button>
      }
    />
  )

  return (
    <PageLayout header={header} hideBottomNav noPadding>
      {/* ── 히어로 이미지 ── */}
      <div className="relative w-full aspect-video cursor-pointer" onClick={() => setShowFullImage(true)}>
        <img src={data.imageUrl} alt={data.name} className="w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-page pt-12">
          <span className={`inline-block px-2 py-0.5 text-caption font-bold rounded mb-2 ${categoryBadgeClass(data.categoryColor)}`}>{data.category}</span>
          <h1 className="text-display text-white">{data.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-1">
              <IconStarFilled className="w-4 h-4 text-semantic-star" />
              <span className="text-body font-bold text-white">{data.rating}</span>
            </div>
            <span className="text-label text-white/70">리뷰 {data.reviewCount}개</span>
          </div>
        </div>
      </div>

      {/* ── 수업 정보 ── */}
      <div className="px-page py-section">
        <p className="text-body text-ink-secondary leading-relaxed">{data.description}</p>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="bg-surface-muted rounded-card p-card flex items-center gap-3">
            <div className="w-9 h-9 bg-surface rounded-card flex items-center justify-center flex-shrink-0">
              <IconClock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-label text-ink-tertiary">수업 시간</p>
              <p className="text-body font-bold text-ink">{data.duration}</p>
            </div>
          </div>
          <div className="bg-surface-muted rounded-card p-card flex items-center gap-3">
            <div className="w-9 h-9 bg-surface rounded-card flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg>
            </div>
            <div>
              <p className="text-label text-ink-tertiary">정원</p>
              <p className="text-body font-bold text-ink">{data.capacity}명</p>
            </div>
          </div>
          <div className="bg-surface-muted rounded-card p-card flex items-center gap-3">
            <div className="w-9 h-9 bg-surface rounded-card flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <p className="text-label text-ink-tertiary">난이도</p>
              <p className="text-body font-bold text-ink">{data.difficulty}</p>
            </div>
          </div>
          <div className="bg-surface-muted rounded-card p-card flex items-center gap-3">
            <div className="w-9 h-9 bg-surface rounded-card flex items-center justify-center flex-shrink-0">
              <IconMapPin className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-label text-ink-tertiary">장소</p>
              <p className="text-body font-bold text-ink">{data.location}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="h-2 bg-surface-muted" />

      {/* ── 운동 효과 ── */}
      <div className="px-page py-section">
        <h2 className="text-heading font-bold text-ink mb-4">운동 효과</h2>
        <div className="flex flex-col gap-3">
          {data.highlights.map((h, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-7 h-7 bg-primary-50 rounded-full flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-primary" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 13l4 4L19 7" /></svg>
              </div>
              <span className="text-body text-ink">{h}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="h-2 bg-surface-muted" />

      {/* ── 강사 정보 ── */}
      <div className="px-page py-section">
        <h2 className="text-heading font-bold text-ink mb-4">강사 소개</h2>
        <button
          onClick={() => {
            const trainerIdMap: Record<string, number> = { '이수진': 4, '한동훈': 3, '최강민': 1, '박지영': 5, '김민수': 2 }
            navigate(`/trainer/${trainerIdMap[data.instructor] || 1}`)
          }}
          className="w-full flex items-center gap-4 p-card-lg bg-surface-muted rounded-card-lg hover:bg-surface-subtle transition-colors text-left"
        >
          <img src={data.instructorAvatar} alt={data.instructor} className="w-16 h-16 rounded-full object-cover flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-title text-ink">{data.instructor} 강사</span>
              <span className={`px-2 py-0.5 text-caption font-bold rounded ${categoryBadgeClass(data.categoryColor)}`}>{data.category}</span>
            </div>
            <p className="text-label text-ink-secondary line-clamp-2">{data.instructorBio}</p>
            <span className="text-label text-primary font-medium mt-1 inline-block">프로필 보기 &rarr;</span>
          </div>
        </button>
      </div>

      {/* ── Before & After ── */}
      {trainerBaItems.length > 0 && (
        <>
          <div className="h-2 bg-surface-muted" />
          <div className="py-section">
            <div className="flex items-center justify-between mb-4 px-page">
              <h2 className="text-heading font-bold text-ink">Before & After</h2>
              <button onClick={() => navigate(`/gym/${data.gymId}/before-after`)} className="text-label text-primary font-medium">전체보기</button>
            </div>
            <div className="flex gap-3 overflow-x-auto hide-scrollbar px-page">
              {trainerBaItems.map((item, i) => {
                const globalIdx = baItems.indexOf(item)
                return (
                  <div key={i} className="flex-shrink-0 w-[180px] cursor-pointer" onClick={() => navigate(`/gym/${data.gymId}/before-after/${globalIdx}`)}>
                    <div className="flex gap-1 mb-2 rounded-xl overflow-hidden">
                      <div className="relative flex-1">
                        <img src={item.before.replace('w=400&h=500', 'w=300&h=400')} alt="Before" className="w-full aspect-[3/4] object-cover" />
                        <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-black/60 text-white text-caption font-bold rounded">BEFORE</span>
                      </div>
                      <div className="relative flex-1">
                        <img src={item.after.replace('w=400&h=500', 'w=300&h=400')} alt="After" className="w-full aspect-[3/4] object-cover" />
                        <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-primary text-white text-caption font-bold rounded">AFTER</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-body font-bold text-ink truncate flex-1 mr-2">{item.title}</p>
                      <span className="px-2 py-0.5 bg-surface-muted text-caption text-ink-secondary font-medium rounded-full flex-shrink-0">{item.tag}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </>
      )}

      <div className="h-2 bg-surface-muted" />

      {/* ── 수업 일정 ── */}
      <div className="px-page py-section">
        <h2 className="text-heading font-bold text-ink mb-4">수업 일정</h2>
        <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-4">
          {scheduleDays.map((d, i) => (
            <button key={i} onClick={() => setSelectedDateIdx(i)} className={`flex-shrink-0 w-[52px] py-2 rounded-xl text-center transition-colors ${selectedDateIdx === i ? 'bg-primary text-white' : 'bg-surface-muted text-ink-secondary hover:bg-surface-subtle'}`}>
              <span className="text-label block">{d.isToday ? '오늘' : d.label}</span>
              <span className="text-label font-bold block">{d.dayKey}</span>
            </button>
          ))}
        </div>
        <div>
          {filteredSchedule.length > 0 ? filteredSchedule.map((s, i) => (
            <TrainerListItem
              key={i}
              imageUrl={s.avatar}
              name={`${s.instructor} 강사`}
              category={s.category}
              categoryColor={s.categoryColor}
              description={s.name}
              todayTime={`${scheduleDays[selectedDateIdx].isToday ? '오늘' : scheduleDays[selectedDateIdx].label + '(' + selectedDay + ')'} ${s.time}`}
              rating={0}
              reviewCount={0}
              rightAction={s.hasTicket
                ? <span onClick={(e) => { e.stopPropagation(); navigate('/reservation') }} className="px-3 py-1 bg-primary text-white text-label font-bold rounded-lg cursor-pointer">예약</span>
                : <span onClick={(e) => { e.stopPropagation(); navigate(`/gym/${data.gymId}/products`) }} className="px-3 py-1 border border-primary text-primary text-label font-bold rounded-lg cursor-pointer">구매</span>
              }
            />
          )) : (
            <EmptyState message={`${scheduleDays[selectedDateIdx].isToday ? '오늘은' : scheduleDays[selectedDateIdx].label + '(' + selectedDay + ')은'} ${data.instructor} 강사의 수업이 없습니다`} />
          )}
        </div>
      </div>

      <div className="h-2 bg-surface-muted" />

      {/* ── 후기 ── */}
      <div className="px-page py-section">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-heading font-bold text-ink">수강 후기</h2>
          <span className="text-label text-ink-tertiary">{data.reviewCount}개</span>
        </div>
        <div className="mb-4">
          <RatingSummary rating={data.rating} reviewCount={data.reviewCount} distribution={ratingDist} />
        </div>
        <ReviewSort value={reviewSort} onChange={(v) => setReviewSort(v as 'latest' | 'high' | 'low')} onWrite={() => { setShowReviewForm(true); setReviewSubmitted(false); setReviewRating(0); setReviewText(''); setReviewImages([]) }} />
        <div className="space-y-4">
          {visibleReviews.map((r, i) => (
            <ReviewItem
              key={i}
              name={r.name}
              avatar={r.avatar}
              rating={r.rating}
              date={r.date}
              text={r.text}
              photos={r.photos}
              badge={r.program}
              isMine={i === 0}
              onEdit={() => { setShowReviewForm(true); setReviewSubmitted(false); setReviewRating(r.rating); setReviewText(r.text); setReviewImages([]) }}
              onDelete={() => {}}
            />
          ))}
        </div>
        {data.reviews.length > 3 && !showAllReviews && (
          <button onClick={() => setShowAllReviews(true)} className="w-full py-3 mt-4 border border-border rounded-card text-body font-semibold text-ink hover:bg-surface-subtle transition-colors">후기 더보기</button>
        )}
      </div>

      {/* ── 하단 CTA ── */}
      <BottomCTA>
        {data.hasTicket ? (
          <button
            onClick={() => navigate('/reservation')}
            className="flex-1 py-3.5 bg-primary text-white text-body font-bold rounded-card hover:bg-primary-dark transition-colors"
          >
            예약하기
          </button>
        ) : (
          <button
            onClick={() => navigate(`/gym/${data.gymId}/products`)}
            className="flex-1 py-3.5 bg-primary text-white text-body font-bold rounded-card hover:bg-primary-dark transition-colors"
          >
            이용권 구매
          </button>
        )}
      </BottomCTA>

      {/* ── 후기 작성 풀스크린 ── */}
      {showReviewForm && (
        <div className="fixed inset-0 z-50 bg-surface flex flex-col">
          <div className="flex items-center justify-between px-page py-3 border-b border-border flex-shrink-0">
            <button onClick={() => setShowReviewForm(false)} className="p-1">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-ink" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h3 className="text-title font-bold text-ink">후기 작성</h3>
            <div className="w-8" />
          </div>

          {reviewSubmitted ? (
            <div className="flex-1 flex flex-col items-center justify-center px-page">
              <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mb-section">
                <svg viewBox="0 0 24 24" className="w-8 h-8 text-primary" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 13l4 4L19 7" /></svg>
              </div>
              <p className="text-heading font-bold text-ink mb-2">후기가 등록되었습니다</p>
              <p className="text-body text-ink-secondary mb-8">소중한 후기 감사합니다!</p>
              <button onClick={() => setShowReviewForm(false)} className="w-full py-3.5 bg-primary text-white text-body font-bold rounded-xl">확인</button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto">
                <div className="px-page py-section">
                  <div className="mb-section">
                    <p className="text-heading font-bold text-ink mb-4">만족도를 알려주세요</p>
                    <div className="flex gap-3 justify-center py-2">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button key={star} onClick={() => setReviewRating(star)} className="p-0.5">
                          <svg viewBox="0 0 24 24" className={`w-10 h-10 transition-colors ${star <= reviewRating ? 'text-semantic-star' : 'text-ink-disabled'}`} fill="currentColor">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        </button>
                      ))}
                    </div>
                    {reviewRating > 0 && (
                      <p className="text-center text-body text-primary font-bold mt-2">
                        {['', '별로예요', '그저 그래요', '보통이에요', '좋아요', '최고예요!'][reviewRating]}
                      </p>
                    )}
                  </div>

                  <div className="h-px bg-border mb-section" />

                  <div className="mb-section">
                    <p className="text-heading font-bold text-ink mb-2">이용한 프로그램</p>
                    <p className="text-label text-ink-tertiary mb-4">선택사항</p>
                    <div className="flex gap-2 overflow-x-auto hide-scrollbar">
                      {['PT', '바레톤', '히트35', '짐그라운드', '헬스 이용'].map(prog => (
                        <button
                          key={prog}
                          onClick={(e) => {
                            const btn = e.currentTarget
                            btn.classList.toggle('bg-primary-50')
                            btn.classList.toggle('text-primary')
                            btn.classList.toggle('border-primary')
                            btn.classList.toggle('bg-surface')
                            btn.classList.toggle('text-ink-secondary')
                            btn.classList.toggle('border-border')
                          }}
                          className="flex-shrink-0 px-4 py-2 border border-border rounded-pill text-label font-medium text-ink-secondary bg-surface transition-colors"
                        >
                          {prog}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="h-px bg-border mb-section" />

                  <div className="mb-section">
                    <p className="text-heading font-bold text-ink mb-4">상세 후기</p>
                    <textarea
                      value={reviewText}
                      onChange={e => { if (e.target.value.length <= 500) setReviewText(e.target.value) }}
                      placeholder="수업, 강사, 시설 등 이용 경험을 자유롭게 작성해 주세요 (최소 10자)"
                      className="w-full h-36 p-card-lg bg-surface-muted rounded-card text-body text-ink placeholder:text-ink-placeholder resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                    <div className="flex justify-between mt-1.5">
                      <p className={`text-caption ${reviewText.length > 0 && reviewText.length < 10 ? 'text-primary' : 'text-ink-tertiary'}`}>
                        {reviewText.length > 0 && reviewText.length < 10 ? '최소 10자 이상 작성해 주세요' : ' '}
                      </p>
                      <p className="text-caption text-ink-tertiary">{reviewText.length}/500</p>
                    </div>
                  </div>

                  <div className="h-px bg-border mb-section" />

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-heading font-bold text-ink">사진 첨부</p>
                        <p className="text-label text-ink-tertiary mt-1">최대 5장까지 등록 가능</p>
                      </div>
                      <span className="text-label text-ink-tertiary">{reviewImages.length}/5</span>
                    </div>
                    <div className="flex gap-2.5 overflow-x-auto hide-scrollbar">
                      {reviewImages.length < 5 && (
                        <label className="flex-shrink-0 w-20 h-20 bg-surface-muted rounded-card border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors">
                          <svg viewBox="0 0 24 24" className="w-6 h-6 text-ink-tertiary mb-0.5" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 5v14M5 12h14" /></svg>
                          <span className="text-caption text-ink-tertiary">사진</span>
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file && reviewImages.length < 5) {
                              const url = URL.createObjectURL(file)
                              setReviewImages(prev => [...prev, url])
                            }
                            e.target.value = ''
                          }} />
                        </label>
                      )}
                      {reviewImages.map((img, i) => (
                        <div key={i} className="flex-shrink-0 w-20 h-20 relative rounded-card overflow-hidden">
                          <img src={img} alt={`첨부 ${i + 1}`} className="w-full h-full object-cover" />
                          <button
                            onClick={() => setReviewImages(prev => prev.filter((_, idx) => idx !== i))}
                            className="absolute top-1 right-1 w-5 h-5 bg-black/60 rounded-full flex items-center justify-center"
                          >
                            <svg viewBox="0 0 24 24" className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 18L18 6M6 6l12 12" /></svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0 px-page py-3 border-t border-border bg-surface">
                <button
                  onClick={() => setReviewSubmitted(true)}
                  disabled={reviewRating === 0 || reviewText.trim().length < 10}
                  className={`w-full py-3.5 text-body font-bold rounded-xl transition-colors ${
                    reviewRating > 0 && reviewText.trim().length >= 10
                      ? 'bg-primary text-white hover:bg-primary-dark'
                      : 'bg-ink-disabled text-white cursor-not-allowed'
                  }`}
                >
                  등록하기
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* ── 전체 이미지 뷰어 ── */}
      {showFullImage && (
        <div className="fixed inset-0 z-[60] bg-black flex items-center justify-center" onClick={() => setShowFullImage(false)}>
          <button className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-white/80 hover:text-white z-10">
            <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
          <img src={data.imageUrl.replace('w=800&h=450', 'w=1200&h=900')} alt={data.name} className="w-full h-auto max-h-full object-contain" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </PageLayout>
  )
}
