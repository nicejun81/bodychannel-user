import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageLayout, SubPageHeader, EmptyState } from '../../components'
import { IconChevronLeft, IconChevronRight } from '../../components/Icons'

const weekdays = ['일', '월', '화', '수', '목', '금', '토']

interface Reservation {
  id: number
  date: string // YYYY-MM-DD
  time: string
  endTime: string
  trainer: string
  avatar: string
  type: string
  typeBg: string
  typeText: string
  location: string
  status: 'confirmed' | 'pending' | 'completed'
}

function toDateKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function addMinutes(time: string, min: number) {
  const [h, m] = time.split(':').map(Number)
  const total = h * 60 + m + min
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`
}

const trainers = [
  { name: '최강민', avatar: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&h=200&fit=crop', type: 'PT', typeBg: 'bg-primary-50', typeText: 'text-primary' },
  { name: '박지영', avatar: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=200&h=200&fit=crop', type: '바레톤', typeBg: 'bg-pink-50', typeText: 'text-category-bareton' },
  { name: '한동훈', avatar: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=200&h=200&fit=crop', type: '히트35', typeBg: 'bg-blue-50', typeText: 'text-category-hit35' },
  { name: '정서연', avatar: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop', type: '바레톤', typeBg: 'bg-pink-50', typeText: 'text-category-bareton' },
  { name: '이준혁', avatar: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=200&h=200&fit=crop', type: '짐그라운드', typeBg: 'bg-green-50', typeText: 'text-category-gymground' },
  { name: '오지훈', avatar: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=200&h=200&fit=crop', type: 'PT', typeBg: 'bg-primary-50', typeText: 'text-primary' },
] as const

// 수동으로 만든 자연스러운 예약 데이터
function buildReservations(): Reservation[] {
  const today = new Date()
  const items: Reservation[] = []
  let id = 1

  const make = (dayOffset: number, time: string, trainerIdx: number, location: string, status: Reservation['status']): Reservation => {
    const d = new Date(today)
    d.setDate(today.getDate() + dayOffset)
    const tr = trainers[trainerIdx]
    const duration = tr.type === 'PT' ? 50 : tr.type === '히트35' ? 35 : 50
    return {
      id: id++,
      date: toDateKey(d),
      time,
      endTime: addMinutes(time, duration),
      trainer: tr.name,
      avatar: tr.avatar,
      type: tr.type,
      typeBg: tr.typeBg,
      typeText: tr.typeText,
      location,
      status,
    }
  }

  // 과거 (완료)
  items.push(make(-5, '10:00', 0, '바디채널 강남점', 'completed'))
  items.push(make(-4, '14:00', 1, '바디채널 강남점', 'completed'))
  items.push(make(-3, '09:00', 0, '바디채널 강남점', 'completed'))
  items.push(make(-3, '18:00', 2, '바디채널 역삼점', 'completed'))
  items.push(make(-2, '11:00', 3, '바디채널 강남점', 'completed'))
  items.push(make(-1, '10:00', 0, '바디채널 강남점', 'completed'))
  items.push(make(-1, '19:00', 4, '바디채널 서초점', 'completed'))

  // 오늘
  items.push(make(0, '09:00', 0, '바디채널 강남점', 'confirmed'))
  items.push(make(0, '14:00', 1, '바디채널 강남점', 'pending'))
  items.push(make(0, '19:00', 2, '바디채널 역삼점', 'confirmed'))

  // 미래
  items.push(make(1, '10:00', 0, '바디채널 강남점', 'confirmed'))
  items.push(make(2, '14:00', 3, '바디채널 강남점', 'confirmed'))
  items.push(make(2, '19:30', 2, '바디채널 역삼점', 'pending'))
  items.push(make(3, '09:00', 0, '바디채널 강남점', 'confirmed'))
  items.push(make(4, '11:00', 1, '바디채널 강남점', 'pending'))
  items.push(make(5, '18:00', 4, '바디채널 서초점', 'confirmed'))
  items.push(make(6, '10:00', 0, '바디채널 강남점', 'confirmed'))
  items.push(make(7, '14:00', 5, '바디채널 판교점', 'pending'))
  items.push(make(8, '09:00', 0, '바디채널 강남점', 'confirmed'))
  items.push(make(8, '19:00', 2, '바디채널 역삼점', 'pending'))
  items.push(make(10, '10:00', 3, '바디채널 강남점', 'pending'))
  items.push(make(12, '14:00', 1, '바디채널 강남점', 'pending'))
  items.push(make(14, '09:00', 0, '바디채널 강남점', 'pending'))
  items.push(make(14, '18:00', 4, '바디채널 서초점', 'pending'))

  return items
}

const allReservations = buildReservations()

const trainerIdMap: Record<string, string> = {
  '최강민': '1',
  '박지영': '2',
  '한동훈': '3',
  '이준혁': '4',
  '정서연': '5',
  '김태현': '6',
  '오지훈': '1',
}

const statusMap = {
  confirmed: { label: '확정', dot: 'bg-semantic-online', badge: 'bg-semantic-online/15 text-semantic-online' },
  pending: { label: '대기', dot: 'bg-semantic-star', badge: 'bg-semantic-star/15 text-semantic-star' },
  completed: { label: '완료', dot: 'bg-ink-disabled', badge: 'bg-surface-muted text-ink-tertiary' },
}

export const ReservationPage = () => {
  const navigate = useNavigate()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [activeTab, setActiveTab] = useState<'calendar' | 'list'>('calendar')

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const lastDate = new Date(year, month + 1, 0).getDate()

  const reservationMap = useMemo(() => {
    const map: Record<string, Reservation[]> = {}
    allReservations.forEach(r => {
      if (!map[r.date]) map[r.date] = []
      map[r.date].push(r)
    })
    Object.values(map).forEach(arr => arr.sort((a, b) => a.time.localeCompare(b.time)))
    return map
  }, [])

  const selectedDateKey = toDateKey(selectedDate)
  const selectedReservations = reservationMap[selectedDateKey] || []

  const upcomingList = useMemo(() => {
    const todayKey = toDateKey(new Date())
    const future = allReservations
      .filter(r => r.date >= todayKey && r.status !== 'completed')
      .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))

    // Group by date
    const groups: { date: string; label: string; items: Reservation[] }[] = []
    future.forEach(r => {
      const last = groups[groups.length - 1]
      if (last && last.date === r.date) {
        last.items.push(r)
      } else {
        const d = new Date(r.date + 'T00:00:00')
        const isToday = r.date === todayKey
        const label = isToday
          ? '오늘'
          : `${d.getMonth() + 1}월 ${d.getDate()}일 (${weekdays[d.getDay()]})`
        groups.push({ date: r.date, label, items: [r] })
      }
    })
    return groups
  }, [])

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1))
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1))
  const goToday = () => {
    const t = new Date()
    setCurrentDate(new Date(t.getFullYear(), t.getMonth(), 1))
    setSelectedDate(t)
  }

  const isToday = (day: number) => {
    const t = new Date()
    return day === t.getDate() && month === t.getMonth() && year === t.getFullYear()
  }
  const isSelected = (day: number) =>
    day === selectedDate.getDate() && month === selectedDate.getMonth() && year === selectedDate.getFullYear()

  const isCurrentMonth = year === new Date().getFullYear() && month === new Date().getMonth()

  const confirmedCount = upcomingList.reduce((s, g) => s + g.items.filter(r => r.status === 'confirmed').length, 0)
  const pendingCount = upcomingList.reduce((s, g) => s + g.items.filter(r => r.status === 'pending').length, 0)

  const header = (
    <SubPageHeader title="예약" showChat>
      <div className="flex border-t border-border-light">
        {(['calendar', 'list'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-body font-semibold text-center border-b-2 transition-colors ${
              activeTab === tab
                ? 'text-ink font-bold border-ink'
                : 'text-ink-placeholder border-transparent hover:text-ink-secondary'
            }`}
          >
            {tab === 'calendar' ? '캘린더' : '예약 목록'}
          </button>
        ))}
      </div>
    </SubPageHeader>
  )

  /* ── Card component ── */
  const Card = ({ res, compact }: { res: Reservation; compact?: boolean }) => {
    const st = statusMap[res.status]
    const done = res.status === 'completed'

    return (
      <div className={`flex gap-3 p-3 rounded-card border transition-colors ${
        done ? 'border-border-light opacity-60' : 'border-border hover:border-ink-disabled'
      }`}>
        {/* Time column */}
        <div className="flex flex-col items-center flex-shrink-0 w-[52px]">
          <span className={`text-title font-bold ${done ? 'text-ink-placeholder' : 'text-ink'}`}>{res.time}</span>
          <span className="text-caption text-ink-placeholder">{res.endTime}</span>
        </div>

        <div className="w-px bg-border-light flex-shrink-0" />

        {/* Content */}
        <div className="flex-1 min-w-0 flex items-center gap-2.5">
          <div
            className="flex items-center gap-2.5 flex-1 min-w-0 cursor-pointer"
            onClick={() => {
              const tid = trainerIdMap[res.trainer]
              if (tid) navigate(`/trainer/${tid}`)
            }}
          >
            <img src={res.avatar} alt={res.trainer} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className={`text-body font-bold ${done ? 'text-ink-tertiary' : 'text-ink'}`}>{res.trainer} 강사</span>
                <span className={`px-1.5 py-0.5 text-caption font-semibold rounded ${res.typeBg} ${res.typeText}`}>{res.type}</span>
              </div>
              <p className="text-label text-ink-tertiary truncate mt-0.5">{res.location}</p>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
            <span className={`text-label font-semibold ${done ? 'text-ink-placeholder' : res.status === 'confirmed' ? 'text-semantic-online' : 'text-semantic-star'}`}>
              {st.label}
            </span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <PageLayout header={header}>
      {activeTab === 'calendar' ? (
        <>
          {/* Calendar */}
          <div className="pb-4">
            {/* Month header */}
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <h2 className="text-heading">{year}년 {month + 1}월</h2>
                {!isCurrentMonth && (
                  <button onClick={goToday} className="px-2 py-0.5 text-caption font-semibold text-primary border border-primary rounded-pill">
                    오늘
                  </button>
                )}
              </div>
              <div className="flex gap-1">
                <button onClick={prevMonth} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-muted transition-colors">
                  <IconChevronLeft className="w-4 h-4 stroke-ink-secondary stroke-2" />
                </button>
                <button onClick={nextMonth} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-muted transition-colors">
                  <IconChevronRight className="w-4 h-4 stroke-ink-secondary stroke-2" />
                </button>
              </div>
            </div>

            {/* Weekday headers */}
            <div className="grid grid-cols-7 mb-1">
              {weekdays.map((day, i) => (
                <div key={day} className={`text-center text-caption font-semibold py-1.5 ${
                  i === 0 ? 'text-semantic-like' : i === 6 ? 'text-primary' : 'text-ink-placeholder'
                }`}>
                  {day}
                </div>
              ))}
            </div>

            {/* Days grid */}
            <div className="grid grid-cols-7">
              {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} className="h-10" />)}
              {Array.from({ length: lastDate }).map((_, i) => {
                const day = i + 1
                const today = isToday(day)
                const selected = isSelected(day)
                const key = toDateKey(new Date(year, month, day))
                const dayRes = reservationMap[key] || []
                const count = dayRes.length

                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(new Date(year, month, day))}
                    className="flex flex-col items-center justify-center h-10 relative"
                  >
                    <span className={`w-8 h-8 flex items-center justify-center rounded-full text-body transition-colors ${
                      selected
                        ? 'bg-primary text-white font-bold'
                        : today
                        ? 'border-2 border-primary text-primary font-bold'
                        : 'hover:bg-surface-muted font-medium text-ink'
                    }`}>
                      {day}
                    </span>
                    {count > 0 && (
                      <div className="absolute bottom-0 flex gap-px">
                        {Array.from({ length: Math.min(count, 3) }).map((_, j) => (
                          <span key={j} className={`w-1 h-1 rounded-full ${selected ? 'bg-primary' : 'bg-primary'}`} />
                        ))}
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="h-2 bg-surface-muted -mx-page" />

          {/* Selected date detail */}
          <section className="py-section">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-title font-bold text-ink">
                {selectedDate.getMonth() + 1}월 {selectedDate.getDate()}일 ({weekdays[selectedDate.getDay()]})
              </h3>
              {selectedReservations.length > 0 && (
                <span className="text-label font-medium text-ink-tertiary">{selectedReservations.length}건</span>
              )}
            </div>

            {selectedReservations.length > 0 ? (
              <div className="flex flex-col gap-2">
                {selectedReservations.map(res => <Card key={res.id} res={res} />)}
              </div>
            ) : (
              <EmptyState message="예약된 일정이 없습니다" />
            )}
          </section>
        </>
      ) : (
        /* ── List View ── */
        <>
          {/* Summary */}
          <div className="flex gap-3 mb-section">
            <div className="flex-1 p-3 bg-semantic-online/10 rounded-card text-center">
              <p className="text-display text-semantic-online">{confirmedCount}</p>
              <p className="text-label text-ink-secondary font-medium">확정</p>
            </div>
            <div className="flex-1 p-3 bg-semantic-star/10 rounded-card text-center">
              <p className="text-display text-semantic-star">{pendingCount}</p>
              <p className="text-label text-ink-secondary font-medium">대기</p>
            </div>
          </div>

          {upcomingList.length > 0 ? (
            <div className="flex flex-col gap-5">
              {upcomingList.map(group => (
                <div key={group.date}>
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-body font-bold text-ink">{group.label}</h4>
                    <span className="text-label text-ink-placeholder">{group.items.length}건</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {group.items.map(res => <Card key={res.id} res={res} />)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState message="다가오는 예약이 없습니다" />
          )}
        </>
      )}
    </PageLayout>
  )
}
