import { useParams } from 'react-router-dom'
import { PageLayout, SubPageHeader } from '../../components'
import { IconHeart, IconShare, IconUsers, IconMapPin, IconCalendar } from '../../components/Icons'

const meetupsData: Record<string, {
  title: string
  category: string
  schedule: string
  location: string
  memberCount: number
  maxMembers: number
  imageUrl: string
  description: string
  host: { name: string; imageUrl: string }
  members: { imageUrl: string }[]
}> = {
  '1': {
    title: '강남 러닝크루',
    category: '러닝',
    schedule: '매주 토요일 오전 7시',
    location: '강남역 11번 출구',
    memberCount: 24,
    maxMembers: 30,
    imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=450&fit=crop',
    description: '함께 달리는 즐거움! 강남에서 매주 토요일 아침 러닝을 함께해요. 초보자도 환영합니다.',
    host: { name: '김러너', imageUrl: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=100&h=100&fit=crop&crop=face' },
    members: [
      { imageUrl: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=100&h=100&fit=crop&crop=face' },
      { imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=face' },
      { imageUrl: 'https://images.unsplash.com/photo-1549476464-37392f717541?w=100&h=100&fit=crop&crop=face' },
    ],
  },
  '2': {
    title: '모닝 요가 클럽',
    category: '요가',
    schedule: '매주 수/금 오전 6시',
    location: '바디채널 강남점',
    memberCount: 18,
    maxMembers: 20,
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=450&fit=crop',
    description: '아침을 여는 상쾌한 요가! 하루를 활기차게 시작해보세요.',
    host: { name: '박요기', imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=face' },
    members: [
      { imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=face' },
      { imageUrl: 'https://images.unsplash.com/photo-1549476464-37392f717541?w=100&h=100&fit=crop&crop=face' },
    ],
  },
}

const defaultMeetup = {
  title: '모임',
  category: '운동',
  schedule: '매주',
  location: '바디채널',
  memberCount: 10,
  maxMembers: 20,
  imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=450&fit=crop',
  description: '함께 운동해요!',
  host: { name: '호스트', imageUrl: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=100&h=100&fit=crop&crop=face' },
  members: [],
}

export const MeetupDetailPage = () => {
  const { id } = useParams()
  const meetup = meetupsData[id || ''] || defaultMeetup

  const header = (
    <SubPageHeader
      title={meetup.title}
      right={
        <div className="flex gap-2">
          <button className="icon-btn">
            <IconShare className="w-5 h-5 stroke-ink stroke-2" />
          </button>
          <button className="icon-btn">
            <IconHeart className="w-5 h-5 stroke-ink stroke-2" />
          </button>
        </div>
      }
    />
  )

  return (
    <PageLayout header={header} className="!px-0 !py-0 !pb-[180px]">
      {/* Hero Image */}
      <div className="relative h-[220px]">
        <img src={meetup.imageUrl} alt={meetup.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-5 left-5 right-5 text-white">
          <span className="inline-block px-2.5 py-1 bg-primary text-white text-xs font-bold rounded mb-2">
            {meetup.category}
          </span>
          <h1 className="text-2xl font-bold">{meetup.title}</h1>
        </div>
      </div>

      <main className="px-5 py-6">
        {/* Info */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <IconCalendar className="w-5 h-5 stroke-gray-400 stroke-2" />
            <span>{meetup.schedule}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <IconMapPin className="w-5 h-5 stroke-gray-400 stroke-2" />
            <span>{meetup.location}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <IconUsers className="w-5 h-5 stroke-gray-400 stroke-2" />
            <span>{meetup.memberCount}/{meetup.maxMembers}명</span>
          </div>
        </div>

        {/* Host */}
        <section className="mb-6">
          <h2 className="font-bold text-lg mb-3">모임장</h2>
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
            <img src={meetup.host.imageUrl} alt={meetup.host.name} className="w-12 h-12 rounded-full object-cover" />
            <div>
              <p className="font-semibold">{meetup.host.name}</p>
              <p className="text-xs text-gray-500">모임장</p>
            </div>
          </div>
        </section>

        {/* Description */}
        <section className="mb-6">
          <h2 className="font-bold text-lg mb-3">모임 소개</h2>
          <p className="text-gray-600 text-sm leading-relaxed">{meetup.description}</p>
        </section>

        {/* Members */}
        <section>
          <h2 className="font-bold text-lg mb-3">참여 멤버</h2>
          <div className="flex -space-x-2">
            {meetup.members.map((member, i) => (
              <img
                key={i}
                src={member.imageUrl}
                alt="멤버"
                className="w-10 h-10 rounded-full border-2 border-white object-cover"
              />
            ))}
            {meetup.memberCount > meetup.members.length && (
              <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-semibold text-gray-600">
                +{meetup.memberCount - meetup.members.length}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Bottom CTA */}
      <div className="fixed bottom-[80px] left-0 right-0 p-5 bg-white border-t border-gray-200">
        <button className="w-full py-4 bg-primary text-white font-semibold rounded-xl hover:opacity-90 transition-opacity">
          모임 참여하기
        </button>
      </div>
    </PageLayout>
  )
}
