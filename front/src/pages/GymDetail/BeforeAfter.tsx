import { useParams } from 'react-router-dom'
import { SubPageHeader, PageLayout } from '../../components'

const baItems = [
  { before: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300&h=400&fit=crop', after: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=400&fit=crop', name: '김○○ 회원', result: '-12kg / 3개월', tag: '다이어트', period: '2025.09 ~ 2025.12', trainer: '최강민 트레이너' },
  { before: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300&h=400&fit=crop', after: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=300&h=400&fit=crop', name: '이○○ 회원', result: '+5kg 근육 / 4개월', tag: '벌크업', period: '2025.08 ~ 2025.12', trainer: '한동훈 트레이너' },
  { before: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=300&h=400&fit=crop', after: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=300&h=400&fit=crop', name: '박○○ 회원', result: '체형교정 / 6개월', tag: '체형교정', period: '2025.06 ~ 2025.12', trainer: '정서연 트레이너' },
  { before: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=300&h=400&fit=crop', after: 'https://images.unsplash.com/photo-1550345332-09e3ac987658?w=300&h=400&fit=crop', name: '최○○ 회원', result: '-8kg / 2개월', tag: '다이어트', period: '2025.10 ~ 2025.12', trainer: '최강민 트레이너' },
  { before: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=300&h=400&fit=crop', after: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=300&h=400&fit=crop', name: '정○○ 회원', result: '+8kg 근육 / 5개월', tag: '벌크업', period: '2025.07 ~ 2025.12', trainer: '한동훈 트레이너' },
  { before: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=400&fit=crop', after: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=300&h=400&fit=crop', name: '윤○○ 회원', result: '유연성 향상 / 4개월', tag: '체형교정', period: '2025.08 ~ 2025.12', trainer: '박지영 트레이너' },
]

export const GymBeforeAfterPage = () => {
  const { id } = useParams()
  const header = <SubPageHeader title="Before & After" />

  return (
    <PageLayout header={header} hideNav>
      <div className="px-page py-section">
        <p className="text-body text-ink-secondary mb-4">
          바디채널 {id === '1' ? '강남점' : id === '2' ? '역삼점' : id === '3' ? '서초점' : '판교점'} 회원들의 변화 기록
        </p>

        <div className="flex flex-col gap-6">
          {baItems.map((item, i) => (
            <div key={i} className="bg-surface rounded-card-lg shadow-card overflow-hidden">
              <div className="flex">
                <div className="relative flex-1">
                  <img src={item.before} alt="Before" className="w-full aspect-[3/4] object-cover" />
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 text-white text-caption font-bold rounded">BEFORE</span>
                </div>
                <div className="relative flex-1">
                  <img src={item.after} alt="After" className="w-full aspect-[3/4] object-cover" />
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-primary text-white text-caption font-bold rounded">AFTER</span>
                </div>
              </div>
              <div className="p-card-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-title font-bold text-ink">{item.name}</p>
                  <span className="px-2.5 py-0.5 bg-primary-50 text-primary text-caption font-bold rounded-pill">{item.tag}</span>
                </div>
                <p className="text-body text-primary font-bold mb-1">{item.result}</p>
                <div className="flex items-center gap-2 text-label text-ink-secondary">
                  <span>{item.period}</span>
                  <span>·</span>
                  <span>{item.trainer}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}
