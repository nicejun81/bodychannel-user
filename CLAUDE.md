# BODYCHANNEL (바디채널) - 피트니스 플랫폼

## 프로젝트 개요
한국 피트니스 헬스장 플랫폼. React 프론트엔드 + 정적 HTML 백엔드 목업으로 구성.
현재 **프론트엔드 UI 개발 단계**이며, API 연동은 아직 없음 (모든 데이터는 mock).

## 기술 스택
- **Frontend**: React 19 + TypeScript + Vite 7 + Tailwind CSS v3 (v4에서 다운그레이드됨)
- **Routing**: React Router v7 (BrowserRouter)
- **상태관리**: React useState (Redux/Context 미사용)
- **빌드**: Vite, PostCSS, Autoprefixer
- **Backend**: 정적 HTML 목업 (back/ 디렉토리)

## 프로젝트 구조
```
D:/dev/user/
├── front/                          # React 프론트엔드
│   ├── src/
│   │   ├── App.tsx                 # 라우터 설정 (20개 라우트)
│   │   ├── main.tsx                # 엔트리포인트
│   │   ├── index.css               # 글로벌 스타일 + Tailwind @layer
│   │   ├── pages/                  # 페이지 컴포넌트 (26개)
│   │   │   ├── Home/               # 메인 홈 (히어로슬라이더, 카테고리, 트레이너, 피드)
│   │   │   ├── Membership/         # 지점소개 (위치, 가격, 필터)
│   │   │   ├── Lesson/             # 레슨권 (트레이너 목록, 내 레슨, 필터탭)
│   │   │   ├── Reservation/        # 예약 (캘린더/리스트뷰, 예약관리)
│   │   │   ├── Mypage/             # 마이페이지 (프로필, 통계, 메뉴)
│   │   │   ├── Activity/           # 피드 & 모임
│   │   │   ├── OnlineClass/        # 온라인 강의
│   │   │   ├── Shop/               # 쇼핑몰
│   │   │   ├── Favorites/          # 찜 목록
│   │   │   ├── Invite/             # 친구소개
│   │   │   ├── ReviewEvent/        # 리뷰 이벤트
│   │   │   ├── Ambassador/         # 앰버서더
│   │   │   ├── TrainerDetail/      # 트레이너 상세 (/trainer/:id)
│   │   │   ├── ClassDetail/        # 온라인 강의 상세 (/class/:id)
│   │   │   ├── MeetupDetail/       # 모임 상세 (/meetup/:id)
│   │   │   ├── ProductDetail/      # 상품 상세 (/product/:id)
│   │   │   ├── FeedDetail/         # 피드 상세 (/feed/:id)
│   │   │   ├── GymDetail/          # 헬스장 상세 (/gym/:id)
│   │   │   ├── Chat/              # 채팅 목록 (/chat) - 트레이너/친구/모임 채팅
│   │   │   ├── ChatRoom/          # 채팅방 (/chat/:id) - 메시지 버블, 실시간 전송
│   │   │   ├── Login/              # 로그인 (라우트 미연결)
│   │   │   ├── Signup/             # 회원가입 (라우트 미연결)
│   │   │   ├── Checkout/           # 결제 (라우트 미연결)
│   │   │   ├── Complete/           # 완료 (라우트 미연결)
│   │   │   └── Purchase/           # 구매내역 (라우트 미연결)
│   │   └── components/             # 공통 컴포넌트 (25+개)
│   │       ├── PageLayout.tsx      # 메인 레이아웃 (헤더+콘텐츠+바텀내비)
│   │       ├── Header.tsx          # 상단 헤더 (로고, 지점선택, QR/검색/알림)
│   │       ├── SubPageHeader.tsx   # 서브페이지 헤더 (뒤로가기+제목)
│   │       ├── BottomNav.tsx       # 하단 네비게이션 (홈/지점/레슨/예약/마이)
│   │       ├── HeroSlider.tsx      # 히어로 배너 슬라이더 (자동회전 4초)
│   │       ├── CategoryGrid.tsx    # 8칸 카테고리 그리드
│   │       ├── ScrollRow.tsx       # 가로 스크롤 컨테이너
│   │       ├── SectionHeader.tsx   # 섹션 제목 + 전체보기 링크
│   │       ├── QuickTabs.tsx       # 빠른 액션 탭
│   │       ├── RecentChat.tsx      # 최근 메시지
│   │       ├── OnlineClassCard.tsx  # 온라인 강의 카드
│   │       ├── TrainerListItem.tsx  # 트레이너 목록 아이템
│   │       ├── PTTrainerCard.tsx    # PT 트레이너 카드 (그리드용, 140px)
│   │       ├── TrainerRecommendBanner.tsx  # 트레이너 추천 배너
│   │       ├── MeetupCard.tsx       # 모임 카드 (200px)
│   │       ├── FeedCard.tsx         # 피드 카드 (2열 그리드)
│   │       ├── Icons.tsx            # SVG 아이콘 모음 (30+개)
│   │       └── index.ts            # 컴포넌트 배럴 export
│   ├── tailwind.config.js          # Tailwind 커스텀 설정
│   ├── vite.config.ts              # Vite 설정
│   ├── tsconfig.json               # TypeScript 설정 (strict)
│   └── package.json                # 의존성
├── back/                           # 백엔드 HTML 목업
│   └── design-02-minimal-monochrome-*.html  # 6개 (login, signup, checkout 등)
└── .playwright-mcp/                # 스크린샷 저장 폴더
```

## 디자인 시스템

### 색상
- **Primary**: `#FF6B35` (오렌지) / dark: `#e55a2b` / light: `#ff8f6a`
- **Surface**: white, muted(`#f5f5f5`), subtle(`#fafafa`)
- **Ink**: default(`#0a0a0a`), secondary(`#525252`), tertiary(`#737373`)
- **카테고리 색상**: 바레톤(핑크), 히트35(블루), 짐그라운드(그린)

### 타이포그래피
- 폰트: Poppins (시스템 폰트 폴백)
- 스케일: caption(10px) → label(12px) → body(14px) → title(16px) → heading(18px) → display(20px)

### 간격 토큰
- `page`: 20px (좌우 패딩), `section`: 24px, `card`: 12px, `card-lg`: 16px

### 모서리/그림자
- 모서리: `card`(12px), `card-lg`(16px), `pill`(100px)
- 그림자: `card`, `card-hover`, `elevated`

## 코딩 패턴 & 규칙

### 페이지 컴포넌트 패턴
```tsx
export const PageName = () => {
  // 1. useState로 상태 관리
  // 2. mock 데이터 정의 (const 배열/객체)
  // 3. 헤더 설정
  const header = <SubPageHeader title="페이지명" />
  // 4. PageLayout으로 감싸서 렌더링
  return <PageLayout header={header}>
    {/* 콘텐츠 */}
  </PageLayout>
}
```

### 스타일링 규칙
- Tailwind CSS 유틸리티 클래스만 사용 (CSS 모듈 없음)
- tailwind.config.js의 커스텀 토큰 활용 (색상, 간격, 폰트)
- 그라데이션 배경, hover/active 트랜지션 적극 사용
- 모바일 퍼스트 반응형 디자인

### 네비게이션
- `useNavigate()` 훅으로 프로그래매틱 네비 (react-router-dom)
- `BottomNav`: 홈, 지점소개, 레슨권, 예약, 마이 (5개 탭)
- 상세 페이지는 `SubPageHeader`의 뒤로가기 버튼

### 데이터
- 모든 데이터는 컴포넌트 내부 mock 데이터 (API 연동 없음)
- 이미지는 unsplash URL 사용

## 브랜딩 & 콘텐츠

### 지점
강남점, 역삼점, 서초점, 판교점, 선릉점

### 수업 카테고리
- **바레톤** (Bareton) - 핑크 테마
- **히트35** (Hit35) - 블루 테마
- **짐그라운드** (GymGround) - 그린 테마
- **PT** (Personal Training)

### 주요 트레이너 (mock)
최강민, 정서연, 한동훈, 박지영, 이준혁, 김민수

## Git 정보
- **현재 브랜치**: master
- **메인 브랜치**: main (PR 대상)
- **커밋 스타일**: 숫자 버전 (예: "56", "57") 또는 간단한 설명

## 개발 명령어
```bash
cd front
npm run dev        # 개발 서버 (http://localhost:5173)
npm run build      # TypeScript 체크 + 빌드
npm run lint       # ESLint
npm run preview    # 빌드 결과 미리보기
```

## 알려진 이슈 & 히스토리
- Tailwind CSS v4 → v3 다운그레이드 (빌드 호환성 문제)
- Edge 브라우저 스크롤 이슈 수정됨 (overscroll-behavior 제거)
- 라우트 미연결 페이지 5개 존재 (Login, Signup, Checkout, Complete, Purchase)
- Activity 페이지: 인스타그램 스타일 피드 + 모임 카드 (스크린샷 기준 리디자인 완료)
- Favorites 페이지: 운동시설/트레이너 탭 리스트형 레이아웃 (스크린샷 기준 리디자인 완료)
- Header/icon-btn: HTML 모노크롬 디자인 기준으로 보더 스타일 적용
- Chat 페이지 신규 추가: 채팅 목록(/chat) + 채팅방(/chat/:id), 홈 RecentChat에서 연결

## 작업 시 주의사항
- 한국어 UI (모든 텍스트는 한국어)
- 모바일 앱 스타일 (390px 뷰포트 기준)
- 새 페이지 추가 시 App.tsx 라우트 등록 필요
- 새 컴포넌트 추가 시 components/index.ts에 export 등록
- Tailwind v3 문법 사용 (v4 문법 사용 금지)
