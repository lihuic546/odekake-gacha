import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Answers, Origin, Plan } from '../../types'
import { buildPlan } from '../../lib/planner'
import { getCurrentPosition, geocodeArea } from '../../lib/geo'
import GachaMachine from '../GachaMachine'
import Capsule, { LightBurst } from '../Capsule'
import Nyanko from '../characters/Nyanko'
import SpeechBubble from '../SpeechBubble'

interface Props {
  answers: Answers
  onReveal: (p: Plan) => void
  onError: () => void
}

type Phase = 'choose' | 'spin' | 'drop' | 'open'

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

export default function GachaScreen({ answers, onReveal, onError }: Props) {
  const [phase, setPhase] = useState<Phase>('choose')
  const [manual, setManual] = useState('')
  const [locError, setLocError] = useState<string | null>(null)
  const [runError, setRunError] = useState<string | null>(null)
  const [busy, setBusy] = useState<'current' | 'manual' | null>(null)

  // 現在地で回す
  async function useCurrent() {
    setBusy('current')
    setLocError(null)
    setRunError(null)
    try {
      const o = await getCurrentPosition()
      runSpin(o)
    } catch (e) {
      setLocError((e as Error).message)
    } finally {
      setBusy(null)
    }
  }

  // 入力した場所で回す
  async function useManual() {
    if (!manual.trim()) return
    setBusy('manual')
    setLocError(null)
    setRunError(null)
    try {
      const o = await geocodeArea(manual)
      runSpin(o)
    } catch (e) {
      setLocError((e as Error).message)
    } finally {
      setBusy(null)
    }
  }

  async function runSpin(o: Origin) {
    setRunError(null)
    setPhase('spin')
    const planPromise = buildPlan(answers, o).catch((e: Error) => {
      throw e
    })
    try {
      await wait(1600) // ハンドルぐるぐる
      setPhase('drop') // カプセル落下
      await wait(900)
      setPhase('open') // パカッ＆光
      await wait(750)
      const plan = await planPromise
      onReveal(plan)
    } catch (e) {
      setRunError((e as Error).message)
      setPhase('choose')
    }
  }

  const spinning = phase === 'spin'
  const rolling = phase === 'spin' || phase === 'drop' || phase === 'open'

  return (
    <div className="stack center" style={{ flex: 1, gap: 8 }}>
      {/* マシン＋集中線 */}
      <div className="gacha-stage" style={{ minHeight: 250, width: '100%' }}>
        {rolling && (
          <>
            <div className="burst" />
            <div className="burst burst--blue" />
          </>
        )}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <GachaMachine spinning={spinning} shake={spinning} size={230} />
          <LightBurst show={phase === 'open'} />
        </div>

        {/* 落ちてくるカプセル */}
        <AnimatePresence>
          {(phase === 'drop' || phase === 'open') && (
            <motion.div
              key="capsule"
              initial={{ y: -60, opacity: 0, rotate: -30 }}
              animate={
                phase === 'open'
                  ? { y: 120, scale: [1, 1.15, 0], opacity: [1, 1, 0], rotate: 20 }
                  : { y: [-60, 120, 100, 120], opacity: 1, rotate: [-30, 8, -4, 0] }
              }
              transition={
                phase === 'open'
                  ? { duration: 0.6, ease: 'easeIn' }
                  : { duration: 0.85, times: [0, 0.55, 0.78, 1] }
              }
              style={{ position: 'absolute', zIndex: 2 }}
            >
              <Capsule color={Math.random() > 0.5 ? 'red' : 'blue'} size={88} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* にゃんこ＋セリフ */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, width: '100%' }}>
        <motion.div
          animate={rolling ? { rotate: [0, -10, 10, -10, 0], y: [0, -4, 0] } : { rotate: 0 }}
          transition={rolling ? { duration: 0.5, repeat: Infinity } : {}}
        >
          <Nyanko size={76} mood={rolling ? 'excited' : 'happy'} />
        </motion.div>
        <div style={{ flex: 1, paddingBottom: 6 }}>
          <SpeechBubble who="にゃんこ" variant="red" tailAt={14}>
            {rolling ? 'わくわくにゃ〜！' : 'どこから占う？にゃ'}
          </SpeechBubble>
        </div>
      </div>

      {/* 現在地 or 場所入力を選ぶ（赤×青の二重枠） */}
      {phase === 'choose' && (
        <div className="stack" style={{ gap: 10, width: '100%' }}>
          {runError && (
            <div className="ticket" style={{ padding: '12px 16px' }}>
              <p style={{ margin: 0, color: 'var(--red-deep)', fontSize: 14 }}>
                {runError}
              </p>
            </div>
          )}

          <div className="choice-frame stack" style={{ gap: 12 }}>
            {/* 現在地 */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                className="btn btn--sign"
                onClick={useCurrent}
                disabled={busy !== null}
              >
                {busy === 'current' ? '現在地を確認中…' : '現在地でまわす！'}
              </button>
            </div>

            <p className="muted center" style={{ margin: 0 }}>
              ── または ──
            </p>

            {locError && (
              <p
                className="muted center"
                style={{ margin: 0, color: 'var(--red-deep)' }}
              >
                {locError}
              </p>
            )}

            {/* 場所を入力 */}
            <input
              className="field"
              style={{ width: '100%' }}
              placeholder="駅名・地名（例：吉祥寺）"
              value={manual}
              onChange={(e) => setManual(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && useManual()}
            />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                className="btn btn--sign"
                onClick={useManual}
                disabled={busy !== null || !manual.trim()}
              >
                {busy === 'manual' ? '…' : 'この場所でまわす！'}
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button className="btn btn--ghost" onClick={onError}>
              ← チケットを書きなおす
            </button>
          </div>
        </div>
      )}

      {rolling && <p className="muted center">占っています…✨</p>}
    </div>
  )
}
