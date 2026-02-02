import { IconLightbulb, IconChevronRight } from './Icons'

interface TrainerRecommendBannerProps {
  onClick?: () => void
}

export const TrainerRecommendBanner = ({ onClick }: TrainerRecommendBannerProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center py-5 px-6 bg-white hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)] transition-all text-left"
    >
      <div className="w-[52px] h-[52px] bg-[var(--primary)] rounded-[14px] flex items-center justify-center flex-shrink-0 mr-4">
        <IconLightbulb className="w-7 h-7 stroke-white stroke-2" />
      </div>
      <div className="flex-1">
        <h3 className="text-base font-bold text-[var(--black)] mb-1">
          나에게 맞는 트레이너 추천받기
        </h3>
        <p className="text-[13px] text-gray-500">
          목표와 운동 스타일에 맞는 트레이너를 찾아드려요
        </p>
      </div>
      <div className="w-8 h-8 bg-[rgba(0,0,0,0.06)] rounded-full flex items-center justify-center flex-shrink-0">
        <IconChevronRight className="w-[18px] h-[18px] stroke-[var(--black)] stroke-2" />
      </div>
    </button>
  )
}
