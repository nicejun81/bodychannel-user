import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { PageLayout, SubPageHeader, BottomCTA, Badge } from '../../components'
import { gymsData, defaultGym } from '../GymDetail'
import { IconStarFilled } from '../../components/Icons'

type Tab = 'membership' | 'lesson' | 'extra'

const categoryStyles: Record<string, string> = {
  bareton: 'bg-category-bareton-bg text-category-bareton-text',
  hit35: 'bg-category-hit35-bg text-category-hit35-text',
  gymground: 'bg-category-gymground-bg text-category-gymground-text',
  pt: 'bg-primary-50 text-primary',
}

interface Duration { label: string; price: string; original?: string; tag?: string; installment?: string; per?: string }

const membershipProducts = [
  { name: '헬스 이용권', icon: '🏋️', durations: [
    { label: '월 구독권', price: '79,000' },
    { label: '3개월권', price: '249,000', original: '297,000', tag: '16% OFF', installment: '월 83,000원' },
    { label: '6개월권', price: '449,000', original: '594,000', tag: '24% OFF', installment: '월 74,833원' },
    { label: '12개월권', price: '790,000', original: '1,188,000', tag: '33% OFF', installment: '월 65,833원' },
  ] as Duration[] },
]

const lessonCategories = [
  { name: '바레톤', categoryColor: 'bareton' as const, icon: '🩰', plans: [
    { label: '1회 체험', price: '30,000', tag: '체험특가', per: '30,000' },
    { label: '10회', price: '250,000', per: '25,000' },
    { label: '20회', price: '440,000', tag: '12% OFF', per: '22,000' },
    { label: '30회', price: '600,000', tag: '인기', per: '20,000' },
  ] as Duration[] },
  { name: '히트35', categoryColor: 'hit35' as const, icon: '🔥', plans: [
    { label: '1회 체험', price: '25,000', tag: '체험특가', per: '25,000' },
    { label: '10회', price: '200,000', per: '20,000' },
    { label: '20회', price: '360,000', tag: '10% OFF', per: '18,000' },
    { label: '30회', price: '480,000', tag: '인기', per: '16,000' },
  ] as Duration[] },
  { name: '짐그라운드', categoryColor: 'gymground' as const, icon: '🚴', plans: [
    { label: '1회 체험', price: '25,000', tag: '체험특가', per: '25,000' },
    { label: '10회', price: '220,000', per: '22,000' },
    { label: '20회', price: '380,000', tag: '14% OFF', per: '19,000' },
  ] as Duration[] },
  { name: 'PT', categoryColor: 'pt' as const, icon: '💪', plans: [
    { label: '1회 체험', price: '50,000', tag: '체험특가', per: '50,000' },
    { label: '10회', price: '700,000', per: '70,000' },
    { label: '20회', price: '1,300,000', tag: '5만원 할인', per: '65,000' },
    { label: '30회', price: '1,800,000', tag: '인기', per: '60,000' },
  ] as Duration[] },
]

const extraProducts = [
  { name: '개인 락커', icon: '🔒', durations: [
    { label: '1개월', price: '30,000' }, { label: '3개월', price: '80,000', tag: '11% OFF' },
    { label: '6개월', price: '150,000', tag: '17% OFF' }, { label: '12개월', price: '270,000', tag: '25% OFF' },
  ] as Duration[] },
  { name: '운동복 대여', icon: '👕', durations: [
    { label: '1개월', price: '20,000' }, { label: '3개월', price: '54,000', tag: '10% OFF' },
    { label: '6개월', price: '96,000', tag: '20% OFF' },
  ] as Duration[] },
  { name: '프리미엄 타월', icon: '🧖', durations: [
    { label: '1개월', price: '10,000' }, { label: '3개월', price: '27,000', tag: '10% OFF' },
    { label: '6개월', price: '48,000', tag: '20% OFF' },
  ] as Duration[] },
]

function getDurations(tab: Tab, idx: number): Duration[] {
  if (tab === 'membership') return membershipProducts[idx].durations
  if (tab === 'lesson') return lessonCategories[idx].plans
  return extraProducts[idx].durations
}

function getProductItems(tab: Tab) {
  if (tab === 'membership') return membershipProducts.map(p => ({ name: p.name, icon: p.icon }))
  if (tab === 'lesson') return lessonCategories.map(c => ({ name: c.name, icon: c.icon, categoryColor: c.categoryColor }))
  return extraProducts.map(p => ({ name: p.name, icon: p.icon }))
}

const tabConfig = [
  { key: 'membership' as Tab, label: '회원권', icon: '🏋️' },
  { key: 'lesson' as Tab, label: '레슨권', icon: '📋' },
  { key: 'extra' as Tab, label: '부가상품', icon: '🎒' },
]

export const GymProductsPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const data = gymsData[id || ''] || defaultGym
  const [tab, setTab] = useState<Tab>('membership')
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [selectedDurIdx, setSelectedDurIdx] = useState(0)

  const reset = (t: Tab) => { setTab(t); setSelectedIdx(0); setSelectedDurIdx(0) }
  const durations = getDurations(tab, selectedIdx)
  const selectedDur = durations[selectedDurIdx]
  const products = getProductItems(tab)

  const ctaLabel = `${products[selectedIdx].name} · ${selectedDur.label}`

  const header = <SubPageHeader title="상품선택" />

  // Find the best-value plan index (highest discount tag)
  const bestValueIdx = durations.reduce((best, dur, i) => {
    if (dur.tag?.includes('인기') || dur.tag?.includes('33%')) return i
    if (dur.tag && !durations[best]?.tag) return i
    return best
  }, -1)

  return (
    <PageLayout header={header} hideBottomNav>
      {/* ── Gym Hero Banner ── */}
      <div className="-mx-page -mt-4">
        <div className="relative h-[160px] overflow-hidden">
          <img
            src={data.heroImages[0]?.url || ''}
            alt={data.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 px-page pb-4">
            <div className="flex items-end justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-heading font-bold text-white">{data.name}</h2>
                  {data.badge && <Badge variant="primary" size="sm">{data.badge}</Badge>}
                </div>
                <div className="flex items-center gap-1.5">
                  <IconStarFilled className="w-3.5 h-3.5 text-semantic-star" />
                  <span className="text-label font-semibold text-white">{data.rating}</span>
                  <span className="text-label text-white/60">({data.reviewCount})</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Coupon Strip ── */}
      {data.coupons.length > 0 && (
        <div className="py-3 -mx-page px-page">
          <div className="flex gap-2 overflow-x-auto hide-scrollbar">
            {data.coupons.map((c, i) => (
              <div key={i} className="min-w-0 flex-shrink-0 flex items-center gap-2 px-3 py-2 bg-primary-50 border border-primary/15 rounded-pill">
                <span className="text-label font-bold text-primary whitespace-nowrap">{c.discount}</span>
                <span className="text-caption text-ink-tertiary whitespace-nowrap">{c.condition}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Category Tabs (회원권/레슨권/부가상품) ── */}
      <div className="pt-2 pb-3">
        <div className="flex bg-surface-muted rounded-card-lg p-1 gap-1">
          {tabConfig.map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => reset(key)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-card text-label font-bold transition-all ${
                tab === key
                  ? 'bg-surface text-ink shadow-card'
                  : 'text-ink-tertiary hover:text-ink-secondary'
              }`}
            >
              <span className="text-body">{icon}</span>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Product Sub-tabs (for lesson/extra with multiple items) ── */}
      {products.length > 1 && (
        <div className="pb-3">
          <div className="grid grid-cols-3 gap-2">
            {products.map((item, i) => {
              const isLesson = tab === 'lesson'
              const cat = isLesson ? lessonCategories[i] : null
              const isSelected = selectedIdx === i
              return (
                <button key={i} onClick={() => { setSelectedIdx(i); setSelectedDurIdx(0) }}
                  className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-card border-2 text-label font-bold transition-all truncate ${
                    isSelected
                      ? isLesson && cat ? `${categoryStyles[cat.categoryColor]} border-current` : 'bg-ink text-white border-ink'
                      : 'bg-surface-subtle text-ink-secondary border-transparent hover:border-border'
                  }`}>
                  <span className="flex-shrink-0">{item.icon}</span>
                  <span className="truncate">{item.name}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* ── Plan Cards ── */}
      <div className="pt-1 pb-[120px]">
        <div className="flex flex-col gap-3">
          {durations.map((dur, di) => {
            const selected = selectedDurIdx === di
            const isBestValue = bestValueIdx === di

            return (
              <button
                key={di}
                onClick={() => setSelectedDurIdx(di)}
                className={`w-full text-left rounded-card-lg border-2 transition-all overflow-hidden ${
                  selected
                    ? 'border-primary bg-primary-50 shadow-card'
                    : 'border-border bg-surface hover:border-ink-disabled hover:shadow-card'
                }`}
              >
                <div className="px-card-lg py-3.5">
                  <div className="flex items-center gap-3">
                    {/* Selection indicator */}
                    <div className="flex-shrink-0">
                      {selected ? (
                        <div className="w-[22px] h-[22px] rounded-full bg-primary flex items-center justify-center">
                          <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-white fill-current">
                            <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                          </svg>
                        </div>
                      ) : (
                        <div className="w-[22px] h-[22px] rounded-full border-2 border-ink-disabled" />
                      )}
                    </div>

                    {/* Plan info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`text-body font-bold ${selected ? 'text-ink' : 'text-ink-secondary'}`}>
                          {dur.label}
                        </span>
                        {isBestValue && (
                          <span className="px-1.5 py-0.5 bg-primary text-white text-caption font-bold rounded">추천</span>
                        )}
                        {dur.tag && (
                          <span className="px-1.5 py-0.5 bg-primary/10 text-primary text-caption font-bold rounded">
                            {dur.tag}
                          </span>
                        )}
                      </div>
                      {(dur.original || dur.per || dur.installment) && (
                        <div className="flex items-center gap-2 mt-1">
                          {dur.original && (
                            <span className="text-label text-ink-disabled line-through">{dur.original}원</span>
                          )}
                          {dur.installment && (
                            <span className="text-label text-primary font-semibold">{dur.installment}</span>
                          )}
                          {dur.per && (
                            <span className="text-label text-ink-tertiary">1회 {dur.per}원</span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Price */}
                    <div className="flex-shrink-0 text-right">
                      <span className={`text-title font-bold ${selected ? 'text-primary' : 'text-ink'}`}>
                        {dur.price}
                      </span>
                      <span className={`text-label ${selected ? 'text-primary' : 'text-ink-secondary'}`}>원</span>
                    </div>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {tab === 'membership' && (
          <p className="text-label text-ink-tertiary text-center mt-4">카드사별 무이자 할부 혜택이 제공됩니다</p>
        )}
      </div>

      {/* ── Bottom CTA ── */}
      <BottomCTA hideBottomNav>
        <div className="flex-1 min-w-0">
          <p className="text-caption text-ink-tertiary truncate">{ctaLabel}</p>
          <p className="text-title font-bold text-ink">{selectedDur.price}원</p>
        </div>
        <button
          onClick={() => navigate('/reservation')}
          className="px-8 py-3.5 bg-primary text-white text-body font-bold rounded-card hover:bg-primary-dark transition-colors flex-shrink-0"
        >
          구매하기
        </button>
      </BottomCTA>
    </PageLayout>
  )
}
