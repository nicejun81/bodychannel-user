import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PageLayout, SubPageHeader, BottomCTA } from '../../components'
import { IconMapPin, IconUser, IconX } from '../../components/Icons'

const presetImages = [
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1549476464-37392f717541?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1550345332-09e3ac987658?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=600&h=600&fit=crop',
]

export const FeedCreatePage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = !!id
  const [selected, setSelected] = useState<string[]>(
    isEdit ? ['https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=600&fit=crop'] : []
  )
  const [text, setText] = useState(
    isEdit ? '오늘도 열심히 운동 완료! 💪 꾸준히 하니까 확실히 달라지는 게 느껴져요. 여러분도 함께해요!' : ''
  )
  const [location, setLocation] = useState(isEdit ? '바디채널 강남점' : '')
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')

  const canSubmit = selected.length > 0 && text.trim().length > 0

  const toggleImage = (url: string) => {
    setSelected((prev) =>
      prev.includes(url) ? prev.filter((u) => u !== url) : [...prev, url]
    )
  }

  const addTag = () => {
    const t = tagInput.trim().replace(/^#/, '')
    if (!t || tags.includes(t)) return
    setTags([...tags, t])
    setTagInput('')
  }

  const handleSubmit = () => {
    if (!canSubmit) return
    alert(isEdit ? '피드가 수정되었어요!' : '피드가 등록되었어요!')
    navigate('/activity')
  }

  const header = <SubPageHeader title={isEdit ? '게시물 수정' : '새 게시물'} />

  return (
    <PageLayout header={header} hideBottomNav className="!px-0">
      {/* Author row */}
      <div className="flex items-center gap-3 px-page py-3 border-b border-border-light">
        <div className="w-10 h-10 rounded-full bg-surface-muted flex items-center justify-center">
          <IconUser className="w-5 h-5 stroke-ink-secondary stroke-2 fill-none" />
        </div>
        <div>
          <div className="text-body font-semibold text-ink leading-tight">나</div>
          <div className="text-label text-ink-tertiary">전체 공개</div>
        </div>
      </div>

      {/* Preview */}
      {selected.length > 0 && (
        <div className="bg-ink-secondary">
          <div className="aspect-square w-full overflow-hidden relative">
            <img src={selected[0]} alt="preview" className="w-full h-full object-cover" />
            {selected.length > 1 && (
              <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 text-white text-caption font-bold rounded-full">
                1/{selected.length}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Caption */}
      <div className="px-page py-3 border-b border-border-light">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          placeholder="문구 입력..."
          maxLength={2200}
          className="w-full text-body text-ink placeholder:text-ink-placeholder resize-none focus:outline-none bg-transparent"
        />
        {text.length > 0 && (
          <div className="text-caption text-ink-tertiary text-right">{text.length}/2,200</div>
        )}
      </div>

      {/* Branch select */}
      <div className="px-page py-3 border-b border-border-light">
        <label className="flex items-center gap-3">
          <IconMapPin className="w-5 h-5 stroke-ink stroke-2" />
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={`flex-1 bg-transparent text-body focus:outline-none ${location ? 'text-ink' : 'text-ink-placeholder'}`}
          >
            <option value="">지점 선택</option>
            <option value="바디채널 강남점">바디채널 강남점</option>
            <option value="바디채널 역삼점">바디채널 역삼점</option>
            <option value="바디채널 서초점">바디채널 서초점</option>
            <option value="바디채널 판교점">바디채널 판교점</option>
            <option value="바디채널 선릉점">바디채널 선릉점</option>
          </select>
        </label>
      </div>

      {/* Tags */}
      <div className="px-page py-3 border-b border-border-light">
        <div className="flex items-center gap-3">
          <span className="text-body font-bold text-ink">#</span>
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                addTag()
              }
            }}
            placeholder="태그 추가 (Enter)"
            className="flex-1 text-body text-ink placeholder:text-ink-placeholder bg-transparent focus:outline-none"
          />
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary-50 text-primary text-label font-semibold rounded-pill"
              >
                #{t}
                <button onClick={() => setTags(tags.filter((x) => x !== t))}>
                  <IconX className="w-3 h-3 stroke-primary stroke-2 fill-none" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Image picker */}
      <div className="px-page py-section">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-title font-bold text-ink">사진 선택</h2>
          <span className="text-label text-ink-tertiary">{selected.length}장 선택됨</span>
        </div>
        <div className="grid grid-cols-3 gap-1">
          {presetImages.map((url) => {
            const idx = selected.indexOf(url)
            const isSel = idx !== -1
            return (
              <button
                key={url}
                onClick={() => toggleImage(url)}
                className="relative aspect-square overflow-hidden bg-surface-muted"
              >
                <img src={url} alt="" className={`w-full h-full object-cover transition-opacity ${isSel ? 'opacity-60' : ''}`} />
                <span
                  className={`absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-caption font-bold border-2 ${
                    isSel
                      ? 'bg-primary text-white border-white'
                      : 'bg-black/30 text-white border-white'
                  }`}
                >
                  {isSel ? idx + 1 : ''}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <BottomCTA hideBottomNav>
        <button
          disabled={!canSubmit}
          onClick={handleSubmit}
          className="w-full py-4 bg-primary text-white font-semibold rounded-card hover:bg-primary-dark transition-colors disabled:bg-ink-disabled disabled:cursor-not-allowed"
        >
          {isEdit ? '수정하기' : '등록하기'}
        </button>
      </BottomCTA>
    </PageLayout>
  )
}
