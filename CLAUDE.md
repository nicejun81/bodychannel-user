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

## 디자인 시스템 (tailwind.config.js 기준)

### 아이덴티티 색상 (브랜드 3색)
| 이름 | HEX | Tailwind 클래스 | 용도 |
|------|------|-----------------|------|
| 분홍/오렌지 | `#FF6B35` | `primary` | 메인 CTA, 활성 탭, 가격, 배지 |
| 보라색 | `#7F56D9` | `accent-purple` | 보조 강조, 프리미엄 요소 |
| 그린 | `#00FF63` | `accent-green` | 보조 강조, 성공/활성 강조 |

### 전체 색상 토큰 맵
```
primary:     DEFAULT(#FF6B35), dark(#e55a2b), light(#ff8f6a), 50(#fff5f0), 100(#ffe8db)
accent:      purple(#7F56D9), green(#00FF63)
surface:     DEFAULT(#ffffff), muted(#f5f5f5), subtle(#fafafa)
ink:         DEFAULT(#0a0a0a), secondary(#525252), tertiary(#737373), placeholder(#a3a3a3), disabled(#d4d4d4)
border:      DEFAULT(#e5e5e5), light(#f5f5f5)
category:    bareton(핑크), hit35(블루), gymground(그린)
semantic:    star(#FFD700), online(#22c55e), like(#ff3040), kakao(#FEE500)
```

### 색상 사용 규칙 (반드시 준수)
| 용도 | 올바른 클래스 | 금지 (하드코딩) |
|------|--------------|----------------|
| 메인 텍스트 | `text-ink` | ~~text-gray-800, text-black, text-[#333]~~ |
| 보조 텍스트 | `text-ink-secondary` | ~~text-gray-500, text-gray-600, text-[#373737]~~ |
| 힌트/비활성 텍스트 | `text-ink-tertiary` | ~~text-gray-400~~ |
| 비활성 요소 | `text-ink-disabled` / `bg-ink-disabled` | ~~text-gray-300, bg-gray-200~~ |
| 오렌지 강조 | `text-primary` / `bg-primary` | ~~text-[#ff6b00], bg-[#FF6B35]~~ |
| 오렌지 호버 | `hover:bg-primary-dark` | ~~hover:bg-[#e55d00]~~ |
| 연한 오렌지 배경 | `bg-primary-50` | ~~bg-[#fff0e6], bg-[#fff8f5]~~ |
| 배경(흰색) | `bg-surface` | ~~bg-white~~ (기본 리셋에서 적용됨) |
| 배경(연회색) | `bg-surface-muted` | ~~bg-gray-100~~ |
| 배경(미세회색) | `bg-surface-subtle` | ~~bg-[#fafafa], bg-gray-50~~ |
| 테두리(기본) | `border-border` | ~~border-gray-200, border-gray-300~~ |
| 테두리(연한) | `border-border-light` | ~~border-gray-100~~ |
| 별점 | `text-semantic-star` | ~~text-[#FFD700], text-[#fbbf24]~~ |
| 온라인 상태 | `bg-semantic-online` | ~~bg-[#22c55e], bg-green-500~~ |
| 좋아요/하트 | `fill-semantic-like` / `text-semantic-like` | ~~fill-red-500, text-red-500~~ |
| 카카오 버튼 | `bg-semantic-kakao` | ~~bg-[#FEE500]~~ |
| stroke 회색 | `stroke-ink-tertiary` | ~~stroke-gray-400~~ |
| hover 배경 | `hover:bg-surface-subtle` / `hover:bg-surface-muted` | ~~hover:bg-gray-50, hover:bg-gray-100~~ |

### 타이포그래피
- 폰트: Poppins (Google Fonts, 시스템 폰트 폴백)
- 스케일 (Tailwind 클래스명):
  - `text-caption`: 10px / 14px line-height / 0.02em tracking
  - `text-label`: 12px / 16px
  - `text-body`: 14px / 20px
  - `text-title`: 16px / 22px / bold
  - `text-heading`: 18px / 24px / bold
  - `text-display`: 20px / 26px / extrabold

### 간격 토큰
- `page`: 20px (좌우 패딩 → `px-page`)
- `section`: 24px (섹션 간격 → `mb-section`, `py-section`)
- `card`: 12px (카드 내부 → `p-card`)
- `card-lg`: 16px (큰 카드 → `p-card-lg`)

### 간격 사용 규칙 (반드시 준수)
| 용도 | 올바른 클래스 | 금지 (하드코딩) |
|------|--------------|----------------|
| 페이지 좌우 패딩 | `px-page` | ~~px-5, px-4, px-6~~ |
| 섹션 세로 패딩 | `py-section` | ~~py-6, py-8~~ |
| 섹션 하단 간격 | `mb-section` | ~~mb-6, mb-8~~ |
| 카드 내부 패딩 | `p-card` (12px) | ~~p-3~~ |
| 큰 카드 패딩 | `p-card-lg` (16px) | ~~p-4~~ (카드 컨테이너) |
| 카드 모서리 | `rounded-card` / `rounded-card-lg` | ~~rounded-xl, rounded-lg~~ |

**예외 (하드코딩 허용)**:
- 버튼 내부 패딩 (`px-4 py-2`, `px-3 py-1` 등)
- 배지/태그 패딩 (`px-1.5 py-0.5` 등)
- 입력 필드, 고정 하단 바 (`py-3`)

### 모서리/그림자
- 모서리: `rounded-card`(12px), `rounded-card-lg`(16px), `rounded-pill`(100px)
- 그림자: `shadow-card`, `shadow-card-hover`, `shadow-elevated`

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
- **절대 금지**: Tailwind 기본 `gray-*` 팔레트 사용 → 반드시 `ink-*`, `surface-*`, `border-*` 토큰 사용
- **절대 금지**: 하드코딩 HEX 색상 (`text-[#ff6b00]` 등) → 반드시 디자인 토큰 클래스 사용
- **예외**: CategoryGrid의 카테고리별 그라데이션, 카카오 브랜드 색상(`#3C1E1E`)은 하드코딩 허용

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
- **아이덴티티 스타일 통합 작업 완료 (2026-03-24)**:
  - tailwind.config.js에 accent(보라/그린), semantic(star/online/like/kakao) 색상 토큰 추가
  - 전체 18개 파일에서 하드코딩 HEX → 디자인 토큰으로 마이그레이션 완료
  - 수정 파일: ClassDetail, GymDetail, TrainerDetail, Activity, Chat, ChatRoom, Favorites, Ambassador, Membership, ProductDetail, FeedDetail, MeetupDetail, Lesson, PTTrainerCard, TrainerListItem
  - CategoryGrid의 카테고리별 그라데이션은 예외로 유지
  - 기존 TS 에러 (ComponentsShowcase/PTTrainerCard의 gym prop) 미수정 (기존 이슈)
  - GymDetail gym4에 누락된 lat/lng 추가 수정
- **간격 토큰 통합 작업 완료 (2026-03-24)**:
  - 전체 페이지에서 px-5→px-page, py-6→py-section, mb-6/mb-8→mb-section, p-4→p-card-lg 교체
  - 수정 파일: ClassDetail, GymDetail, TrainerDetail, FeedDetail, MeetupDetail, ProductDetail, Invite, Mypage
  - 버튼/배지/입력필드의 내부 패딩은 예외로 유지
- **GymDetail 상품선택 페이지 분리 (2026-03-24)**:
  - /gym/:id/products 별도 페이지 (GymProducts) 생성
  - 회원권/레슨권/부가상품 탭 구분
  - GymDetail 상단 헤더 제거 → 히어로 이미지 위 뒤로가기/공유 버튼 배치
  - GymDetail 탭 바(시설소개/트레이너/이용권/후기) 삭제
  - "이용권" → "회원권" 전체 용어 통일

## 작업 시 주의사항
- 한국어 UI (모든 텍스트는 한국어)
- 모바일 앱 스타일 (390px 뷰포트 기준)
- 새 페이지 추가 시 App.tsx 라우트 등록 필요
- 새 컴포넌트 추가 시 components/index.ts에 export 등록
- Tailwind v3 문법 사용 (v4 문법 사용 금지)
- **색상은 반드시 디자인 토큰만 사용** (위 "색상 사용 규칙" 테이블 참조)
- 새 색상이 필요하면 tailwind.config.js에 토큰으로 먼저 등록 후 사용
- `gray-*` 직접 사용 금지 → `ink-*`, `surface-*`, `border-*` 토큰 사용
- 아이덴티티 3색(primary, accent-purple, accent-green) 일관성 유지
