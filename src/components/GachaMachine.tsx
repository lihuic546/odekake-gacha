import { motion } from 'framer-motion'

interface Props {
  spinning?: boolean
  shake?: boolean
  size?: number
}

// レトロなカプセルトイ機（赤ドーム・青ボディ・白）
export default function GachaMachine({ spinning = false, shake = false, size = 240 }: Props) {
  return (
    <motion.svg
      width={size}
      height={size * 1.25}
      viewBox="0 0 200 250"
      fill="none"
      aria-label="ガチャマシン"
      role="img"
      animate={shake ? { x: [0, -4, 4, -3, 3, 0], rotate: [0, -1, 1, 0] } : { x: 0 }}
      transition={shake ? { duration: 0.4, repeat: Infinity } : { duration: 0.3 }}
      style={{ overflow: 'visible' }}
    >
      {/* 影 */}
      <ellipse cx="100" cy="242" rx="66" ry="8" fill="#14315a" opacity="0.16" />

      {/* 脚 */}
      <rect x="52" y="212" width="14" height="22" rx="4" fill="#14315a" />
      <rect x="134" y="212" width="14" height="22" rx="4" fill="#14315a" />

      {/* ベース（青） */}
      <rect x="36" y="150" width="128" height="72" rx="16" fill="#1d4e89" />
      <rect x="36" y="150" width="128" height="72" rx="16" fill="url(#gBase)" />

      {/* 取り出し口 */}
      <rect x="70" y="188" width="60" height="26" rx="8" fill="#0e2340" />
      <rect x="76" y="193" width="48" height="16" rx="6" fill="#14315a" />
      <path d="M78 201h44" stroke="#4a7fc4" strokeWidth="2" opacity="0.5" />

      {/* 銘板 */}
      <rect x="60" y="160" width="80" height="18" rx="6" fill="#fdfaf3" />
      <text
        x="100"
        y="173"
        textAnchor="middle"
        fontFamily="'RocknRoll One', sans-serif"
        fontSize="11"
        fill="#e63946"
        letterSpacing="1"
      >
        ODEKAKE
      </text>

      {/* ハンドル（回る） */}
      <motion.g
        style={{ transformOrigin: '100px 168px', transformBox: 'view-box' as never }}
        animate={spinning ? { rotate: 360 } : { rotate: 0 }}
        transition={
          spinning
            ? { repeat: Infinity, ease: 'linear', duration: 0.7 }
            : { type: 'spring', stiffness: 200 }
        }
      >
        <circle cx="100" cy="168" r="4" fill="#0e2340" />
        <rect x="97" y="150" width="6" height="20" rx="3" fill="#e9b949" />
        <circle cx="100" cy="149" r="6" fill="#c1121f" />
        <circle cx="100" cy="149" r="6" fill="url(#gKnob)" />
      </motion.g>

      {/* ガラスドーム（赤縁 + 中のカプセルたち） */}
      <path d="M40 150a60 60 0 0 1 120 0z" fill="#e63946" />
      <path d="M46 150a54 54 0 0 1 108 0z" fill="#fff" opacity="0.9" />
      <clipPath id="domeClip">
        <path d="M46 150a54 54 0 0 1 108 0z" />
      </clipPath>
      <g clipPath="url(#domeClip)">
        <rect x="40" y="90" width="120" height="60" fill="url(#gGlass)" opacity="0.5" />
        {/* 中のカプセル */}
        <circle cx="72" cy="132" r="12" fill="#e63946" />
        <circle cx="72" cy="126" r="12" fill="#ff8f99" opacity="0.5" />
        <circle cx="100" cy="138" r="12" fill="#1d4e89" />
        <circle cx="100" cy="132" r="12" fill="#6fa0dd" opacity="0.5" />
        <circle cx="128" cy="132" r="12" fill="#e9b949" />
        <circle cx="128" cy="126" r="12" fill="#f6d885" opacity="0.5" />
        <circle cx="86" cy="112" r="11" fill="#4a7fc4" />
        <circle cx="114" cy="112" r="11" fill="#ff6b78" />
        {/* ハイライト */}
        <ellipse cx="78" cy="96" rx="22" ry="12" fill="#fff" opacity="0.55" />
      </g>
      {/* ドームの縁 */}
      <path d="M40 150a60 60 0 0 1 120 0" stroke="#c1121f" strokeWidth="5" fill="none" strokeLinecap="round" />
      <rect x="34" y="146" width="132" height="9" rx="4.5" fill="#c1121f" />

      <defs>
        <linearGradient id="gBase" x1="36" y1="150" x2="36" y2="222" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2a63a8" />
          <stop offset="1" stopColor="#14315a" />
        </linearGradient>
        <radialGradient id="gKnob" cx="0.35" cy="0.3" r="0.8">
          <stop stopColor="#ff8f99" />
          <stop offset="1" stopColor="#c1121f" />
        </radialGradient>
        <linearGradient id="gGlass" x1="40" y1="90" x2="160" y2="150" gradientUnits="userSpaceOnUse">
          <stop stopColor="#dff0ff" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
    </motion.svg>
  )
}
