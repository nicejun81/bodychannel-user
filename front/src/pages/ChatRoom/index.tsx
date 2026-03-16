import { useState, useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { PageLayout, SubPageHeader } from '../../components'

const chatData: Record<string, {
  name: string
  avatarUrl: string
  isOnline: boolean
  type: string
  messages: { id: number; sender: 'me' | 'other'; text: string; time: string }[]
}> = {
  '1': {
    name: '김민수 트레이너',
    avatarUrl: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=100&h=100&fit=crop&crop=face',
    isOnline: true,
    type: 'trainer',
    messages: [
      { id: 1, sender: 'other', text: '안녕하세요! 오늘 운동은 어떠셨어요?', time: '오후 1:00' },
      { id: 2, sender: 'me', text: '좋았어요! 덕분에 폼이 많이 좋아진 것 같아요 💪', time: '오후 1:05' },
      { id: 3, sender: 'other', text: '잘하고 계세요! 다음 시간에는 데드리프트 중량 올려볼게요', time: '오후 1:10' },
      { id: 4, sender: 'me', text: '넵! 그리고 내일 PT 수업 시간 변경 가능할까요?', time: '오후 2:30' },
    ],
  },
  '2': {
    name: '정서연 트레이너',
    avatarUrl: 'https://images.unsplash.com/photo-1549476464-37392f717541?w=100&h=100&fit=crop&crop=face',
    isOnline: true,
    type: 'trainer',
    messages: [
      { id: 1, sender: 'other', text: '오늘 운동 루틴 보내드릴게요 💪', time: '오전 11:00' },
      { id: 2, sender: 'other', text: '스쿼트 4세트 x 12회\n런지 3세트 x 15회\n레그프레스 4세트 x 10회\n레그컬 3세트 x 12회', time: '오전 11:05' },
      { id: 3, sender: 'me', text: '감사합니다! 오늘 이거 따라해볼게요', time: '오전 11:20' },
    ],
  },
  '3': {
    name: '이준혁',
    avatarUrl: 'https://images.unsplash.com/photo-1597347316205-36f6c451902a?w=100&h=100&fit=crop&crop=face',
    isOnline: false,
    type: 'friend',
    messages: [
      { id: 1, sender: 'other', text: '요즘 운동 어떻게 해?', time: '오전 9:00' },
      { id: 2, sender: 'me', text: '나 요즘 주 5일 가고 있어', time: '오전 9:10' },
      { id: 3, sender: 'other', text: '대박 ㅋㅋ 나도 다시 시작해야 하는데', time: '오전 9:30' },
      { id: 4, sender: 'other', text: '내일 같이 운동하자!', time: '오전 9:45' },
    ],
  },
  '4': {
    name: '한동훈 트레이너',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    isOnline: false,
    type: 'trainer',
    messages: [
      { id: 1, sender: 'me', text: '트레이너님 오늘 식단 기록 보내드려요', time: '어제 오후 7:00' },
      { id: 2, sender: 'me', text: '아침: 계란 3개 + 통밀빵\n점심: 닭가슴살 샐러드\n저녁: 고구마 + 연어', time: '어제 오후 7:01' },
      { id: 3, sender: 'other', text: '식단 체크 완료했습니다. 잘 하고 계세요!', time: '어제 오후 9:30' },
      { id: 4, sender: 'other', text: '저녁에 단백질을 좀 더 추가하시면 좋겠어요 🥩', time: '어제 오후 9:31' },
    ],
  },
  '5': {
    name: '박지영',
    avatarUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=face',
    isOnline: true,
    type: 'friend',
    messages: [
      { id: 1, sender: 'other', text: '필라테스 수업 같이 들을래?', time: '어제 오후 3:00' },
      { id: 2, sender: 'me', text: '오 좋아! 몇시 수업?', time: '어제 오후 3:15' },
      { id: 3, sender: 'other', text: '화요일 저녁 7시! 바디채널 서초점이야', time: '어제 오후 3:20' },
    ],
  },
  '6': {
    name: '윤미래',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    isOnline: false,
    type: 'friend',
    messages: [
      { id: 1, sender: 'other', text: '다이어트 챌린지 같이 하자 🔥', time: '월요일 오전 10:00' },
      { id: 2, sender: 'me', text: '어떤 챌린지?', time: '월요일 오전 10:30' },
      { id: 3, sender: 'other', text: '30일 식단 + 운동 챌린지! 매일 인증하는 거야', time: '월요일 오전 10:35' },
    ],
  },
  '7': {
    name: '강남 러닝크루',
    avatarUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=100&h=100&fit=crop&crop=face',
    isOnline: false,
    type: 'group',
    messages: [
      { id: 1, sender: 'other', text: '이번 토요일 한강 코스로 달릴게요!', time: '월요일 오후 8:00' },
      { id: 2, sender: 'other', text: '집결 장소: 여의도 한강공원 물빛광장', time: '월요일 오후 8:01' },
      { id: 3, sender: 'me', text: '넵 참가합니다! 🏃‍♂️', time: '월요일 오후 8:30' },
    ],
  },
}

export const ChatRoomPage = () => {
  const { id } = useParams<{ id: string }>()
  const room = chatData[id || '1']
  const [messages, setMessages] = useState(room?.messages || [])
  const [inputText, setInputText] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (!room) {
    return (
      <PageLayout header={<SubPageHeader title="채팅" />}>
        <div className="flex items-center justify-center py-20 text-ink-placeholder">
          채팅방을 찾을 수 없습니다
        </div>
      </PageLayout>
    )
  }

  const handleSend = () => {
    if (!inputText.trim()) return
    const now = new Date()
    const timeStr = `${now.getHours() > 12 ? '오후' : '오전'} ${now.getHours() > 12 ? now.getHours() - 12 : now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`
    setMessages(prev => [
      ...prev,
      { id: prev.length + 1, sender: 'me', text: inputText, time: timeStr },
    ])
    setInputText('')
  }

  const header = (
    <SubPageHeader
      title=""
      right={
        <button className="icon-btn">
          <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-ink stroke-[1.5] fill-none">
            <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
          </svg>
        </button>
      }
    >
      {/* Custom title with avatar */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2.5 pointer-events-none" style={{ position: 'absolute', left: '50%', top: '22px', transform: 'translateX(-50%)' }}>
        <div className="relative">
          <img src={room.avatarUrl} alt={room.name} className="w-8 h-8 rounded-full object-cover" />
          {room.isOnline && (
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#22c55e] border-[1.5px] border-white rounded-full" />
          )}
        </div>
        <div>
          <div className="text-[15px] font-semibold text-ink leading-tight">{room.name}</div>
          <div className="text-[11px] text-ink-placeholder">{room.isOnline ? '온라인' : '오프라인'}</div>
        </div>
      </div>
    </SubPageHeader>
  )

  return (
    <div className="flex flex-col h-screen bg-surface">
      {/* Header */}
      {header}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-page py-4 bg-surface-subtle">
        <div className="flex flex-col gap-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-end gap-2 max-w-[80%] ${msg.sender === 'me' ? 'flex-row-reverse' : ''}`}>
                {msg.sender === 'other' && (
                  <img src={room.avatarUrl} alt="" className="w-8 h-8 rounded-full object-cover flex-shrink-0 mb-0.5" />
                )}
                <div>
                  <div
                    className={`px-4 py-3 text-[14px] leading-relaxed whitespace-pre-wrap ${
                      msg.sender === 'me'
                        ? 'bg-ink text-white rounded-[16px] rounded-br-[4px]'
                        : 'bg-white text-ink border border-border rounded-[16px] rounded-bl-[4px]'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <div className={`text-[11px] text-ink-placeholder mt-1 ${msg.sender === 'me' ? 'text-right' : ''}`}>
                    {msg.time}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Bar */}
      <div className="border-t border-border bg-white px-page py-3 pb-safe">
        <div className="flex items-center gap-2.5">
          <button className="flex-shrink-0 w-10 h-10 rounded-full bg-surface-muted flex items-center justify-center hover:bg-gray-200 transition-colors">
            <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-ink-tertiary stroke-[1.5] fill-none">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="메시지를 입력하세요"
            className="flex-1 px-4 py-3 border border-border rounded-[12px] text-[14px] outline-none focus:border-ink transition-colors"
          />
          <button
            onClick={handleSend}
            disabled={!inputText.trim()}
            className={`flex-shrink-0 w-10 h-10 rounded-[10px] flex items-center justify-center transition-colors ${
              inputText.trim()
                ? 'bg-ink text-white hover:bg-primary'
                : 'bg-surface-muted text-ink-placeholder'
            }`}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current stroke-2 fill-none">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
