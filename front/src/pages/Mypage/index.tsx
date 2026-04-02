import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { PageLayout, SubPageHeader } from '../../components'
import {
  IconChevronRight,
  IconHeart,
  IconClipboard,
  IconShield,
  IconMessage,
  IconInfo,
  IconSettings,
  IconUser,
} from '../../components/Icons'

/* ── 프로필 탭 데이터 (인스타그램 스타일) ── */
const profileStats = [
  { value: '24', label: '게시물' },
  { value: '1,283', label: '팔로워' },
  { value: '486', label: '팔로잉' },
]

const profilePosts = [
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1550345332-09e3ac987658?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1549476464-37392f717541?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=300&h=300&fit=crop',
]

/* ── 마이 탭 데이터 ── */
/* walletStats → 각 페이지로 이동 (/wallet/cash, /wallet/point, /wallet/coupon) */

const memberships = [
  {
    id: 1, status: 'active', statusLabel: '이용중',
    name: '3개월 멤버십', gym: '바디채널 강남점',
    info: [{ label: '잔여일', value: '67일' }, { label: '유효기간', value: '2025.03.15' }],
  },
  {
    id: 2, status: 'expiring', statusLabel: '만료임박',
    name: 'PT 20회 패키지', gym: '바디채널 강남점',
    info: [{ label: '잔여횟수', value: '3회' }, { label: '유효기간', value: '2025.01.20' }],
  },
  {
    id: 3, status: 'paused', statusLabel: '일시정지',
    name: 'GX 무제한 회원권', gym: '바디채널 강남점',
    info: [{ label: '정지기간', value: '14일' }, { label: '재개일', value: '2025.01.20' }],
  },
  {
    id: 4, status: 'expired', statusLabel: '만료됨',
    name: '1개월 멤버십', gym: '바디채널 강남점',
    info: [{ label: '만료일', value: '2024.12.01' }],
  },
]

const purchaseHistory = [
  {
    id: 1, name: '헬스 이용권 · 월 구독권 + 개인 락커 + 운동복 대여', price: '129,000', gym: '바디채널 강남점',
    method: '카카오페이', order: 'BC20260326999', date: '2026.03.26 17:38', status: '이용중',
  },
  {
    id: 2, name: 'PT · 10회', price: '700,000', gym: '바디채널 강남점',
    method: '신용/체크카드', order: 'BC20260320412', date: '2026.03.20 11:20', status: '이용중',
  },
  {
    id: 3, name: '바레톤 · 1회 체험', price: '30,000', gym: '바디채널 강남점',
    method: '네이버페이', order: 'BC20260315087', date: '2026.03.15 09:45', status: '사용완료',
  },
]

const menuItems = [
  { icon: IconHeart, label: '내 찜 목록', href: '/favorites' },
  { icon: IconShield, label: '개인정보 보호', href: '/privacy' },
  { icon: IconMessage, label: '고객센터', href: '/support' },
  { icon: IconInfo, label: '앱 정보', href: '/about' },
]

const statusStyles: Record<string, string> = {
  active: 'bg-ink text-white',
  expiring: 'bg-surface border-2 border-primary text-ink',
  paused: 'bg-surface border-2 border-ink-placeholder text-ink',
  expired: 'bg-surface-muted text-ink-secondary',
}

const statusBadgeStyles: Record<string, string> = {
  active: 'bg-primary text-white',
  expiring: 'bg-primary text-white',
  paused: 'bg-ink-secondary text-white',
  expired: 'bg-ink-placeholder text-white',
}

export const MyPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [showPurchase, setShowPurchase] = useState(searchParams.get('tab') === 'purchase')
  const [activeTab, setActiveTab] = useState<'profile' | 'my'>('my')
  const [profileGrid, setProfileGrid] = useState<'grid' | 'tagged'>('grid')
  void searchParams // used for tab query
  const [reservations, setReservations] = useState<{ id: number; trainer: string; lesson: string; time: string; date: string; dateKey?: string; gym: string }[]>(() => {
    const saved: { id: number; trainer: string; lesson: string; time: string; date: string; gym: string }[] = JSON.parse(localStorage.getItem('reservations') || '[]')
    // mock 데이터가 아닌 실제 예약이 여러 날짜에 걸쳐 있으면 그대로 사용
    const uniqueDates = new Set(saved.map(r => r.date))
    if (uniqueDates.size > 1) return saved
    const dn = ['일','월','화','수','목','금','토']
    const mock = [
      { offset: -5, trainer: '한동훈 강사', lesson: '히트35', time: '18:00', gym: '바디채널 강남점' },
      { offset: -3, trainer: '최강민 강사', lesson: 'PT', time: '09:00', gym: '바디채널 강남점' },
      { offset: -1, trainer: '박지영 강사', lesson: '바레톤', time: '14:00', gym: '바디채널 강남점' },
      { offset: 0, trainer: '최강민 강사', lesson: 'PT', time: '15:00', gym: '바디채널 강남점' },
      { offset: 0, trainer: '박지영 강사', lesson: '바레톤', time: '19:30', gym: '바디채널 강남점' },
      { offset: 1, trainer: '이준혁 강사', lesson: '짐그라운드', time: '11:00', gym: '바디채널 강남점' },
      { offset: 2, trainer: '한동훈 강사', lesson: '히트35', time: '18:00', gym: '바디채널 역삼점' },
      { offset: 3, trainer: '최강민 강사', lesson: 'PT', time: '09:00', gym: '바디채널 강남점' },
      { offset: 5, trainer: '박지영 강사', lesson: '바레톤', time: '14:00', gym: '바디채널 강남점' },
      { offset: 7, trainer: '정서연 강사', lesson: 'PT', time: '13:00', gym: '바디채널 서초점' },
      { offset: 10, trainer: '이준혁 강사', lesson: '짐그라운드', time: '20:00', gym: '바디채널 강남점' },
    ].map((m, i) => {
      const d = new Date(); d.setDate(d.getDate() + m.offset)
      return { id: Date.now() + i, trainer: m.trainer, lesson: m.lesson, time: m.time, gym: m.gym, date: `${d.getFullYear()}년 ${d.getMonth()+1}월 ${d.getDate()}일(${dn[d.getDay()]})` }
    })
    localStorage.setItem('reservations', JSON.stringify(mock))
    return mock
  })
  const [reserveDateIdx, setReserveDateIdx] = useState(-1) // -1 = 아직 초기화 안됨, 오늘로 자동 설정

  const header = (
    <SubPageHeader
      title="마이페이지"
      showChat
      right={
        <button className="icon-btn">
          <IconSettings className="w-5 h-5 stroke-ink stroke-[1.5]" />
        </button>
      }
    >
      <div className="flex">
        {([{ key: 'my', label: '마이' }, { key: 'profile', label: '프로필' }] as const).map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-3 text-body font-semibold text-center border-b-2 transition-colors ${
              activeTab === tab.key
                ? 'text-ink border-ink'
                : 'text-ink-placeholder border-transparent hover:text-ink-secondary'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </SubPageHeader>
  )

  return (
    <PageLayout header={header}>
      {activeTab === 'profile' ? (
        <>
          {/* ── 인스타그램 스타일 프로필 ── */}
          {/* 프로필 헤더 */}
          <div className="flex items-center gap-5 mb-4">
            <div className="w-[76px] h-[76px] bg-surface-muted rounded-full flex items-center justify-center flex-shrink-0 border-2 border-primary">
              <IconUser className="w-9 h-9 stroke-ink-placeholder stroke-[1.5]" />
            </div>
            <div className="flex-1 grid grid-cols-3 text-center">
              {profileStats.map(s => (
                <button key={s.label} className="flex flex-col items-center">
                  <span className="text-body font-bold text-ink">{s.value}</span>
                  <span className="text-caption text-ink-secondary">{s.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 이름 + 바이오 */}
          <div className="mb-4">
            <h2 className="text-body font-bold text-ink">김피트</h2>
            <p className="text-caption text-ink-secondary mt-0.5">바디채널 강남점 💪 3개월째 운동중</p>
            <p className="text-caption text-ink-tertiary">매일 아침 6시 기상 | PT + 바레톤 | 체중 -8kg 달성</p>
          </div>

          {/* 프로필 편집 + 공유 버튼 */}
          <div className="flex gap-2 mb-section">
            <button className="flex-1 py-2 bg-surface-muted rounded-card text-label font-bold text-ink hover:bg-border-light transition-colors">
              프로필 편집
            </button>
            <button className="flex-1 py-2 bg-surface-muted rounded-card text-label font-bold text-ink hover:bg-border-light transition-colors">
              프로필 공유
            </button>
          </div>

          {/* 그리드/태그 토글 */}
          <div className="flex border-b border-border -mx-page">
            <button
              onClick={() => setProfileGrid('grid')}
              className={`flex-1 flex justify-center py-2.5 border-b-2 transition-colors ${
                profileGrid === 'grid' ? 'border-ink' : 'border-transparent'
              }`}
            >
              <svg viewBox="0 0 24 24" className={`w-5 h-5 fill-none stroke-[1.5] ${profileGrid === 'grid' ? 'stroke-ink' : 'stroke-ink-placeholder'}`}>
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
              </svg>
            </button>
            <button
              onClick={() => setProfileGrid('tagged')}
              className={`flex-1 flex justify-center py-2.5 border-b-2 transition-colors ${
                profileGrid === 'tagged' ? 'border-ink' : 'border-transparent'
              }`}
            >
              <svg viewBox="0 0 24 24" className={`w-5 h-5 fill-none stroke-[1.5] ${profileGrid === 'tagged' ? 'stroke-ink' : 'stroke-ink-placeholder'}`}>
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                <line x1="7" y1="7" x2="7.01" y2="7" />
              </svg>
            </button>
          </div>

          {/* 게시물 그리드 */}
          <div className="grid grid-cols-3 gap-0.5 -mx-page mt-0.5">
            {profileGrid === 'grid' ? (
              profilePosts.map((url, i) => (
                <button key={i} className="aspect-square overflow-hidden hover:opacity-80 transition-opacity">
                  <img src={url} alt="" className="w-full h-full object-cover" />
                </button>
              ))
            ) : (
              <div className="col-span-3 py-12 text-center">
                <svg viewBox="0 0 24 24" className="w-10 h-10 mx-auto mb-2 fill-none stroke-ink-disabled stroke-[1.5]">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                  <line x1="7" y1="7" x2="7.01" y2="7" />
                </svg>
                <p className="text-caption text-ink-placeholder">태그된 게시물이 없습니다</p>
              </div>
            )}
          </div>
        </>
      ) : (
        /* ── 마이 탭 ── */
        <>
          {/* 프로필 요약 */}
          <div className="flex items-center gap-4 mb-section">
            <div className="w-14 h-14 bg-surface-muted rounded-full flex items-center justify-center flex-shrink-0 border-2 border-primary">
              <IconUser className="w-7 h-7 stroke-ink-placeholder stroke-[1.5]" />
            </div>
            <div className="flex-1">
              <h2 className="text-body font-bold text-ink">김피트</h2>
              <p className="text-caption text-ink-tertiary">fitkim@email.com</p>
            </div>
          </div>

          {/* 캐시/포인트/쿠폰 */}
          <div className="grid grid-cols-3 gap-2 mb-section">
            {[
              { value: '15,000', label: '캐시', href: '/wallet/cash' },
              { value: '2,500', label: '포인트', href: '/wallet/point' },
              { value: '3', label: '쿠폰', href: '/wallet/coupon' },
            ].map((stat) => (
              <button key={stat.label} onClick={() => navigate(stat.href)} className="bg-surface-muted rounded-card p-3 text-center hover:bg-border-light transition-colors">
                <div className="text-title font-bold text-primary">{stat.value}</div>
                <div className="text-caption text-ink-secondary">{stat.label}</div>
              </button>
            ))}
          </div>

          <div className="h-2 bg-surface-muted -mx-page" />

          {/* 내 예약 - 예약 있는 날짜만 탭 표시 */}
          {(() => {
            const dayNames = ['일', '월', '화', '수', '목', '금', '토']
            // 예약에서 고유 날짜 추출 (과거 포함)
            const uniqueDates = [...new Set(reservations.map(r => r.date))]
            // 날짜 파싱해서 정렬
            const dateTabs = uniqueDates.map(dateStr => {
              const match = dateStr.match(/(\d+)년 (\d+)월 (\d+)일/)
              const y = match ? +match[1] : 2026
              const m = match ? +match[2] - 1 : 0
              const d = match ? +match[3] : 1
              const dateObj = new Date(y, m, d)
              const today = new Date()
              today.setHours(0, 0, 0, 0)
              dateObj.setHours(0, 0, 0, 0)
              const isToday = dateObj.getTime() === today.getTime()
              const isPast = dateObj.getTime() < today.getTime()
              return {
                label: `${dateObj.getMonth() + 1}/${dateObj.getDate()}`,
                day: dayNames[dateObj.getDay()],
                key: dateStr,
                isToday,
                isPast,
                sortKey: dateObj.getTime(),
              }
            }).sort((a, b) => a.sortKey - b.sortKey)

            if (dateTabs.length === 0) {
              return (
                <div className="py-section">
                  <h3 className="text-body font-bold text-ink mb-3">내 예약</h3>
                  <div className="py-8 text-center">
                    <p className="text-caption text-ink-placeholder">예약 내역이 없습니다</p>
                  </div>
                </div>
              )
            }

            // 기본 선택: 오늘 또는 가장 가까운 미래
            const todayIdx = dateTabs.findIndex(d => d.isToday) >= 0 ? dateTabs.findIndex(d => d.isToday) : dateTabs.findIndex(d => !d.isPast)
            const safeIdx = reserveDateIdx === -1 ? (todayIdx >= 0 ? todayIdx : 0) : Math.min(reserveDateIdx, dateTabs.length - 1)
            const selectedDateKey = dateTabs[safeIdx >= 0 ? safeIdx : 0].key
            const filtered = reservations.filter(r => r.date === selectedDateKey)
            const selectedTab = dateTabs[safeIdx >= 0 ? safeIdx : 0]

            return (
              <div className="py-section">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-body font-bold text-ink">내 예약</h3>
                  {todayIdx >= 0 && safeIdx !== todayIdx && (
                    <button
                      onClick={() => setReserveDateIdx(todayIdx)}
                      className="flex items-center gap-1 px-2.5 py-1 text-caption font-bold text-primary border border-primary rounded-pill hover:bg-primary-50 transition-colors"
                    >
                      <svg viewBox="0 0 24 24" className="w-3 h-3 stroke-primary stroke-[1.5] fill-none"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                      오늘
                    </button>
                  )}
                </div>
                <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-4">
                  {dateTabs.map((d, i) => (
                    <button
                      key={d.key}
                      onClick={() => setReserveDateIdx(i)}
                      className={`flex-shrink-0 w-[52px] py-2 rounded-xl text-center transition-colors relative ${
                        safeIdx === i
                          ? 'bg-primary text-white'
                          : d.isPast
                          ? 'bg-surface-muted text-ink-disabled'
                          : 'bg-surface-muted text-ink-secondary hover:bg-surface-subtle'
                      }`}
                    >
                      <span className="text-label block">{d.isToday ? '오늘' : d.label}</span>
                      <span className="text-label font-bold block">{d.day}</span>
                    </button>
                  ))}
                </div>
                <div className="flex flex-col gap-2">
                  {filtered.map((r) => {
                    const isPast = selectedTab.isPast
                    return (
                      <div key={r.id} className={`flex items-center gap-3 p-card-lg rounded-card ${isPast ? 'bg-surface-subtle' : 'bg-surface-muted'}`}>
                        <div className={`w-10 h-10 rounded-card flex items-center justify-center flex-shrink-0 ${isPast ? 'bg-surface-muted' : 'bg-primary-50'}`}>
                          <span className={`text-caption font-bold ${isPast ? 'text-ink-placeholder' : 'text-primary'}`}>{r.lesson}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className={`text-label font-bold ${isPast ? 'text-ink-tertiary' : 'text-ink'}`}>{r.trainer}</span>
                            <span className="text-caption text-ink-placeholder">· {r.gym}</span>
                          </div>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <svg viewBox="0 0 24 24" className={`w-3.5 h-3.5 stroke-[1.5] fill-none flex-shrink-0 ${isPast ? 'stroke-ink-placeholder' : 'stroke-primary'}`}>
                              <circle cx="12" cy="12" r="10" />
                              <path d="M12 6v6l4 2" />
                            </svg>
                            <span className={`text-caption font-medium ${isPast ? 'text-ink-placeholder' : 'text-primary'}`}>{r.time}</span>
                          </div>
                        </div>
                        {isPast ? (
                          <span className="px-2.5 py-1 text-caption font-bold text-ink-disabled">완료</span>
                        ) : (
                          <button
                            onClick={() => {
                              const updated = reservations.filter(x => x.id !== r.id)
                              localStorage.setItem('reservations', JSON.stringify(updated))
                              setReservations(updated)
                            }}
                            className="px-2.5 py-1 text-caption font-bold text-ink-placeholder border border-border rounded-pill hover:text-semantic-like hover:border-semantic-like transition-colors flex-shrink-0"
                          >
                            취소
                          </button>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })()}

          <div className="h-2 bg-surface-muted -mx-page" />

          {/* 내 회원권 */}
          <div className="py-section">
            <h3 className="text-body font-bold text-ink mb-3">내 회원권</h3>
            <div className="flex gap-3 overflow-x-auto pb-1 hide-scrollbar">
              {memberships.map((membership) => (
                <div
                  key={membership.id}
                  className={`min-w-[240px] flex-shrink-0 rounded-card p-card-lg cursor-pointer transition-transform hover:-translate-y-0.5 ${statusStyles[membership.status]}`}
                >
                  <span className={`badge mb-2 inline-block ${statusBadgeStyles[membership.status]}`}>
                    {membership.statusLabel}
                  </span>
                  <div className="text-body font-bold mb-0.5">{membership.name}</div>
                  <div className={`text-caption mb-3 ${membership.status === 'active' ? 'opacity-60' : 'text-ink-placeholder'}`}>
                    {membership.gym}
                  </div>
                  <div className="flex gap-4">
                    {membership.info.map((item) => (
                      <div key={item.label} className="flex flex-col">
                        <span className={`text-caption mb-0.5 ${membership.status === 'active' ? 'opacity-60' : 'text-ink-placeholder'}`}>
                          {item.label}
                        </span>
                        <span className={`text-label font-bold ${membership.status === 'expired' ? 'text-ink-secondary' : ''}`}>
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="h-2 bg-surface-muted -mx-page" />

          {/* 내 정보 메뉴 */}
          <div className="py-section">
            <h3 className="text-body font-bold text-ink mb-1">내 정보</h3>

            <button
              onClick={() => setShowPurchase(!showPurchase)}
              className="w-full flex justify-between items-center py-3.5 border-b border-border-light hover:bg-surface-subtle transition-colors"
            >
              <div className="flex items-center gap-3">
                <IconClipboard className="w-5 h-5 stroke-ink-secondary stroke-[1.5]" />
                <span className="text-body text-ink">구매 내역</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-caption text-primary font-bold">{purchaseHistory.length}건</span>
                <svg viewBox="0 0 20 20" className={`w-4 h-4 transition-transform ${showPurchase ? 'text-primary rotate-180' : 'text-ink-tertiary'}`}>
                  <path fill="currentColor" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
                </svg>
              </div>
            </button>
            {showPurchase && (
              <div className="py-2 flex flex-col gap-2 border-b border-border-light">
                {purchaseHistory.map(p => (
                  <button
                    key={p.id}
                    onClick={() => navigate(`/purchase/docs?name=${encodeURIComponent(p.name)}&price=${encodeURIComponent(p.price)}&gym=${encodeURIComponent(p.gym)}&method=${encodeURIComponent(p.method)}&order=${encodeURIComponent(p.order)}&date=${encodeURIComponent(p.date)}`)}
                    className="w-full text-left bg-surface-muted rounded-card p-card-lg hover:bg-border-light transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`px-2 py-0.5 text-caption font-bold rounded ${p.status === '이용중' ? 'bg-primary text-white' : 'bg-ink-disabled text-ink-tertiary'}`}>{p.status}</span>
                      <span className="text-caption text-ink-tertiary">{p.date.split(' ')[0]}</span>
                    </div>
                    <p className="text-label font-bold text-ink truncate">{p.name}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-caption text-ink-tertiary">{p.gym}</span>
                      <span className="text-label font-bold text-primary">{p.price}원</span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="flex justify-between items-center py-3.5 border-b border-border-light last:border-0 hover:bg-surface-subtle transition-colors"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 stroke-ink-secondary stroke-[1.5]" />
                  <span className="text-body text-ink">{item.label}</span>
                </div>
                <IconChevronRight className="w-4 h-4 stroke-ink-placeholder stroke-[1.5]" />
              </Link>
            ))}
          </div>

          <button
            onClick={() => window.location.href = '/login'}
            className="w-full py-3 text-label text-ink-placeholder hover:text-ink-secondary transition-colors"
          >
            로그아웃
          </button>
        </>
      )}
    </PageLayout>
  )
}
