import { IconChevronDown, IconQrCode, IconSearch, IconBell } from './Icons'

interface HeaderProps {
  location?: string
  onLocationClick?: () => void
  onQrClick?: () => void
  onSearchClick?: () => void
  onNotificationClick?: () => void
}

export const Header = ({
  location = '강남점',
  onLocationClick,
  onQrClick,
  onSearchClick,
  onNotificationClick,
}: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-['Poppins'] text-base font-extrabold tracking-tight">
            <img src="/symbol.png" alt="logo" className="w-7 h-7" />
            <span>BODYCHANNEL</span>
          </div>
          <button
            onClick={onLocationClick}
            className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 rounded-[20px] text-[13px] font-semibold hover:bg-gray-200 transition-colors"
          >
            <span>{location}</span>
            <IconChevronDown className="w-3.5 h-3.5 stroke-gray-600 stroke-2" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onQrClick}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            title="QR 입장"
          >
            <IconQrCode className="w-[22px] h-[22px] stroke-[var(--black)] stroke-2" />
          </button>
          <button
            onClick={onSearchClick}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            title="검색"
          >
            <IconSearch className="w-[22px] h-[22px] stroke-[var(--black)] stroke-2" />
          </button>
          <button
            onClick={onNotificationClick}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            title="알림"
          >
            <IconBell className="w-[22px] h-[22px] stroke-[var(--black)] stroke-2" />
          </button>
        </div>
      </div>
    </header>
  )
}
