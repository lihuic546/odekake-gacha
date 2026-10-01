import { motion } from 'framer-motion'

interface Props {
  size?: number
  // 赤 or 青 のカプセル
  color?: 'red' | 'blue'
}

// パカッと開く前のカプセル本体（開閉はGachaScreen側で制御）
export default function Capsule({ size = 96, color = 'red' }: Props) {
  const top = color === 'red' ? '#ff6b78' : '#6fa0dd'
  const topDeep = color === 'red' ? '#e63946' : '#4a7fc4'
  const bottom = color === 'red' ? '#c1121f' : '#1d4e89'

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden>
      {/* 下半分（クリア） */}
      <path d="M12 50a38 38 0 0 0 76 0z" fill={bottom} />
      <path d="M12 50a38 38 0 0 0 76 0z" fill="#ffffff" opacity="0.18" />
      {/* 上半分（カラー） */}
      <path d="M12 50a38 38 0 0 1 76 0z" fill={top} />
      <path d="M12 50a38 38 0 0 1 76 0z" fill={topDeep} opacity="0.35" />
      {/* 帯 */}
      <rect x="12" y="46" width="76" height="8" fill="#fdfaf3" />
      <rect x="12" y="46" width="76" height="8" fill={topDeep} opacity="0.15" />
      {/* ハイライト */}
      <ellipse cx="38" cy="30" rx="14" ry="8" fill="#fff" opacity="0.6" />
    </svg>
  )
}

// 開いた瞬間の光の破裂
export function LightBurst({ show }: { show: boolean }) {
  if (!show) return null
  return (
    <motion.svg
      width={280}
      height={280}
      viewBox="0 0 280 280"
      style={{ position: 'absolute', inset: 0, margin: 'auto', pointerEvents: 'none' }}
      initial={{ scale: 0.2, opacity: 0 }}
      animate={{ scale: [0.2, 1.4, 1.1], opacity: [0, 1, 0] }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
      aria-hidden
    >
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2
        const c = i % 3 === 0 ? '#e63946' : i % 3 === 1 ? '#1d4e89' : '#e9b949'
        return (
          <line
            key={i}
            x1={140}
            y1={140}
            x2={140 + Math.cos(a) * 120}
            y2={140 + Math.sin(a) * 120}
            stroke={c}
            strokeWidth={i % 2 ? 6 : 3}
            strokeLinecap="round"
          />
        )
      })}
      <circle cx="140" cy="140" r="30" fill="#fff" />
    </motion.svg>
  )
}
