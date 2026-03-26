import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { PageLayout, SubPageHeader, PlanCard, BottomCTA, Badge } from '../../components'
import { gymsData, defaultGym } from '../GymDetail'
import { IconStarFilled } from '../../components/Icons'

type Tab = 'membership' | 'lesson' | 'extra'

const categoryStyles: Record<string, string> = {
  bareton: 'bg-category-bareton-bg text-category-bareton-text',
  hit35: 'bg-category-hit35-bg text-category-hit35-text',
  gymground: 'bg-category-gymground-bg text-category-gymground-text',
  pt: 'bg-primary-50 text-primary',
}

interface LessonPlan { sessions: string; perSession: string; total: string; tag?: string }
interface LessonCategory {
  name: string
  categoryColor: 'bareton' | 'hit35' | 'gymground' | 'pt'
  instructor: string
  avatar: string
  desc: string
  plans: LessonPlan[]
}

const lessonCategories: LessonCategory[] = [
  {
    name: '바레톤', categoryColor: 'bareton',
    instructor: '박지영', avatar: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face',
    desc: '발레 동작 기반 체형 교정 & 코어 강화',
    plans: [
      { sessions: '1회 체험', perSession: '30,000', total: '30,000', tag: '체험특가' },
      { sessions: '10회', perSession: '25,000', total: '250,000' },
      { sessions: '20회', perSession: '22,000', total: '440,000', tag: '12% OFF' },
      { sessions: '30회', perSession: '20,000', total: '600,000', tag: '인기' },
    ],
  },
  {
    name: '히트35', categoryColor: 'hit35',
    instructor: '한동훈', avatar: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=200&h=200&fit=crop&crop=face',
    desc: '고강도 전신 근력 트레이닝 35분',
    plans: [
      { sessions: '1회 체험', perSession: '25,000', total: '25,000', tag: '체험특가' },
      { sessions: '10회', perSession: '20,000', total: '200,000' },
      { sessions: '20회', perSession: '18,000', total: '360,000', tag: '10% OFF' },
      { sessions: '30회', perSession: '16,000', total: '480,000', tag: '인기' },
    ],
  },
  {
    name: '짐그라운드', categoryColor: 'gymground',
    instructor: '김민수', avatar: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=200&h=200&fit=crop&crop=face',
    desc: '스피닝 · 서킷 · 펑셔널 트레이닝',
    plans: [
      { sessions: '1회 체험', perSession: '25,000', total: '25,000', tag: '체험특가' },
      { sessions: '10회', perSession: '22,000', total: '220,000' },
      { sessions: '20회', perSession: '19,000', total: '380,000', tag: '14% OFF' },
    ],
  },
  {
    name: 'PT', categoryColor: 'pt',
    instructor: '최강민', avatar: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&h=200&fit=crop&crop=face',
    desc: '1:1 맞춤 퍼스널 트레이닝',
    plans: [
      { sessions: '1회 체험', perSession: '50,000', total: '50,000', tag: '체험특가' },
      { sessions: '10회', perSession: '70,000', total: '700,000' },
      { sessions: '20회', perSession: '65,000', total: '1,300,000', tag: '5만원 할인' },
      { sessions: '30회', perSession: '60,000', total: '1,800,000', tag: '인기' },
    ],
  },
]

const extraProducts = [
  { name: '개인 락커', duration: '1개월', price: '30,000', icon: '🔒', desc: '나만의 개인 보관함' },
  { name: '운동복 대여', duration: '1개월', price: '20,000', icon: '👕', desc: '매일 깨끗한 운동복 제공' },
  { name: 'GX 무제한', duration: '1개월', price: '50,000', icon: '💪', desc: '모든 그룹 수업 무제한 참여' },
  { name: '프리미엄 타월', duration: '1개월', price: '10,000', icon: '🧖', desc: '고급 타월 무제한 이용' },
]

export const GymProductsPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const data = gymsData[id || ''] || defaultGym
  const [tab, setTab] = useState<Tab>('membership')
  const [selectedIdx, setSelectedIdx] = useState(0)

  const header = <SubPageHeader title="상품선택" />

  const selectedPlan = tab === 'membership' ? data.plans[selectedIdx] : null
  const selectedExtra = tab === 'extra' ? extraProducts[selectedIdx] : null

  return (
    <PageLayout header={header} hideBottomNav>
      {/* Gym Info */}
      <div className="pt-2 pb-4">
        <div className="flex items-center gap-4">
          <img
            src={data.heroImages[0]?.url || ''}
            alt={data.name}
            className="w-16 h-16 rounded-card object-cover flex-shrink-0"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-0.5">
              <h2 className="text-title font-bold text-ink">{data.name}</h2>
              {data.badge && <Badge variant="primary" size="sm">{data.badge}</Badge>}
            </div>
            <div className="flex items-center gap-1">
              <IconStarFilled className="w-3.5 h-3.5 text-semantic-star" />
              <span className="text-label font-semibold text-ink">{data.rating}</span>
              <span className="text-label text-ink-tertiary">({data.reviewCount})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Coupons */}
      {data.coupons.length > 0 && (
        <div className="pb-section">
          <div className="flex gap-2 overflow-x-auto hide-scrollbar">
            {data.coupons.map((c, i) => (
              <div key={i} className="min-w-[160px] flex-shrink-0 p-card bg-primary-50 border border-primary/20 rounded-card">
                <p className="text-label font-bold text-primary">{c.discount}</p>
                <p className="text-caption text-ink-tertiary mt-0.5">{c.condition}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="h-2 bg-surface-muted -mx-page" />

      {/* Tabs */}
      <div className="pt-section pb-4">
        <div className="flex gap-2">
          {([['membership', '회원권'], ['lesson', '레슨권'], ['extra', '부가상품']] as const).map(([key, label]) => (
            <button
              key={key}
              onClick={() => { setTab(key); setSelectedIdx(0) }}
              className={`flex-1 py-2.5 rounded-pill text-body font-bold transition-colors ${
                tab === key ? 'bg-primary text-white' : 'bg-surface-muted text-ink-secondary hover:bg-surface-subtle'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="pb-[100px]">
        {tab === 'membership' && (
          <>
            <h3 className="text-heading font-bold text-ink mb-4">회원권 선택</h3>
            <div className="flex flex-col gap-3">
              {data.plans.map((plan, i) => (
                <div key={i} onClick={() => setSelectedIdx(i)} className="cursor-pointer">
                  <PlanCard
                    name={plan.name}
                    duration={plan.duration}
                    price={plan.price}
                    original={plan.original}
                    tag={plan.tag}
                    installment={plan.installment}
                    highlighted={selectedIdx === i}
                  />
                </div>
              ))}
            </div>
            <p className="text-label text-ink-tertiary text-center mt-4">카드사별 무이자 할부 혜택이 제공됩니다</p>
          </>
        )}

        {tab === 'lesson' && (
          <>
            {lessonCategories.map((cat, ci) => (
              <div key={ci}>
                {ci > 0 && <div className="h-2 bg-surface-muted -mx-page my-section" />}
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-4">
                  <img src={cat.avatar} alt={cat.instructor} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`px-1.5 py-0.5 text-caption font-bold rounded ${categoryStyles[cat.categoryColor]}`}>{cat.name}</span>
                      <span className="text-body font-bold text-ink">{cat.instructor} 강사</span>
                    </div>
                    <p className="text-label text-ink-tertiary">{cat.desc}</p>
                  </div>
                </div>
                {/* Plans */}
                <div className="flex flex-col gap-3">
                  {cat.plans.map((plan, pi) => (
                    <PlanCard
                      key={pi}
                      name={plan.sessions}
                      price={plan.total}
                      tag={plan.tag}
                      perSession={plan.perSession}
                      highlighted={pi === 0}
                    />
                  ))}
                </div>
              </div>
            ))}
          </>
        )}

        {tab === 'extra' && (
          <>
            <h3 className="text-heading font-bold text-ink mb-4">부가상품 선택</h3>
            <div className="flex flex-col gap-3">
              {extraProducts.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedIdx(i)}
                  className={`w-full p-card-lg rounded-card border text-left transition-all ${
                    selectedIdx === i ? 'border-primary bg-primary-50' : 'border-border hover:border-primary'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-card flex items-center justify-center text-title ${
                      selectedIdx === i ? 'bg-primary/10' : 'bg-surface-muted'
                    }`}>
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-body font-bold text-ink">{item.name}</span>
                        <span className="text-label text-ink-tertiary">{item.duration}</span>
                      </div>
                      <p className="text-label text-ink-tertiary mb-1">{item.desc}</p>
                      <span className="text-body font-bold text-ink">{item.price}<span className="text-label font-normal">원</span></span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Bottom CTA */}
      <BottomCTA hideBottomNav>
        <div className="flex-1">
          <p className="text-label text-ink-tertiary">
            {tab === 'membership' && selectedPlan ? selectedPlan.name : ''}
            {tab === 'lesson' ? '레슨권' : ''}
            {tab === 'extra' && selectedExtra ? selectedExtra.name : ''}
          </p>
          <p className="text-title font-bold text-ink">
            {tab === 'membership' && selectedPlan ? `${selectedPlan.price}원` : ''}
            {tab === 'lesson' ? `${lessonCategories[0].plans[0].total}원~` : ''}
            {tab === 'extra' && selectedExtra ? `${selectedExtra.price}원` : ''}
          </p>
        </div>
        <button
          onClick={() => navigate('/reservation')}
          className="px-8 py-3.5 bg-primary text-white text-body font-bold rounded-card hover:bg-primary-dark transition-colors"
        >
          구매하기
        </button>
      </BottomCTA>
    </PageLayout>
  )
}
