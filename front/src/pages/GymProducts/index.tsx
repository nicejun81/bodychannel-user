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

/* ── 회원권 상품 ── */
interface MembershipProduct { name: string; desc: string; icon: string; durations: { label: string; price: string; original?: string; tag?: string; installment?: string }[] }
const membershipProducts: MembershipProduct[] = [
  { name: '헬스 이용권', desc: '자유롭게 헬스장 이용', icon: '🏋️', durations: [
    { label: '월 구독권', price: '79,000' },
    { label: '3개월권', price: '249,000', original: '297,000', tag: '16% OFF', installment: '월 83,000원 (3개월 무이자)' },
    { label: '6개월권', price: '449,000', original: '594,000', tag: '24% OFF', installment: '월 74,833원 (6개월 무이자)' },
    { label: '12개월권', price: '790,000', original: '1,188,000', tag: '33% OFF', installment: '월 65,833원 (12개월 무이자)' },
  ]},
]

/* ── 레슨권 상품 ── */
interface LessonCategory {
  name: string; categoryColor: 'bareton' | 'hit35' | 'gymground' | 'pt'; desc: string; icon: string
  plans: { sessions: string; perSession: string; total: string; tag?: string }[]
}
const lessonCategories: LessonCategory[] = [
  { name: '바레톤', categoryColor: 'bareton', icon: '🩰', desc: '발레 동작 기반 체형 교정 & 코어 강화', plans: [
    { sessions: '1회 체험', perSession: '30,000', total: '30,000', tag: '체험특가' },
    { sessions: '10회', perSession: '25,000', total: '250,000' },
    { sessions: '20회', perSession: '22,000', total: '440,000', tag: '12% OFF' },
    { sessions: '30회', perSession: '20,000', total: '600,000', tag: '인기' },
  ]},
  { name: '히트35', categoryColor: 'hit35', icon: '🔥', desc: '고강도 전신 근력 트레이닝 35분', plans: [
    { sessions: '1회 체험', perSession: '25,000', total: '25,000', tag: '체험특가' },
    { sessions: '10회', perSession: '20,000', total: '200,000' },
    { sessions: '20회', perSession: '18,000', total: '360,000', tag: '10% OFF' },
    { sessions: '30회', perSession: '16,000', total: '480,000', tag: '인기' },
  ]},
  { name: '짐그라운드', categoryColor: 'gymground', icon: '🚴', desc: '스피닝 · 서킷 · 펑셔널 트레이닝', plans: [
    { sessions: '1회 체험', perSession: '25,000', total: '25,000', tag: '체험특가' },
    { sessions: '10회', perSession: '22,000', total: '220,000' },
    { sessions: '20회', perSession: '19,000', total: '380,000', tag: '14% OFF' },
  ]},
  { name: 'PT', categoryColor: 'pt', icon: '💪', desc: '1:1 맞춤 퍼스널 트레이닝', plans: [
    { sessions: '1회 체험', perSession: '50,000', total: '50,000', tag: '체험특가' },
    { sessions: '10회', perSession: '70,000', total: '700,000' },
    { sessions: '20회', perSession: '65,000', total: '1,300,000', tag: '5만원 할인' },
    { sessions: '30회', perSession: '60,000', total: '1,800,000', tag: '인기' },
  ]},
]

/* ── 부가상품 ── */
interface ExtraProduct { name: string; icon: string; desc: string; durations: { label: string; price: string; tag?: string }[] }
const extraProducts: ExtraProduct[] = [
  { name: '개인 락커', icon: '🔒', desc: '나만의 개인 보관함', durations: [
    { label: '1개월', price: '30,000' }, { label: '3개월', price: '80,000', tag: '11% OFF' },
    { label: '6개월', price: '150,000', tag: '17% OFF' }, { label: '12개월', price: '270,000', tag: '25% OFF' },
  ]},
  { name: '운동복 대여', icon: '👕', desc: '매일 깨끗한 운동복 제공', durations: [
    { label: '1개월', price: '20,000' }, { label: '3개월', price: '54,000', tag: '10% OFF' },
    { label: '6개월', price: '96,000', tag: '20% OFF' },
  ]},
  { name: '프리미엄 타월', icon: '🧖', desc: '고급 타월 무제한 이용', durations: [
    { label: '1개월', price: '10,000' }, { label: '3개월', price: '27,000', tag: '10% OFF' },
    { label: '6개월', price: '48,000', tag: '20% OFF' },
  ]},
]

/* ── 공통 기간 선택 카드 ── */
function DurationCard({ label, price, original, tag, installment, selected, onClick }: {
  label: string; price: string; original?: string; tag?: string; installment?: string; selected: boolean; onClick: () => void
}) {
  return (
    <button onClick={onClick} className={`w-full p-card-lg rounded-card border text-left transition-all ${selected ? 'border-primary bg-primary-50' : 'border-border hover:border-primary'}`}>
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <span className="text-body font-bold text-ink">{label}</span>
          {tag && <span className="px-1.5 py-0.5 bg-primary text-white text-caption font-bold rounded">{tag}</span>}
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-heading font-bold text-ink">{price}<span className="text-body font-normal">원</span></span>
        {original && <span className="text-body text-ink-tertiary line-through">{original}원</span>}
      </div>
      {installment && <p className="text-label text-primary mt-1">{installment}</p>}
    </button>
  )
}

export const GymProductsPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const data = gymsData[id || ''] || defaultGym
  const [tab, setTab] = useState<Tab>('membership')
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [selectedDurIdx, setSelectedDurIdx] = useState(0)

  const reset = (t: Tab) => { setTab(t); setSelectedIdx(0); setSelectedDurIdx(0) }

  // CTA 데이터
  const ctaLabel = (() => {
    if (tab === 'membership') return `${membershipProducts[selectedIdx].name} · ${membershipProducts[selectedIdx].durations[selectedDurIdx].label}`
    if (tab === 'lesson') return `${lessonCategories[selectedIdx].name} · ${lessonCategories[selectedIdx].plans[selectedDurIdx].sessions}`
    if (tab === 'extra') return `${extraProducts[selectedIdx].name} · ${extraProducts[selectedIdx].durations[selectedDurIdx].label}`
    return ''
  })()
  const ctaPrice = (() => {
    if (tab === 'membership') return membershipProducts[selectedIdx].durations[selectedDurIdx].price
    if (tab === 'lesson') return lessonCategories[selectedIdx].plans[selectedDurIdx].total
    if (tab === 'extra') return extraProducts[selectedIdx].durations[selectedDurIdx].price
    return ''
  })()

  const header = <SubPageHeader title="상품선택" />

  return (
    <PageLayout header={header} hideBottomNav>
      {/* Gym Info */}
      <div className="pt-2 pb-4">
        <div className="flex items-center gap-4">
          <img src={data.heroImages[0]?.url || ''} alt={data.name} className="w-16 h-16 rounded-card object-cover flex-shrink-0" />
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
            <button key={key} onClick={() => reset(key)} className={`flex-1 py-2.5 rounded-pill text-body font-bold transition-colors ${tab === key ? 'bg-primary text-white' : 'bg-surface-muted text-ink-secondary hover:bg-surface-subtle'}`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="pb-[100px]">

        {/* ── 회원권: 상품 선택 → 기간 선택 ── */}
        {tab === 'membership' && (
          <>
            <h3 className="text-heading font-bold text-ink mb-4">상품 선택</h3>
            <div className="flex flex-col gap-3">
              {membershipProducts.map((item, i) => (
                <button key={i} onClick={() => { setSelectedIdx(i); setSelectedDurIdx(0) }}
                  className={`w-full p-card-lg rounded-card border text-left transition-all ${selectedIdx === i ? 'border-primary bg-primary-50' : 'border-border hover:border-primary'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-card flex items-center justify-center text-title ${selectedIdx === i ? 'bg-primary/10' : 'bg-surface-muted'}`}>{item.icon}</div>
                    <div className="flex-1">
                      <span className="text-body font-bold text-ink">{item.name}</span>
                      <p className="text-label text-ink-tertiary mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-section">
              <h3 className="text-heading font-bold text-ink mb-4">기간 선택</h3>
              <div className="flex flex-col gap-3">
                {membershipProducts[selectedIdx].durations.map((dur, di) => (
                  <DurationCard key={di} label={dur.label} price={dur.price} original={dur.original} tag={dur.tag} installment={dur.installment} selected={selectedDurIdx === di} onClick={() => setSelectedDurIdx(di)} />
                ))}
              </div>
              <p className="text-label text-ink-tertiary text-center mt-4">카드사별 무이자 할부 혜택이 제공됩니다</p>
            </div>
          </>
        )}

        {/* ── 레슨권: 카테고리 선택 → 회차 선택 ── */}
        {tab === 'lesson' && (
          <>
            <h3 className="text-heading font-bold text-ink mb-4">레슨 선택</h3>
            <div className="flex flex-col gap-3">
              {lessonCategories.map((cat, i) => (
                <button key={i} onClick={() => { setSelectedIdx(i); setSelectedDurIdx(0) }}
                  className={`w-full p-card-lg rounded-card border text-left transition-all ${selectedIdx === i ? 'border-primary bg-primary-50' : 'border-border hover:border-primary'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-card flex items-center justify-center text-title ${selectedIdx === i ? 'bg-primary/10' : 'bg-surface-muted'}`}>{cat.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`px-1.5 py-0.5 text-caption font-bold rounded ${categoryStyles[cat.categoryColor]}`}>{cat.name}</span>
                      </div>
                      <p className="text-label text-ink-tertiary">{cat.desc}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-section">
              <h3 className="text-heading font-bold text-ink mb-4">회차 선택</h3>
              <div className="flex flex-col gap-3">
                {lessonCategories[selectedIdx].plans.map((plan, pi) => (
                  <DurationCard key={pi} label={plan.sessions} price={plan.total} tag={plan.tag} selected={selectedDurIdx === pi} onClick={() => setSelectedDurIdx(pi)} />
                ))}
              </div>
              <p className="text-label text-ink-tertiary text-center mt-4">1회당 {lessonCategories[selectedIdx].plans[selectedDurIdx].perSession}원</p>
            </div>
          </>
        )}

        {/* ── 부가상품: 상품 선택 → 기간 선택 ── */}
        {tab === 'extra' && (
          <>
            <h3 className="text-heading font-bold text-ink mb-4">부가상품 선택</h3>
            <div className="flex flex-col gap-3">
              {extraProducts.map((item, i) => (
                <button key={i} onClick={() => { setSelectedIdx(i); setSelectedDurIdx(0) }}
                  className={`w-full p-card-lg rounded-card border text-left transition-all ${selectedIdx === i ? 'border-primary bg-primary-50' : 'border-border hover:border-primary'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-card flex items-center justify-center text-title ${selectedIdx === i ? 'bg-primary/10' : 'bg-surface-muted'}`}>{item.icon}</div>
                    <div className="flex-1">
                      <span className="text-body font-bold text-ink">{item.name}</span>
                      <p className="text-label text-ink-tertiary mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-section">
              <h3 className="text-heading font-bold text-ink mb-4">기간 선택</h3>
              <div className="flex flex-col gap-3">
                {extraProducts[selectedIdx].durations.map((dur, di) => (
                  <DurationCard key={di} label={dur.label} price={dur.price} tag={dur.tag} selected={selectedDurIdx === di} onClick={() => setSelectedDurIdx(di)} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Bottom CTA */}
      <BottomCTA hideBottomNav>
        <div className="flex-1">
          <p className="text-label text-ink-tertiary">{ctaLabel}</p>
          <p className="text-title font-bold text-ink">{ctaPrice}원</p>
        </div>
        <button onClick={() => navigate('/reservation')} className="px-8 py-3.5 bg-primary text-white text-body font-bold rounded-card hover:bg-primary-dark transition-colors">
          구매하기
        </button>
      </BottomCTA>
    </PageLayout>
  )
}
