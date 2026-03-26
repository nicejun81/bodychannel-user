import { useState, useEffect, useCallback, useRef } from 'react'
import { IconQrCode } from './Icons'
import { ChatButton } from './SubPageHeader'

const BRANCHES = ['바디채널 강남점', '바디채널 역삼점', '바디채널 서초점', '바디채널 판교점', '바디채널 선릉점']

export const Header = () => {
  const [showQr, setShowQr] = useState(false)
  const [qrVisible, setQrVisible] = useState(false)
  const [scanResult, setScanResult] = useState<string | null>(null)
  const [selectedBranch, setSelectedBranch] = useState(BRANCHES[0])
  const [showBranchPicker, setShowBranchPicker] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop())
      streamRef.current = null
    }
  }, [])

  const closeQr = useCallback(() => {
    setQrVisible(false)
    stopCamera()
    setTimeout(() => {
      setShowQr(false)
      setScanResult(null)
    }, 300)
  }, [stopCamera])

  const openQr = useCallback(() => {
    setScanResult(null)
    setShowQr(true)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setQrVisible(true))
    })
  }, [])

  // 카메라 시작
  useEffect(() => {
    if (!showQr || !qrVisible) return
    let cancelled = false
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then(stream => {
        if (cancelled) { stream.getTracks().forEach(t => t.stop()); return }
        streamRef.current = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.play()
        }
      })
      .catch(() => { /* 카메라 권한 거부 시 무시 */ })
    return () => { cancelled = true }
  }, [showQr, qrVisible])

  return (
    <>
      <header className="sticky top-0 z-50 bg-surface border-b border-border">
        <div className="flex items-center justify-between px-page py-3.5">
          {/* Left: Branch Selector */}
          <button
            onClick={() => setShowBranchPicker(true)}
            className="flex items-center gap-1.5 active:opacity-70 transition-opacity"
          >
            <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-none stroke-ink stroke-[1.5]">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
            <span className="text-title font-bold text-ink">{selectedBranch}</span>
            <svg viewBox="0 0 20 20" className="w-4 h-4 fill-ink/50 mt-px">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </button>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <button onClick={openQr} className="icon-btn" title="QR 입장">
              <IconQrCode className="w-5 h-5 stroke-ink stroke-[1.5] fill-none" />
            </button>
            <ChatButton />
          </div>
        </div>
      </header>

      {/* Branch Picker Bottom Sheet */}
      {showBranchPicker && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50"
          onClick={() => setShowBranchPicker(false)}
        >
          <div
            className="relative bg-white rounded-t-[20px] w-full max-w-[500px] overflow-hidden"
            style={{ animation: 'slideUp 0.3s ease-out' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 bg-ink/15 rounded-full" />
            </div>
            <div className="flex items-center justify-between px-5 py-3">
              <h3 className="text-title font-bold text-ink">지점 선택</h3>
              <button onClick={() => setShowBranchPicker(false)} className="icon-btn">
                <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-ink stroke-2 fill-none">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="px-5 pb-8">
              {BRANCHES.map(branch => (
                <button
                  key={branch}
                  onClick={() => { setSelectedBranch(branch); setShowBranchPicker(false) }}
                  className={`w-full flex items-center gap-3 py-3.5 border-b border-border last:border-0 transition-colors ${
                    selectedBranch === branch ? 'text-primary' : 'text-ink'
                  }`}
                >
                  <svg viewBox="0 0 24 24" className={`w-5 h-5 flex-shrink-0 fill-none stroke-[1.5] ${selectedBranch === branch ? 'stroke-primary' : 'stroke-ink-tertiary'}`}>
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                  <span className="text-body font-medium flex-1 text-left">{branch}</span>
                  {selectedBranch === branch && (
                    <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-primary stroke-2 fill-none flex-shrink-0">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* QR Scanner - Full Screen */}
      {showQr && (
        <div
          className={`fixed inset-0 z-[100] bg-black transition-opacity duration-300 ${
            qrVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* 카메라 영상 배경 */}
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            playsInline
            muted
          />

          {/* 스캔 영역 - box-shadow로 주변을 어둡게 */}
          <div
            className="absolute z-10"
            style={{
              width: '200px',
              height: '200px',
              left: '50%',
              top: '40%',
              marginLeft: '-100px',
              marginTop: '-100px',
              boxShadow: '0 0 0 9999px rgba(0,0,0,0.6)',
              background: 'rgba(255,255,255,0.04)',
            }}
          >
            {/* 코너: top-left */}
            <div className="absolute" style={{ top: -2, left: -2, width: 36, height: 36, borderTop: '3px solid white', borderLeft: '3px solid white', borderRadius: '12px 0 0 0' }} />
            {/* 코너: top-right */}
            <div className="absolute" style={{ top: -2, right: -2, width: 36, height: 36, borderTop: '3px solid white', borderRight: '3px solid white', borderRadius: '0 12px 0 0' }} />
            {/* 코너: bottom-left */}
            <div className="absolute" style={{ bottom: -2, left: -2, width: 36, height: 36, borderBottom: '3px solid white', borderLeft: '3px solid white', borderRadius: '0 0 0 12px' }} />
            {/* 코너: bottom-right */}
            <div className="absolute" style={{ bottom: -2, right: -2, width: 36, height: 36, borderBottom: '3px solid white', borderRight: '3px solid white', borderRadius: '0 0 12px 0' }} />
            {/* 스캔 라인 */}
            <div className="absolute left-3 right-3 h-[2px] rounded-full bg-gradient-to-r from-primary/0 via-primary to-primary/0 animate-scan-line" />
          </div>

          {/* 상단 헤더 */}
          <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-5 pt-3 pb-3">
            <button onClick={closeQr} className="p-2 -ml-2">
              <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-white stroke-2 fill-none">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <h3 className="text-title font-bold text-white">QR 스캔</h3>
            <div className="w-10" />
          </div>

          {/* 하단 안내 */}
          <div className="absolute bottom-0 left-0 right-0 z-20 flex flex-col items-center px-5 pb-8 pt-6">
            {scanResult ? (
              <div className="bg-white rounded-card px-6 py-4 text-center mb-5 w-full">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-green-500 stroke-2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span className="text-body font-semibold text-ink">입장이 확인되었습니다</span>
                </div>
                <p className="text-label text-ink-secondary">바디채널 강남점</p>
              </div>
            ) : (
              <p className="text-body text-white/80 mb-5">헬스장 QR코드를 스캔해주세요</p>
            )}
            <button
              onClick={closeQr}
              className="w-full py-3.5 bg-white/15 backdrop-blur text-white text-body font-semibold rounded-card border border-white/20 transition-colors hover:bg-white/25"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </>
  )
}
