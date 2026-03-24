import { IconLightbulb, IconChevronRight } from './Icons'

interface TrainerRecommendBannerProps {
  onClick?: () => void
}

export const TrainerRecommendBanner = ({ onClick }: TrainerRecommendBannerProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full mx-auto overflow-hidden rounded-card-lg shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all text-left"
    >
      <div className="relative bg-gradient-to-r from-primary via-primary-dark to-primary px-6 py-5">
        {/* 배경 장식 */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-1/2 w-20 h-20 bg-white/5 rounded-full translate-y-1/2" />

        <div className="relative flex items-center gap-4">
          <div className="w-[52px] h-[52px] bg-white/20 backdrop-blur-sm rounded-card flex items-center justify-center flex-shrink-0">
            <IconLightbulb className="w-7 h-7 stroke-white stroke-2" />
          </div>
          <div className="flex-1">
            <h3 className="text-title text-white mb-0.5">
              나에게 맞는 트레이너 추천받기
            </h3>
            <p className="text-label text-white/70">
              목표와 운동 스타일에 맞는 트레이너를 찾아드려요
            </p>
          </div>
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
            <IconChevronRight className="w-[18px] h-[18px] stroke-white stroke-2" />
          </div>
        </div>
      </div>
    </button>
  )
}
