import { useState } from 'react'
import { PageLayout, SubPageHeader, ScrollRow, TrainerListItem, FilterTabs, EmptyState } from '../../components'
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

interface LessonScheduleItem {
  time: string; name: string; instructor: string; avatar: string; category: string
  categoryColor: 'bareton' | 'hit35' | 'gymground' | 'pt'; hasTicket?: boolean
}

const lessonSchedule: Record<string, LessonScheduleItem[]> = {
  '월': [
    { time: '09:00', name: '1:1 웨이트 트레이닝', instructor: '최강민', avatar: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&h=200&fit=crop', category: 'PT', categoryColor: 'pt', hasTicket: true },
    { time: '14:00', name: '바레톤 체형교정', instructor: '박지영', avatar: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=200&h=200&fit=crop', category: '바레톤', categoryColor: 'bareton', hasTicket: true },
    { time: '18:00', name: 'HIIT 인터벌', instructor: '한동훈', avatar: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=200&h=200&fit=crop', category: '히트35', categoryColor: 'hit35', hasTicket: false },
    { time: '20:00', name: '전신 서킷', instructor: '이준혁', avatar: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=200&h=200&fit=crop', category: '짐그라운드', categoryColor: 'gymground', hasTicket: false },
  ],
  '화': [
    { time: '10:00', name: '다이어트 PT', instructor: '김태현', avatar: 'https://images.unsplash.com/photo-1549476464-37392f717541?w=200&h=200&fit=crop', category: 'PT', categoryColor: 'pt', hasTicket: false },
    { time: '13:00', name: '코어 필라테스', instructor: '정서연', avatar: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop', category: '필라테스', categoryColor: 'bareton', hasTicket: true },
    { time: '15:00', name: '1:1 웨이트 트레이닝', instructor: '최강민', avatar: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&h=200&fit=crop', category: 'PT', categoryColor: 'pt', hasTicket: true },
    { time: '19:30', name: '바레톤 체형교정', instructor: '박지영', avatar: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=200&h=200&fit=crop', category: '바레톤', categoryColor: 'bareton', hasTicket: true },
  ],
  '수': [
    { time: '09:00', name: 'HIIT 인터벌', instructor: '한동훈', avatar: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=200&h=200&fit=crop', category: '히트35', categoryColor: 'hit35', hasTicket: false },
    { time: '12:00', name: '바레톤 체형교정', instructor: '박지영', avatar: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=200&h=200&fit=crop', category: '바레톤', categoryColor: 'bareton', hasTicket: true },
    { time: '17:00', name: '코어 필라테스', instructor: '정서연', avatar: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop', category: '필라테스', categoryColor: 'bareton', hasTicket: true },
    { time: '20:00', name: '전신 서킷', instructor: '이준혁', avatar: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=200&h=200&fit=crop', category: '짐그라운드', categoryColor: 'gymground', hasTicket: false },
  ],
  '목': [
    { time: '09:00', name: '1:1 웨이트 트레이닝', instructor: '최강민', avatar: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&h=200&fit=crop', category: 'PT', categoryColor: 'pt', hasTicket: true },
    { time: '10:00', name: '다이어트 PT', instructor: '김태현', avatar: 'https://images.unsplash.com/photo-1549476464-37392f717541?w=200&h=200&fit=crop', category: 'PT', categoryColor: 'pt', hasTicket: false },
    { time: '18:00', name: 'HIIT 인터벌', instructor: '한동훈', avatar: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=200&h=200&fit=crop', category: '히트35', categoryColor: 'hit35', hasTicket: false },
  ],
  '금': [
    { time: '14:00', name: '바레톤 체형교정', instructor: '박지영', avatar: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=200&h=200&fit=crop', category: '바레톤', categoryColor: 'bareton', hasTicket: true },
    { time: '16:00', name: '다이어트 PT', instructor: '김태현', avatar: 'https://images.unsplash.com/photo-1549476464-37392f717541?w=200&h=200&fit=crop', category: 'PT', categoryColor: 'pt', hasTicket: false },
    { time: '20:00', name: '1:1 웨이트 트레이닝', instructor: '최강민', avatar: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&h=200&fit=crop', category: 'PT', categoryColor: 'pt', hasTicket: true },
  ],
  '토': [
    { time: '10:00', name: '전신 서킷', instructor: '이준혁', avatar: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=200&h=200&fit=crop', category: '짐그라운드', categoryColor: 'gymground', hasTicket: false },
    { time: '14:00', name: '코어 필라테스', instructor: '정서연', avatar: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop', category: '필라테스', categoryColor: 'bareton', hasTicket: true },
  ],
  '일': [
    { time: '11:00', name: '1:1 웨이트 트레이닝', instructor: '최강민', avatar: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&h=200&fit=crop', category: 'PT', categoryColor: 'pt', hasTicket: true },
  ],
}

const dayNames = ['일', '월', '화', '수', '목', '금', '토']

function getLessonScheduleDays() {
  const days = []
  const today = new Date()
  for (let i = 0; i < 14; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    const dayKey = dayNames[d.getDay()]
    const label = `${d.getMonth() + 1}/${d.getDate()}`
    days.push({ dayKey, label, isToday: i === 0 })
  }
  return days
}

export const LessonPage = () => {
  const [activeTab, setActiveTab] = useState('all')
  const [selectedDateIdx, setSelectedDateIdx] = useState(0)
  const scheduleDays = getLessonScheduleDays()
  const selectedDay = scheduleDays[selectedDateIdx].dayKey

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

      <div className="h-2 bg-surface-muted -mx-page" />

      {/* Lesson Schedule */}
      <section className="py-section">
        <h3 className="text-heading font-bold text-ink mb-4">강사 목록</h3>
        <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-4">
          {scheduleDays.map((d, i) => (
            <button key={i} onClick={() => setSelectedDateIdx(i)} className={`flex-shrink-0 w-[52px] py-2 rounded-xl text-center transition-colors ${selectedDateIdx === i ? 'bg-primary text-white' : 'bg-surface-muted text-ink-secondary hover:bg-surface-subtle'}`}>
              <span className="text-label block">{d.isToday ? '오늘' : d.label}</span>
              <span className="text-label font-bold block">{d.dayKey}</span>
            </button>
          ))}
        </div>
        <div>
          {(lessonSchedule[selectedDay] || []).length > 0 ? (lessonSchedule[selectedDay] || []).map((s, i) => (
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
                ? <span className="px-3 py-1 bg-primary text-white text-label font-bold rounded-lg">예약</span>
                : <span className="px-3 py-1 border border-primary text-primary text-label font-bold rounded-lg">구매</span>
              }
            />
          )) : (
            <EmptyState message={`${scheduleDays[selectedDateIdx].isToday ? '오늘은' : scheduleDays[selectedDateIdx].label + '(' + selectedDay + ')은'} 레슨이 없습니다`} />
          )}
        </div>
      </section>
    </PageLayout>
  )
}
