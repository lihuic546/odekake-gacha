// レトロ駅の案内所の背景（全画面・固定）。赤青白のタイル壁 × 丸看板 × 掲示板 × タイル床。
export default function AnnaijoBackdrop() {
  return (
    <svg
      className="annaijo-bg"
      viewBox="0 0 400 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        {/* 壁のタイル */}
        <pattern id="wallTile" width="90" height="46" patternUnits="userSpaceOnUse">
          <rect width="90" height="46" fill="#fdfaf3" />
          <rect width="90" height="46" fill="none" stroke="#e4dac6" strokeWidth="2" />
        </pattern>
        {/* 床のタイル */}
        <pattern id="floorTile" width="58" height="32" patternUnits="userSpaceOnUse">
          <rect width="58" height="32" fill="#ead9b8" />
          <rect width="58" height="32" fill="none" stroke="#d6c092" strokeWidth="2" />
        </pattern>
        {/* 天幕（赤白ストライプ） */}
        <pattern id="awning" width="52" height="42" patternUnits="userSpaceOnUse">
          <rect width="52" height="42" fill="#fdfaf3" />
          <rect width="26" height="42" fill="#e63946" />
        </pattern>
        {/* 中央を明るくして文字を読みやすく */}
        <radialGradient id="centerGlow" cx="0.5" cy="0.44" r="0.62">
          <stop offset="0" stopColor="#fffdf8" stopOpacity="0.92" />
          <stop offset="0.6" stopColor="#fffdf8" stopOpacity="0.35" />
          <stop offset="1" stopColor="#fffdf8" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* 壁 */}
      <rect x="0" y="0" width="400" height="580" fill="#fdfaf3" />
      <rect x="0" y="0" width="400" height="580" fill="url(#wallTile)" />

      {/* 床 */}
      <rect x="0" y="566" width="400" height="234" fill="url(#floorTile)" />
      <g stroke="#d6c092" strokeWidth="1.5" opacity="0.55">
        <line x1="200" y1="568" x2="30" y2="800" />
        <line x1="200" y1="568" x2="130" y2="800" />
        <line x1="200" y1="568" x2="270" y2="800" />
        <line x1="200" y1="568" x2="370" y2="800" />
      </g>

      {/* 腰壁（青いレール＋赤ライン） */}
      <rect x="0" y="554" width="400" height="12" fill="#1d4e89" />
      <rect x="0" y="566" width="400" height="3" fill="#e63946" />

      {/* 天幕＋スカラップ */}
      <rect x="0" y="0" width="400" height="40" fill="url(#awning)" />
      {Array.from({ length: 16 }).map((_, i) => (
        <circle
          key={i}
          cx={13 + i * 26}
          cy={40}
          r={13}
          fill={i % 2 === 0 ? '#e63946' : '#fdfaf3'}
        />
      ))}

      {/* 掲示板（右上） */}
      <g>
        <rect x="298" y="120" width="88" height="126" rx="6" fill="#14315a" />
        <rect x="304" y="126" width="76" height="20" rx="3" fill="#e63946" />
        {Array.from({ length: 4 }).map((_, i) => (
          <rect
            key={i}
            x="306"
            y={156 + i * 20}
            width="72"
            height="6"
            rx="3"
            fill="#fdfaf3"
            opacity="0.85"
          />
        ))}
      </g>

      {/* 掛け紐＋丸看板「案内所」 */}
      <line x1="152" y1="58" x2="172" y2="118" stroke="#2a2320" strokeWidth="2" />
      <line x1="248" y1="58" x2="228" y2="118" stroke="#2a2320" strokeWidth="2" />
      <circle cx="200" cy="186" r="72" fill="#fdfaf3" stroke="#1d4e89" strokeWidth="9" />
      <circle cx="200" cy="186" r="60" fill="none" stroke="#e63946" strokeWidth="3" />
      <text
        x="200"
        y="182"
        textAnchor="middle"
        fontFamily="'Zen Maru Gothic', sans-serif"
        fontWeight="900"
        fontSize="30"
        fill="#c1121f"
        letterSpacing="2"
      >
        案内所
      </text>
      <text x="200" y="214" textAnchor="middle" fontSize="20">
        🎫
      </text>

      {/* 中央の明るみ（可読性） */}
      <rect x="0" y="0" width="400" height="800" fill="url(#centerGlow)" />
    </svg>
  )
}
