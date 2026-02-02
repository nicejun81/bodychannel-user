import { useState, useEffect, useCallback } from 'react'

interface Slide {
  id: number
  greeting: string
  title: string
  highlight: string
  titleSuffix?: string
  variant: 'default' | 'event' | 'promo'
}

const slides: Slide[] = [
  {
    id: 1,
    greeting: '안녕하세요, 김피트님!',
    title: '오늘도 ',
    highlight: '건강한 하루',
    titleSuffix: ' 시작해볼까요?',
    variant: 'default',
  },
  {
    id: 2,
    greeting: 'EVENT',
    title: '신규 회원 ',
    highlight: '20% 할인',
    titleSuffix: ' 이벤트 진행중!',
    variant: 'event',
  },
  {
    id: 3,
    greeting: 'SPECIAL OFFER',
    title: 'PT 패키지 ',
    highlight: '최대 40%',
    titleSuffix: ' 할인 혜택',
    variant: 'promo',
  },
]

export const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(nextSlide, 4000)
    return () => clearInterval(timer)
  }, [nextSlide])

  const getSlideBackground = (variant: Slide['variant']) => {
    switch (variant) {
      case 'event':
        return 'bg-gradient-to-br from-[#2a2a2a] to-[#404040]'
      case 'promo':
        return 'bg-gradient-to-br from-[#1a1a1a] to-[#333333]'
      default:
        return 'bg-gradient-to-br from-[var(--black)] to-[#2a2a2a]'
    }
  }

  return (
    <div className="relative rounded-xl overflow-hidden mb-4 touch-pan-y">
      <div
        className="flex transition-transform duration-[400ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className={`min-w-full px-5 py-4 pb-7 relative overflow-hidden min-h-[100px] flex flex-col justify-center ${getSlideBackground(slide.variant)}`}
          >
            <div className="absolute -top-[50%] -right-[20%] w-[150px] h-[150px] bg-[var(--primary)] rounded-full opacity-15" />
            <p className={`text-[11px] mb-1 relative z-10 ${slide.variant === 'event' ? 'text-white/80' : 'text-gray-400'}`}>
              {slide.greeting}
            </p>
            <h1 className="text-white font-['Poppins'] text-[15px] font-bold leading-snug relative z-10">
              {slide.title}
              <span className="text-[var(--primary)]">{slide.highlight}</span>
              <br />
              {slide.titleSuffix}
            </h1>
          </div>
        ))}
      </div>

      <div className="absolute bottom-[10px] left-1/2 -translate-x-1/2 flex gap-1 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-[5px] rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'w-4 bg-white rounded-[3px]'
                : 'w-[5px] bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
