import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { PageLayout, SubPageHeader } from '../../components'
import { IconHeart, IconShare, IconStarFilled, IconMapPin, IconClock, IconChevronDown } from '../../components/Icons'

/* ── types ── */
interface TrainerReview { name: string; avatar: string; rating: number; date: string; text: string; photos?: string[]; program?: string }
interface ScheduleSlot { day: string; slots: string[] }
interface TransformPhoto { before: string; after: string; caption: string; duration: string }

interface TrainerData {
  name: string
  category: string
  gym: string
  gymId: string
  rating: number
  reviewCount: number
  imageUrl: string
  avatarUrl: string
  intro: string
  specialties: string[]
  career: string[]
  prices: { name: string; price: string; sessions: string; perSession?: string; tag?: string }[]
  stats: { totalClients: number; totalSessions: number; experience: string; satisfaction: number }
  trainingStyle: string[]
  galleryPhotos: string[]
  schedule: ScheduleSlot[]
  reviews: TrainerReview[]
  transformations: TransformPhoto[]
}

/* ── data ── */
const trainersData: Record<string, TrainerData> = {
  '1': {
    name: '최강민 강사',
    category: 'PT',
    gym: '바디채널 강남점',
    gymId: 'gym1',
    rating: 4.9,
    reviewCount: 127,
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop',
    avatarUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&h=200&fit=crop&crop=face',
    intro: '10년 경력의 체계적인 PT 전문가입니다. 개인 맞춤형 프로그램으로 확실한 결과를 만들어드립니다. 체형 분석부터 식단 관리까지 원스톱 케어로 회원님의 목표 달성을 도와드립니다.',
    specialties: ['체중 감량', '근력 강화', '체형 교정', '재활 운동'],
    career: ['생활체육지도사 2급', 'NASM-CPT 자격증', '前 국가대표 트레이너', '10년 PT 경력', '체형분석 전문가 과정 수료'],
    trainingStyle: [
      '1:1 맞춤 프로그램 설계 - 체형 분석 후 개인별 목표에 맞는 프로그램을 만들어드립니다',
      '점진적 과부하 원칙 - 무리하지 않으면서 꾸준히 발전할 수 있는 트레이닝을 추구합니다',
      '식단 & 생활습관 코칭 - 운동 외 시간의 관리도 함께 도와드립니다',
      '주 1회 체성분 측정 - 데이터 기반으로 변화를 추적합니다',
    ],
    prices: [
      { name: '체험권', price: '50,000원', sessions: '1회', perSession: '50,000원', tag: '체험특가' },
      { name: '10회권', price: '700,000원', sessions: '10회', perSession: '70,000원' },
      { name: '20회권', price: '1,300,000원', sessions: '20회', perSession: '65,000원', tag: '5만원 할인' },
      { name: '30회권', price: '1,800,000원', sessions: '30회', perSession: '60,000원', tag: '인기' },
    ],
    stats: { totalClients: 342, totalSessions: 8240, experience: '10년', satisfaction: 98 },
    galleryPhotos: [
      'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=300&h=300&fit=crop',
    ],
    schedule: [
      { day: '월', slots: ['06:00', '07:00', '10:00', '14:00', '18:00', '19:00', '20:00'] },
      { day: '화', slots: ['06:00', '07:00', '10:00', '11:00', '18:00', '19:00', '20:00', '21:00'] },
      { day: '수', slots: ['06:00', '07:00', '10:00', '14:00', '18:00', '19:00'] },
      { day: '목', slots: ['06:00', '07:00', '10:00', '11:00', '18:00', '19:00', '20:00', '21:00'] },
      { day: '금', slots: ['06:00', '07:00', '10:00', '14:00', '18:00', '19:00', '20:00'] },
      { day: '토', slots: ['09:00', '10:00', '11:00', '14:00', '15:00'] },
      { day: '일', slots: [] },
    ],
    reviews: [
      { name: '헬스왕', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', rating: 5, date: '2025.12.20', text: '6개월간 PT 받으면서 15kg 감량했습니다. 체계적인 프로그램과 식단 관리 덕분에 목표를 달성할 수 있었어요. 강민 트레이너 최고!', photos: ['https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=200&h=200&fit=crop'], program: '30회권' },
      { name: '직장인A', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face', rating: 5, date: '2025.12.10', text: '체형교정 PT를 받고 있는데 거북목이 많이 개선되었어요. 매번 꼼꼼하게 자세를 잡아주셔서 믿음이 갑니다.', program: '20회권' },
      { name: '운동초보', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', rating: 5, date: '2025.11.28', text: '운동을 한 번도 안 해봤는데 기초부터 차근차근 알려주셔서 좋았습니다. 이제 혼자서도 운동할 수 있게 되었어요!', program: '10회권' },
      { name: '재활러', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', rating: 4, date: '2025.11.15', text: '허리 디스크 수술 후 재활 운동으로 PT를 시작했어요. 조심스럽게 진행해주시고 통증 관리도 잘 해주십니다.', program: '30회권' },
    ],
    transformations: [
      { before: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300&h=400&fit=crop', after: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=300&h=400&fit=crop', caption: '체중 감량 -15kg', duration: '6개월 (30회)' },
      { before: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=300&h=400&fit=crop', after: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=300&h=400&fit=crop', caption: '근육량 +5kg', duration: '4개월 (20회)' },
    ],
  },
  '2': {
    name: '박지영 강사',
    category: '바레톤',
    gym: '바디채널 강남점',
    gymId: 'gym1',
    rating: 4.7,
    reviewCount: 64,
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=400&fit=crop',
    avatarUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=200&h=200&fit=crop&crop=face',
    intro: '바레톤과 필라테스 전문 강사입니다. 우아하고 탄력있는 몸매를 만들어드립니다.',
    specialties: ['바레톤', '필라테스', '코어 강화', '유연성'],
    career: ['바레톤 마스터 자격증', '필라테스 지도자 자격증', '8년 그룹수업 경력'],
    trainingStyle: [
      '정확한 자세와 호흡을 통한 코어 강화',
      '음악에 맞춘 즐거운 수업 분위기',
      '개인 수준에 맞는 난이도 조절',
    ],
    prices: [
      { name: '체험권', price: '50,000원', sessions: '1회', perSession: '50,000원', tag: '체험특가' },
      { name: '10회권', price: '650,000원', sessions: '10회', perSession: '65,000원' },
      { name: '20회권', price: '1,200,000원', sessions: '20회', perSession: '60,000원', tag: '인기' },
    ],
    stats: { totalClients: 186, totalSessions: 4120, experience: '8년', satisfaction: 96 },
    galleryPhotos: [
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300&h=300&fit=crop',
    ],
    schedule: [
      { day: '월', slots: ['10:00', '11:00', '14:00', '15:00', '19:00', '20:00'] },
      { day: '화', slots: ['10:00', '11:00', '14:00', '19:00', '20:00'] },
      { day: '수', slots: ['10:00', '11:00', '14:00', '15:00', '19:00', '20:00'] },
      { day: '목', slots: ['10:00', '11:00', '14:00', '19:00', '20:00'] },
      { day: '금', slots: ['10:00', '11:00', '14:00', '15:00', '19:00'] },
      { day: '토', slots: ['10:00', '11:00'] },
      { day: '일', slots: [] },
    ],
    reviews: [
      { name: '필라테스러버', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face', rating: 5, date: '2025.12.12', text: '수업이 정말 재미있어요! 몸이 유연해지는 게 느껴집니다.', program: '20회권' },
    ],
    transformations: [],
  },
  '3': {
    name: '한동훈 강사',
    category: 'HIIT',
    gym: '바디채널 역삼점',
    gymId: 'gym2',
    rating: 4.9,
    reviewCount: 93,
    imageUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&h=400&fit=crop',
    avatarUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=200&h=200&fit=crop&crop=face',
    intro: 'HIIT과 기능성 트레이닝 전문가입니다. 짧은 시간 안에 최대 효과를 내는 고강도 프로그램으로 체력과 지구력을 동시에 키워드립니다.',
    specialties: ['HIIT', '기능성 트레이닝', '체력 향상', '지방 연소'],
    career: ['NSCA-CSCS 자격증', 'CrossFit Level 2', '前 복싱 선수 출신', '7년 그룹수업 경력'],
    trainingStyle: [
      '고강도 인터벌 트레이닝 - 짧고 강렬한 운동으로 최대 효율을 추구합니다',
      '기능성 움직임 중심 - 일상생활에 도움이 되는 실용적 운동을 합니다',
      '그룹 에너지 활용 - 함께 운동하는 힘으로 더 높은 성과를 이끌어냅니다',
    ],
    prices: [
      { name: '체험권', price: '50,000원', sessions: '1회', perSession: '50,000원', tag: '체험특가' },
      { name: '10회권', price: '650,000원', sessions: '10회', perSession: '65,000원' },
      { name: '20회권', price: '1,200,000원', sessions: '20회', perSession: '60,000원', tag: '인기' },
    ],
    stats: { totalClients: 215, totalSessions: 5800, experience: '7년', satisfaction: 97 },
    galleryPhotos: [
      'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300&h=300&fit=crop',
    ],
    schedule: [
      { day: '월', slots: ['07:00', '10:00', '18:00', '19:00', '20:00'] },
      { day: '화', slots: ['07:00', '10:00', '18:00', '19:00', '20:00', '21:00'] },
      { day: '수', slots: ['07:00', '10:00', '18:00', '19:00', '20:00'] },
      { day: '목', slots: ['07:00', '10:00', '18:00', '19:00', '20:00', '21:00'] },
      { day: '금', slots: ['07:00', '10:00', '18:00', '19:00'] },
      { day: '토', slots: ['10:00', '11:00', '14:00'] },
      { day: '일', slots: [] },
    ],
    reviews: [
      { name: 'HIIT매니아', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', rating: 5, date: '2025.12.15', text: '동훈 강사님 HIIT 수업 최고입니다! 한 시간이 순삭이에요. 3개월 만에 체지방 8% 빠졌습니다.', program: '20회권' },
      { name: '직장인C', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', rating: 5, date: '2025.12.01', text: '점심시간에 빠르게 운동하기 딱 좋아요. 강도가 높지만 재미있어서 꾸준히 다니게 됩니다.', program: '10회권' },
    ],
    transformations: [],
  },
  '4': {
    name: '이준혁 강사',
    category: '크로스핏',
    gym: '바디채널 판교점',
    gymId: 'gym4',
    rating: 4.6,
    reviewCount: 58,
    imageUrl: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=600&h=400&fit=crop',
    avatarUrl: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=200&h=200&fit=crop&crop=face',
    intro: '크로스핏과 체력 훈련 전문가입니다. 판교 직장인들의 체력 관리를 책임지고 있습니다. 재미있고 도전적인 WOD로 매일 새로운 동기부여를 드립니다.',
    specialties: ['크로스핏', '체력 강화', '올림픽 리프팅', '서킷 트레이닝'],
    career: ['CrossFit Level 2 Trainer', '체육학 석사', '前 역도 국가대표 후보', '5년 크로스핏 지도'],
    trainingStyle: [
      'WOD(Workout of the Day) - 매일 다른 운동 프로그램으로 지루함 없는 트레이닝',
      '올림픽 리프팅 기초 - 스내치, 클린앤저크 등 정확한 폼을 가르칩니다',
      '커뮤니티 중심 - 크로스핏 특유의 동료 의식으로 함께 성장합니다',
    ],
    prices: [
      { name: '체험권', price: '60,000원', sessions: '1회', perSession: '60,000원', tag: '체험특가' },
      { name: '10회권', price: '800,000원', sessions: '10회', perSession: '80,000원' },
      { name: '20회권', price: '1,400,000원', sessions: '20회', perSession: '70,000원', tag: '인기' },
    ],
    stats: { totalClients: 128, totalSessions: 3200, experience: '5년', satisfaction: 95 },
    galleryPhotos: [
      'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=300&h=300&fit=crop',
    ],
    schedule: [
      { day: '월', slots: ['06:00', '07:00', '12:00', '19:00', '20:00'] },
      { day: '화', slots: ['06:00', '07:00', '12:00', '19:00', '20:00'] },
      { day: '수', slots: ['06:00', '07:00', '12:00', '19:00', '20:00'] },
      { day: '목', slots: ['06:00', '07:00', '12:00', '19:00', '20:00'] },
      { day: '금', slots: ['06:00', '07:00', '12:00', '19:00'] },
      { day: '토', slots: ['09:00', '10:00', '11:00'] },
      { day: '일', slots: [] },
    ],
    reviews: [
      { name: '판교직장인', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', rating: 5, date: '2025.12.18', text: '크로스핏 프로그램이 체계적이고 재미있어요. 점심시간에 WOD 한판 하고 오면 오후 업무 집중도가 올라갑니다!', program: '20회권' },
    ],
    transformations: [],
  },
  '5': {
    name: '정서연 강사',
    category: '필라테스',
    gym: '바디채널 서초점',
    gymId: 'gym3',
    rating: 4.8,
    reviewCount: 89,
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
    avatarUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face',
    intro: '기구 필라테스와 매트 필라테스를 모두 가르치는 전문 강사입니다. 체형 교정과 코어 강화에 특화되어 있으며, 산전산후 관리 프로그램도 운영하고 있습니다.',
    specialties: ['기구 필라테스', '매트 필라테스', '체형 교정', '산전산후 케어'],
    career: ['STOTT Pilates 국제 자격증', '물리치료학과 졸업', '산전산후 필라테스 전문 과정', '6년 필라테스 지도'],
    trainingStyle: [
      '호흡과 정렬 중심 - 정확한 호흡법과 척추 정렬로 깊은 코어 근육을 활성화합니다',
      '기구 + 매트 병행 - 리포머, 캐딜락 등 기구와 매트 운동을 조합합니다',
      '통증 예방 접근 - 일상 자세를 분석하고 맞춤 교정 프로그램을 제공합니다',
    ],
    prices: [
      { name: '체험권', price: '50,000원', sessions: '1회', perSession: '50,000원', tag: '체험특가' },
      { name: '10회권', price: '700,000원', sessions: '10회', perSession: '70,000원' },
      { name: '20회권', price: '1,300,000원', sessions: '20회', perSession: '65,000원', tag: '인기' },
      { name: '30회권', price: '1,800,000원', sessions: '30회', perSession: '60,000원' },
    ],
    stats: { totalClients: 198, totalSessions: 4850, experience: '6년', satisfaction: 97 },
    galleryPhotos: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=300&h=300&fit=crop',
    ],
    schedule: [
      { day: '월', slots: ['09:00', '10:00', '11:00', '14:00', '15:00', '19:00', '20:00'] },
      { day: '화', slots: ['09:00', '10:00', '11:00', '14:00', '19:00', '20:00'] },
      { day: '수', slots: ['09:00', '10:00', '11:00', '14:00', '15:00', '19:00', '20:00'] },
      { day: '목', slots: ['09:00', '10:00', '11:00', '14:00', '19:00', '20:00'] },
      { day: '금', slots: ['09:00', '10:00', '11:00', '14:00', '15:00'] },
      { day: '토', slots: ['10:00', '11:00'] },
      { day: '일', slots: [] },
    ],
    reviews: [
      { name: '코어퀸', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face', rating: 5, date: '2025.12.14', text: '서연 선생님 필라테스 수업 정말 좋아요. 거북목이 확실히 좋아졌고, 코어도 많이 강해진 게 느껴져요.', program: '20회권' },
      { name: '예비맘', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', rating: 5, date: '2025.11.30', text: '산전 필라테스로 다니고 있는데, 임산부 전문이라 안심이 됩니다. 허리 통증도 많이 줄었어요!', program: '30회권' },
      { name: '유연성제로', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', rating: 4, date: '2025.11.20', text: '몸이 엄청 뻣뻣했는데 3개월 다니니 유연성이 확실히 좋아졌습니다. 추천합니다.', program: '10회권' },
    ],
    transformations: [
      { before: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=400&fit=crop', after: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=300&h=400&fit=crop', caption: '체형 교정 (라운드숄더)', duration: '3개월 (20회)' },
    ],
  },
  '6': {
    name: '김태현 강사',
    category: 'PT',
    gym: '바디채널 선릉점',
    gymId: 'gym5',
    rating: 4.7,
    reviewCount: 72,
    imageUrl: 'https://images.unsplash.com/photo-1549476464-37392f717541?w=600&h=400&fit=crop',
    avatarUrl: 'https://images.unsplash.com/photo-1549476464-37392f717541?w=200&h=200&fit=crop&crop=face',
    intro: '보디빌딩과 벌크업 전문 트레이너입니다. 마른 체형에서 근육질로의 변화를 원하시는 분들에게 최적화된 프로그램을 제공합니다.',
    specialties: ['벌크업', '보디빌딩', '식단 관리', '대회 준비'],
    career: ['ISSA-CPT 자격증', '보디빌딩 대회 입상 경력', '스포츠 영양학 수료', '4년 PT 경력'],
    trainingStyle: [
      '분할 프로그램 - 부위별 집중 트레이닝으로 균형 잡힌 체형을 만듭니다',
      '영양 & 보충제 코칭 - 운동만큼 중요한 식단을 함께 관리합니다',
      '주기화 훈련 - 벌크업/커팅 주기에 맞춘 과학적 프로그래밍',
    ],
    prices: [
      { name: '체험권', price: '50,000원', sessions: '1회', perSession: '50,000원', tag: '체험특가' },
      { name: '10회권', price: '650,000원', sessions: '10회', perSession: '65,000원' },
      { name: '20회권', price: '1,200,000원', sessions: '20회', perSession: '60,000원', tag: '인기' },
    ],
    stats: { totalClients: 95, totalSessions: 2400, experience: '4년', satisfaction: 94 },
    galleryPhotos: [
      'https://images.unsplash.com/photo-1549476464-37392f717541?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=300&h=300&fit=crop',
    ],
    schedule: [
      { day: '월', slots: ['06:00', '07:00', '10:00', '18:00', '19:00', '20:00', '21:00'] },
      { day: '화', slots: ['06:00', '07:00', '10:00', '18:00', '19:00', '20:00', '21:00'] },
      { day: '수', slots: ['06:00', '07:00', '10:00', '18:00', '19:00', '20:00'] },
      { day: '목', slots: ['06:00', '07:00', '10:00', '18:00', '19:00', '20:00', '21:00'] },
      { day: '금', slots: ['06:00', '07:00', '10:00', '18:00', '19:00', '20:00'] },
      { day: '토', slots: ['09:00', '10:00', '11:00', '14:00'] },
      { day: '일', slots: [] },
    ],
    reviews: [
      { name: '벌크업도전', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', rating: 5, date: '2025.12.10', text: '65kg에서 75kg까지 근육량 위주로 늘렸습니다. 식단 관리까지 꼼꼼하게 해주셔서 감사합니다!', photos: ['https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=200&h=200&fit=crop'], program: '20회권' },
    ],
    transformations: [
      { before: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300&h=400&fit=crop', after: 'https://images.unsplash.com/photo-1549476464-37392f717541?w=300&h=400&fit=crop', caption: '벌크업 +10kg', duration: '5개월 (30회)' },
    ],
  },
}

const defaultTrainer: TrainerData = {
  name: '트레이너', category: 'PT', gym: '바디채널', gymId: 'gym1', rating: 4.8, reviewCount: 50,
  imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=400&fit=crop',
  avatarUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=200&h=200&fit=crop&crop=face',
  intro: '전문 트레이너입니다.', specialties: ['PT'], career: ['자격증 보유'], trainingStyle: [],
  prices: [{ name: '체험권', price: '66,000원', sessions: '1회' }],
  stats: { totalClients: 0, totalSessions: 0, experience: '-', satisfaction: 0 },
  galleryPhotos: [], schedule: [], reviews: [], transformations: [],
}

/* ── helpers ── */
function StarIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return <svg viewBox="0 0 24 24" className={className} style={style} fill="currentColor" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
}

const tabs = ['소개', '회원권', '스케줄', '후기'] as const
type Tab = typeof tabs[number]

/* ── component ── */
export const TrainerDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const trainer = trainersData[id || ''] || defaultTrainer
  const [liked, setLiked] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>('소개')
  const [reviewSort, setReviewSort] = useState<'latest' | 'high'>('latest')
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [styleOpen, setStyleOpen] = useState(false)

  const sortedReviews = [...trainer.reviews].sort((a, b) => {
    if (reviewSort === 'high') return b.rating - a.rating
    return b.date.localeCompare(a.date)
  })

  const header = (
    <SubPageHeader
      title={trainer.name}
      right={
        <div className="flex gap-1">
          <button className="icon-btn">
            <IconShare className="w-[18px] h-[18px] stroke-ink stroke-2" />
          </button>
          <button onClick={() => setLiked(!liked)} className="icon-btn">
            <IconHeart className={`w-[18px] h-[18px] stroke-2 ${liked ? 'fill-semantic-like stroke-semantic-like' : 'fill-none stroke-ink'}`} />
          </button>
        </div>
      }
    />
  )

  return (
    <PageLayout header={header} className="!px-0 !py-0 !pb-[160px]">
      {/* Hero Image */}
      <div className="relative h-[260px]">
        <img src={trainer.imageUrl} alt={trainer.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-5 left-5 right-5 text-white">
          <span className="inline-block px-2 py-0.5 bg-primary text-white text-label font-bold rounded mb-2">{trainer.category}</span>
          <h1 className="text-[22px] font-bold mb-1">{trainer.name}</h1>
          <div className="flex items-center gap-3 text-body">
            <button onClick={() => navigate(`/gym/${trainer.gymId}`)} className="flex items-center gap-1 hover:underline">
              <IconMapPin className="w-3.5 h-3.5" />
              {trainer.gym}
            </button>
            <span className="flex items-center gap-1">
              <IconStarFilled className="w-3.5 h-3.5 text-yellow-400" />
              {trainer.rating} ({trainer.reviewCount})
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 border-b border-border-light">
        {[
          { label: '총 회원', value: `${trainer.stats.totalClients}명` },
          { label: '누적 세션', value: `${trainer.stats.totalSessions.toLocaleString()}회` },
          { label: '경력', value: trainer.stats.experience },
          { label: '만족도', value: `${trainer.stats.satisfaction}%` },
        ].map((stat, i) => (
          <div key={i} className="flex flex-col items-center py-4">
            <span className="text-title font-bold text-ink">{stat.value}</span>
            <span className="text-label text-ink-tertiary mt-0.5">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Sticky Tabs */}
      <div className="sticky top-0 z-40 bg-white border-b border-border">
        <div className="flex">
          {tabs.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-3 text-body font-semibold text-center relative ${activeTab === tab ? 'text-ink' : 'text-ink-tertiary'}`}>
              {tab}
              {activeTab === tab && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-[2px] bg-ink rounded-full" />}
            </button>
          ))}
        </div>
      </div>

      {/* ── 소개 탭 ── */}
      {activeTab === '소개' && (
        <div>
          {/* Intro */}
          <section className="px-page py-5 border-b border-border-light">
            <h2 className="text-title font-bold text-ink mb-3">소개</h2>
            <p className="text-body text-ink-secondary leading-relaxed">{trainer.intro}</p>
          </section>

          {/* Specialties */}
          <section className="px-page py-5 border-b border-border-light">
            <h2 className="text-title font-bold text-ink mb-3">전문 분야</h2>
            <div className="flex flex-wrap gap-2">
              {trainer.specialties.map((item, i) => (
                <span key={i} className="px-3 py-1.5 bg-[#fff8f5] text-primary text-label font-medium rounded-full border border-primary/20">{item}</span>
              ))}
            </div>
          </section>

          {/* Training Style */}
          {trainer.trainingStyle.length > 0 && (
            <section className="px-page py-5 border-b border-border-light">
              <button onClick={() => setStyleOpen(!styleOpen)} className="w-full flex items-center justify-between">
                <h2 className="text-title font-bold text-ink">트레이닝 스타일</h2>
                <IconChevronDown className={`w-4 h-4 stroke-ink-tertiary stroke-2 transition-transform ${styleOpen ? 'rotate-180' : ''}`} />
              </button>
              {styleOpen && (
                <ul className="mt-3 space-y-2.5">
                  {trainer.trainingStyle.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-label text-ink-secondary leading-relaxed">
                      <span className="w-5 h-5 flex items-center justify-center bg-primary/10 text-primary text-caption font-bold rounded-full flex-shrink-0 mt-0.5">{i + 1}</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}

          {/* Career */}
          <section className="px-page py-5 border-b border-border-light">
            <h2 className="text-title font-bold text-ink mb-3">경력 및 자격</h2>
            <ul className="space-y-2">
              {trainer.career.map((item, i) => (
                <li key={i} className="flex items-center gap-2.5 text-body text-ink-secondary">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Gallery */}
          {trainer.galleryPhotos.length > 0 && (
            <section className="px-page py-5 border-b border-border-light">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-title font-bold text-ink">트레이닝 사진</h2>
                {trainer.galleryPhotos.length > 4 && (
                  <button onClick={() => setGalleryOpen(true)} className="text-label text-primary font-medium">전체보기 ({trainer.galleryPhotos.length})</button>
                )}
              </div>
              <div className="grid grid-cols-3 gap-1.5 rounded-xl overflow-hidden">
                {trainer.galleryPhotos.slice(0, 6).map((photo, i) => (
                  <div key={i} className="relative">
                    <img src={photo} alt={`트레이닝 ${i + 1}`} className="w-full aspect-square object-cover" />
                    {i === 5 && trainer.galleryPhotos.length > 6 && (
                      <button onClick={() => setGalleryOpen(true)} className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white text-body font-bold">+{trainer.galleryPhotos.length - 6}</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Transformations */}
          {trainer.transformations.length > 0 && (
            <section className="px-page py-5 border-b border-border-light">
              <h2 className="text-title font-bold text-ink mb-3">Before & After</h2>
              <div className="space-y-4">
                {trainer.transformations.map((t, i) => (
                  <div key={i} className="bg-surface-subtle rounded-xl p-3">
                    <div className="flex gap-2 mb-2">
                      <div className="flex-1 relative">
                        <img src={t.before} alt="Before" className="w-full aspect-[3/4] object-cover rounded-lg" />
                        <span className="absolute top-2 left-2 px-1.5 py-0.5 bg-black/60 text-white text-caption font-bold rounded">BEFORE</span>
                      </div>
                      <div className="flex-1 relative">
                        <img src={t.after} alt="After" className="w-full aspect-[3/4] object-cover rounded-lg" />
                        <span className="absolute top-2 left-2 px-1.5 py-0.5 bg-primary text-white text-caption font-bold rounded">AFTER</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-body font-bold text-ink">{t.caption}</span>
                      <span className="text-label text-ink-tertiary">{t.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {/* ── 회원권 탭 ── */}
      {activeTab === '회원권' && (
        <div className="px-page py-5">
          <div className="space-y-3">
            {trainer.prices.map((price, i) => (
              <div key={i} className={`p-4 rounded-xl border ${price.tag === '인기' ? 'border-primary bg-[#fff8f5]' : 'border-border'}`}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-body font-bold text-ink">{price.name}</span>
                    {price.tag && <span className={`px-1.5 py-0.5 text-caption font-bold rounded ${price.tag === '인기' ? 'bg-primary text-white' : price.tag === '체험특가' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>{price.tag}</span>}
                  </div>
                  <span className="text-label text-ink-tertiary">{price.sessions}</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-display font-bold text-ink">{price.price}</span>
                  {price.perSession && <span className="text-label text-ink-secondary">회당 {price.perSession}</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Schedule info */}
          <div className="mt-4 p-3.5 bg-surface-muted rounded-xl flex items-center gap-2">
            <IconClock className="w-4 h-4 stroke-ink-tertiary stroke-2 flex-shrink-0" />
            <span className="text-label text-ink-secondary">예약 가능 시간: 평일 06:00 - 22:00 / 주말 09:00 - 18:00</span>
          </div>

          <p className="text-label text-ink-tertiary text-center mt-3">상담 후 맞춤 회원권 안내도 가능합니다</p>
        </div>
      )}

      {/* ── 스케줄 탭 ── */}
      {activeTab === '스케줄' && (
        <div className="px-page py-5">
          <h2 className="text-title font-bold text-ink mb-1">주간 예약 가능 시간</h2>
          <p className="text-label text-ink-tertiary mb-4">원하는 시간을 선택하여 예약하세요</p>

          {trainer.schedule.length > 0 ? (
            <div className="space-y-3">
              {trainer.schedule.map((day, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className={`w-8 h-8 flex items-center justify-center rounded-full text-label font-bold flex-shrink-0 ${day.day === '일' ? 'bg-surface-muted text-ink-tertiary' : 'bg-primary/10 text-primary'}`}>{day.day}</span>
                  <div className="flex-1">
                    {day.slots.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {day.slots.map((slot, si) => (
                          <button key={si} className="px-2.5 py-1.5 border border-border rounded-lg text-label font-medium text-ink-secondary hover:border-primary hover:text-primary transition-colors">{slot}</button>
                        ))}
                      </div>
                    ) : (
                      <span className="text-label text-ink-tertiary leading-8">휴무</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-body text-ink-tertiary text-center py-8">스케줄 정보가 없습니다</p>
          )}
        </div>
      )}

      {/* ── 후기 탭 ── */}
      {activeTab === '후기' && (
        <div className="px-page py-5">
          {/* Summary */}
          <div className="flex items-center gap-4 mb-4 p-4 bg-surface-subtle rounded-xl">
            <div className="text-center">
              <p className="text-[28px] font-bold text-ink">{trainer.rating}</p>
              <div className="flex gap-0.5 justify-center mb-0.5">
                {[1, 2, 3, 4, 5].map((i) => <StarIcon key={i} className={i <= Math.round(trainer.rating) ? 'text-semantic-star' : 'text-ink-disabled'} style={{ width: 12, height: 12 }} />)}
              </div>
              <p className="text-label text-ink-tertiary">{trainer.reviewCount}개 평가</p>
            </div>
            <div className="flex-1 space-y-1">
              {[5, 4, 3, 2, 1].map((star) => {
                const pct = star === 5 ? 78 : star === 4 ? 15 : star === 3 ? 5 : star === 2 ? 1 : 1
                return (
                  <div key={star} className="flex items-center gap-2">
                    <span className="text-caption text-ink-tertiary w-3">{star}</span>
                    <div className="flex-1 h-[6px] bg-ink-disabled rounded-full overflow-hidden"><div className="h-full bg-semantic-star rounded-full" style={{ width: `${pct}%` }} /></div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Sort */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-1.5">
              {([['latest', '최신순'], ['high', '평점순']] as const).map(([key, label]) => (
                <button key={key} onClick={() => setReviewSort(key)} className={`px-2.5 py-1 rounded-full text-label font-medium transition-colors ${reviewSort === key ? 'bg-ink text-white' : 'bg-surface-muted text-ink-secondary'}`}>{label}</button>
              ))}
            </div>
            <button className="flex items-center gap-1 px-3 py-1.5 border border-primary rounded-full text-label font-semibold text-primary">
              <svg viewBox="0 0 24 24" className="w-3 h-3 stroke-primary stroke-2" fill="none"><path d="M12 5v14M5 12h14" /></svg>
              후기 작성
            </button>
          </div>

          {/* Reviews list */}
          <div className="space-y-4">
            {sortedReviews.map((review, i) => (
              <div key={i} className="pb-4 border-b border-border-light last:border-0 last:pb-0">
                <div className="flex items-center gap-2.5 mb-2">
                  <img src={review.avatar} alt={review.name} className="w-8 h-8 rounded-full object-cover" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-body font-semibold text-ink">{review.name}</span>
                      {review.program && <span className="px-1.5 py-0.5 bg-surface-muted text-caption text-ink-secondary rounded">{review.program}</span>}
                      <span className="text-label text-ink-tertiary ml-auto">{review.date}</span>
                    </div>
                    <div className="flex gap-0.5 mt-0.5">{[1, 2, 3, 4, 5].map((s) => <StarIcon key={s} className={s <= review.rating ? 'text-semantic-star' : 'text-ink-disabled'} style={{ width: 10, height: 10 }} />)}</div>
                  </div>
                </div>
                <p className="text-body text-ink-secondary leading-relaxed">{review.text}</p>
                {review.photos && review.photos.length > 0 && (
                  <div className="flex gap-1.5 mt-2">
                    {review.photos.map((photo, pi) => <img key={pi} src={photo} alt="리뷰 사진" className="w-[72px] h-[72px] rounded-lg object-cover" />)}
                  </div>
                )}
              </div>
            ))}
          </div>
          {trainer.reviews.length > 3 && <button className="w-full py-3 mt-4 border border-border rounded-lg text-body font-semibold text-ink hover:bg-surface-subtle">후기 더보기</button>}
        </div>
      )}

      {/* Gallery Modal */}
      {galleryOpen && (
        <div className="fixed inset-0 z-[60] bg-black/90 flex flex-col">
          <div className="flex items-center justify-between px-4 py-3">
            <button onClick={() => setGalleryOpen(false)} className="icon-btn">
              <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-white stroke-2 fill-none"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            </button>
            <span className="text-white text-body font-semibold">트레이닝 사진 ({trainer.galleryPhotos.length})</span>
            <div className="w-9" />
          </div>
          <div className="flex-1 overflow-y-auto px-2 pb-4">
            <div className="grid grid-cols-3 gap-1">
              {trainer.galleryPhotos.map((photo, i) => <img key={i} src={photo} alt={`사진 ${i + 1}`} className="w-full aspect-square object-cover rounded" />)}
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="fixed bottom-[80px] left-0 right-0 z-50 bg-white border-t border-border px-page py-3">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            {trainer.prices[0] && (
              <>
                <p className="text-label text-ink-tertiary">체험권</p>
                <span className="text-title font-bold text-ink">{trainer.prices[0].price}</span>
              </>
            )}
          </div>
          <button className="px-5 py-3 bg-surface-muted text-ink text-body font-semibold rounded-xl hover:bg-ink-disabled transition-colors">채팅 문의</button>
          <button className="px-5 py-3 bg-primary text-white text-body font-bold rounded-xl hover:opacity-90 transition-opacity">예약하기</button>
        </div>
      </div>
    </PageLayout>
  )
}
