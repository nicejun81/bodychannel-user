import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageLayout, SubPageHeader, ScrollRow, TrainerListItem, SectionHeader, FilterTabs } from '../../components'
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
    description: '체계적인 1:1 맞춤 웨이트 & 체형 관리',
    todayTime: '오늘 09:00, 15:00, 20:00',
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
    description: '발레 동작 기반 체형 교정 & 코어 강화 프로그램',
    todayTime: '오늘 14:00, 19:30',
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
    description: '35분 고강도 인터벌 트레이닝으로 칼로리 폭발',
    todayTime: '오늘 10:00, 18:00',
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
    description: '소도구 활용 전신 근력 & 체력 향상 서킷',
    todayTime: '오늘 11:00, 20:00',
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
    description: '코어 안정성과 유연성 향상 필라테스',
    todayTime: '오늘 13:00, 17:00',
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
    description: '다이어트 특화 근력 트레이닝 & 식단 코칭',
    todayTime: '오늘 10:00, 16:00, 21:00',
    rating: 4.7,
    reviewCount: 72,
    trialInfo: '10회 / 66,000원',
  },
]

export const LessonPage = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('all')

  const header = (
    <SubPageHeader
      title="레슨권"
      showChat
      right={
        <button className="icon-btn">
          <IconSearch className="w-[22px] h-[22px] stroke-ink stroke-2" />
        </button>
      }
    >
      <FilterTabs
        tabs={filterTabs.map(t => ({ key: t.id, label: t.label }))}
        active={activeTab}
        onSelect={setActiveTab}
        scrollable
        className="border-t border-border-light"
      />
    </SubPageHeader>
  )

  return (
    <PageLayout header={header}>
      {/* My Lessons Banner */}
      <ScrollRow className="mb-section">
        {myLessons.map((lesson) => (
          <div
            key={lesson.id}
            className={`min-w-[280px] flex-shrink-0 flex justify-between items-center p-3.5 rounded-card cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-elevated ${
              lesson.variant === 'waiting'
                ? 'bg-surface border-2 border-ink-disabled'
                : lesson.variant === 'secondary'
                ? 'bg-ink-secondary'
                : 'bg-ink'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className={`badge ${
                lesson.variant === 'waiting' ? 'bg-ink-placeholder text-white' : 'bg-primary text-white'
              }`}>
                {lesson.status}
              </span>
              <span className={lesson.variant === 'waiting' ? 'text-ink text-body font-semibold' : 'text-white text-body font-semibold'}>
                {lesson.trainer}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className={lesson.variant === 'waiting' ? 'text-ink-secondary text-body font-semibold' : 'text-primary text-body font-semibold'}>
                {lesson.remain}
              </span>
              <IconChevronRight className="w-4 h-4 stroke-ink-placeholder stroke-[1.5]" />
            </div>
          </div>
        ))}
      </ScrollRow>

      {/* Trainer List */}
      <section>
        <SectionHeader title="강사 목록" showMore={false} />
        {trainers.map((trainer) => (
          <TrainerListItem
            key={trainer.id}
            imageUrl={trainer.imageUrl}
            name={trainer.name}
            category={trainer.category}
            categoryColor={trainer.categoryColor}
            description={trainer.description}
            todayTime={trainer.todayTime}
            rating={trainer.rating}
            reviewCount={trainer.reviewCount}
            trialInfo={trainer.trialInfo}
            onClick={() => navigate(`/trainer/${trainer.id}`)}
          />
        ))}
      </section>
    </PageLayout>
  )
}
