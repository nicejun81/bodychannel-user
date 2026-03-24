import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { PageLayout, SubPageHeader } from '../../components'
import { IconShare, IconClock, IconMapPin } from '../../components/Icons'

/* ── types ── */
interface Facility { icon: string; label: string }
interface PricePlan { name: string; duration: string; price: string; original?: string; tag?: string; installment?: string }
interface ReviewItem { name: string; avatar: string; rating: number; date: string; text: string; photos?: string[]; membershipType?: string }
interface GymPhoto { url: string; label: string }
interface Trainer { id: number; name: string; avatar: string; specialty: string; rating: number; reviewCount: number; perSession: string }
interface ScheduleItem { time: string; name: string; instructor: string; spots: string }
interface Coupon { label: string; discount: string; condition: string }
interface PTplan { sessions: string; pricePerSession: string; totalPrice: string; tag?: string }
interface Notice { date: string; title: string; isNew?: boolean }
interface CongestionLevel { time: string; level: number }

interface GymInfo {
  name: string
  address: string
  lat: number
  lng: number
  phone: string
  hours: string
  hoursDetail: { day: string; time: string }[]
  rating: number
  reviewCount: number
  heroImages: GymPhoto[]
  galleryImages: GymPhoto[]
  description: string
  facilities: Facility[]
  plans: PricePlan[]
  ptPlans: PTplan[]
  reviews: ReviewItem[]
  tags: string[]
  badge?: string
  badgeType?: string
  trainers: Trainer[]
  schedule: ScheduleItem[]
  coupons: Coupon[]
  nearbyGyms: { id: string; name: string; distance: string; price: string }[]
  notices: Notice[]
  congestion: CongestionLevel[]
  usageGuide: string[]
  refundPolicy: string[]
}

/* ── data (gym1 full, others abbreviated) ── */
export const gymsData: Record<string, GymInfo> = {
  gym1: {
    name: '바디채널 강남점',
    address: '서울 강남구 테헤란로 123 4층',
    lat: 37.4980, lng: 127.0276,
    phone: '02-1234-5678',
    hours: '06:00 - 24:00',
    hoursDetail: [
      { day: '평일', time: '06:00 - 24:00' },
      { day: '토요일', time: '08:00 - 22:00' },
      { day: '일요일·공휴일', time: '09:00 - 20:00' },
    ],
    rating: 4.8, reviewCount: 412,
    heroImages: [
      { url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=450&fit=crop', label: '메인' },
      { url: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&h=450&fit=crop', label: '웨이트존' },
      { url: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=450&fit=crop', label: '카디오존' },
    ],
    galleryImages: [
      { url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop', label: '메인' },
      { url: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400&h=400&fit=crop', label: '웨이트존' },
      { url: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=400&fit=crop', label: '카디오존' },
      { url: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=400&h=400&fit=crop', label: '러닝머신' },
      { url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=400&fit=crop', label: '스트레칭존' },
      { url: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=400&h=400&fit=crop', label: 'GX룸' },
      { url: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=400&h=400&fit=crop', label: '샤워실' },
      { url: 'https://images.unsplash.com/photo-1570829460005-c840387bb1ca?w=400&h=400&fit=crop', label: '락커룸' },
    ],
    description: '강남역 3번 출구 도보 2분 거리에 위치한 프리미엄 피트니스 센터입니다. 최신 장비와 넓은 운동 공간, 전문 트레이너가 함께합니다.',
    tags: ['24시간', '주차가능', '샤워실'], badge: 'BEST',
    facilities: [
      { icon: '🏋️', label: '프리웨이트' }, { icon: '🚿', label: '샤워실' },
      { icon: '🅿️', label: '주차장' }, { icon: '🧖', label: '사우나' },
      { icon: '👕', label: '운동복 대여' }, { icon: '🔒', label: '개인 락커' },
      { icon: '📶', label: 'Wi-Fi' }, { icon: '💪', label: 'GX룸' },
    ],
    trainers: [
      { id: 1, name: '최강민', avatar: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&h=200&fit=crop&crop=face', specialty: 'PT · 체형교정', rating: 4.9, reviewCount: 127, perSession: '70,000' },
      { id: 2, name: '김민수', avatar: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=200&h=200&fit=crop&crop=face', specialty: 'PT · 다이어트', rating: 4.8, reviewCount: 89, perSession: '60,000' },
      { id: 3, name: '박지영', avatar: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face', specialty: '필라테스 · 바레톤', rating: 4.7, reviewCount: 64, perSession: '65,000' },
    ],
    schedule: [
      { time: '07:00', name: '모닝 요가', instructor: '이수진', spots: '3/15' },
      { time: '09:00', name: '바디펌프', instructor: '한동훈', spots: '8/20' },
      { time: '12:00', name: '점심 필라테스', instructor: '박지영', spots: '2/12' },
      { time: '18:30', name: 'HIIT 클래스', instructor: '최강민', spots: '12/20' },
      { time: '20:00', name: '스피닝', instructor: '김민수', spots: '5/15' },
    ],
    coupons: [
      { label: '신규 가입', discount: '첫 달 80% OFF', condition: '첫 결제 시' },
      { label: '친구 추천', discount: '1개월 무료', condition: '추천인과 함께 등록 시' },
    ],
    plans: [
      { name: '첫결제 특가', duration: '1개월', price: '19,900', original: '99,000', tag: 'BEST' },
      { name: '월 회원권', duration: '1개월', price: '99,000' },
      { name: '3개월권', duration: '3개월', price: '249,000', original: '297,000', tag: '16% OFF', installment: '월 83,000원 (3개월 무이자)' },
      { name: '6개월권', duration: '6개월', price: '449,000', original: '594,000', tag: '24% OFF', installment: '월 74,833원 (6개월 무이자)' },
      { name: '12개월권', duration: '12개월', price: '790,000', original: '1,188,000', tag: '33% OFF', installment: '월 65,833원 (12개월 무이자)' },
    ],
    ptPlans: [
      { sessions: '1회 체험', pricePerSession: '50,000', totalPrice: '50,000', tag: '체험특가' },
      { sessions: '10회', pricePerSession: '70,000', totalPrice: '700,000' },
      { sessions: '20회', pricePerSession: '65,000', totalPrice: '1,300,000', tag: '5만원 할인' },
      { sessions: '30회', pricePerSession: '60,000', totalPrice: '1,800,000', tag: '인기' },
    ],
    reviews: [
      { name: '헬스왕', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', rating: 5, date: '2025.12.20', text: '시설이 깔끔하고 장비가 최신이라 좋습니다. 특히 프리웨이트 구역이 넓어서 쾌적해요.', photos: ['https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&h=200&fit=crop', 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=200&h=200&fit=crop'], membershipType: '12개월권' },
      { name: '운동초보', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face', rating: 5, date: '2025.12.05', text: '트레이너분들이 친절하고 운동 방법 잘 알려주세요. 초보자한테 추천합니다!', membershipType: 'PT 20회' },
      { name: '직장인B', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', rating: 4, date: '2025.11.18', text: '24시간이라 퇴근 후 늦게 가도 운동할 수 있어서 최고입니다.', photos: ['https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=200&h=200&fit=crop'], membershipType: '6개월권' },
    ],
    nearbyGyms: [
      { id: 'gym2', name: '바디채널 역삼점', distance: '1.2km', price: '79,000' },
      { id: 'gym5', name: '바디채널 선릉점', distance: '1.8km', price: '89,000' },
    ],
    notices: [
      { date: '2025.12.28', title: '연말 특별 이벤트 - 신규 가입 80% 할인', isNew: true },
      { date: '2025.12.20', title: '크리스마스 휴무 안내 (12/25 10:00-18:00 운영)' },
      { date: '2025.12.15', title: 'GX 프로그램 시간표 변경 안내' },
    ],
    congestion: [
      { time: '06', level: 2 }, { time: '07', level: 3 }, { time: '08', level: 5 },
      { time: '09', level: 4 }, { time: '10', level: 3 }, { time: '11', level: 2 },
      { time: '12', level: 4 }, { time: '13', level: 3 }, { time: '14', level: 2 },
      { time: '15', level: 2 }, { time: '16', level: 3 }, { time: '17', level: 4 },
      { time: '18', level: 7 }, { time: '19', level: 9 }, { time: '20', level: 8 },
      { time: '21', level: 6 }, { time: '22', level: 4 }, { time: '23', level: 2 },
    ],
    usageGuide: [
      '운동복 및 실내화를 착용해주세요 (운동복 대여 가능)',
      '개인 물병을 지참해주세요 (정수기 이용 가능)',
      '기구 사용 후 소독 타월로 닦아주세요',
      '무인 운영 시간(22:00-06:00)에는 QR코드로 입장해주세요',
      '주차는 2시간 무료이며, 추가 시 시간당 1,000원입니다',
      '락커 이용은 당일 반납이 원칙이며, 월정액 락커는 별도 문의바랍니다',
    ],
    refundPolicy: [
      '이용 시작 전: 전액 환불',
      '이용 시작 후 1/3 경과 전: 이용일수 차감 후 2/3 환불',
      '이용 시작 후 1/2 경과 전: 이용일수 차감 후 1/2 환불',
      '이용 시작 후 1/2 경과 후: 환불 불가',
      'PT 회원권: 잔여 횟수 기준 환불 (위약금 10%)',
    ],
  },
  gym2: {
    name: '바디채널 역삼점', address: '서울 강남구 역삼로 789 2층', lat: 37.5007, lng: 127.0365, phone: '02-2345-6789', hours: '05:00 - 23:00',
    hoursDetail: [{ day: '평일', time: '05:00 - 23:00' }, { day: '주말', time: '07:00 - 21:00' }],
    rating: 4.6, reviewCount: 287,
    heroImages: [
      { url: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&h=450&fit=crop', label: '메인' },
      { url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=450&fit=crop', label: '머신존' },
    ],
    galleryImages: [],
    description: '역삼역 1번 출구 바로 앞, 접근성이 뛰어난 피트니스 센터입니다.', tags: ['24시간', 'PT', 'GX'], badge: '50% OFF', badgeType: 'sale',
    facilities: [{ icon: '🏋️', label: '프리웨이트' }, { icon: '🚿', label: '샤워실' }, { icon: '💪', label: 'GX룸' }, { icon: '🧘', label: '필라테스룸' }],
    trainers: [
      { id: 2, name: '한동훈', avatar: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=200&h=200&fit=crop&crop=face', specialty: 'PT · HIIT', rating: 4.9, reviewCount: 93, perSession: '65,000' },
    ],
    schedule: [{ time: '10:00', name: 'GX 바디컴뱃', instructor: '한동훈', spots: '6/20' }],
    coupons: [{ label: '반값 이벤트', discount: '첫 달 50% OFF', condition: '이번 달 한정' }],
    plans: [
      { name: '첫결제 특가', duration: '1개월', price: '9,900', original: '79,000', tag: '87% OFF' },
      { name: '월 회원권', duration: '1개월', price: '79,000' },
      { name: '3개월권', duration: '3개월', price: '199,000', original: '237,000', tag: '16% OFF' },
    ],
    ptPlans: [],
    reviews: [
      { name: 'PT러버', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', rating: 5, date: '2025.12.15', text: 'PT 프로그램이 체계적이에요.' },
    ],
    nearbyGyms: [{ id: 'gym1', name: '바디채널 강남점', distance: '1.2km', price: '99,000' }],
    notices: [], congestion: [], usageGuide: [], refundPolicy: [],
  },
  gym3: {
    name: '바디채널 서초점', address: '서울 서초구 서초대로 456 3층', lat: 37.4917, lng: 127.0078, phone: '02-3456-7890', hours: '06:00 - 22:00',
    hoursDetail: [{ day: '평일', time: '06:00 - 22:00' }, { day: '주말', time: '09:00 - 18:00' }],
    rating: 4.7, reviewCount: 195,
    heroImages: [{ url: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=450&fit=crop', label: '메인' }],
    galleryImages: [],
    description: '서초역 인근의 깔끔한 무인 피트니스 센터입니다.', tags: ['24시간', '무인', '락커'],
    facilities: [{ icon: '🏋️', label: '프리웨이트' }, { icon: '🚿', label: '샤워실' }, { icon: '🔒', label: '개인 락커' }],
    trainers: [], schedule: [], coupons: [],
    plans: [{ name: '월 회원권', duration: '1개월', price: '49,000' }, { name: '3개월권', duration: '3개월', price: '129,000', original: '147,000', tag: '12% OFF' }],
    ptPlans: [],
    reviews: [{ name: '가성비왕', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face', rating: 5, date: '2025.12.10', text: '이 가격에 이 시설이면 가성비 최고입니다.' }],
    nearbyGyms: [{ id: 'gym1', name: '바디채널 강남점', distance: '2.1km', price: '99,000' }],
    notices: [], congestion: [], usageGuide: [], refundPolicy: [],
  },
  gym4: {
    name: '바디채널 판교점', address: '경기 성남시 분당구 판교로 321 5층', lat: 37.3947, lng: 127.1112, phone: '031-4567-8901', hours: '06:00 - 24:00',
    hoursDetail: [{ day: '평일', time: '06:00 - 24:00' }, { day: '주말', time: '08:00 - 22:00' }],
    rating: 4.9, reviewCount: 156,
    heroImages: [{ url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=450&fit=crop', label: '메인' }],
    galleryImages: [],
    description: '판교 테크노밸리 직장인을 위한 프리미엄 피트니스.', tags: ['크로스핏', 'PT', '그룹운동'], badge: 'NEW', badgeType: 'new',
    facilities: [{ icon: '🏋️', label: '프리웨이트' }, { icon: '🤸', label: '크로스핏존' }, { icon: '💪', label: 'GX룸' }, { icon: '🅿️', label: '주차장' }],
    trainers: [{ id: 4, name: '이준혁', avatar: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=200&h=200&fit=crop&crop=face', specialty: '크로스핏 · 체력', rating: 4.6, reviewCount: 58, perSession: '80,000' }],
    schedule: [{ time: '19:00', name: '크로스핏 WOD', instructor: '이준혁', spots: '10/15' }],
    coupons: [{ label: '오픈 기념', discount: '80% OFF', condition: '신규 회원 한정' }],
    plans: [{ name: '첫결제 특가', duration: '1개월', price: '29,900', original: '150,000', tag: '80% OFF' }, { name: '월 회원권', duration: '1개월', price: '150,000' }],
    ptPlans: [],
    reviews: [{ name: '판교직장인', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', rating: 5, date: '2025.12.18', text: '크로스핏 프로그램이 체계적이고 재미있어요.' }],
    nearbyGyms: [],
    notices: [], congestion: [], usageGuide: [], refundPolicy: [],
  },
  gym5: {
    name: '바디채널 선릉점', address: '서울 강남구 선릉로 567 B1층', lat: 37.5045, lng: 127.0490, phone: '02-5678-9012', hours: '06:00 - 23:00',
    hoursDetail: [{ day: '평일', time: '06:00 - 23:00' }, { day: '주말', time: '08:00 - 20:00' }],
    rating: 4.5, reviewCount: 203,
    heroImages: [{ url: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=800&h=450&fit=crop', label: '메인' }],
    galleryImages: [],
    description: '선릉역 도보 3분 거리의 피트니스 센터. 사우나 시설까지 완비.', tags: ['웨이트', '유산소', '사우나'],
    facilities: [{ icon: '🏋️', label: '프리웨이트' }, { icon: '🚴', label: '유산소존' }, { icon: '🧖', label: '사우나' }, { icon: '🚿', label: '샤워실' }],
    trainers: [], schedule: [], coupons: [],
    plans: [{ name: '월 회원권', duration: '1개월', price: '89,000' }, { name: '3개월권', duration: '3개월', price: '239,000', original: '267,000', tag: '10% OFF' }],
    ptPlans: [],
    reviews: [{ name: '사우나매니아', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', rating: 5, date: '2025.12.08', text: '운동 후 사우나가 진짜 최고입니다.' }],
    nearbyGyms: [{ id: 'gym2', name: '바디채널 역삼점', distance: '0.8km', price: '79,000' }],
    notices: [], congestion: [], usageGuide: [], refundPolicy: [],
  },
}

export const defaultGym: GymInfo = {
  name: '바디채널', address: '서울', lat: 37.4980, lng: 127.0276, phone: '02-0000-0000', hours: '06:00 - 23:00',
  hoursDetail: [{ day: '평일', time: '06:00 - 23:00' }, { day: '주말', time: '08:00 - 20:00' }], rating: 4.5, reviewCount: 10,
  heroImages: [{ url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=450&fit=crop', label: '메인' }],
  galleryImages: [],
  description: '바디채널 피트니스 센터입니다.', tags: [], facilities: [], trainers: [], schedule: [], coupons: [],
  plans: [{ name: '월 회원권', duration: '1개월', price: '99,000' }], ptPlans: [], reviews: [], nearbyGyms: [],
  notices: [], congestion: [], usageGuide: [], refundPolicy: [],
}

/* ── helpers ── */
/* tabs removed */

function StarIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
}

/* ── component ── */
export const GymDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const data = gymsData[id || ''] || defaultGym
  const [liked, setLiked] = useState(false)
  const [heroIdx, setHeroIdx] = useState(0)
  const [reviewSort, setReviewSort] = useState<'latest' | 'high' | 'low'>('latest')


  const sortedReviews = [...data.reviews].sort((a, b) => {
    if (reviewSort === 'high') return b.rating - a.rating
    if (reviewSort === 'low') return a.rating - b.rating
    return b.date.localeCompare(a.date)
  })

  const currentHour = new Date().getHours()
  const currentCongestion = data.congestion.find(c => parseInt(c.time) === currentHour)

  return (
    <PageLayout
      header={
        <SubPageHeader
          title={data.name}
          right={
            <button className="icon-btn">
              <IconShare className="w-[18px] h-[18px] stroke-ink stroke-2" />
            </button>
          }
          showChat
        />
      }
      hideBottomNav
      className="!px-0 !py-0 !pb-[70px]"
    >
      {/* ── Hero Carousel ── */}
      <div className="relative">
        <div className="overflow-hidden">
          <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${heroIdx * 100}%)` }}>
            {data.heroImages.map((img, i) => <img key={i} src={img.url} alt={img.label} className="w-full aspect-video object-cover flex-shrink-0" />)}
          </div>
        </div>
        {data.heroImages.length > 1 && (
          <>
            <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/50 rounded-full text-white text-label font-medium">{heroIdx + 1} / {data.heroImages.length}</div>
            {heroIdx > 0 && <button onClick={() => setHeroIdx(heroIdx - 1)} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/70 rounded-full flex items-center justify-center"><svg viewBox="0 0 24 24" className="w-4 h-4 stroke-ink stroke-2 fill-none"><path d="M19 12H5M12 19l-7-7 7-7" /></svg></button>}
            {heroIdx < data.heroImages.length - 1 && <button onClick={() => setHeroIdx(heroIdx + 1)} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/70 rounded-full flex items-center justify-center rotate-180"><svg viewBox="0 0 24 24" className="w-4 h-4 stroke-ink stroke-2 fill-none"><path d="M19 12H5M12 19l-7-7 7-7" /></svg></button>}
          </>
        )}
      </div>

      {/* ── 1. 기본정보 + 소개 ── */}
      <div className="px-page pt-5 pb-4 border-b border-border-light">
        {data.badge && <span className={`inline-block px-2 py-0.5 text-label font-bold rounded mb-2 ${data.badgeType === 'sale' ? 'bg-red-500 text-white' : data.badgeType === 'new' ? 'bg-green-500 text-white' : 'bg-primary text-white'}`}>{data.badge}</span>}
        <h1 className="text-display font-bold text-ink mb-1.5">{data.name}</h1>
        <div className="flex items-center gap-1 mb-3">
          <StarIcon className="text-semantic-star" style={{ width: 14, height: 14 }} />
          <span className="text-body font-bold text-ink">{data.rating}</span>
          <span className="text-body text-ink-tertiary">({data.reviewCount})</span>
        </div>
        <p className="text-body text-ink-secondary leading-relaxed mb-4">{data.description}</p>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-body text-ink-secondary"><IconMapPin className="w-4 h-4 stroke-ink-tertiary stroke-2 flex-shrink-0" /><span>{data.address}</span></div>
          <div className="flex items-center gap-2 text-body text-ink-secondary">
            <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-ink-tertiary stroke-2 flex-shrink-0" fill="none"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
            <span>{data.phone}</span>
          </div>
          <div className="flex items-start gap-2 text-body text-ink-secondary">
            <IconClock className="w-4 h-4 stroke-ink-tertiary stroke-2 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span>{data.hours}</span>
                {(() => {
                  const h = currentHour
                  const match = data.hours.match(/(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})/)
                  const isOpen = match && h >= parseInt(match[1]) && h < parseInt(match[3])
                  return (
                    <span className={`px-1.5 py-0.5 text-caption font-bold rounded ${isOpen ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'}`}>
                      {isOpen ? '영업중' : '영업종료'}
                    </span>
                  )
                })()}
              </div>
              <div className="space-y-0.5">
                {data.hoursDetail.map((h, i) => (
                  <div key={i} className="flex justify-between text-label"><span className="text-ink-tertiary">{h.day}</span><span className="text-ink font-medium">{h.time}</span></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. 쿠폰 (프로모션 상단 노출) ── */}
      {data.coupons.length > 0 && (
        <div className="px-page py-section border-b border-border-light">
          <div className="flex gap-2 overflow-x-auto hide-scrollbar">
            {data.coupons.map((c, i) => (
              <div key={i} className="min-w-[200px] flex-shrink-0 p-card bg-gradient-to-r from-[#fff4f0] to-[#fff9f7] border border-primary/20 rounded-xl">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="px-1.5 py-0.5 bg-primary text-white text-[9px] font-bold rounded">{c.label}</span>
                </div>
                <p className="text-title font-bold text-primary">{c.discount}</p>
                <p className="text-label text-ink-tertiary">{c.condition}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 3. 편의시설 ── */}
      <div className="px-page py-section border-b border-border-light">
        <h3 className="text-title font-bold text-ink mb-4">편의시설</h3>
        <div className="grid grid-cols-4 gap-3">
          {data.facilities.map((f, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5 py-3 bg-surface-subtle rounded-xl">
              <span className="text-display">{f.icon}</span>
              <span className="text-label text-ink-secondary font-medium">{f.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── 4. 오늘의 수업 ── */}
      {data.schedule.length > 0 && (
        <div className="px-page py-section border-b border-border-light">
          <h3 className="text-title font-bold text-ink mb-3">오늘의 수업</h3>
          <div className="space-y-2">
            {data.schedule.map((s, i) => (
              <div key={i} className="flex items-center justify-between p-card bg-surface-subtle rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="text-body font-bold text-primary w-[42px]">{s.time}</span>
                  <div>
                    <p className="text-body font-semibold text-ink">{s.name}</p>
                    <p className="text-label text-ink-tertiary">{s.instructor} 강사</p>
                  </div>
                </div>
                <span className={`text-label font-medium px-2 py-0.5 rounded ${parseInt(s.spots.split('/')[0]) / parseInt(s.spots.split('/')[1]) > 0.8 ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-600'}`}>
                  {s.spots}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 5. 트레이너 ── */}
      <div className="px-page py-section border-b border-border-light">
        <h2 className="text-title font-bold text-ink mb-4">트레이너</h2>
        {data.trainers.length > 0 ? (
          <div className="space-y-3">
            {data.trainers.map((t) => (
              <button key={t.id} onClick={() => navigate(`/trainer/${t.id}`)} className="w-full flex items-center gap-3 p-card border border-border rounded-xl hover:border-ink-disabled transition-colors text-left">
                <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-full object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-body font-bold text-ink">{t.name} 트레이너</p>
                  <p className="text-label text-ink-secondary mb-1">{t.specialty}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      <StarIcon className="text-semantic-star" style={{ width: 11, height: 11 }} />
                      <span className="text-label font-semibold">{t.rating}</span>
                      <span className="text-label text-ink-tertiary">({t.reviewCount})</span>
                    </div>
                    <span className="text-ink-disabled">|</span>
                    <span className="text-label text-ink-secondary">1회 {t.perSession}원</span>
                  </div>
                </div>
                <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-ink-disabled stroke-2 flex-shrink-0" fill="none"><path d="M9 18l6-6-6-6" /></svg>
              </button>
            ))}
          </div>
        ) : (
          <p className="text-body text-ink-tertiary text-center py-8">등록된 트레이너가 없습니다</p>
        )}
      </div>

      {/* ── 6. 공지사항 / 이용안내 / 환불정책 ── */}
      <div className="px-page py-section border-b border-border-light">
        {data.notices.length > 0 && (
          <div className="mb-section">
            <div className="flex items-center gap-2 mb-3">
              <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-primary stroke-2 flex-shrink-0" fill="none"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
              <span className="text-body font-bold text-ink">공지사항</span>
            </div>
            <div className="space-y-1.5">
              {data.notices.map((n, i) => (
                <button key={i} className="w-full flex items-center gap-2 p-2.5 bg-surface-subtle rounded-lg text-left hover:bg-surface-muted transition-colors">
                  {n.isNew && <span className="px-1 py-0.5 bg-red-500 text-white text-[9px] font-bold rounded flex-shrink-0">NEW</span>}
                  <span className="text-label text-ink-secondary flex-1 truncate">{n.title}</span>
                  <span className="text-caption text-ink-tertiary flex-shrink-0">{n.date}</span>
                </button>
              ))}
            </div>
          </div>
        )}
        {data.usageGuide.length > 0 && (
          <div className="mb-4">
            <span className="text-body font-bold text-ink block mb-2">이용 안내</span>
            <ul className="space-y-2">
              {data.usageGuide.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-label text-ink-secondary leading-relaxed">
                  <span className="text-ink-tertiary mt-0.5 flex-shrink-0">{'•'}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {data.refundPolicy.length > 0 && (
          <div>
            <span className="text-body font-bold text-ink block mb-2">환불 정책</span>
            <ul className="space-y-2">
              {data.refundPolicy.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-label text-ink-secondary leading-relaxed">
                  <span className="text-ink-tertiary mt-0.5 flex-shrink-0">{'•'}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* ── 7. 후기 ── */}
      <div className="px-page py-section border-b border-border-light">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-title font-bold text-ink">방문자 후기</h2>
          <span className="text-label text-ink-tertiary">{data.reviewCount}개</span>
        </div>
        <div className="flex items-center gap-4 mb-4 p-card-lg bg-surface-subtle rounded-xl">
          <div className="text-center">
            <p className="text-[28px] font-bold text-ink">{data.rating}</p>
            <div className="flex gap-0.5 justify-center mb-0.5">
              {[1, 2, 3, 4, 5].map((i) => <StarIcon key={i} className={i <= Math.round(data.rating) ? 'text-semantic-star' : 'text-ink-disabled'} style={{ width: 12, height: 12 }} />)}
            </div>
            <p className="text-label text-ink-tertiary">{data.reviewCount}개 평가</p>
          </div>
          <div className="flex-1 space-y-1">
            {[5, 4, 3, 2, 1].map((star) => {
              const pct = star === 5 ? 75 : star === 4 ? 18 : star === 3 ? 5 : star === 2 ? 1 : 1
              return (
                <div key={star} className="flex items-center gap-2">
                  <span className="text-caption text-ink-tertiary w-3">{star}</span>
                  <div className="flex-1 h-[6px] bg-ink-disabled rounded-full overflow-hidden"><div className="h-full bg-semantic-star rounded-full" style={{ width: `${pct}%` }} /></div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Review sort & write */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-1.5">
            {([['latest', '최신순'], ['high', '평점 높은순'], ['low', '평점 낮은순']] as const).map(([key, label]) => (
              <button key={key} onClick={() => setReviewSort(key)} className={`px-2.5 py-1 rounded-full text-label font-medium transition-colors ${reviewSort === key ? 'bg-ink text-white' : 'bg-surface-muted text-ink-secondary'}`}>{label}</button>
            ))}
          </div>
          <button className="flex items-center gap-1 px-3 py-1.5 border border-primary rounded-full text-label font-semibold text-primary">
            <svg viewBox="0 0 24 24" className="w-3 h-3 stroke-primary stroke-2" fill="none"><path d="M12 5v14M5 12h14" /></svg>
            후기 작성
          </button>
        </div>

        <div className="space-y-4">
          {sortedReviews.map((review, i) => (
            <div key={i} className="pb-4 border-b border-border-light last:border-0 last:pb-0">
              <div className="flex items-center gap-2.5 mb-2">
                <img src={review.avatar} alt={review.name} className="w-8 h-8 rounded-full object-cover" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-body font-semibold text-ink">{review.name}</span>
                    {review.membershipType && <span className="px-1.5 py-0.5 bg-surface-muted text-caption text-ink-secondary rounded">{review.membershipType}</span>}
                    <span className="text-label text-ink-tertiary ml-auto">{review.date}</span>
                  </div>
                  <div className="flex gap-0.5 mt-0.5">{[1, 2, 3, 4, 5].map((s) => <StarIcon key={s} className={s <= review.rating ? 'text-semantic-star' : 'text-ink-disabled'} style={{ width: 10, height: 10 }} />)}</div>
                </div>
              </div>
              <p className="text-body text-ink-secondary leading-relaxed">{review.text}</p>
              {review.photos && review.photos.length > 0 && (
                <div className="flex gap-1.5 mt-2">
                  {review.photos.map((photo, pi) => (
                    <img key={pi} src={photo} alt="리뷰 사진" className="w-[72px] h-[72px] rounded-lg object-cover" />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        {data.reviews.length > 0 && <button className="w-full py-3 mt-4 border border-border rounded-lg text-body font-semibold text-ink hover:bg-surface-subtle">후기 더보기</button>}
      </div>

      {/* ── 8. 혼잡도 + 지도 ── */}
      <div className="px-page py-section border-b border-border-light">
        {currentCongestion && (
          <div className="mb-section p-card bg-surface-subtle rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-body font-bold text-ink">실시간 혼잡도</span>
                <span className={`px-1.5 py-0.5 text-caption font-bold rounded ${currentCongestion.level >= 7 ? 'bg-red-100 text-red-600' : currentCongestion.level >= 4 ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-600'}`}>
                  {currentCongestion.level >= 7 ? '혼잡' : currentCongestion.level >= 4 ? '보통' : '여유'}
                </span>
              </div>
              <span className="text-label text-ink-tertiary">현재 {currentHour}시 기준</span>
            </div>
            <div className="flex items-end gap-[3px] h-[40px]">
              {data.congestion.map((c, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                  <div
                    className={`w-full rounded-sm transition-colors ${parseInt(c.time) === currentHour ? 'bg-primary' : c.level >= 7 ? 'bg-red-300' : c.level >= 4 ? 'bg-yellow-300' : 'bg-green-300'}`}
                    style={{ height: `${(c.level / 10) * 36}px` }}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[9px] text-ink-tertiary">6시</span>
              <span className="text-[9px] text-ink-tertiary">12시</span>
              <span className="text-[9px] text-ink-tertiary">18시</span>
              <span className="text-[9px] text-ink-tertiary">23시</span>
            </div>
          </div>
        )}
        <h3 className="text-title font-bold text-ink mb-3">위치</h3>
        <div className="w-full h-[180px] bg-surface-muted rounded-xl overflow-hidden">
          <iframe
            title="지도"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${data.lng - 0.005}%2C${data.lat - 0.003}%2C${data.lng + 0.005}%2C${data.lat + 0.003}&layer=mapnik&marker=${data.lat}%2C${data.lng}`}
          />
        </div>
      </div>



      {/* ── Bottom CTA ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border px-page py-3 flex gap-3">
        <button onClick={() => navigate(`/gym/${id}/products`)} className="flex-1 py-3.5 bg-primary text-white text-body font-bold rounded-xl hover:bg-primary-dark transition-colors">상품선택</button>
      </div>
    </PageLayout>
  )
}
