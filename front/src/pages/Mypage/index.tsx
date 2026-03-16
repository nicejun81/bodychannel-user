import { Link } from 'react-router-dom'
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
  const header = (
    <SubPageHeader
      title="마이페이지"
      showChat
      right={
        <button className="icon-btn">
          <IconSettings className="w-5 h-5 stroke-ink stroke-[1.5]" />
        </button>
      }
    />
  )

  return (
    <PageLayout header={header} className="py-8">
      {/* Profile Section */}
      <div className="text-center mb-8">
        <div className="w-[100px] h-[100px] bg-surface-muted rounded-full flex items-center justify-center mx-auto mb-4 border-[3px] border-primary">
          <IconUser className="w-[50px] h-[50px] stroke-ink-placeholder stroke-[1.5]" />
        </div>
        <h2 className="text-2xl font-bold mb-1">김피트</h2>
        <p className="text-ink-placeholder text-body mb-4">fitkim@email.com</p>
        <button className="bg-ink text-white px-6 py-2.5 rounded-card text-body font-semibold hover:bg-primary transition-colors">
          프로필 수정
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-surface-muted rounded-card-lg p-5 text-center">
            <div className="text-heading text-primary mb-1">{stat.value}</div>
            <div className="text-body text-ink-secondary">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* My Memberships */}
      <div className="mb-8">
        <h3 className="text-title uppercase tracking-wider mb-4">내 이용권</h3>
        <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
          {memberships.map((membership) => (
            <div
              key={membership.id}
              className={`min-w-[260px] flex-shrink-0 rounded-card-lg p-[18px] cursor-pointer transition-transform hover:-translate-y-0.5 ${statusStyles[membership.status]}`}
            >
              <div className="flex justify-between items-start mb-3">
                <span className={`badge uppercase tracking-wide ${statusBadgeStyles[membership.status]}`}>
                  {membership.statusLabel}
                </span>
              </div>
              <div className="text-title mb-1">{membership.name}</div>
              <div className={`text-body mb-3.5 ${membership.status === 'active' ? 'opacity-70' : 'text-ink-placeholder'}`}>
                {membership.gym}
              </div>
              <div className="flex gap-4">
                {membership.info.map((item) => (
                  <div key={item.label} className="flex flex-col">
                    <span className={`text-caption mb-0.5 ${membership.status === 'active' ? 'opacity-70' : 'text-ink-placeholder'}`}>
                      {item.label}
                    </span>
                    <span className={`text-body font-bold ${membership.status === 'expired' ? 'text-ink-secondary' : ''}`}>
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
      <h3 className="text-title uppercase tracking-wider mb-4">내 정보</h3>
      <div className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className="flex justify-between items-center p-[18px] border border-border rounded-card hover:bg-surface-muted hover:border-ink transition-colors"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 bg-surface-muted rounded-[10px] flex items-center justify-center">
                <item.icon className="w-5 h-5 stroke-ink stroke-[1.5]" />
              </div>
              <span className="font-medium">{item.label}</span>
            </div>
            <IconChevronRight className="w-5 h-5 stroke-ink-placeholder stroke-[1.5]" />
          </Link>
        ))}
      </div>

      <button
        onClick={() => window.location.href = '/login'}
        className="w-full mt-8 py-4 bg-surface-muted text-ink-secondary font-semibold rounded-card hover:bg-ink/10 transition-colors"
      >
        로그아웃
      </button>
    </PageLayout>
  )
}
