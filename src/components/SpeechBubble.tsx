import { motion } from 'framer-motion'

interface Props {
  who?: 'らいの' | 'にゃんこ'
  children: React.ReactNode
  variant?: 'blue' | 'red'
  tailAt?: number // 尻尾の水平位置(%)
}

export default function SpeechBubble({
  who,
  children,
  variant = 'blue',
  tailAt = 28,
}: Props) {
  return (
    <motion.div
      className={`bubble ${variant === 'red' ? 'bubble--red' : ''}`}
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
    >
      {who && <div className="bubble__who">{who}</div>}
      <div>{children}</div>
      <span className="bubble__tail" style={{ left: `${tailAt}%` }} />
    </motion.div>
  )
}
