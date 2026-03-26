import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { PageLayout, SubPageHeader, RatingSummary, ReviewItem, ReviewSort, BottomCTA, Badge, InfoRow, EmptyState, FeedCard, TrainerListItem, PlanCard } from '../../components'
import { IconShare, IconClock, IconMapPin } from '../../components/Icons'

/* ── types ── */
interface Facility { icon: string; label: string }
interface PricePlan { name: string; duration: string; price: string; original?: string; tag?: string; installment?: string }
interface ReviewData { name: string; avatar: string; rating: number; date: string; text: string; photos?: string[]; membershipType?: string }
interface GymPhoto { url: string; label: string }
interface Trainer { id: number; name: string; avatar: string; specialty: string; rating: number; reviewCount: number; perSession: string }
interface ScheduleItem { time: string; name: string; instructor: string; avatar: string; category: string; categoryColor: 'bareton' | 'hit35' | 'gymground' | 'pt'; hasTicket?: boolean }
type WeekSchedule = Record<string, ScheduleItem[]>
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
  reviews: ReviewData[]
  tags: string[]
  badge?: string
  badgeType?: string
  trainers: Trainer[]
  schedule: WeekSchedule
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
    schedule: {
      '월': [
        { time: '07:00', name: '모닝 요가', instructor: '이수진', avatar: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200&h=200&fit=crop&crop=face', category: '요가', categoryColor: 'gymground' as const, hasTicket: false },
        { time: '09:00', name: '바디펌프', instructor: '한동훈', avatar: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=200&h=200&fit=crop&crop=face', category: '히트35', categoryColor: 'hit35' as const, hasTicket: false },
        { time: '18:30', name: 'HIIT 클래스', instructor: '최강민', avatar: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&h=200&fit=crop&crop=face', category: 'PT', categoryColor: 'pt' as const, hasTicket: true },
      ],
      '화': [
        { time: '07:00', name: '모닝 요가', instructor: '이수진', avatar: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200&h=200&fit=crop&crop=face', category: '요가', categoryColor: 'gymground' as const, hasTicket: false },
        { time: '12:00', name: '점심 필라테스', instructor: '박지영', avatar: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face', category: '바레톤', categoryColor: 'bareton' as const, hasTicket: true },
        { time: '18:30', name: 'HIIT 클래스', instructor: '최강민', avatar: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&h=200&fit=crop&crop=face', category: 'PT', categoryColor: 'pt' as const, hasTicket: true },
        { time: '20:00', name: '스피닝', instructor: '김민수', avatar: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=200&h=200&fit=crop&crop=face', category: '짐그라운드', categoryColor: 'gymground' as const, hasTicket: false },
      ],
      '수': [
        { time: '09:00', name: '바디펌프', instructor: '한동훈', avatar: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=200&h=200&fit=crop&crop=face', category: '히트35', categoryColor: 'hit35' as const, hasTicket: false },
        { time: '12:00', name: '점심 필라테스', instructor: '박지영', avatar: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face', category: '바레톤', categoryColor: 'bareton' as const, hasTicket: true },
        { time: '20:00', name: '스피닝', instructor: '김민수', avatar: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=200&h=200&fit=crop&crop=face', category: '짐그라운드', categoryColor: 'gymground' as const, hasTicket: false },
      ],
      '목': [
        { time: '07:00', name: '모닝 요가', instructor: '이수진', avatar: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200&h=200&fit=crop&crop=face', category: '요가', categoryColor: 'gymground' as const, hasTicket: false },
        { time: '09:00', name: '바디펌프', instructor: '한동훈', avatar: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=200&h=200&fit=crop&crop=face', category: '히트35', categoryColor: 'hit35' as const, hasTicket: false },
        { time: '18:30', name: 'HIIT 클래스', instructor: '최강민', avatar: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&h=200&fit=crop&crop=face', category: 'PT', categoryColor: 'pt' as const, hasTicket: true },
      ],
      '금': [
        { time: '12:00', name: '점심 필라테스', instructor: '박지영', avatar: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face', category: '바레톤', categoryColor: 'bareton' as const, hasTicket: true },
        { time: '18:30', name: 'HIIT 클래스', instructor: '최강민', avatar: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&h=200&fit=crop&crop=face', category: 'PT', categoryColor: 'pt' as const, hasTicket: true },
        { time: '20:00', name: '스피닝', instructor: '김민수', avatar: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=200&h=200&fit=crop&crop=face', category: '짐그라운드', categoryColor: 'gymground' as const, hasTicket: false },
      ],
      '토': [
        { time: '10:00', name: '주말 요가', instructor: '이수진', avatar: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200&h=200&fit=crop&crop=face', category: '요가', categoryColor: 'gymground' as const, hasTicket: false },
        { time: '14:00', name: '바레톤', instructor: '박지영', avatar: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face', category: '바레톤', categoryColor: 'bareton' as const, hasTicket: true },
      ],
      '일': [
        { time: '10:00', name: '주말 요가', instructor: '이수진', avatar: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200&h=200&fit=crop&crop=face', category: '요가', categoryColor: 'gymground' as const, hasTicket: false },
      ],
    },
    coupons: [
      { label: '신규 가입', discount: '첫 달 80% OFF', condition: '첫 결제 시' },
      { label: '친구 추천', discount: '1개월 무료', condition: '추천인과 함께 등록 시' },
    ],
    plans: [
      { name: '월 구독권', duration: '월 자동결제', price: '79,000' },
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
    schedule: { '월': [{ time: '10:00', name: 'GX 바디컴뱃', instructor: '한동훈', avatar: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=200&h=200&fit=crop&crop=face', category: '히트35', categoryColor: 'hit35' as const, hasTicket: false }], '수': [{ time: '10:00', name: 'GX 바디컴뱃', instructor: '한동훈', avatar: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=200&h=200&fit=crop&crop=face', category: '히트35', categoryColor: 'hit35' as const, hasTicket: false }], '금': [{ time: '10:00', name: 'GX 바디컴뱃', instructor: '한동훈', avatar: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=200&h=200&fit=crop&crop=face', category: '히트35', categoryColor: 'hit35' as const, hasTicket: false }] },
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
    trainers: [], schedule: {}, coupons: [],
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
    schedule: { '월': [{ time: '19:00', name: '크로스핏 WOD', instructor: '이준혁', avatar: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=200&h=200&fit=crop&crop=face', category: '짐그라운드', categoryColor: 'gymground' as const, hasTicket: false }], '화': [{ time: '19:00', name: '크로스핏 WOD', instructor: '이준혁', avatar: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=200&h=200&fit=crop&crop=face', category: '짐그라운드', categoryColor: 'gymground' as const, hasTicket: false }], '목': [{ time: '19:00', name: '크로스핏 WOD', instructor: '이준혁', avatar: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=200&h=200&fit=crop&crop=face', category: '짐그라운드', categoryColor: 'gymground' as const, hasTicket: false }] },
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
    trainers: [], schedule: {}, coupons: [],
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
  description: '바디채널 피트니스 센터입니다.', tags: [], facilities: [], trainers: [], schedule: {}, coupons: [],
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
  const [_liked, _setLiked] = useState(false)
  const [heroIdx, setHeroIdx] = useState(0)
  const [congestionDayOffset, setCongestionDayOffset] = useState(0) // -6 ~ 0 (과거 1주일 ~ 오늘)
  void _liked; void _setLiked
  const scheduleDays = (() => {
    const result: { date: Date; label: string; dayKey: string; isToday: boolean }[] = []
    const now = new Date()
    for (let i = 0; i < 14; i++) {
      const d = new Date(now)
      d.setDate(now.getDate() + i)
      result.push({
        date: d,
        label: `${d.getMonth() + 1}/${d.getDate()}`,
        dayKey: ['일', '월', '화', '수', '목', '금', '토'][d.getDay()],
        isToday: i === 0,
      })
    }
    return result
  })()
  const [selectedDateIdx, setSelectedDateIdx] = useState(0)
  const selectedDay = scheduleDays[selectedDateIdx].dayKey
  const [reviewSort, setReviewSort] = useState<'latest' | 'high' | 'low'>('latest')


  const sortedReviews = [...data.reviews].sort((a, b) => {
    if (reviewSort === 'high') return b.rating - a.rating
    if (reviewSort === 'low') return a.rating - b.rating
    return b.date.localeCompare(a.date)
  })

  const currentHour = new Date().getHours()
  const _currentCongestion = data.congestion.find(c => parseInt(c.time) === currentHour)
  void _currentCongestion

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
      <div className="px-page pt-page pb-section">
        <div className="flex items-center gap-2 mb-2">
          {data.badge && <Badge variant={data.badgeType === 'sale' ? 'danger' : data.badgeType === 'new' ? 'success' : 'primary'} size="md">{data.badge}</Badge>}
          {(() => {
            const h = currentHour
            const match = data.hours.match(/(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})/)
            const isOpen = match && h >= parseInt(match[1]) && h < parseInt(match[3])
            return <Badge variant={isOpen ? 'success' : 'danger'} size="sm">{isOpen ? '영업중' : '영업종료'}</Badge>
          })()}
        </div>
        <h1 className="text-display font-bold text-ink mb-1">{data.name}</h1>
        <div className="flex items-center gap-1 mb-3">
          <StarIcon className="text-semantic-star" style={{ width: 14, height: 14 }} />
          <span className="text-body font-bold text-ink">{data.rating}</span>
          <span className="text-body text-ink-tertiary">({data.reviewCount})</span>
        </div>
        <p className="text-body text-ink-secondary leading-relaxed mb-section">{data.description}</p>

        {/* 정보 */}
        <div className="space-y-2 mb-section">
          <InfoRow icon={<IconMapPin className="w-4 h-4 stroke-ink-tertiary stroke-2" />} href={`https://map.naver.com/v5/search/${encodeURIComponent(data.name + ' ' + data.address)}`}>{data.address}</InfoRow>
          <InfoRow icon={<svg viewBox="0 0 24 24" className="w-4 h-4 stroke-ink-tertiary stroke-2" fill="none"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>}>{data.phone}</InfoRow>
          <div className="flex items-start gap-2 text-body text-ink-secondary">
            <IconClock className="w-4 h-4 stroke-ink-tertiary stroke-2 flex-shrink-0 mt-0.5" />
            <div className="flex-1 space-y-0.5">
              {data.hoursDetail.map((h, i) => (
                <div key={i} className="flex justify-between text-label"><span className="text-ink-tertiary">{h.day}</span><span className="text-ink font-medium">{h.time}</span></div>
              ))}
            </div>
          </div>
        </div>

        {/* 쿠폰 */}
        {data.coupons.length > 0 && (
          <div className="flex gap-2 overflow-x-auto hide-scrollbar -mx-page px-page">
            {data.coupons.map((c, i) => (
              <div key={i} className="min-w-[180px] flex-shrink-0 p-card-lg bg-primary-50 border border-primary/20 rounded-card">
                <Badge variant="primary" size="sm">{c.label}</Badge>
                <p className="text-title font-bold text-primary mt-1.5">{c.discount}</p>
                <p className="text-label text-ink-tertiary mt-0.5">{c.condition}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="h-2 bg-surface-muted" />

      {/* ── 2. 편의시설 ── */}
      {data.facilities.length > 0 && (
        <div className="px-page py-section">
          <h3 className="text-heading font-bold text-ink mb-4">편의시설</h3>
          <div className="grid grid-cols-4 gap-3">
            {data.facilities.map((f, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5 py-3 bg-surface-subtle rounded-card">
                <span className="text-display">{f.icon}</span>
                <span className="text-label text-ink-secondary font-medium">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="h-2 bg-surface-muted" />

      {/* ── 3. 회원권 ── */}
      {data.plans.length > 0 && (
        <div className="px-page py-section">
          <h3 className="text-heading font-bold text-ink mb-4">회원권</h3>
          <div className="flex flex-col gap-3">
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
          </div>
        </div>
      )}

      <div className="h-2 bg-surface-muted" />

      {/* ── 3. 그룹 레슨 ── */}
      {Object.keys(data.schedule).length > 0 && (
        <div className="px-page py-section">
          <h3 className="text-heading font-bold text-ink mb-4">그룹 레슨</h3>
          <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-4">
            {scheduleDays.map((d, i) => (
              <button key={i} onClick={() => setSelectedDateIdx(i)} className={`flex-shrink-0 w-[52px] py-2 rounded-xl text-center transition-colors ${selectedDateIdx === i ? 'bg-primary text-white' : 'bg-surface-muted text-ink-secondary hover:bg-surface-subtle'}`}>
                <span className="text-label block">{d.isToday ? '오늘' : d.label}</span>
                <span className="text-label font-bold block">{d.dayKey}</span>
              </button>
            ))}
          </div>
          <div>
            {(data.schedule[selectedDay] || []).length > 0 ? (data.schedule[selectedDay] || []).map((s, i) => (
              <TrainerListItem
                key={i}
                imageUrl={s.avatar}
                name={`${s.instructor} 강사`}
                category={s.category}
                categoryColor={s.categoryColor}
                description={s.name}
                todayTime={`${scheduleDays[selectedDateIdx].isToday ? '오늘' : scheduleDays[selectedDateIdx].label + '(' + selectedDay + ')'} ${s.time}`}
                rating={0}
                reviewCount={0}
                rightAction={s.hasTicket
                  ? <span className="px-3 py-1 bg-primary text-white text-label font-bold rounded-lg">예약</span>
                  : <span className="px-3 py-1 border border-primary text-primary text-label font-bold rounded-lg">구매</span>
                }
              />
            )) : (
              <EmptyState message={`${scheduleDays[selectedDateIdx].isToday ? '오늘은' : scheduleDays[selectedDateIdx].label + '(' + selectedDay + ')은'} 수업이 없습니다`} />
            )}
          </div>
        </div>
      )}

      <div className="h-2 bg-surface-muted" />

      {/* ── 3. 개인 레슨 ── */}
      <div className="py-section">
        <div className="flex items-center justify-between mb-4 px-page">
          <h2 className="text-heading font-bold text-ink">개인 레슨</h2>
          <button className="text-label text-primary font-medium">전체보기</button>
        </div>
        {data.trainers.length > 0 ? (
          <div className="flex gap-3 overflow-x-auto hide-scrollbar px-page">
            {data.trainers.map((t) => (
              <button key={t.id} onClick={() => navigate(`/trainer/${t.id}`)} className="flex-shrink-0 w-[160px] border border-border rounded-card overflow-hidden hover:border-ink-disabled transition-colors text-left">
                <img src={t.avatar} alt={t.name} className="w-full h-[120px] object-cover" />
                <div className="p-card">
                  <p className="text-body font-bold text-ink mb-0.5 truncate">{t.name}</p>
                  <p className="text-label text-ink-tertiary mb-2 truncate">{t.specialty}</p>
                  <div className="flex items-center gap-1 mb-2">
                    <StarIcon className="text-semantic-star" style={{ width: 12, height: 12 }} />
                    <span className="text-label font-semibold">{t.rating}</span>
                    <span className="text-label text-ink-tertiary">({t.reviewCount})</span>
                  </div>
                  <span className="text-body font-bold text-primary">1회 {t.perSession}원</span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <EmptyState message="등록된 트레이너가 없습니다" />
        )}
      </div>

      <div className="h-2 bg-surface-muted" />

      <div className="h-2 bg-surface-muted" />

      {/* ── 5. 비포&애프터 ── */}
      <div className="py-section">
        <div className="flex items-center justify-between mb-4 px-page">
          <h2 className="text-heading font-bold text-ink">Before & After</h2>
          <button className="text-label text-primary font-medium">전체보기</button>
        </div>
        <div className="flex gap-3 overflow-x-auto hide-scrollbar px-page">
          {[
            { before: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300&h=400&fit=crop', after: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=400&fit=crop', name: '김○○ 회원', result: '-12kg / 3개월', tag: '다이어트' },
            { before: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300&h=400&fit=crop', after: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=300&h=400&fit=crop', name: '이○○ 회원', result: '+5kg 근육 / 4개월', tag: '벌크업' },
            { before: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=300&h=400&fit=crop', after: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=300&h=400&fit=crop', name: '박○○ 회원', result: '체형교정 / 6개월', tag: '체형교정' },
          ].map((item, i) => (
            <div key={i} className="flex-shrink-0 w-[180px]">
              <div className="flex gap-1 mb-2 rounded-xl overflow-hidden">
                <div className="relative flex-1">
                  <img src={item.before} alt="Before" className="w-full aspect-[3/4] object-cover" />
                  <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-black/60 text-white text-caption font-bold rounded">BEFORE</span>
                </div>
                <div className="relative flex-1">
                  <img src={item.after} alt="After" className="w-full aspect-[3/4] object-cover" />
                  <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-primary text-white text-caption font-bold rounded">AFTER</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-body font-bold text-ink">{item.name}</p>
                  <p className="text-label text-primary font-medium">{item.result}</p>
                </div>
                <span className="px-2 py-0.5 bg-surface-muted text-caption text-ink-secondary font-medium rounded-full">{item.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-2 bg-surface-muted" />

      {/* ── 6. 후기 ── */}
      <div className="px-page py-section">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-heading font-bold text-ink">방문자 후기</h2>
          <span className="text-label text-ink-tertiary">{data.reviewCount}개</span>
        </div>
        <div className="mb-4">
          <RatingSummary rating={data.rating} reviewCount={data.reviewCount} />
        </div>
        <ReviewSort value={reviewSort} onChange={(v) => setReviewSort(v as 'latest' | 'high' | 'low')} onWrite={() => {}} />
        <div className="space-y-4">
          {sortedReviews.map((review, i) => (
            <ReviewItem
              key={i}
              avatar={review.avatar}
              name={review.name}
              rating={review.rating}
              date={review.date}
              text={review.text}
              badge={review.membershipType}
              photos={review.photos}
            />
          ))}
        </div>
        {data.reviews.length > 0 && <button className="w-full py-3 mt-4 border border-border rounded-card text-body font-semibold text-ink hover:bg-surface-subtle transition-colors">후기 더보기</button>}
      </div>

      <div className="h-2 bg-surface-muted" />

      {/* ── 7. 혼잡도 + 지도 ── */}
      <div className="px-page py-section">
        {data.congestion.length > 0 && (() => {
          const congestionDate = new Date()
          congestionDate.setDate(congestionDate.getDate() + congestionDayOffset)
          const dayName = ['일', '월', '화', '수', '목', '금', '토'][congestionDate.getDay()]
          const dateLabel = congestionDayOffset === 0 ? '오늘' : `${congestionDate.getMonth() + 1}/${congestionDate.getDate()}(${dayName})`
          const isToday = congestionDayOffset === 0
          const activeCongestion = isToday ? data.congestion.find(c => parseInt(c.time) === currentHour) : null
          return (
            <div className="mb-section p-card bg-surface-subtle rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-body font-bold text-ink">혼잡도</span>
                  {isToday && activeCongestion && (
                    <span className={`px-1.5 py-0.5 text-caption font-bold rounded ${activeCongestion.level >= 7 ? 'bg-red-100 text-red-600' : activeCongestion.level >= 4 ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-600'}`}>
                      {activeCongestion.level >= 7 ? '혼잡' : activeCongestion.level >= 4 ? '보통' : '여유'}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setCongestionDayOffset(Math.max(-6, congestionDayOffset - 1))} className={`w-6 h-6 rounded-full flex items-center justify-center ${congestionDayOffset === -6 ? 'text-ink-disabled' : 'text-ink hover:bg-surface-muted'}`} disabled={congestionDayOffset === -6}>
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-current stroke-2 fill-none"><path d="M15 18l-6-6 6-6" /></svg>
                  </button>
                  <span className="text-label font-medium text-ink min-w-[60px] text-center">{dateLabel}</span>
                  <button onClick={() => setCongestionDayOffset(Math.min(0, congestionDayOffset + 1))} className={`w-6 h-6 rounded-full flex items-center justify-center ${congestionDayOffset === 0 ? 'text-ink-disabled' : 'text-ink hover:bg-surface-muted'}`} disabled={congestionDayOffset === 0}>
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-current stroke-2 fill-none"><path d="M9 18l6-6-6-6" /></svg>
                  </button>
                </div>
              </div>
              <div className="flex items-end gap-[3px] h-[40px]">
                {data.congestion.map((c, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                    <div
                      className={`w-full rounded-sm transition-colors ${isToday && parseInt(c.time) === currentHour ? 'bg-primary' : c.level >= 7 ? 'bg-red-300' : c.level >= 4 ? 'bg-yellow-300' : 'bg-green-300'}`}
                      style={{ height: `${(c.level / 10) * 36}px` }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-caption text-ink-tertiary">6시</span>
                <span className="text-caption text-ink-tertiary">12시</span>
                <span className="text-caption text-ink-tertiary">18시</span>
                <span className="text-caption text-ink-tertiary">23시</span>
              </div>
            </div>
          )
        })()}
        <h3 className="text-heading font-bold text-ink mb-3">위치</h3>
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

      <div className="h-2 bg-surface-muted" />

      {/* ── 8. 피드 ── */}
      <div className="px-page py-section">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-heading font-bold text-ink">피드</h2>
          <button onClick={() => navigate('/activity')} className="text-label text-primary font-medium">전체보기</button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { id: 1, imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop', authorImageUrl: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=100&h=100&fit=crop&crop=face', authorName: '김민수', text: '오늘도 열심히 운동 완료! 💪', likeCount: 128, commentCount: 24, isLiked: true },
            { id: 2, imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=400&fit=crop', authorImageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=face', authorName: '박지영', text: '필라테스 수업 후기 🧘‍♀️', likeCount: 89, commentCount: 12, isLiked: false },
            { id: 3, imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=400&fit=crop', authorImageUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=100&h=100&fit=crop&crop=face', authorName: '한동훈', text: '벌크업 3개월 결과 🎉', likeCount: 256, commentCount: 48, isLiked: true },
            { id: 4, imageUrl: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400&h=400&fit=crop', authorImageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face', authorName: '윤미래', text: '다이어트 -5kg 달성! 🔥', likeCount: 312, commentCount: 56, isLiked: true },
          ].map((feed) => (
            <FeedCard key={feed.id} {...feed} onClick={() => navigate(`/feed/${feed.id}`)} />
          ))}
        </div>
      </div>

      {/* ── Bottom CTA ── */}
      <BottomCTA hideBottomNav>
        <button onClick={() => navigate(`/gym/${id}/products`)} className="flex-1 py-3.5 bg-primary text-white text-body font-bold rounded-xl hover:bg-primary-dark transition-colors">상품 구매</button>
      </BottomCTA>
    </PageLayout>
  )
}
