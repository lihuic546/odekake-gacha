// 案内人「らいの」— お出かけ案内所の主役・語り手（あなた自身）
// 赤い案内帽 × 青い制服。丸っこくて親しみやすいスタイル。
import { ILLUSTRATIONS, artUrl } from '../../data/illustrations'

interface Props {
  className?: string
  mood?: 'smile' | 'wink' | 'think'
  size?: number | string // px（数値）または '60vh' などのCSS長さ
  fit?: boolean // true: 親要素の枠に収める（アスペクト比維持で縮小）
}

export default function Raino({ className, mood = 'smile', size = 120, fit }: Props) {
  // 自作イラストが設定されていればそれを使う
  const custom = artUrl(ILLUSTRATIONS.raino, mood, 'smile')
  if (custom) {
    return (
      <img
        className={`chara ${className ?? ''}`}
        src={custom}
        alt="案内人らいの"
        style={
          fit
            ? { maxHeight: '100%', maxWidth: '100%', width: 'auto', height: 'auto', display: 'block' }
            : { height: size, width: 'auto', display: 'block' }
        }
      />
    )
  }

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 120 130"
      fill="none"
      aria-label="案内人らいの"
      role="img"
    >
      {/* 影 */}
      <ellipse cx="60" cy="123" rx="34" ry="6" fill="#14315a" opacity="0.12" />

      {/* 体（青い制服） */}
      <path
        d="M28 128c0-20 14-32 32-32s32 12 32 32z"
        fill="#1d4e89"
      />
      <path d="M28 128c0-20 14-32 32-32s32 12 32 32z" fill="url(#rBody)" />
      {/* ボタン */}
      <circle cx="60" cy="108" r="2.6" fill="#e9b949" />
      <circle cx="60" cy="118" r="2.6" fill="#e9b949" />
      {/* 襟 */}
      <path d="M52 97l8 9 8-9-8-4z" fill="#fdfaf3" />
      <path d="M52 97l8 9-8-2z" fill="#e63946" />
      <path d="M68 97l-8 9 8-2z" fill="#e63946" />

      {/* 顔 */}
      <circle cx="60" cy="60" r="34" fill="#ffe6cf" />
      <circle cx="60" cy="60" r="34" fill="url(#rFace)" />

      {/* ほっぺ */}
      <circle cx="42" cy="68" r="6" fill="#ff9aa2" opacity="0.6" />
      <circle cx="78" cy="68" r="6" fill="#ff9aa2" opacity="0.6" />

      {/* 目 */}
      {mood === 'wink' ? (
        <>
          <path d="M42 58q6 -6 12 0" stroke="#2a2320" strokeWidth="3.2" strokeLinecap="round" />
          <circle cx="76" cy="59" r="4.4" fill="#2a2320" />
          <circle cx="77.4" cy="57.6" r="1.4" fill="#fff" />
        </>
      ) : (
        <>
          <circle cx="48" cy="59" r="4.4" fill="#2a2320" />
          <circle cx="49.4" cy="57.6" r="1.4" fill="#fff" />
          <circle cx="76" cy="59" r="4.4" fill="#2a2320" />
          <circle cx="77.4" cy="57.6" r="1.4" fill="#fff" />
        </>
      )}

      {/* 口 */}
      {mood === 'think' ? (
        <path d="M54 74h12" stroke="#c1121f" strokeWidth="3" strokeLinecap="round" />
      ) : (
        <path d="M52 72q8 9 16 0" stroke="#c1121f" strokeWidth="3" strokeLinecap="round" fill="none" />
      )}

      {/* 案内帽（赤） */}
      <path d="M28 42c2-16 15-26 32-26s30 10 32 26z" fill="#e63946" />
      <path d="M28 42c2-16 15-26 32-26s30 10 32 26z" fill="url(#rCap)" />
      <rect x="24" y="40" width="72" height="9" rx="4.5" fill="#c1121f" />
      {/* 帽章 */}
      <circle cx="60" cy="30" r="6.5" fill="#fdfaf3" />
      <path d="M60 26l1.4 3 3.2.3-2.4 2.1.8 3.1-3-1.7-3 1.7.8-3.1-2.4-2.1 3.2-.3z" fill="#e9b949" />

      <defs>
        <linearGradient id="rBody" x1="0" y1="96" x2="0" y2="128" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4a7fc4" />
          <stop offset="1" stopColor="#1d4e89" />
        </linearGradient>
        <radialGradient id="rFace" cx="0.4" cy="0.35" r="0.8">
          <stop stopColor="#fff2e4" />
          <stop offset="1" stopColor="#ffe0c4" />
        </radialGradient>
        <linearGradient id="rCap" x1="0" y1="16" x2="0" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ff6b78" />
          <stop offset="1" stopColor="#e63946" />
        </linearGradient>
      </defs>
    </svg>
  )
}
