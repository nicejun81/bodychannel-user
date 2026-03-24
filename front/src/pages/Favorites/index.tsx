import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageLayout, SubPageHeader } from '../../components'
import { IconSearch, IconHeart, IconStarFilled } from '../../components/Icons'

/* ── 운동시설 데이터 ── */
const favoriteGyms = [
  {
    id: 1,
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&h=200&fit=crop',
    name: '피트니스 센터 강남점',
    address: '서울 강남구 테헤란로 123',
    tags: ['24시간', '주차가능', '샤워실'],
    price: '월 99,000원~',
  },
  {
    id: 2,
    imageUrl: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=200&h=200&fit=crop',
    name: '스포애니 역삼점',
    address: '서울 강남구 역삼로 789',
    tags: ['24시간', 'PT', 'GX'],
    price: '월 79,000원~',
  },
  {
    id: 3,
    imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=200&h=200&fit=crop',
    name: '크로스핏 판교',
    address: '경기 성남시 분당구 판교로 321',
    tags: ['크로스핏', 'PT', '그룹운동'],
    price: '월 150,000원~',
  },
]

/* ── 트레이너 데이터 ── */
const favoriteTrainers = [
  {
    id: 1,
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&h=200&fit=crop',
    name: '김민수 강사',
    gym: '바디채널 강남점',
    address: '서울특별시 강남구 테헤란로 123',
    rating: 4.9,
    reviewCount: 128,
    price: '80,000원~',
  },
  {
    id: 2,
    imageUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=200&h=200&fit=crop',
    name: '윤미래 강사',
    gym: '바디채널 판교점',
    address: '경기도 성남시 분당구 판교로 321',
    rating: 4.7,
    reviewCount: 42,
    price: '75,000원~',
  },
  {
    id: 3,
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=200&h=200&fit=crop',
    name: '정서연 강사',
    gym: '바디채널 서초점',
    address: '서울특별시 서초구 서초대로 456',
    rating: 4.8,
    reviewCount: 85,
    price: '70,000원~',
  },
]

export const FavoritesPage = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'gym' | 'trainer'>('gym')

  const header = (
    <SubPageHeader
      title="내 찜 목록"
      right={
        <button className="icon-btn">
          <IconSearch className="w-5 h-5 stroke-ink stroke-2 fill-none" />
        </button>
      }
    >
      <div className="flex">
        {(['gym', 'trainer'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-body font-semibold text-center border-b-2 transition-colors ${
              activeTab === tab
                ? 'text-ink border-ink'
                : 'text-ink-placeholder border-transparent hover:text-ink-secondary'
            }`}
          >
            {tab === 'gym' ? '운동시설' : '트레이너'}
          </button>
        ))}
      </div>
    </SubPageHeader>
  )

  return (
    <PageLayout header={header}>
      {activeTab === 'gym' ? (
        <div className="flex flex-col">
          {favoriteGyms.map((gym) => (
            <button
              key={gym.id}
              onClick={() => navigate(`/gym/${gym.id}`)}
              className="flex gap-4 px-page py-4 border-b border-border-light text-left hover:bg-surface-subtle transition-colors"
            >
              {/* Thumbnail */}
              <img
                src={gym.imageUrl}
                alt={gym.name}
                className="w-[80px] h-[80px] rounded-[8px] object-cover flex-shrink-0"
              />

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-title font-bold text-ink">{gym.name}</h3>
                  <IconHeart className="w-5 h-5 fill-primary stroke-primary flex-shrink-0" />
                </div>
                <p className="text-body text-ink-placeholder mb-2">{gym.address}</p>
                <div className="text-title font-bold text-ink">{gym.price}</div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="flex flex-col">
          {favoriteTrainers.map((trainer) => (
            <button
              key={trainer.id}
              onClick={() => navigate(`/trainer/${trainer.id}`)}
              className="flex gap-4 px-page py-4 border-b border-border-light text-left hover:bg-surface-subtle transition-colors"
            >
              {/* Thumbnail */}
              <img
                src={trainer.imageUrl}
                alt={trainer.name}
                className="w-[80px] h-[100px] rounded-[8px] object-cover flex-shrink-0"
              />

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-0.5">
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-title font-bold text-ink">{trainer.name}</h3>
                    <span className="text-label text-ink-placeholder">{trainer.gym}</span>
                  </div>
                  <IconHeart className="w-5 h-5 fill-primary stroke-primary flex-shrink-0" />
                </div>
                <p className="text-body text-ink-placeholder mb-1.5">{trainer.address}</p>
                <div className="flex items-center gap-1 mb-3">
                  <IconStarFilled className="w-3.5 h-3.5 text-semantic-star" />
                  <span className="text-body font-medium text-ink">{trainer.rating}</span>
                  <span className="text-body text-ink-placeholder">({trainer.reviewCount})</span>
                </div>
                <div className="text-right">
                  <span className="text-title font-bold text-ink">{trainer.price}</span>
                  <span className="text-label text-ink-placeholder ml-0.5">/회</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </PageLayout>
  )
}
