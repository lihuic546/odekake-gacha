// 助手「にゃんこ」— らいのの大切なぬいぐるみのネコ。相棒・ツッコミ役。
// 生成りの白ねこ × 赤いリボン。少し縫い目のある“ぬいぐるみ”感。
import { ILLUSTRATIONS, artUrl } from '../../data/illustrations'

interface Props {
  className?: string
  mood?: 'happy' | 'excited' | 'surprised' | 'sleepy'
  size?: number | string // px（数値）または '20vh' などのCSS長さ
  fit?: boolean // true: 親要素の枠に収める（アスペクト比維持で縮小）
}

export default function Nyanko({ className, mood = 'happy', size = 96, fit }: Props) {
  // 自作イラストが設定されていればそれを使う
  const custom = artUrl(ILLUSTRATIONS.nyanko, mood, 'happy')
  if (custom) {
    return (
      <img
        className={`chara ${className ?? ''}`}
        src={custom}
        alt="助手ねこにゃんこ"
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
      viewBox="0 0 110 110"
      fill="none"
      aria-label="助手ねこにゃんこ"
      role="img"
    >
      {/* 影 */}
      <ellipse cx="55" cy="103" rx="30" ry="5.5" fill="#14315a" opacity="0.12" />

      {/* しっぽ */}
      <path
        d="M86 84c14-2 18-16 10-24"
        stroke="#f2e6cf"
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
      />

      {/* 体（ぬいぐるみ） */}
      <ellipse cx="55" cy="82" rx="26" ry="22" fill="#fbf3e2" />
      <ellipse cx="55" cy="82" rx="26" ry="22" fill="url(#nBody)" />
      {/* おなかの縫い目 */}
      <path d="M55 66v30" stroke="#e6d6b8" strokeWidth="1.6" strokeDasharray="3 3" />

      {/* 前足 */}
      <ellipse cx="42" cy="98" rx="8" ry="6" fill="#f7ecd6" />
      <ellipse cx="68" cy="98" rx="8" ry="6" fill="#f7ecd6" />

      {/* 耳 */}
      <path d="M28 40l-4-20 20 10z" fill="#f7ecd6" />
      <path d="M82 40l4-20-20 10z" fill="#f7ecd6" />
      <path d="M30 34l-2-11 11 6z" fill="#ff9aa2" />
      <path d="M80 34l2-11-11 6z" fill="#ff9aa2" />

      {/* 頭 */}
      <circle cx="55" cy="46" r="30" fill="#fbf3e2" />
      <circle cx="55" cy="46" r="30" fill="url(#nHead)" />

      {/* ほっぺ */}
      <circle cx="36" cy="52" r="6" fill="#ff9aa2" opacity="0.55" />
      <circle cx="74" cy="52" r="6" fill="#ff9aa2" opacity="0.55" />

      {/* 目 */}
      {mood === 'sleepy' ? (
        <>
          <path d="M40 46q6 4 12 0" stroke="#3a2f28" strokeWidth="2.8" strokeLinecap="round" fill="none" />
          <path d="M58 46q6 4 12 0" stroke="#3a2f28" strokeWidth="2.8" strokeLinecap="round" fill="none" />
        </>
      ) : mood === 'surprised' ? (
        <>
          <circle cx="46" cy="45" r="6.5" fill="#3a2f28" />
          <circle cx="48" cy="43" r="2" fill="#fff" />
          <circle cx="64" cy="45" r="6.5" fill="#3a2f28" />
          <circle cx="66" cy="43" r="2" fill="#fff" />
        </>
      ) : (
        <>
          <circle cx="46" cy="46" r="5.2" fill="#3a2f28" />
          <circle cx="47.6" cy="44.4" r="1.6" fill="#fff" />
          <circle cx="64" cy="46" r="5.2" fill="#3a2f28" />
          <circle cx="65.6" cy="44.4" r="1.6" fill="#fff" />
        </>
      )}

      {/* 鼻と口 */}
      <path d="M55 52l-2.4 2.6h4.8z" fill="#ff6b78" />
      {mood === 'excited' ? (
        <path d="M50 56q5 6 10 0" stroke="#3a2f28" strokeWidth="2.4" strokeLinecap="round" fill="#ffb3ba" />
      ) : (
        <path d="M55 55v2M55 57q-3 3-6 1M55 57q3 3 6 1" stroke="#3a2f28" strokeWidth="2" strokeLinecap="round" fill="none" />
      )}

      {/* ヒゲ */}
      <g stroke="#d9c8a6" strokeWidth="1.6" strokeLinecap="round">
        <path d="M32 50h-12M33 55l-11 3" />
        <path d="M78 50h12M77 55l11 3" />
      </g>

      {/* 赤いリボン */}
      <path d="M55 70l-11-6 2 12z" fill="#e63946" />
      <path d="M55 70l11-6-2 12z" fill="#e63946" />
      <path d="M55 70l-11-6 2 12z" fill="url(#nBow)" />
      <circle cx="55" cy="70" r="4" fill="#c1121f" />

      <defs>
        <radialGradient id="nHead" cx="0.4" cy="0.35" r="0.8">
          <stop stopColor="#fffdf7" />
          <stop offset="1" stopColor="#f4e8cf" />
        </radialGradient>
        <linearGradient id="nBody" x1="0" y1="60" x2="0" y2="104" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fbf3e2" />
          <stop offset="1" stopColor="#f0e2c6" />
        </linearGradient>
        <linearGradient id="nBow" x1="44" y1="64" x2="66" y2="76" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ff6b78" />
          <stop offset="1" stopColor="#e63946" />
        </linearGradient>
      </defs>
    </svg>
  )
}
