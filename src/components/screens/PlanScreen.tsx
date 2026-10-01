import { Fragment } from 'react'
import { motion } from 'framer-motion'
import type { Plan, SpotResult } from '../../types'
import { distanceMeters } from '../../lib/planner'
import PlanCard from '../PlanCard'

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
}

// 2スポット間の移動を距離からざっくり推定
function transit(a: SpotResult, b: SpotResult): { icon: string; text: string } {
  const d = distanceMeters(a, b)
  if (d <= 1200) {
    return { icon: '🚶', text: `歩いて${Math.max(1, Math.round(d / 80))}分` }
  }
  return { icon: '🚆', text: `電車で${Math.max(3, Math.round(d / 500))}分` }
}

export default function PlanScreen({
  plan,
  onRetry,
  onHome,
}: {
  plan: Plan
  onRetry: () => void
  onHome: () => void
}) {
  return (
    <motion.div
      className="stack"
      style={{ flex: 1, gap: 14 }}
      initial="hidden"
      animate="show"
      transition={{ staggerChildren: 0.12 }}
    >
      {/* 白パネル：見出し〜チケット */}
      <motion.div variants={item} className="result-panel stack" style={{ gap: 12 }}>
        <div className="banner banner--result">ガチャ結果！</div>

        <p className="muted center" style={{ margin: '-2px 0 2px' }}>
          出発：{plan.origin.label}
        </p>

        {plan.spots.map((spot, i) => (
          <Fragment key={spot.id}>
            <PlanCard spot={spot} />
            {i < plan.spots.length - 1 && (
              <div className="transit">
                <div className="transit__dots" />
                <div className="transit__pill">
                  <span>{transit(spot, plan.spots[i + 1]).icon}</span>
                  {transit(spot, plan.spots[i + 1]).text}
                </div>
                <div className="transit__dots" />
              </div>
            )}
          </Fragment>
        ))}
      </motion.div>

      {/* ボタンは赤青枠の四角のすぐ下（外・背景の上） */}
      <motion.div
        variants={item}
        className="stack"
        style={{ gap: 10, alignItems: 'center' }}
      >
        <button className="btn btn--sign" onClick={onRetry}>
          もう一回まわす！
        </button>
        <button className="btn btn--ghost" onClick={onHome}>
          ← 最初から
        </button>
      </motion.div>
    </motion.div>
  )
}
