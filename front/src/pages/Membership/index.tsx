import { useState } from 'react'
import { BottomNav } from '../../components'
import { IconStarFilled, IconChevronRight, IconSearch, IconFilter } from '../../components/Icons'

const filterTabs = [
  { id: 'filter', label: '필터', icon: IconFilter },
  { id: 'trial', label: '체험권' },
  { id: 'bodychannel', label: '바디채널' },
  { id: 'coupon', label: '선착순쿠폰' },
]

const myMemberships = [
  { id: 1, status: '이용중', gym: '바디채널 강남점', days: '67일 남음', variant: 'primary' },
  { id: 2, status: '이용중', gym: '바디채널 역삼점', days: '23일 남음', variant: 'secondary' },
  { id: 3, status: '일시정지', gym: '바디채널 서초점', days: '45일 남음', variant: 'secondary' },
  { id: 4, status: '시작전', gym: '바디채널 판교점', days: '30일권', variant: 'waiting' },
]

const gyms = [
  {
    id: 'gym1',
    name: '바디채널 강남점',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=200&fit=crop',
    rating: 4.8,
    address: '서울 강남구 테헤란로 123',
    tags: ['24시간', '주차가능', '샤워실'],
    badge: 'BEST',
    firstPay: '19,900원',
    monthlyPrice: '99,000',
  },
  {
    id: 'gym2',
    name: '바디채널 역삼점',
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400&h=200&fit=crop',
    rating: 4.6,
    address: '서울 강남구 역삼로 789',
    tags: ['24시간', 'PT', 'GX'],
    badge: '50% OFF',
    badgeType: 'sale',
    firstPay: '9,900원',
    monthlyPrice: '79,000',
  },
  {
    id: 'gym3',
    name: '바디채널 서초점',
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=200&fit=crop',
    rating: 4.7,
    address: '서울 서초구 서초대로 456',
    tags: ['24시간', '무인', '락커'],
    monthlyPrice: '49,000',
  },
  {
    id: 'gym4',
    name: '바디채널 판교점',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=200&fit=crop',
    rating: 4.9,
    address: '경기 성남시 분당구 판교로 321',
    tags: ['크로스핏', 'PT', '그룹운동'],
    badge: 'NEW',
    badgeType: 'new',
    firstPay: '29,900원',
    monthlyPrice: '150,000',
  },
  {
    id: 'gym5',
    name: '바디채널 선릉점',
    image: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=400&h=200&fit=crop',
    rating: 4.5,
    address: '서울 강남구 선릉로 567',
    tags: ['웨이트', '유산소', '사우나'],
    monthlyPrice: '89,000',
  },
]

export const MembershipPage = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const toggleFilter = (id: string) => {
    setActiveFilters(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    )
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
          <div className="flex-1 text-center text-lg font-bold">지점소개</div>
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
            onClick={() => toggleFilter(tab.id)}
            className={`flex items-center gap-1.5 px-3.5 py-2 border rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeFilters.includes(tab.id)
                ? 'bg-[var(--black)] border-[var(--black)] text-white'
                : 'bg-white border-gray-200 text-[var(--black)] hover:border-gray-400'
            }`}
          >
            {tab.icon && <tab.icon className="w-4 h-4 stroke-current stroke-[1.5]" />}
            {tab.label}
          </button>
        ))}
      </div>

      <main className="px-5 py-4">
        {/* My Memberships Banner */}
        <div className="flex gap-3 overflow-x-auto pb-5 hide-scrollbar">
          {myMemberships.map((membership) => (
            <div
              key={membership.id}
              className={`min-w-[280px] flex-shrink-0 flex justify-between items-center p-3.5 rounded-xl cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg ${
                membership.variant === 'waiting'
                  ? 'bg-white border-2 border-gray-300'
                  : membership.variant === 'secondary'
                  ? 'bg-gray-600'
                  : 'bg-[var(--black)]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className={`px-2 py-1 text-[10px] font-bold rounded ${
                  membership.variant === 'waiting' ? 'bg-gray-400 text-white' : 'bg-[var(--primary)] text-white'
                }`}>
                  {membership.status}
                </span>
                <span className={membership.variant === 'waiting' ? 'text-[var(--black)] text-sm font-semibold' : 'text-white text-sm font-semibold'}>
                  {membership.gym}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className={membership.variant === 'waiting' ? 'text-gray-600 text-sm font-semibold' : 'text-[var(--primary)] text-sm font-semibold'}>
                  {membership.days}
                </span>
                <IconChevronRight className="w-4 h-4 stroke-gray-400 stroke-[1.5]" />
              </div>
            </div>
          ))}
        </div>

        {/* Gym List */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">헬스장</h2>
            <span className="text-sm text-gray-400">{gyms.length}개</span>
          </div>

          <div className="flex flex-col gap-4">
            {gyms.map((gym) => (
              <div
                key={gym.id}
                className="border border-gray-200 rounded-2xl overflow-hidden cursor-pointer transition-all hover:border-[var(--black)] hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="relative">
                  <img src={gym.image} alt={gym.name} className="w-full h-[140px] object-cover" />
                  {gym.badge && (
                    <span className={`absolute top-3 left-3 px-2.5 py-1 text-xs font-bold rounded ${
                      gym.badgeType === 'sale' ? 'bg-red-500 text-white' :
                      gym.badgeType === 'new' ? 'bg-green-500 text-white' :
                      'bg-[var(--primary)] text-white'
                    }`}>
                      {gym.badge}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-base font-bold">{gym.name}</h3>
                    <div className="flex items-center gap-1">
                      <IconStarFilled className="w-4 h-4 text-[#FFD700]" />
                      <span className="text-sm font-semibold">{gym.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">{gym.address}</p>
                  <div className="flex gap-2 mb-3">
                    {gym.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 bg-gray-100 text-xs font-medium rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    {gym.firstPay && (
                      <span className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#fff4f0] rounded-lg">
                        <span className="text-xs text-gray-500">첫결제</span>
                        <span className="text-sm font-bold text-[var(--primary)]">{gym.firstPay}</span>
                      </span>
                    )}
                    <div className="flex items-center gap-1 ml-auto">
                      <span className="text-sm text-gray-400">월</span>
                      <span className="text-lg font-bold">{gym.monthlyPrice}</span>
                      <span className="text-sm text-gray-400">원~</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
