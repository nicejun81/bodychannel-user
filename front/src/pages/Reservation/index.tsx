import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { PageLayout, SubPageHeader } from '../../components'

export const ReservationPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const trainerName = searchParams.get('trainer') || '최강민 강사'
  const lessonName = searchParams.get('lesson') || 'PT'
  const time = searchParams.get('time') || '14:00'
  const [confirmed, setConfirmed] = useState(false)

  const today = new Date()
  const dateLabel = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일(${'일월화수목금토'[today.getDay()]})`

  const header = <SubPageHeader title="예약 확인" />

  if (confirmed) {
    return (
      <PageLayout header={header} hideBottomNav>
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
            <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-white stroke-2 fill-none"><path d="M20 6L9 17l-5-5" /></svg>
          </div>
          <h2 className="text-title font-bold text-ink mb-1">예약이 완료되었습니다</h2>
          <p className="text-body text-ink-secondary mb-8 text-center">
            {dateLabel} {time}<br />
            {trainerName} · {lessonName}
          </p>
          <div className="flex gap-2 w-full">
            <button
              onClick={() => navigate('/')}
              className="flex-1 py-3.5 bg-surface-muted rounded-card text-body font-bold text-ink hover:bg-border-light transition-colors"
            >
              홈으로
            </button>
            <button
              onClick={() => navigate('/mypage')}
              className="flex-1 py-3.5 bg-primary rounded-card text-body font-bold text-white hover:bg-primary-dark transition-colors"
            >
              예약 확인
            </button>
          </div>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout header={header} hideBottomNav>
      {/* 예약 정보 카드 */}
      <div className="bg-surface-muted rounded-card-lg p-card-lg mb-section">
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border-light">
          <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-caption font-bold text-primary">{lessonName}</span>
          </div>
          <div>
            <h3 className="text-body font-bold text-ink">{trainerName}</h3>
            <p className="text-caption text-ink-tertiary">바디채널 강남점</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-label text-ink-tertiary">날짜</span>
            <span className="text-body font-bold text-ink">{dateLabel}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-label text-ink-tertiary">시간</span>
            <span className="text-body font-bold text-primary">{time}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-label text-ink-tertiary">수업</span>
            <span className="text-body font-bold text-ink">{lessonName}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-label text-ink-tertiary">지점</span>
            <span className="text-body text-ink">바디채널 강남점</span>
          </div>
        </div>
      </div>

      {/* 안내사항 */}
      <div className="mb-section">
        <h3 className="text-label font-bold text-ink-secondary mb-2">예약 안내</h3>
        <ul className="flex flex-col gap-1.5">
          {[
            '예약 시간 10분 전까지 도착해주세요',
            '예약 취소는 수업 시작 2시간 전까지 가능합니다',
            '노쇼 시 1회 차감됩니다',
          ].map((text, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-caption text-ink-placeholder mt-0.5">•</span>
              <span className="text-caption text-ink-tertiary">{text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 하단 예약 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-surface border-t border-border px-page py-3 max-w-[500px] mx-auto">
        <button
          onClick={() => {
            const reservation = { trainer: trainerName, lesson: lessonName, time, date: dateLabel, gym: '바디채널 강남점', id: Date.now() }
            const existing = JSON.parse(localStorage.getItem('reservations') || '[]')
            localStorage.setItem('reservations', JSON.stringify([reservation, ...existing]))
            setConfirmed(true)
          }}
          className="w-full py-3.5 rounded-card text-body font-bold bg-primary text-white hover:bg-primary-dark transition-colors"
        >
          예약하기
        </button>
      </div>
    </PageLayout>
  )
}
