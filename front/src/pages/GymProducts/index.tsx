import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { PageLayout, SubPageHeader, PlanCard, EmptyState } from '../../components'
import { gymsData, defaultGym } from '../GymDetail'

type Tab = 'membership' | 'lesson' | 'extra'

const extraProducts = [
  { name: '개인 락커', duration: '1개월', price: '30,000' },
  { name: '운동복 대여', duration: '1개월', price: '20,000' },
  { name: 'GX 무제한', duration: '1개월', price: '50,000' },
]

export const GymProductsPage = () => {
  const { id } = useParams()
  const data = gymsData[id || ''] || defaultGym
  const [tab, setTab] = useState<Tab>('membership')

  const header = <SubPageHeader title="상품선택" />

  return (
    <PageLayout header={header} hideBottomNav>
      {/* Gym name */}
      <div className="mb-section">
        <p className="text-label text-ink-tertiary">{data.name}</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-section">
        {([['membership', '회원권'], ['lesson', '레슨권'], ['extra', '부가상품']] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex-1 py-2.5 rounded-xl text-body font-semibold transition-colors ${tab === key ? 'bg-primary text-white' : 'bg-surface-muted text-ink-secondary'}`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div>
        {tab === 'membership' && (
          <div className="space-y-3">
            {data.plans.map((plan, i) => (
              <PlanCard
                key={i}
                name={plan.name}
                duration={plan.duration}
                price={plan.price}
                original={plan.original}
                tag={plan.tag}
                installment={plan.installment}
                highlighted={i === 0}
              />
            ))}
            <p className="text-label text-ink-tertiary text-center pt-2 pb-4">카드사별 무이자 할부 혜택이 제공됩니다</p>
          </div>
        )}

        {tab === 'lesson' && (
          <div className="space-y-3">
            {data.ptPlans.length > 0 ? data.ptPlans.map((pt, i) => (
              <PlanCard
                key={i}
                name={`${pt.sessions}회`}
                price={pt.price}
                original={pt.original}
                tag={pt.tag}
                perSession={pt.perSession}
                highlighted={pt.tag === '인기'}
              />
            )) : (
              <EmptyState message="등록된 레슨권이 없습니다" />
            )}
          </div>
        )}

        {tab === 'extra' && (
          <div className="space-y-3">
            {extraProducts.map((item, i) => (
              <button key={i} className="w-full p-card-lg rounded-card border border-border text-left transition-colors hover:border-primary">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-body font-bold text-ink">{item.name}</span>
                  <span className="text-label text-ink-tertiary">{item.duration}</span>
                </div>
                <span className="text-title font-bold text-ink">{item.price}<span className="text-body">원</span></span>
              </button>
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  )
}
