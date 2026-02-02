import { useState } from 'react'
import { BottomNav } from '../../components'
import { IconChevronLeft, IconChevronRight } from '../../components/Icons'

const weekdays = ['일', '월', '화', '수', '목', '금', '토']

const reservations = [
  {
    id: 1,
    time: '09:00',
    trainer: '최강민 강사',
    type: 'PT',
    location: '바디채널 강남점',
    status: 'confirmed',
  },
  {
    id: 2,
    time: '14:00',
    trainer: '박지영 강사',
    type: '바레톤',
    location: '바디채널 강남점',
    status: 'pending',
  },
  {
    id: 3,
    time: '19:00',
    trainer: '한동훈 강사',
    type: '히트35',
    location: '바디채널 역삼점',
    status: 'confirmed',
  },
]

const upcomingReservations = [
  {
    id: 1,
    date: '1월 15일 (수)',
    time: '10:00',
    trainer: '최강민 강사',
    type: 'PT',
    location: '바디채널 강남점',
  },
  {
    id: 2,
    date: '1월 17일 (금)',
    time: '14:00',
    trainer: '박지영 강사',
    type: '바레톤',
    location: '바디채널 강남점',
  },
  {
    id: 3,
    date: '1월 20일 (월)',
    time: '19:00',
    trainer: '한동훈 강사',
    type: '히트35',
    location: '바디채널 역삼점',
  },
]

export const ReservationPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [activeTab, setActiveTab] = useState<'calendar' | 'list'>('calendar')

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDay = new Date(year, month, 1).getDay()
  const lastDate = new Date(year, month + 1, 0).getDate()

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const isToday = (day: number) => {
    const today = new Date()
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    )
  }

  const isSelected = (day: number) => {
    return (
      day === selectedDate.getDate() &&
      month === selectedDate.getMonth() &&
      year === selectedDate.getFullYear()
    )
  }

  const hasReservation = (day: number) => {
    // Simulate some days having reservations
    return [8, 15, 17, 20, 22].includes(day)
  }

  const renderDays = () => {
    const days = []

    // Empty cells for days before the first day of month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="aspect-square" />)
    }

    // Days of the month
    for (let day = 1; day <= lastDate; day++) {
      const isPast = new Date(year, month, day) < new Date(new Date().setHours(0, 0, 0, 0))

      days.push(
        <button
          key={day}
          onClick={() => !isPast && setSelectedDate(new Date(year, month, day))}
          disabled={isPast}
          className={`aspect-square flex items-center justify-center text-sm font-medium rounded-xl transition-colors relative ${
            isPast
              ? 'text-gray-300 cursor-not-allowed bg-transparent'
              : isSelected(day)
              ? 'bg-[var(--primary)] text-white'
              : isToday(day)
              ? 'border-2 border-[var(--primary)] bg-white'
              : 'bg-white hover:bg-gray-200'
          }`}
        >
          {day}
          {hasReservation(day) && !isPast && (
            <span className={`absolute bottom-1.5 w-1 h-1 rounded-full ${isSelected(day) ? 'bg-white' : 'bg-[var(--primary)]'}`} />
          )}
        </button>
      )
    }

    return days
  }

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
          <div className="flex-1 text-center text-lg font-bold">예약</div>
          <div className="w-10" />
        </div>
      </header>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('calendar')}
          className={`flex-1 py-4 text-[15px] font-medium text-center border-b-2 transition-colors ${
            activeTab === 'calendar'
              ? 'text-[var(--black)] font-bold border-[var(--black)]'
              : 'text-gray-400 border-transparent hover:text-gray-600'
          }`}
        >
          캘린더
        </button>
        <button
          onClick={() => setActiveTab('list')}
          className={`flex-1 py-4 text-[15px] font-medium text-center border-b-2 transition-colors ${
            activeTab === 'list'
              ? 'text-[var(--black)] font-bold border-[var(--black)]'
              : 'text-gray-400 border-transparent hover:text-gray-600'
          }`}
        >
          예약 목록
        </button>
      </div>

      <main className="px-5 py-6">
        {activeTab === 'calendar' ? (
          <>
            {/* Calendar */}
            <div className="bg-gray-100 rounded-2xl p-6 mb-6">
              <div className="flex justify-between items-center mb-5">
                <span className="text-lg font-bold">
                  {year}년 {month + 1}월
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={prevMonth}
                    className="w-9 h-9 border border-gray-200 rounded-lg bg-white flex items-center justify-center hover:bg-[var(--black)] hover:text-white transition-colors group"
                  >
                    <IconChevronLeft className="w-4 h-4 stroke-[var(--black)] stroke-2 group-hover:stroke-white" />
                  </button>
                  <button
                    onClick={nextMonth}
                    className="w-9 h-9 border border-gray-200 rounded-lg bg-white flex items-center justify-center hover:bg-[var(--black)] hover:text-white transition-colors group"
                  >
                    <IconChevronRight className="w-4 h-4 stroke-[var(--black)] stroke-2 group-hover:stroke-white" />
                  </button>
                </div>
              </div>

              {/* Weekdays */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {weekdays.map((day, index) => (
                  <div
                    key={day}
                    className={`text-center text-xs font-semibold py-2 ${
                      index === 0 ? 'text-red-500' : index === 6 ? 'text-blue-500' : 'text-gray-400'
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Days */}
              <div className="grid grid-cols-7 gap-1">
                {renderDays()}
              </div>
            </div>

            {/* Selected Date Reservations */}
            <div>
              <h3 className="text-base font-bold mb-4">
                {selectedDate.getMonth() + 1}월 {selectedDate.getDate()}일 예약
              </h3>
              {reservations.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {reservations.map((res) => (
                    <div
                      key={res.id}
                      className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:border-[var(--black)] transition-colors cursor-pointer"
                    >
                      <div className="text-center min-w-[50px]">
                        <div className="text-lg font-bold">{res.time}</div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-base font-bold">{res.trainer}</span>
                          <span className="px-2 py-0.5 bg-gray-100 text-xs font-medium rounded">
                            {res.type}
                          </span>
                        </div>
                        <div className="text-sm text-gray-400">{res.location}</div>
                      </div>
                      <span
                        className={`px-2.5 py-1 text-xs font-bold rounded ${
                          res.status === 'confirmed'
                            ? 'bg-green-100 text-green-600'
                            : 'bg-yellow-100 text-yellow-600'
                        }`}
                      >
                        {res.status === 'confirmed' ? '확정' : '대기'}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-400">
                  예약된 일정이 없습니다
                </div>
              )}
            </div>
          </>
        ) : (
          /* List View */
          <div>
            <h3 className="text-base font-bold mb-4">다가오는 예약</h3>
            <div className="flex flex-col gap-3">
              {upcomingReservations.map((res) => (
                <div
                  key={res.id}
                  className="p-4 border border-gray-200 rounded-xl hover:border-[var(--black)] transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-[var(--primary)]">{res.date}</span>
                    <span className="text-sm font-bold">{res.time}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-base font-bold">{res.trainer}</span>
                    <span className="px-2 py-0.5 bg-gray-100 text-xs font-medium rounded">
                      {res.type}
                    </span>
                  </div>
                  <div className="text-sm text-gray-400">{res.location}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  )
}
