import { useState, useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { PageLayout, SubPageHeader } from '../../components'
import { IconHeart, IconShare, IconPlay, IconClock, IconChevronDown } from '../../components/Icons'

/* ── data types ─────────────────────────────────────── */
interface Lesson {
  title: string
  duration: string
  preview?: boolean
  thumb: string
}
interface Chapter {
  title: string
  lessons: Lesson[]
}
interface Review {
  name: string
  avatar: string
  rating: number
  date: string
  text: string
}
interface ClassInfo {
  title: string
  subtitle: string
  instructor: string
  instructorAvatar: string
  instructorBio: string
  instructorFollowers: string
  level: string
  duration: string
  lessonCount: number
  studentCount: string
  rating: number
  reviewCount: number
  imageUrl: string
  description: string
  highlights: string[]
  chapters: Chapter[]
  reviews: Review[]
  price: number
  originalPrice: number
}

/* ── mock data ──────────────────────────────────────── */
const classesData: Record<string, ClassInfo> = {
  '1': {
    title: '홈트레이닝 기초',
    subtitle: '기구 없이 집에서 완성하는 탄탄한 몸',
    instructor: '김민수',
    instructorAvatar: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=200&h=200&fit=crop&crop=face',
    instructorBio: '현 바디채널 강남점 수석 트레이너. 10년 경력의 홈트레이닝 전문가로, 누적 수강생 5,000명 이상을 지도했습니다.',
    instructorFollowers: '2,847',
    level: '초급',
    duration: '총 3시간 24분',
    lessonCount: 12,
    studentCount: '1,234',
    rating: 4.9,
    reviewCount: 327,
    imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=450&fit=crop',
    description: '집에서도 효과적으로 운동할 수 있는 홈트레이닝 기초 과정입니다. 기구 없이 맨몸으로 할 수 있는 다양한 운동법을 단계별로 배워보세요. 초보자도 쉽게 따라할 수 있도록 구성했습니다.',
    highlights: ['기구 없이 맨몸 운동만으로 구성', '초보자 맞춤 단계별 난이도', '매일 15분 루틴 제공', '운동 전후 스트레칭 포함'],
    chapters: [
      {
        title: '시작하기',
        lessons: [
          { title: '오리엔테이션', duration: '10:00', preview: true, thumb: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=120&h=68&fit=crop' },
          { title: '운동 전 준비사항', duration: '08:30', thumb: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=120&h=68&fit=crop' },
        ],
      },
      {
        title: '워밍업 & 기초',
        lessons: [
          { title: '동적 스트레칭', duration: '15:00', preview: true, thumb: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=120&h=68&fit=crop' },
          { title: '관절 가동성 운동', duration: '12:00', thumb: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=120&h=68&fit=crop' },
        ],
      },
      {
        title: '상체 운동',
        lessons: [
          { title: '푸쉬업 변형 5가지', duration: '20:00', thumb: 'https://images.unsplash.com/photo-1598971639058-a25e41d0a88e?w=120&h=68&fit=crop' },
          { title: '딥스 & 플랭크', duration: '18:00', thumb: 'https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=120&h=68&fit=crop' },
        ],
      },
      {
        title: '하체 운동',
        lessons: [
          { title: '스쿼트 & 런지', duration: '20:00', thumb: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=120&h=68&fit=crop' },
          { title: '힙브릿지 & 글루트킥', duration: '15:00', thumb: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=120&h=68&fit=crop' },
        ],
      },
      {
        title: '코어 & 전신',
        lessons: [
          { title: '코어 집중 루틴', duration: '18:00', thumb: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=120&h=68&fit=crop' },
          { title: '전신 서킷 트레이닝', duration: '25:00', thumb: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=120&h=68&fit=crop' },
        ],
      },
    ],
    reviews: [
      { name: '운동초보', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face', rating: 5, date: '2025.12.15', text: '진짜 초보자한테 딱 맞는 강의예요! 설명이 너무 친절해서 하나도 어렵지 않았어요.' },
      { name: '헬린이탈출', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', rating: 5, date: '2025.11.28', text: '매일 15분씩 따라하고 있는데 확실히 체력이 좋아지는 게 느껴집니다. 강추합니다!' },
      { name: '직장인A', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', rating: 4, date: '2025.11.10', text: '퇴근 후에 짧게 할 수 있어서 좋아요. 기구 없이 가능한 점이 최고입니다.' },
    ],
    price: 69000,
    originalPrice: 129000,
  },
  '2': {
    title: '필라테스 입문',
    subtitle: '올바른 호흡과 자세로 시작하는 필라테스',
    instructor: '박지영',
    instructorAvatar: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face',
    instructorBio: '국제 필라테스 자격 보유. 바디채널 강남점 필라테스 전담 강사로 8년간 활동하며 체형교정 전문가로 활동 중입니다.',
    instructorFollowers: '4,122',
    level: '초급',
    duration: '총 2시간 16분',
    lessonCount: 8,
    studentCount: '2,891',
    rating: 4.8,
    reviewCount: 215,
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=450&fit=crop',
    description: '필라테스의 기본 원리와 동작을 배우는 입문 과정입니다. 올바른 호흡법과 자세를 단계별로 익혀, 근력과 유연성을 동시에 향상시킬 수 있습니다.',
    highlights: ['6가지 필라테스 기본 원리 습득', '횡격막·측흉식 호흡법 마스터', '매트 필라테스 기본 동작 20가지', '체형 교정에 효과적인 루틴'],
    chapters: [
      {
        title: '필라테스 이해하기',
        lessons: [
          { title: '필라테스란?', duration: '12:00', preview: true, thumb: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=120&h=68&fit=crop' },
          { title: '6가지 기본 원리', duration: '10:00', thumb: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=120&h=68&fit=crop' },
        ],
      },
      {
        title: '호흡과 기본 자세',
        lessons: [
          { title: '횡격막 호흡법', duration: '15:00', preview: true, thumb: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=120&h=68&fit=crop' },
          { title: '뉴트럴 스파인 & 임프린트', duration: '18:00', thumb: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=120&h=68&fit=crop' },
        ],
      },
      {
        title: '매트 운동',
        lessons: [
          { title: '헌드레드 & 롤업', duration: '20:00', thumb: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=120&h=68&fit=crop' },
          { title: '싱글레그 서클', duration: '15:00', thumb: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=120&h=68&fit=crop' },
          { title: '크리스크로스 & 스완', duration: '20:00', thumb: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=120&h=68&fit=crop' },
          { title: '사이드킥 시리즈', duration: '16:00', thumb: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=120&h=68&fit=crop' },
        ],
      },
    ],
    reviews: [
      { name: '요가러버', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face', rating: 5, date: '2025.12.20', text: '호흡법 설명이 정말 자세해서 좋았어요. 필라테스 처음인데 잘 따라갈 수 있었습니다.' },
      { name: '체형교정중', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', rating: 5, date: '2025.12.01', text: '거북목이 심했는데 2주 만에 확실히 나아진 느낌이에요!' },
      { name: '필라입문', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', rating: 4, date: '2025.11.15', text: '동작 하나하나 천천히 알려주셔서 초보자한테 딱이에요.' },
    ],
    price: 59000,
    originalPrice: 109000,
  },
}

const defaultClass: ClassInfo = {
  title: '온라인 강의',
  subtitle: '온라인으로 배우는 운동',
  instructor: '강사',
  instructorAvatar: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=200&h=200&fit=crop&crop=face',
  instructorBio: '전문 트레이너입니다.',
  instructorFollowers: '100',
  level: '초급',
  duration: '1시간',
  lessonCount: 5,
  studentCount: '100',
  rating: 4.5,
  reviewCount: 10,
  imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=450&fit=crop',
  description: '온라인 강의입니다.',
  highlights: ['기초부터 시작'],
  chapters: [{ title: '기본', lessons: [{ title: '강의 1', duration: '10:00', thumb: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=120&h=68&fit=crop' }] }],
  reviews: [{ name: '수강생', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face', rating: 5, date: '2025.12.01', text: '좋은 강의였습니다.' }],
  price: 49000,
  originalPrice: 99000,
}

/* ── helpers ─────────────────────────────────────────── */
const tabs = ['클래스 소개', '커리큘럼', '크리에이터', '후기'] as const
type Tab = typeof tabs[number]

function IconStarFilledStyled({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor" stroke="none">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

/* ── component ──────────────────────────────────────── */
export const ClassDetailPage = () => {
  const { id } = useParams()
  const data = classesData[id || ''] || defaultClass
  const [activeTab, setActiveTab] = useState<Tab>('클래스 소개')
  const [openChapters, setOpenChapters] = useState<Set<number>>(new Set([0]))
  const [liked, setLiked] = useState(false)

  const sectionRefs = useRef<Record<Tab, HTMLDivElement | null>>({
    '클래스 소개': null,
    '커리큘럼': null,
    '크리에이터': null,
    '후기': null,
  })

  const tabBarRef = useRef<HTMLDivElement>(null)

  const scrollToSection = (tab: Tab) => {
    setActiveTab(tab)
    const el = sectionRefs.current[tab]
    if (el) {
      const offset = (tabBarRef.current?.getBoundingClientRect().height || 48) + 56
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  const toggleChapter = (i: number) => {
    setOpenChapters((prev) => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })
  }

  const discount = Math.round((1 - data.price / data.originalPrice) * 100)

  /* scroll spy */
  useEffect(() => {
    const handleScroll = () => {
      const offset = (tabBarRef.current?.getBoundingClientRect().height || 48) + 60
      for (const tab of [...tabs].reverse()) {
        const el = sectionRefs.current[tab]
        if (el) {
          const top = el.getBoundingClientRect().top
          if (top <= offset) {
            setActiveTab(tab)
            return
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const header = (
    <SubPageHeader
      title={data.title}
      right={
        <div className="flex gap-1">
          <button className="icon-btn">
            <IconShare className="w-[18px] h-[18px] stroke-ink stroke-2" />
          </button>
          <button onClick={() => setLiked(!liked)} className="icon-btn">
            <IconHeart className={`w-[18px] h-[18px] stroke-2 ${liked ? 'fill-semantic-like stroke-semantic-like' : 'fill-none stroke-ink'}`} />
          </button>
        </div>
      }
    />
  )

  return (
    <PageLayout header={header} hideBottomNav className="!px-0 !py-0 !pb-[70px]">
      {/* ── Hero Image ── */}
      <div className="relative aspect-video">
        <img src={data.imageUrl} alt={data.title} className="w-full h-full object-cover" />
        <button className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors">
          <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center">
            <IconPlay className="w-6 h-6 fill-ink stroke-ink ml-0.5" />
          </div>
        </button>
      </div>

      {/* ── Class Info ── */}
      <div className="px-5 pt-5 pb-4">
        <div className="flex items-center gap-1.5 mb-2">
          <span className="px-2 py-0.5 bg-primary-50 text-primary text-label font-bold rounded">{data.level}</span>
          <span className="px-2 py-0.5 bg-surface-muted text-ink-secondary text-label font-bold rounded">{data.lessonCount}강</span>
        </div>
        <h1 className="text-display font-bold leading-tight text-ink mb-1">{data.title}</h1>
        <p className="text-body text-ink-secondary mb-4">{data.subtitle}</p>

        {/* Instructor row */}
        <div className="flex items-center gap-2 mb-4">
          <img src={data.instructorAvatar} alt={data.instructor} className="w-7 h-7 rounded-full object-cover" />
          <span className="text-body font-medium text-ink">{data.instructor}</span>
        </div>

        {/* Rating + stats */}
        <div className="flex items-center gap-3 text-body">
          <div className="flex items-center gap-1">
            <IconStarFilledStyled className="text-primary" style={{ width: 14, height: 14 }} />
            <span className="font-bold text-ink">{data.rating}</span>
            <span className="text-ink-tertiary">({data.reviewCount})</span>
          </div>
          <span className="text-ink-disabled">|</span>
          <div className="flex items-center gap-1 text-ink-secondary">
            <IconClock className="w-3.5 h-3.5 stroke-ink-tertiary stroke-2" />
            <span>{data.duration}</span>
          </div>
          <span className="text-ink-disabled">|</span>
          <span className="text-ink-secondary">{data.studentCount}명 수강</span>
        </div>
      </div>

      {/* ── Sticky Tabs ── */}
      <div ref={tabBarRef} className="sticky top-[48px] z-40 bg-white border-b border-border">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => scrollToSection(tab)}
              className={`flex-1 py-3 text-body font-semibold text-center transition-colors relative ${
                activeTab === tab ? 'text-ink' : 'text-ink-tertiary'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-[2px] bg-ink rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── 클래스 소개 ── */}
      <div ref={(el) => { sectionRefs.current['클래스 소개'] = el }} className="px-5 py-6 border-b border-border-light">
        <p className="text-body text-ink-secondary leading-relaxed mb-6">{data.description}</p>

        <div className="bg-surface-subtle rounded-xl p-4">
          <h3 className="text-body font-bold text-ink mb-3">이런 걸 배워요</h3>
          <ul className="space-y-2.5">
            {data.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2.5 text-body text-ink-secondary">
                <span className="w-5 h-5 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-px">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                </span>
                {h}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── 커리큘럼 ── */}
      <div ref={(el) => { sectionRefs.current['커리큘럼'] = el }} className="px-5 py-6 border-b border-border-light">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-title font-bold text-ink">커리큘럼</h2>
          <span className="text-label text-ink-tertiary">{data.chapters.reduce((a, c) => a + c.lessons.length, 0)}개 강의 · {data.duration}</span>
        </div>

        <div className="space-y-0">
          {data.chapters.map((chapter, ci) => {
            const isOpen = openChapters.has(ci)
            return (
              <div key={ci} className="border border-border rounded-xl mb-2 overflow-hidden">
                {/* chapter header */}
                <button
                  onClick={() => toggleChapter(ci)}
                  className="w-full flex items-center justify-between px-4 py-3.5 bg-surface-subtle hover:bg-surface-muted transition-colors"
                >
                  <div className="flex items-center gap-2 text-left">
                    <span className="text-label font-bold text-primary">섹션 {ci + 1}</span>
                    <span className="text-body font-semibold text-ink">{chapter.title}</span>
                    <span className="text-label text-ink-tertiary">{chapter.lessons.length}강</span>
                  </div>
                  <IconChevronDown className={`w-4 h-4 stroke-ink-tertiary stroke-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* lessons */}
                <div className={`transition-all duration-200 ${isOpen ? 'max-h-[500px]' : 'max-h-0'} overflow-hidden`}>
                  {chapter.lessons.map((lesson, li) => (
                    <div key={li} className="flex items-center justify-between px-4 py-3 border-t border-border-light">
                      <div className="flex items-center gap-3">
                        <div className="relative w-[60px] h-[34px] rounded-md overflow-hidden flex-shrink-0 bg-surface-muted">
                          <img src={lesson.thumb} alt={lesson.title} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <IconPlay className="w-3 h-3 fill-white stroke-white ml-px" />
                          </div>
                        </div>
                        <div>
                          <p className="text-body text-ink">{lesson.title}</p>
                          <p className="text-label text-ink-tertiary">{lesson.duration}</p>
                        </div>
                      </div>
                      {lesson.preview && (
                        <span className="px-2 py-0.5 border border-primary text-primary text-caption font-bold rounded flex-shrink-0">미리보기</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── 크리에이터 ── */}
      <div ref={(el) => { sectionRefs.current['크리에이터'] = el }} className="px-5 py-6 border-b border-border-light">
        <h2 className="text-title font-bold text-ink mb-4">크리에이터</h2>
        <div className="flex items-center gap-3 mb-4">
          <img src={data.instructorAvatar} alt={data.instructor} className="w-14 h-14 rounded-full object-cover" />
          <div>
            <p className="text-title font-bold text-ink">{data.instructor}</p>
            <p className="text-label text-ink-tertiary">팔로워 {data.instructorFollowers}명</p>
          </div>
        </div>
        <p className="text-body text-ink-secondary leading-relaxed mb-4">{data.instructorBio}</p>
        <button className="w-full py-2.5 border border-border rounded-lg text-body font-semibold text-ink hover:bg-surface-subtle transition-colors">
          크리에이터 프로필
        </button>
      </div>

      {/* ── 후기 ── */}
      <div ref={(el) => { sectionRefs.current['후기'] = el }} className="px-5 py-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-title font-bold text-ink">수강생 후기</h2>
          <span className="text-label text-ink-tertiary">{data.reviewCount}개</span>
        </div>

        {/* rating summary */}
        <div className="flex items-center gap-4 mb-6 p-4 bg-surface-subtle rounded-xl">
          <div className="text-center">
            <p className="text-[28px] font-bold text-ink">{data.rating}</p>
            <div className="flex gap-0.5 justify-center mb-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <IconStarFilledStyled
                  key={i}
                  className={i <= Math.round(data.rating) ? 'text-primary' : 'text-ink-disabled'}
                  style={{ width: 12, height: 12 }}
                />
              ))}
            </div>
            <p className="text-label text-ink-tertiary">{data.reviewCount}개 평가</p>
          </div>
          <div className="flex-1 space-y-1">
            {[5, 4, 3, 2, 1].map((star) => {
              const pct = star === 5 ? 82 : star === 4 ? 14 : star === 3 ? 3 : star === 2 ? 1 : 0
              return (
                <div key={star} className="flex items-center gap-2">
                  <span className="text-caption text-ink-tertiary w-3">{star}</span>
                  <div className="flex-1 h-[6px] bg-ink-disabled rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* review list */}
        <div className="space-y-4">
          {data.reviews.map((review, i) => (
            <div key={i} className="pb-4 border-b border-border-light last:border-0 last:pb-0">
              <div className="flex items-center gap-2.5 mb-2">
                <img src={review.avatar} alt={review.name} className="w-8 h-8 rounded-full object-cover" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-body font-semibold text-ink">{review.name}</span>
                    <span className="text-label text-ink-tertiary">{review.date}</span>
                  </div>
                  <div className="flex gap-0.5 mt-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <IconStarFilledStyled
                        key={s}
                        className={s <= review.rating ? 'text-primary' : 'text-ink-disabled'}
                        style={{ width: 10, height: 10 }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-body text-ink-secondary leading-relaxed">{review.text}</p>
            </div>
          ))}
        </div>

        <button className="w-full py-3 mt-4 border border-border rounded-lg text-body font-semibold text-ink hover:bg-surface-subtle transition-colors">
          후기 더보기
        </button>
      </div>

      {/* ── Bottom CTA ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border px-5 py-3 flex items-center gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-1.5">
            <span className="text-body font-bold text-primary">{discount}%</span>
            <span className="text-label text-ink-tertiary line-through">{data.originalPrice.toLocaleString()}원</span>
          </div>
          <p className="text-heading font-bold text-ink">{data.price.toLocaleString()}원</p>
        </div>
        <button className="px-8 py-3.5 bg-primary text-white text-body font-bold rounded-xl hover:bg-primary-dark transition-colors">
          바로 수강하기
        </button>
      </div>
    </PageLayout>
  )
}
