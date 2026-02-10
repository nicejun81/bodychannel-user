import { IconLightbulb, IconChevronRight } from './Icons'

interface TrainerRecommendBannerProps {
  onClick?: () => void
}

export const TrainerRecommendBanner = ({ onClick }: TrainerRecommendBannerProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center py-5 px-page bg-surface hover:-translate-y-0.5 hover:shadow-card-hover transition-all text-left"
    >
      <div className="w-[52px] h-[52px] bg-primary rounded-card flex items-center justify-center flex-shrink-0 mr-4">
        <IconLightbulb className="w-7 h-7 stroke-white stroke-2" />
      </div>
      <div className="flex-1">
        <h3 className="text-title text-ink mb-0.5">
          나에게 맞는 트레이너 추천받기
        </h3>
        <p className="text-label text-ink-tertiary">
          목표와 운동 스타일에 맞는 트레이너를 찾아드려요
        </p>
      </div>
      <div className="w-8 h-8 bg-ink/5 rounded-full flex items-center justify-center flex-shrink-0">
        <IconChevronRight className="w-[18px] h-[18px] stroke-ink stroke-2" />
      </div>
    </button>
  )
}
