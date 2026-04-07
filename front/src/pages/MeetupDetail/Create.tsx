import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageLayout, SubPageHeader, BottomCTA } from '../../components'
import { IconCalendar, IconMapPin, IconUsers } from '../../components/Icons'

const categories = ['바레톤', '히트35', '짐그라운드', 'PT', '러닝', '요가', '필라테스', '기타']

export const MeetupCreatePage = () => {
  const navigate = useNavigate()
  const [category, setCategory] = useState('바레톤')
  const [title, setTitle] = useState('')
  const [schedule, setSchedule] = useState('')
  const [location, setLocation] = useState('')
  const [maxMembers, setMaxMembers] = useState('20')
  const [description, setDescription] = useState('')
  const [coverUrl, setCoverUrl] = useState('')

  const canSubmit =
    title.trim().length > 0 &&
    schedule.trim().length > 0 &&
    location.trim().length > 0 &&
    Number(maxMembers) > 0 &&
    description.trim().length > 0

  const handleSubmit = () => {
    if (!canSubmit) return
    alert('모임이 생성되었어요!')
    navigate('/activity')
  }

  return (
    <PageLayout header={<SubPageHeader title="모임 만들기" />} className="!pb-[120px]">
      <div className="py-section space-y-section">
        {/* Cover */}
        <div>
          <label className="block text-title font-bold text-ink mb-2">대표 이미지</label>
          <div className="aspect-[16/9] w-full bg-surface-muted rounded-card overflow-hidden flex items-center justify-center">
            {coverUrl ? (
              <img src={coverUrl} alt="cover" className="w-full h-full object-cover" />
            ) : (
              <div className="text-ink-tertiary text-label">이미지 URL을 입력하면 미리보기가 나타나요</div>
            )}
          </div>
          <input
            type="text"
            value={coverUrl}
            onChange={(e) => setCoverUrl(e.target.value)}
            placeholder="https://..."
            className="mt-2 w-full px-4 py-3 bg-surface-subtle border border-border rounded-card text-body text-ink placeholder:text-ink-placeholder focus:outline-none focus:border-primary"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-title font-bold text-ink mb-2">카테고리</label>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-4 py-2 rounded-pill text-label font-semibold transition-colors ${
                  category === c
                    ? 'bg-primary text-white'
                    : 'bg-surface-subtle text-ink-secondary border border-border'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="block text-title font-bold text-ink mb-2">모임 이름</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="예) 모닝 바레톤 클럽"
            className="w-full px-4 py-3 bg-surface-subtle border border-border rounded-card text-body text-ink placeholder:text-ink-placeholder focus:outline-none focus:border-primary"
          />
        </div>

        {/* Schedule */}
        <div>
          <label className="flex items-center gap-2 text-title font-bold text-ink mb-2">
            <IconCalendar className="w-5 h-5 stroke-ink stroke-2" />
            일정
          </label>
          <input
            type="text"
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
            placeholder="예) 매주 수/금 오전 6시"
            className="w-full px-4 py-3 bg-surface-subtle border border-border rounded-card text-body text-ink placeholder:text-ink-placeholder focus:outline-none focus:border-primary"
          />
        </div>

        {/* Location */}
        <div>
          <label className="flex items-center gap-2 text-title font-bold text-ink mb-2">
            <IconMapPin className="w-5 h-5 stroke-ink stroke-2" />
            장소
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="예) 바디채널 강남점"
            className="w-full px-4 py-3 bg-surface-subtle border border-border rounded-card text-body text-ink placeholder:text-ink-placeholder focus:outline-none focus:border-primary"
          />
        </div>

        {/* Max members */}
        <div>
          <label className="flex items-center gap-2 text-title font-bold text-ink mb-2">
            <IconUsers className="w-5 h-5 stroke-ink stroke-2" />
            모집 인원
          </label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              min={1}
              max={100}
              value={maxMembers}
              onChange={(e) => setMaxMembers(e.target.value)}
              className="w-24 px-4 py-3 bg-surface-subtle border border-border rounded-card text-body text-ink focus:outline-none focus:border-primary"
            />
            <span className="text-body text-ink-secondary">명까지</span>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-title font-bold text-ink mb-2">모임 소개</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
            placeholder="어떤 모임인지, 어떤 분과 함께하고 싶은지 자유롭게 적어주세요."
            className="w-full p-card-lg bg-surface-subtle border border-border rounded-card text-body text-ink placeholder:text-ink-placeholder focus:outline-none focus:border-primary resize-none"
          />
          <p className="text-caption text-ink-tertiary mt-1 text-right">{description.length}/500</p>
        </div>
      </div>

      <BottomCTA>
        <button
          disabled={!canSubmit}
          onClick={handleSubmit}
          className="w-full py-4 bg-primary text-white font-semibold rounded-card hover:bg-primary-dark transition-colors disabled:bg-ink-disabled disabled:cursor-not-allowed"
        >
          모임 만들기
        </button>
      </BottomCTA>
    </PageLayout>
  )
}
