import { useNavigate } from 'react-router-dom'
import {
  Header,
  BottomNav,
  HeroSlider,
  CategoryGrid,
  QuickTabs,
  RecentChat,
  SectionHeader,
  OnlineClassCard,
  TrainerListItem,
  TrainerRecommendBanner,
  PTTrainerCard,
  MeetupCard,
  FeedCard,
} from '../../components'

const onlineClasses = [
  {
    id: 1,
    imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300&h=200&fit=crop',
    title: '홈트레이닝 기초',
    lessonCount: 12,
    level: '초급',
  },
  {
    id: 2,
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=300&h=200&fit=crop',
    title: '필라테스 입문',
    lessonCount: 8,
    level: '초급',
  },
  {
    id: 3,
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=200&fit=crop',
    title: '근력 운동 마스터',
    lessonCount: 20,
    level: '중급',
  },
  {
    id: 4,
    imageUrl: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=300&h=200&fit=crop',
    title: '스트레칭 루틴',
    lessonCount: 6,
    level: '초급',
  },
  {
    id: 5,
    imageUrl: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=300&h=200&fit=crop',
    title: 'HIIT 다이어트',
    lessonCount: 15,
    level: '고급',
  },
]

const groupTrainers = [
  {
    id: 1,
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=200&h=200&fit=crop',
    name: '박지영 강사',
    category: '바레톤',
    categoryColor: 'bareton' as const,
    gym: '바디채널 강남점',
    rating: 4.7,
    reviewCount: 64,
    trialInfo: '10회 / 66,000원',
  },
  {
    id: 2,
    imageUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=200&h=200&fit=crop',
    name: '한동훈 강사',
    category: '히트35',
    categoryColor: 'hit35' as const,
    gym: '바디채널 역삼점',
    rating: 4.9,
    reviewCount: 93,
    trialInfo: '10회 / 66,000원',
  },
  {
    id: 3,
    imageUrl: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=200&h=200&fit=crop',
    name: '이준혁 강사',
    category: '짐그라운드',
    categoryColor: 'gymground' as const,
    gym: '바디채널 판교점',
    rating: 4.6,
    reviewCount: 58,
    trialInfo: '10회 / 66,000원',
  },
]

const ptTrainers = [
  {
    id: 1,
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=240&fit=crop',
    name: '최강민 강사',
    gym: '바디채널 강남점',
    rating: 4.9,
    reviewCount: 127,
    trialInfo: '10회 / 66,000원',
  },
  {
    id: 2,
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=240&fit=crop',
    name: '정서연 강사',
    gym: '바디채널 서초점',
    rating: 4.8,
    reviewCount: 89,
    trialInfo: '10회 / 66,000원',
  },
  {
    id: 3,
    imageUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=240&fit=crop',
    name: '한동훈 강사',
    gym: '바디채널 역삼점',
    rating: 4.9,
    reviewCount: 156,
    trialInfo: '10회 / 66,000원',
  },
]

const meetups = [
  {
    id: 1,
    imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=200&fit=crop',
    category: '러닝',
    title: '강남 러닝크루',
    schedule: '매주 토요일 오전 7시',
    memberCount: 24,
  },
  {
    id: 2,
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=200&fit=crop',
    category: '요가',
    title: '모닝 요가 클럽',
    schedule: '매주 수/금 오전 6시',
    memberCount: 18,
  },
  {
    id: 3,
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=200&fit=crop',
    category: '웨이트',
    title: '벌크업 챌린지',
    schedule: '매일 저녁 8시',
    memberCount: 32,
  },
  {
    id: 4,
    imageUrl: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400&h=200&fit=crop',
    category: '다이어트',
    title: '30일 다이어트',
    schedule: '매주 월/수/금',
    memberCount: 45,
  },
]

const feeds = [
  {
    id: 1,
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop',
    authorImageUrl: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=100&h=100&fit=crop&crop=face',
    authorName: '김민수',
    text: '오늘도 열심히 운동 완료! 💪',
    likeCount: 128,
    commentCount: 24,
    isLiked: true,
  },
  {
    id: 2,
    imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=400&fit=crop',
    authorImageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=face',
    authorName: '박지영',
    text: '필라테스 수업 후기 🧘‍♀️ 정말 시원하네요',
    likeCount: 89,
    commentCount: 12,
    isLiked: false,
  },
  {
    id: 3,
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=400&fit=crop',
    authorImageUrl: 'https://images.unsplash.com/photo-1597347316205-36f6c451902a?w=100&h=100&fit=crop&crop=face',
    authorName: '이준혁',
    text: '3개월 벌크업 결과! 드디어 목표 달성 🎉',
    likeCount: 256,
    commentCount: 48,
    isLiked: true,
  },
  {
    id: 4,
    imageUrl: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400&h=400&fit=crop',
    authorImageUrl: 'https://images.unsplash.com/photo-1549476464-37392f717541?w=100&h=100&fit=crop&crop=face',
    authorName: '정서연',
    text: '오늘의 운동 루틴 공유해요 ✨',
    likeCount: 67,
    commentCount: 8,
    isLiked: false,
  },
  {
    id: 5,
    imageUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=400&fit=crop',
    authorImageUrl: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=100&h=100&fit=crop&crop=face',
    authorName: '한동훈',
    text: '러닝크루와 함께한 주말 아침 🏃‍♂️',
    likeCount: 192,
    commentCount: 32,
    isLiked: true,
  },
  {
    id: 6,
    imageUrl: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=400&fit=crop',
    authorImageUrl: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=100&h=100&fit=crop&crop=face',
    authorName: '윤미래',
    text: '다이어트 1개월 차 -5kg 달성! 🔥',
    likeCount: 312,
    commentCount: 56,
    isLiked: true,
  },
]

export const HomePage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white pb-[100px]">
      <Header />

      <main className="px-5 py-4 overflow-x-hidden">
        <HeroSlider />
        <CategoryGrid />
        <QuickTabs />

        <RecentChat
          avatarUrl="https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=100&h=100&fit=crop&crop=face"
          name="김민수 트레이너"
          message="내일 PT 수업 시간 변경 가능할까요?"
          time="오후 2:30"
          unreadCount={1}
        />

        {/* Online Class Section */}
        <section className="mb-4">
          <SectionHeader title="온라인 강의" href="/online-class" />
          <div className="flex gap-3 overflow-x-auto py-1 pb-2 hide-scrollbar scroll-snap-x">
            {onlineClasses.map((item) => (
              <OnlineClassCard
                key={item.id}
                imageUrl={item.imageUrl}
                title={item.title}
                lessonCount={item.lessonCount}
                level={item.level}
                onClick={() => navigate(`/class/${item.id}`)}
              />
            ))}
          </div>
        </section>

        {/* Group Trainer Section */}
        <section className="py-4">
          <SectionHeader title="그룹 수업" href="/lesson" />
          <div className="p-0">
            {groupTrainers.map((trainer) => (
              <TrainerListItem
                key={trainer.id}
                imageUrl={trainer.imageUrl}
                name={trainer.name}
                category={trainer.category}
                categoryColor={trainer.categoryColor}
                gym={trainer.gym}
                rating={trainer.rating}
                reviewCount={trainer.reviewCount}
                trialInfo={trainer.trialInfo}
                onClick={() => navigate(`/trainer/${trainer.id}`)}
              />
            ))}
          </div>
        </section>

        {/* PT Trainer Section */}
        <div className="bg-gradient-to-br from-[#f5f7fa] to-[#eef1f5] rounded-2xl my-2 mb-5 overflow-hidden border border-[rgba(0,0,0,0.05)]">
          <TrainerRecommendBanner />
          <div className="px-4 py-4 pt-0">
            <SectionHeader title="개인 레슨" href="/lesson" />
            <div className="flex gap-3 overflow-x-auto py-1 pb-3 hide-scrollbar">
              {ptTrainers.map((trainer) => (
                <PTTrainerCard
                  key={trainer.id}
                  imageUrl={trainer.imageUrl}
                  name={trainer.name}
                  gym={trainer.gym}
                  rating={trainer.rating}
                  reviewCount={trainer.reviewCount}
                  trialInfo={trainer.trialInfo}
                  onClick={() => navigate(`/trainer/${trainer.id}`)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Meetup Section */}
        <section className="py-4">
          <SectionHeader title="추천 모임" href="/activity#meetup" />
          <div className="flex gap-3 overflow-x-auto py-1 pb-3 hide-scrollbar">
            {meetups.map((meetup) => (
              <MeetupCard
                key={meetup.id}
                imageUrl={meetup.imageUrl}
                category={meetup.category}
                title={meetup.title}
                schedule={meetup.schedule}
                memberCount={meetup.memberCount}
                onClick={() => navigate(`/meetup/${meetup.id}`)}
              />
            ))}
          </div>
        </section>

        {/* Feed Section */}
        <section className="py-4">
          <SectionHeader title="피드" href="/activity" />
          <div className="grid grid-cols-2 gap-3">
            {feeds.map((feed) => (
              <FeedCard
                key={feed.id}
                imageUrl={feed.imageUrl}
                authorImageUrl={feed.authorImageUrl}
                authorName={feed.authorName}
                text={feed.text}
                likeCount={feed.likeCount}
                commentCount={feed.commentCount}
                isLiked={feed.isLiked}
                onClick={() => navigate(`/feed/${feed.id}`)}
              />
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  )
}
