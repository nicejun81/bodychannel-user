import { useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { PageLayout, SubPageHeader } from '../../components'
import { IconHeart, IconMessage, IconShare } from '../../components/Icons'

const feedsData: Record<string, {
  authorName: string
  authorImageUrl: string
  imageUrl: string
  text: string
  location?: string
  tags?: string[]
  likeCount: number
  commentCount: number
  isLiked: boolean
  createdAt: string
  comments: { author: string; authorImageUrl: string; text: string; createdAt: string; likeCount: number }[]
}> = {
  '1': {
    authorName: '김트레이너',
    authorImageUrl: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=100&h=100&fit=crop&crop=face',
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=800&fit=crop',
    text: '오늘도 열심히 운동 완료! 💪 3개월째 꾸준히 하니까 확실히 달라지는 게 느껴져요. 다들 포기하지 마세요!',
    location: '바디채널 강남점',
    tags: ['운동', '헬스', '바디채널'],
    likeCount: 128,
    commentCount: 24,
    isLiked: true,
    createdAt: '2시간 전',
    comments: [
      { author: '박지영', authorImageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=face', text: '대단해요! 저도 열심히 해야겠어요 👏', createdAt: '1시간 전', likeCount: 12 },
      { author: '이준혁', authorImageUrl: 'https://images.unsplash.com/photo-1549476464-37392f717541?w=100&h=100&fit=crop&crop=face', text: '꾸준함이 최고죠!', createdAt: '30분 전', likeCount: 5 },
      { author: '최강민', authorImageUrl: 'https://images.unsplash.com/photo-1597347316205-36f6c451902a?w=100&h=100&fit=crop&crop=face', text: '동기부여 받고 갑니다 🔥', createdAt: '20분 전', likeCount: 3 },
    ],
  },
  '2': {
    authorName: '박지영',
    authorImageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=face',
    imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=800&fit=crop',
    text: '바레톤 수업 후기 🧘‍♀️ 정말 시원하네요. 박지영 강사님 수업 추천해요!',
    location: '바디채널 서초점',
    tags: ['바레톤'],
    likeCount: 89,
    commentCount: 12,
    isLiked: false,
    createdAt: '5시간 전',
    comments: [
      { author: '김민수', authorImageUrl: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=100&h=100&fit=crop&crop=face', text: '저도 들어보고 싶어요!', createdAt: '4시간 전', likeCount: 2 },
    ],
  },
}

const defaultFeed = {
  authorName: '사용자',
  authorImageUrl: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=100&h=100&fit=crop&crop=face',
  imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=800&fit=crop',
  text: '피드 내용입니다.',
  location: undefined,
  tags: undefined,
  likeCount: 10,
  commentCount: 2,
  isLiked: false,
  createdAt: '방금',
  comments: [],
}

export const FeedDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const feed = feedsData[id || ''] || defaultFeed
  const [liked, setLiked] = useState(feed.isLiked)
  const [likeCount, setLikeCount] = useState(feed.likeCount)
  const [saved, setSaved] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [comment, setComment] = useState('')
  const commentInputRef = useRef<HTMLInputElement>(null)
  const handleShare = () => {
    const url = window.location.href
    if (navigator.share) {
      navigator.share({ title: '바디채널 피드', url }).catch(() => {})
    } else {
      navigator.clipboard?.writeText(url)
      alert('링크가 복사되었어요')
    }
  }

  const toggleLike = () => {
    setLiked((v) => !v)
    setLikeCount((c) => (liked ? c - 1 : c + 1))
  }

  const isLong = feed.text.length > 60
  const displayText = !isLong || expanded ? feed.text : feed.text.slice(0, 60) + '...'

  return (
    <PageLayout header={<SubPageHeader title="게시물" />} className="!px-0 !py-0 !pb-[160px]">
      {/* Author row */}
      <div className="flex items-center justify-between px-page py-3">
        <button onClick={() => navigate('/mypage?tab=profile')} className="flex items-center gap-3">
          <img src={feed.authorImageUrl} alt={feed.authorName} className="w-9 h-9 rounded-full object-cover ring-2 ring-primary p-0.5" />
          <div className="text-left">
            <div className="text-body font-semibold text-ink leading-tight">{feed.authorName}</div>
            {feed.location && <div className="text-label text-ink-tertiary">{feed.location}</div>}
          </div>
        </button>
        <button className="p-2">
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-ink">
            <circle cx="5" cy="12" r="1.5" />
            <circle cx="12" cy="12" r="1.5" />
            <circle cx="19" cy="12" r="1.5" />
          </svg>
        </button>
      </div>

      {/* Image */}
      <div className="aspect-square bg-ink-secondary">
        <img src={feed.imageUrl} alt="피드" className="w-full h-full object-cover" onDoubleClick={toggleLike} />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between px-page pt-3 pb-1">
        <div className="flex items-center gap-4">
          <button onClick={toggleLike}>
            <IconHeart className={`w-7 h-7 stroke-2 ${liked ? 'fill-semantic-like stroke-semantic-like' : 'fill-none stroke-ink'}`} />
          </button>
          <button onClick={() => commentInputRef.current?.focus()}>
            <IconMessage className="w-7 h-7 fill-none stroke-ink stroke-2" />
          </button>
          <button onClick={handleShare}>
            <IconShare className="w-7 h-7 fill-none stroke-ink stroke-2" />
          </button>
        </div>
        <button onClick={() => setSaved((v) => !v)}>
          <svg viewBox="0 0 24 24" className={`w-7 h-7 stroke-2 ${saved ? 'fill-ink stroke-ink' : 'fill-none stroke-ink'}`}>
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Like count */}
      <div className="px-page text-body font-semibold text-ink">좋아요 {likeCount.toLocaleString()}개</div>

      {/* Caption */}
      <div className="px-page pt-1 pb-1 text-body text-ink leading-relaxed">
        <span className="font-semibold">{feed.authorName}</span>{' '}
        <span>{displayText}</span>
        {isLong && !expanded && (
          <button onClick={() => setExpanded(true)} className="ml-1 text-ink-tertiary">
            더 보기
          </button>
        )}
      </div>

      {/* Tags */}
      {feed.tags && feed.tags.length > 0 && (
        <div className="px-page pt-0.5 flex flex-wrap gap-x-2 text-body text-primary">
          {feed.tags.map((t) => (
            <span key={t}>#{t}</span>
          ))}
        </div>
      )}

      {/* Comments preview */}
      <button className="block px-page pt-2 text-label text-ink-tertiary">
        댓글 {feed.commentCount}개 모두 보기
      </button>

      {/* Created at */}
      <div className="px-page pt-1 pb-3 text-caption text-ink-tertiary uppercase tracking-wide">{feed.createdAt}</div>

      <div className="h-px bg-border-light" />

      {/* Comments list */}
      <div className="px-page py-3 space-y-4">
        {feed.comments.map((c, i) => (
          <div key={i} className="flex items-start gap-3">
            <img src={c.authorImageUrl} alt={c.author} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-body text-ink leading-relaxed">
                <span className="font-semibold">{c.author}</span>{' '}
                <span>{c.text}</span>
              </p>
              <div className="flex items-center gap-3 mt-1 text-label text-ink-tertiary">
                <span>{c.createdAt}</span>
                <span>좋아요 {c.likeCount}개</span>
                <button>답글 달기</button>
              </div>
            </div>
            <button className="p-1">
              <IconHeart className="w-3.5 h-3.5 fill-none stroke-ink-tertiary stroke-2" />
            </button>
          </div>
        ))}
      </div>

      {/* Comment input (fixed) */}
      <div className="fixed bottom-[80px] left-0 right-0 bg-surface border-t border-border-light">
        <div className="flex items-center gap-3 px-page py-2.5">
          <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" alt="me" className="w-8 h-8 rounded-full object-cover" />
          <input
            ref={commentInputRef}
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="댓글 달기..."
            className="flex-1 text-body text-ink placeholder:text-ink-placeholder bg-transparent focus:outline-none"
          />
          {comment.trim().length > 0 && (
            <button className="text-label font-bold text-primary">게시</button>
          )}
        </div>
      </div>
    </PageLayout>
  )
}
