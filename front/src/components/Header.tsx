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
    <header className="sticky top-0 z-50 bg-surface border-b border-border">
      <div className="flex items-center justify-between px-page py-3.5">
        {/* Left: Logo + Location */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-title tracking-tight">
            <img src="/symbol.png" alt="logo" className="w-7 h-7" />
            <span className="font-extrabold">BODYCHANNEL</span>
          </div>
          <button
            onClick={onLocationClick}
            className="flex items-center gap-1 px-3 py-1.5 bg-surface-muted rounded-pill text-label font-semibold hover:bg-gray-200 transition-colors"
          >
            <span>{location}</span>
            <IconChevronDown className="w-3.5 h-3.5 stroke-ink-tertiary stroke-2" />
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1">
          <button onClick={onQrClick} className="icon-btn" title="QR 입장">
            <IconQrCode className="w-[22px] h-[22px] stroke-ink stroke-2" />
          </button>
          <button onClick={onSearchClick} className="icon-btn" title="검색">
            <IconSearch className="w-[22px] h-[22px] stroke-ink stroke-2" />
          </button>
          <button onClick={onNotificationClick} className="icon-btn" title="알림">
            <IconBell className="w-[22px] h-[22px] stroke-ink stroke-2" />
          </button>
        </div>
      </div>
    </header>
  )
}
