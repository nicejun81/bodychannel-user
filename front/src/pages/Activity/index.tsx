import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageLayout, SubPageHeader, FeedCard, MeetupCard } from '../../components'

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

export const ActivityPage = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'feed' | 'meetup'>('feed')

  const header = (
    <SubPageHeader title="커뮤니티">
      <div className="flex border-t border-border-light">
        <button
          onClick={() => setActiveTab('feed')}
          className={`flex-1 py-3 text-body font-semibold text-center border-b-2 transition-colors ${
            activeTab === 'feed'
              ? 'text-ink font-bold border-ink'
              : 'text-ink-placeholder border-transparent hover:text-ink-secondary'
          }`}
        >
          피드
        </button>
        <button
          onClick={() => setActiveTab('meetup')}
          className={`flex-1 py-3 text-body font-semibold text-center border-b-2 transition-colors ${
            activeTab === 'meetup'
              ? 'text-ink font-bold border-ink'
              : 'text-ink-placeholder border-transparent hover:text-ink-secondary'
          }`}
        >
          모임
        </button>
      </div>
    </SubPageHeader>
  )

  return (
    <PageLayout header={header}>
      {activeTab === 'feed' ? (
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
      ) : (
        <div className="grid grid-cols-1 gap-4">
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
      )}
    </PageLayout>
  )
}
