import { useState, useEffect, useCallback } from 'react'
import { IconQrCode } from './Icons'
import { ChatButton } from './SubPageHeader'

export const Header = () => {
  const [showQr, setShowQr] = useState(false)
  const [qrVisible, setQrVisible] = useState(false)
  const [countdown, setCountdown] = useState(10)

  const closeQr = useCallback(() => {
    setQrVisible(false)
    setTimeout(() => setShowQr(false), 300)
  }, [])

  const openQr = useCallback(() => {
    setCountdown(10)
    setShowQr(true)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setQrVisible(true))
    })
  }, [])

  // 매초 카운트다운 + 0이면 닫기
  useEffect(() => {
    if (!showQr) return
    if (countdown <= 0) { closeQr(); return }
    const tick = setTimeout(() => setCountdown(c => c - 1), 1000)
    return () => clearTimeout(tick)
  }, [showQr, countdown, closeQr])

  return (
    <>
      <header className="sticky top-0 z-50 bg-surface border-b border-border">
        <div className="flex items-center justify-between px-page py-3.5">
          {/* Left: Logo */}
          <div className="flex items-center gap-2" style={{ letterSpacing: '-0.5px' }}>
            <img src="/symbol.png" alt="logo" className="w-8 h-8 flex-shrink-0" />
            <span className="text-[18px] font-extrabold font-sans">BODYCHANNEL</span>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <button onClick={openQr} className="icon-btn" title="QR 입장">
              <IconQrCode className="w-5 h-5 stroke-ink stroke-[1.5] fill-none" />
            </button>
            <ChatButton />
          </div>
        </div>
      </header>

      {/* QR Modal - Bottom Sheet */}
      {showQr && (
        <div
          className={`fixed inset-0 z-[100] flex items-end justify-center transition-colors duration-300 ${
            qrVisible ? 'bg-black/50' : 'bg-black/0'
          }`}
          onClick={closeQr}
        >
          <div
            className={`relative bg-white rounded-t-[20px] w-full max-w-[500px] overflow-hidden transition-transform duration-300 ease-out ${
              qrVisible ? 'translate-y-0' : 'translate-y-full'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle bar */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 bg-ink/15 rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3">
              <h3 className="text-title font-bold text-ink">QR 입장</h3>
              <button onClick={closeQr} className="icon-btn">
                <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-ink stroke-2 fill-none">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="flex flex-col items-center px-5 py-6">
              {/* QR Code */}
              <div className="w-[200px] h-[200px] bg-white border-2 border-border rounded-card p-3 mb-5">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* QR pattern */}
                  <rect x="0" y="0" width="30" height="30" rx="2" fill="#0a0a0a" />
                  <rect x="4" y="4" width="22" height="22" rx="1" fill="white" />
                  <rect x="8" y="8" width="14" height="14" rx="1" fill="#0a0a0a" />
                  <rect x="70" y="0" width="30" height="30" rx="2" fill="#0a0a0a" />
                  <rect x="74" y="4" width="22" height="22" rx="1" fill="white" />
                  <rect x="78" y="8" width="14" height="14" rx="1" fill="#0a0a0a" />
                  <rect x="0" y="70" width="30" height="30" rx="2" fill="#0a0a0a" />
                  <rect x="4" y="74" width="22" height="22" rx="1" fill="white" />
                  <rect x="8" y="78" width="14" height="14" rx="1" fill="#0a0a0a" />
                  {/* Data pattern */}
                  <rect x="35" y="5" width="5" height="5" fill="#0a0a0a" />
                  <rect x="45" y="5" width="5" height="5" fill="#0a0a0a" />
                  <rect x="55" y="5" width="5" height="5" fill="#0a0a0a" />
                  <rect x="35" y="15" width="5" height="5" fill="#0a0a0a" />
                  <rect x="50" y="15" width="5" height="5" fill="#0a0a0a" />
                  <rect x="60" y="15" width="5" height="5" fill="#0a0a0a" />
                  <rect x="35" y="25" width="5" height="5" fill="#0a0a0a" />
                  <rect x="45" y="25" width="5" height="5" fill="#0a0a0a" />
                  <rect x="5" y="35" width="5" height="5" fill="#0a0a0a" />
                  <rect x="15" y="35" width="5" height="5" fill="#0a0a0a" />
                  <rect x="25" y="35" width="5" height="5" fill="#0a0a0a" />
                  <rect x="40" y="35" width="5" height="5" fill="#0a0a0a" />
                  <rect x="50" y="35" width="5" height="5" fill="#0a0a0a" />
                  <rect x="65" y="35" width="5" height="5" fill="#0a0a0a" />
                  <rect x="75" y="35" width="5" height="5" fill="#0a0a0a" />
                  <rect x="90" y="35" width="5" height="5" fill="#0a0a0a" />
                  <rect x="5" y="45" width="5" height="5" fill="#0a0a0a" />
                  <rect x="20" y="45" width="5" height="5" fill="#0a0a0a" />
                  <rect x="35" y="45" width="5" height="5" fill="#0a0a0a" />
                  <rect x="50" y="45" width="5" height="5" fill="#0a0a0a" />
                  <rect x="60" y="45" width="5" height="5" fill="#0a0a0a" />
                  <rect x="75" y="45" width="5" height="5" fill="#0a0a0a" />
                  <rect x="85" y="45" width="5" height="5" fill="#0a0a0a" />
                  <rect x="5" y="55" width="5" height="5" fill="#0a0a0a" />
                  <rect x="15" y="55" width="5" height="5" fill="#0a0a0a" />
                  <rect x="30" y="55" width="5" height="5" fill="#0a0a0a" />
                  <rect x="45" y="55" width="5" height="5" fill="#0a0a0a" />
                  <rect x="55" y="55" width="5" height="5" fill="#0a0a0a" />
                  <rect x="70" y="55" width="5" height="5" fill="#0a0a0a" />
                  <rect x="85" y="55" width="5" height="5" fill="#0a0a0a" />
                  <rect x="95" y="55" width="5" height="5" fill="#0a0a0a" />
                  <rect x="10" y="65" width="5" height="5" fill="#0a0a0a" />
                  <rect x="25" y="65" width="5" height="5" fill="#0a0a0a" />
                  <rect x="40" y="65" width="5" height="5" fill="#0a0a0a" />
                  <rect x="55" y="65" width="5" height="5" fill="#0a0a0a" />
                  <rect x="70" y="65" width="5" height="5" fill="#0a0a0a" />
                  <rect x="85" y="65" width="5" height="5" fill="#0a0a0a" />
                  <rect x="35" y="75" width="5" height="5" fill="#0a0a0a" />
                  <rect x="50" y="75" width="5" height="5" fill="#0a0a0a" />
                  <rect x="60" y="75" width="5" height="5" fill="#0a0a0a" />
                  <rect x="75" y="75" width="5" height="5" fill="#0a0a0a" />
                  <rect x="90" y="75" width="5" height="5" fill="#0a0a0a" />
                  <rect x="35" y="85" width="5" height="5" fill="#0a0a0a" />
                  <rect x="45" y="85" width="5" height="5" fill="#0a0a0a" />
                  <rect x="60" y="85" width="5" height="5" fill="#0a0a0a" />
                  <rect x="75" y="85" width="5" height="5" fill="#0a0a0a" />
                  <rect x="85" y="85" width="5" height="5" fill="#0a0a0a" />
                  <rect x="95" y="85" width="5" height="5" fill="#0a0a0a" />
                  <rect x="40" y="95" width="5" height="5" fill="#0a0a0a" />
                  <rect x="55" y="95" width="5" height="5" fill="#0a0a0a" />
                  <rect x="70" y="95" width="5" height="5" fill="#0a0a0a" />
                  <rect x="80" y="95" width="5" height="5" fill="#0a0a0a" />
                  <rect x="90" y="95" width="5" height="5" fill="#0a0a0a" />
                  {/* Center logo */}
                  <rect x="38" y="38" width="24" height="24" rx="4" fill="white" />
                  <rect x="40" y="40" width="20" height="20" rx="3" fill="#FF6B35" />
                  <text x="50" y="54" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">B</text>
                </svg>
              </div>

              <p className="text-body font-semibold text-ink mb-1">김피트님</p>
              <p className="text-label text-ink-secondary mb-1">바디채널 강남점</p>
              <p className="text-caption text-ink-placeholder">입장 시 스캐너에 QR코드를 보여주세요</p>

              {/* Countdown */}
              <div className="mt-4 flex items-center gap-2">
                <div className="relative w-8 h-8">
                  <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    <circle cx="18" cy="18" r="16" fill="none" stroke="#e5e5e5" strokeWidth="3" />
                    <circle
                      cx="18" cy="18" r="16" fill="none" stroke="#FF6B35" strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray={`${(countdown / 10) * 100.53} 100.53`}
                      className="transition-all duration-1000 ease-linear"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-ink">
                    {countdown}
                  </span>
                </div>
                <span className="text-caption text-ink-placeholder">{countdown}초 후 자동으로 닫힙니다</span>
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 pb-8">
              <button
                onClick={closeQr}
                className="w-full py-3.5 bg-ink text-white text-body font-semibold rounded-card transition-colors hover:bg-ink/90"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
