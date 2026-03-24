import { useParams } from 'react-router-dom'
import { PageLayout, SubPageHeader } from '../../components'
import { IconHeart, IconMessage, IconShare } from '../../components/Icons'

const feedsData: Record<string, {
  authorName: string
  authorImageUrl: string
  imageUrl: string
  text: string
  likeCount: number
  commentCount: number
  isLiked: boolean
  createdAt: string
  comments: { author: string; text: string; createdAt: string }[]
}> = {
  '1': {
    authorName: '김민수',
    authorImageUrl: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=100&h=100&fit=crop&crop=face',
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=800&fit=crop',
    text: '오늘도 열심히 운동 완료! 💪 3개월째 꾸준히 하니까 확실히 달라지는 게 느껴져요. 다들 포기하지 마세요!',
    likeCount: 128,
    commentCount: 24,
    isLiked: true,
    createdAt: '2시간 전',
    comments: [
      { author: '박지영', text: '대단해요! 저도 열심히 해야겠어요 👏', createdAt: '1시간 전' },
      { author: '이준혁', text: '꾸준함이 최고죠!', createdAt: '30분 전' },
    ],
  },
  '2': {
    authorName: '박지영',
    authorImageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=face',
    imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=800&fit=crop',
    text: '필라테스 수업 후기 🧘‍♀️ 정말 시원하네요. 박지영 강사님 수업 추천해요!',
    likeCount: 89,
    commentCount: 12,
    isLiked: false,
    createdAt: '5시간 전',
    comments: [
      { author: '김민수', text: '저도 들어보고 싶어요!', createdAt: '4시간 전' },
    ],
  },
}

const defaultFeed = {
  authorName: '사용자',
  authorImageUrl: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=100&h=100&fit=crop&crop=face',
  imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=800&fit=crop',
  text: '피드 내용입니다.',
  likeCount: 10,
  commentCount: 2,
  isLiked: false,
  createdAt: '방금',
  comments: [],
}

export const FeedDetailPage = () => {
  const { id } = useParams()
  const feed = feedsData[id || ''] || defaultFeed

  const header = (
    <SubPageHeader
      title="피드"
      right={
        <button className="icon-btn">
          <IconShare className="w-5 h-5 stroke-ink stroke-2" />
        </button>
      }
    />
  )

  return (
    <PageLayout header={header} className="!px-0 !py-0 !pb-[160px]">
      {/* Author */}
      <div className="flex items-center gap-3 px-5 py-4">
        <img src={feed.authorImageUrl} alt={feed.authorName} className="w-10 h-10 rounded-full object-cover" />
        <div>
          <p className="font-semibold">{feed.authorName}</p>
          <p className="text-caption text-ink-secondary">{feed.createdAt}</p>
        </div>
      </div>

      {/* Image */}
      <div className="aspect-square">
        <img src={feed.imageUrl} alt="피드" className="w-full h-full object-cover" />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 px-5 py-3">
        <button className={`flex items-center gap-1.5 ${feed.isLiked ? 'text-semantic-like' : 'text-ink-secondary'}`}>
          <IconHeart className={`w-6 h-6 ${feed.isLiked ? 'fill-semantic-like stroke-semantic-like' : 'stroke-current stroke-2'}`} />
          <span className="font-semibold">{feed.likeCount}</span>
        </button>
        <button className="flex items-center gap-1.5 text-ink-secondary">
          <IconMessage className="w-6 h-6 stroke-current stroke-2" />
          <span className="font-semibold">{feed.commentCount}</span>
        </button>
      </div>

      {/* Text */}
      <div className="px-5 pb-4">
        <p className="text-body leading-relaxed">
          <span className="font-semibold">{feed.authorName}</span>{' '}
          {feed.text}
        </p>
      </div>

      {/* Comments */}
      <div className="px-5 border-t border-border-light">
        <h3 className="font-semibold py-3">댓글 {feed.comments.length}개</h3>
        <div className="space-y-4">
          {feed.comments.map((comment, i) => (
            <div key={i} className="flex gap-3">
              <div className="w-8 h-8 bg-ink-disabled rounded-full flex-shrink-0" />
              <div>
                <p className="text-body">
                  <span className="font-semibold">{comment.author}</span>{' '}
                  {comment.text}
                </p>
                <p className="text-caption text-ink-tertiary mt-1">{comment.createdAt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comment Input */}
      <div className="fixed bottom-[80px] left-0 right-0 p-4 bg-white border-t border-border">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="댓글을 입력하세요..."
            className="flex-1 px-4 py-3 bg-surface-muted rounded-full text-body focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button className="px-5 py-3 bg-primary text-white font-semibold rounded-full hover:opacity-90 transition-opacity">
            게시
          </button>
        </div>
      </div>
    </PageLayout>
  )
}
