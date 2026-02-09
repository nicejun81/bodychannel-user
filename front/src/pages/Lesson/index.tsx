import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BottomNav, TrainerListItem, SectionHeader } from '../../components'
import { IconSearch, IconChevronRight } from '../../components/Icons'

const filterTabs = [
  { id: 'all', label: '전체' },
  { id: 'pt', label: 'PT' },
  { id: 'group', label: '그룹수업' },
  { id: 'pilates', label: '필라테스' },
  { id: 'yoga', label: '요가' },
]

const myLessons = [
  { id: 1, status: '이용중', trainer: '최강민 강사', remain: '8회 남음', variant: 'primary' },
  { id: 2, status: '이용중', trainer: '박지영 강사', remain: '3회 남음', variant: 'secondary' },
  { id: 3, status: '대기중', trainer: '정서연 강사', remain: '10회권', variant: 'waiting' },
]

const trainers = [
  {
    id: 1,
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&h=200&fit=crop',
    name: '최강민 강사',
    category: 'PT',
    categoryColor: 'gymground' as const,
    gym: '바디채널 강남점',
    rating: 4.9,
    reviewCount: 127,
    trialInfo: '10회 / 66,000원',
  },
  {
    id: 2,
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=200&h=200&fit=crop',
    name: '박지영 강사',
    category: '바레톤',
    categoryColor: 'bareton' as const,
    gym: '바디채널 강남점',
    rating: 4.7,
    reviewCount: 64,
    trialInfo: '10회 / 66,000원',
  },
  {
    id: 3,
    imageUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=200&h=200&fit=crop',
    name: '한동훈 강사',
    category: '히트35',
    categoryColor: 'hit35' as const,
    gym: '바디채널 역삼점',
    rating: 4.9,
    reviewCount: 93,
    trialInfo: '10회 / 66,000원',
  },
  {
    id: 4,
    imageUrl: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=200&h=200&fit=crop',
    name: '이준혁 강사',
    category: '짐그라운드',
    categoryColor: 'gymground' as const,
    gym: '바디채널 판교점',
    rating: 4.6,
    reviewCount: 58,
    trialInfo: '10회 / 66,000원',
  },
  {
    id: 5,
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop',
    name: '정서연 강사',
    category: '필라테스',
    categoryColor: 'bareton' as const,
    gym: '바디채널 서초점',
    rating: 4.8,
    reviewCount: 89,
    trialInfo: '10회 / 66,000원',
  },
  {
    id: 6,
    imageUrl: 'https://images.unsplash.com/photo-1549476464-37392f717541?w=200&h=200&fit=crop',
    name: '김태현 강사',
    category: 'PT',
    categoryColor: 'gymground' as const,
    gym: '바디채널 선릉점',
    rating: 4.7,
    reviewCount: 72,
    trialInfo: '10회 / 66,000원',
  },
]

export const LessonPage = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('all')

  return (
    <div className="min-h-screen bg-white pb-[100px]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-5 py-4">
          <button onClick={() => window.history.back()} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
            <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-[var(--black)] stroke-2 fill-none">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex-1 text-center text-lg font-bold">레슨권</div>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
            <IconSearch className="w-[22px] h-[22px] stroke-[var(--black)] stroke-2" />
          </button>
        </div>
      </header>

      {/* Filter Tabs */}
      <div className="flex gap-2 px-5 py-3 overflow-x-auto border-b border-gray-100 hide-scrollbar">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3.5 py-2 border rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'bg-[var(--black)] border-[var(--black)] text-white'
                : 'bg-white border-gray-200 text-[var(--black)] hover:border-gray-400'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* My Lessons Banner */}
      <div className="flex gap-3 px-5 py-4 overflow-x-auto hide-scrollbar">
        {myLessons.map((lesson) => (
          <div
            key={lesson.id}
            className={`min-w-[280px] flex-shrink-0 flex justify-between items-center p-3.5 rounded-xl cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg ${
              lesson.variant === 'waiting'
                ? 'bg-white border-2 border-gray-300'
                : lesson.variant === 'secondary'
                ? 'bg-gray-600'
                : 'bg-[var(--black)]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className={`px-2 py-1 text-[10px] font-bold rounded ${
                lesson.variant === 'waiting' ? 'bg-gray-400 text-white' : 'bg-[var(--primary)] text-white'
              }`}>
                {lesson.status}
              </span>
              <span className={lesson.variant === 'waiting' ? 'text-[var(--black)] text-sm font-semibold' : 'text-white text-sm font-semibold'}>
                {lesson.trainer}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className={lesson.variant === 'waiting' ? 'text-gray-600 text-sm font-semibold' : 'text-[var(--primary)] text-sm font-semibold'}>
                {lesson.remain}
              </span>
              <IconChevronRight className="w-4 h-4 stroke-gray-400 stroke-[1.5]" />
            </div>
          </div>
        ))}
      </div>

      <main className="px-5">
        {/* Trainer List */}
        <section className="py-4">
          <SectionHeader title="강사 목록" showMore={false} />
          <div className="p-0">
            {trainers.map((trainer) => (
              <TrainerListItem
                key={trainer.id}
                imageUrl={trainer.imageUrl}
                name={trainer.name}
                category={trainer.category}
                categoryColor={trainer.categoryColor}
                gym={trainer.gym}
                rating={trainer.rating}
                reviewCount={trainer.reviewCount}
                trialInfo={trainer.trialInfo}
                onClick={() => navigate(`/trainer/${trainer.id}`)}
              />
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  )
}
