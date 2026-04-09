import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { PageLayout, SubPageHeader } from '../../components'

type Profile = {
  name: string
  imageUrl: string
  bio: string
  link?: string
  posts: number
  followers: number
  following: number
  highlights?: { label: string; imageUrl: string }[]
  postImages: string[]
}

const profilesData: Record<string, Profile> = {
  김트레이너: {
    name: '김트레이너',
    imageUrl: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=200&h=200&fit=crop&crop=face',
    bio: '바디채널 강남점 트레이너 · PT/식단 상담 DM\n주 5회 운동, 함께해요 💪',
    link: 'bodychannel.com/kim',
    posts: 124,
    followers: 3820,
    following: 286,
    highlights: [
      { label: '루틴', imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&h=200&fit=crop' },
      { label: '식단', imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=200&h=200&fit=crop' },
      { label: '대회', imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=200&h=200&fit=crop' },
      { label: 'B&A', imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=200&h=200&fit=crop' },
    ],
    postImages: [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1550345332-09e3ac987658?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1549476464-37392f717541?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=300&h=300&fit=crop',
    ],
  },
  헬스왕: {
    name: '헬스왕',
    imageUrl: 'https://images.unsplash.com/photo-1597347316205-36f6c451902a?w=200&h=200&fit=crop&crop=face',
    bio: '벌크업 3년차 · 일상 운동 기록\n바디채널 역삼점',
    posts: 86,
    followers: 1240,
    following: 198,
    highlights: [
      { label: '벌크업', imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=200&h=200&fit=crop' },
      { label: '루틴', imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&h=200&fit=crop' },
    ],
    postImages: [
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1549476464-37392f717541?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300&h=300&fit=crop',
    ],
  },
  운동하는직장인: {
    name: '운동하는직장인',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=face',
    bio: '퇴근 후 헬스 · 직장인의 운동 일기 🏋️‍♂️\n매일 1% 성장 중',
    posts: 58,
    followers: 942,
    following: 312,
    highlights: [
      { label: '오운완', imageUrl: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=200&h=200&fit=crop' },
      { label: '식단', imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=200&h=200&fit=crop' },
    ],
    postImages: [
      'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300&h=300&fit=crop',
    ],
  },
  바레톤요정: {
    name: '바레톤요정',
    imageUrl: 'https://images.unsplash.com/photo-1549476464-37392f717541?w=200&h=200&fit=crop&crop=face',
    bio: '바레톤 강사 · 우아한 운동을 전합니다 🩰',
    posts: 142,
    followers: 5210,
    following: 156,
    highlights: [
      { label: '수업', imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=200&h=200&fit=crop' },
    ],
    postImages: [
      'https://images.unsplash.com/photo-1549476464-37392f717541?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300&h=300&fit=crop',
    ],
  },
  크로스핏러: {
    name: '크로스핏러',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    bio: 'CrossFit Lv.2 · WOD 매일 기록',
    posts: 73,
    followers: 1820,
    following: 245,
    postImages: [
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=300&h=300&fit=crop',
    ],
  },
  러닝매니아: {
    name: '러닝매니아',
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
    bio: '한강 러닝크루 · 풀코스 4시간대',
    posts: 95,
    followers: 2310,
    following: 198,
    postImages: [
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=300&h=300&fit=crop',
    ],
  },
}

const fallbackImages = [
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1549476464-37392f717541?w=300&h=300&fit=crop',
  'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300&h=300&fit=crop',
]

const lookupProfile = (raw: string): Profile => {
  const cleaned = raw.replace(/\.+$/, '')
  if (profilesData[cleaned]) return profilesData[cleaned]
  // prefix match for truncated names ("운동하는직..")
  const prefix = cleaned.replace(/\.+$/, '')
  const found = Object.keys(profilesData).find((k) => k.startsWith(prefix))
  if (found) return profilesData[found]
  return {
    name: cleaned || '사용자',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
    bio: '바디채널과 함께 건강한 하루를 보내요 💪',
    posts: 12,
    followers: 184,
    following: 96,
    postImages: fallbackImages,
  }
}

export const UserProfilePage = () => {
  const { name } = useParams()
  const navigate = useNavigate()
  const profile = lookupProfile(decodeURIComponent(name || ''))
  const [following, setFollowing] = useState(false)
  const [tab, setTab] = useState<'grid' | 'tagged'>('grid')

  return (
    <PageLayout header={<SubPageHeader title={profile.name} />} className="!px-0">
      {/* Header */}
      <div className="px-page py-section">
        <div className="flex items-center gap-6 mb-4">
          <img
            src={profile.imageUrl}
            alt={profile.name}
            className="w-20 h-20 rounded-full object-cover ring-2 ring-primary p-0.5"
          />
          <div className="flex-1 grid grid-cols-3 text-center">
            {[
              { v: profile.posts, l: '게시물', to: 'posts' },
              { v: profile.followers.toLocaleString(), l: '팔로워', to: 'followers' },
              { v: profile.following, l: '팔로잉', to: 'following' },
            ].map((s) => (
              <button
                key={s.l}
                onClick={() => navigate(`/profile/${encodeURIComponent(profile.name)}/${s.to}`)}
                className="hover:opacity-70 transition-opacity"
              >
                <div className="text-title font-bold text-ink">{s.v}</div>
                <div className="text-label text-ink-secondary">{s.l}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <div className="text-body font-semibold text-ink">{profile.name}</div>
          {profile.bio && (
            <div className="text-body text-ink-secondary whitespace-pre-line">{profile.bio}</div>
          )}
          {profile.link && (
            <a href={`https://${profile.link}`} target="_blank" rel="noopener noreferrer" className="text-body text-primary font-semibold">
              {profile.link}
            </a>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setFollowing((v) => !v)}
            className={`flex-1 py-2 rounded-card text-label font-semibold transition-colors ${
              following
                ? 'bg-surface-muted text-ink border border-border'
                : 'bg-primary text-white hover:bg-primary-dark'
            }`}
          >
            {following ? '팔로잉' : '팔로우'}
          </button>
          <button
            onClick={() => navigate('/chat/1')}
            className="flex-1 py-2 rounded-card bg-surface-muted text-ink text-label font-semibold border border-border hover:bg-surface-subtle transition-colors"
          >
            메시지
          </button>
          <button className="px-3 py-2 rounded-card bg-surface-muted text-ink border border-border hover:bg-surface-subtle transition-colors">
            <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-ink stroke-2 fill-none">
              <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Highlights */}
      {profile.highlights && profile.highlights.length > 0 && (
        <div className="px-page pb-section">
          <div className="flex gap-4 overflow-x-auto hide-scrollbar">
            {profile.highlights.map((h) => (
              <button key={h.label} className="flex flex-col items-center gap-1 flex-shrink-0">
                <div className="w-16 h-16 rounded-full p-[2px] border-2 border-border">
                  <img src={h.imageUrl} alt={h.label} className="w-full h-full rounded-full object-cover" />
                </div>
                <span className="text-caption text-ink-secondary w-16 text-center truncate">{h.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-t border-border">
        {([{ k: 'grid', icon: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z' },
          { k: 'tagged', icon: 'M12 2l4 4-4 4-4-4 4-4zM12 22a10 10 0 100-20 10 10 0 000 20z' }] as const).map((t) => (
          <button
            key={t.k}
            onClick={() => setTab(t.k)}
            className={`flex-1 flex justify-center py-3 border-b-2 ${
              tab === t.k ? 'border-ink' : 'border-transparent'
            }`}
          >
            <svg viewBox="0 0 24 24" className={`w-5 h-5 stroke-2 fill-none ${tab === t.k ? 'stroke-ink' : 'stroke-ink-placeholder'}`}>
              <path d={t.icon} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        ))}
      </div>

      {/* Posts grid */}
      <div>
        {profile.postImages.length === 0 ? (
          <div className="py-16 text-center text-ink-tertiary text-body">아직 게시물이 없어요</div>
        ) : (
          <div className="grid grid-cols-3 gap-0.5">
            {profile.postImages.map((url, i) => (
              <button key={i} className="aspect-square overflow-hidden bg-surface-muted">
                <img src={url} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  )
}
