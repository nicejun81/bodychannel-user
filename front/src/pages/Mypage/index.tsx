import { Link } from 'react-router-dom'
import { BottomNav } from '../../components'
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

const stats = [
  { value: '15,000', label: '캐시' },
  { value: '2,500', label: '포인트' },
  { value: '3', label: '쿠폰' },
]

const memberships = [
  {
    id: 1,
    status: 'active',
    statusLabel: '이용중',
    name: '3개월 멤버십',
    gym: '바디채널 강남점',
    info: [
      { label: '잔여일', value: '67일' },
      { label: '유효기간', value: '2025.03.15' },
    ],
  },
  {
    id: 2,
    status: 'expiring',
    statusLabel: '만료임박',
    name: 'PT 20회 패키지',
    gym: '바디채널 강남점',
    info: [
      { label: '잔여횟수', value: '3회' },
      { label: '유효기간', value: '2025.01.20' },
    ],
  },
  {
    id: 3,
    status: 'paused',
    statusLabel: '일시정지',
    name: 'GX 무제한 이용권',
    gym: '바디채널 강남점',
    info: [
      { label: '정지기간', value: '14일' },
      { label: '재개일', value: '2025.01.20' },
    ],
  },
  {
    id: 4,
    status: 'expired',
    statusLabel: '만료됨',
    name: '1개월 멤버십',
    gym: '바디채널 강남점',
    info: [{ label: '만료일', value: '2024.12.01' }],
  },
]

const menuItems = [
  { icon: IconHeart, label: '내 찜 목록', href: '/favorites' },
  { icon: IconClipboard, label: '구매 내역', href: '/purchase-history' },
  { icon: IconShield, label: '개인정보 보호', href: '/privacy' },
  { icon: IconMessage, label: '고객센터', href: '/support' },
  { icon: IconInfo, label: '앱 정보', href: '/about' },
]

const statusStyles: Record<string, string> = {
  active: 'bg-[var(--black)] text-white',
  expiring: 'bg-white border-2 border-[var(--primary)] text-[var(--black)]',
  paused: 'bg-white border-2 border-gray-400 text-[var(--black)]',
  expired: 'bg-gray-100 text-gray-600',
}

const statusBadgeStyles: Record<string, string> = {
  active: 'bg-[var(--primary)] text-white',
  expiring: 'bg-[var(--primary)] text-white',
  paused: 'bg-gray-600 text-white',
  expired: 'bg-gray-400 text-white',
}

export const MyPage = () => {
  return (
    <div className="min-h-screen bg-white pb-[100px]">
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-5 py-4">
          <button onClick={() => window.history.back()} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
            <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-[var(--black)] stroke-2 fill-none">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex-1 text-center text-lg font-bold">마이페이지</div>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
            <IconSettings className="w-5 h-5 stroke-[var(--black)] stroke-[1.5]" />
          </button>
        </div>
      </header>

      <main className="px-7 py-8">
        {/* Profile Section */}
        <div className="text-center mb-8">
          <div className="w-[100px] h-[100px] bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 border-[3px] border-[var(--primary)]">
            <IconUser className="w-[50px] h-[50px] stroke-gray-400 stroke-[1.5]" />
          </div>
          <h2 className="text-2xl font-bold mb-1">김피트</h2>
          <p className="text-gray-400 text-sm mb-4">fitkim@email.com</p>
          <button className="bg-[var(--black)] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[var(--primary)] transition-colors">
            프로필 수정
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-gray-100 rounded-2xl p-5 text-center">
              <div className="text-lg font-bold text-[var(--primary)] mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* My Memberships */}
        <div className="mb-8">
          <h3 className="text-base font-bold uppercase tracking-wider mb-4">내 이용권</h3>
          <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
            {memberships.map((membership) => (
              <div
                key={membership.id}
                className={`min-w-[260px] flex-shrink-0 rounded-2xl p-[18px] cursor-pointer transition-transform hover:-translate-y-0.5 ${statusStyles[membership.status]}`}
              >
                <div className="flex justify-between items-start mb-3">
                  <span className={`px-2.5 py-1 text-[10px] font-bold rounded-md uppercase tracking-wide ${statusBadgeStyles[membership.status]}`}>
                    {membership.statusLabel}
                  </span>
                </div>
                <div className="text-base font-bold mb-1">{membership.name}</div>
                <div className={`text-sm mb-3.5 ${membership.status === 'active' ? 'opacity-70' : 'text-gray-400'}`}>
                  {membership.gym}
                </div>
                <div className="flex gap-4">
                  {membership.info.map((item) => (
                    <div key={item.label} className="flex flex-col">
                      <span className={`text-[10px] mb-0.5 ${membership.status === 'active' ? 'opacity-70' : 'text-gray-400'}`}>
                        {item.label}
                      </span>
                      <span className={`text-sm font-bold ${membership.status === 'expired' ? 'text-gray-600' : ''}`}>
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Menu List */}
        <h3 className="text-base font-bold uppercase tracking-wider mb-4">내 정보</h3>
        <div className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="flex justify-between items-center p-[18px] border border-gray-200 rounded-xl hover:bg-gray-100 hover:border-[var(--black)] transition-colors"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 bg-gray-100 rounded-[10px] flex items-center justify-center">
                  <item.icon className="w-5 h-5 stroke-[var(--black)] stroke-[1.5]" />
                </div>
                <span className="font-medium">{item.label}</span>
              </div>
              <IconChevronRight className="w-5 h-5 stroke-gray-400 stroke-[1.5]" />
            </Link>
          ))}
        </div>

        <button
          onClick={() => window.location.href = '/login'}
          className="w-full mt-8 py-4 bg-gray-100 text-gray-600 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
        >
          로그아웃
        </button>
      </main>

      <BottomNav />
    </div>
  )
}
