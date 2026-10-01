import { useState } from 'react'
import type { CSSProperties } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Answers, Plan, Screen } from './types'
import { hasApiKey } from './lib/maps'
import { ILLUSTRATIONS } from './data/illustrations'
import TitleScreen from './components/screens/TitleScreen'
import SurveyScreen from './components/screens/SurveyScreen'
import GachaScreen from './components/screens/GachaScreen'
import PlanScreen from './components/screens/PlanScreen'
import SetupScreen from './components/screens/SetupScreen'
import AnnaijoBackdrop from './components/AnnaijoBackdrop'

export default function App() {
  const [screen, setScreen] = useState<Screen>(hasApiKey() ? 'title' : 'setup')
  const [answers, setAnswers] = useState<Answers | null>(null)
  const [plan, setPlan] = useState<Plan | null>(null)

  function startOver() {
    setAnswers(null)
    setPlan(null)
    setScreen('title')
  }

  return (
    <>
      {/* レトロ駅の案内所の背景（自作背景があればそちらを優先） */}
      {ILLUSTRATIONS.background ? (
        <div
          aria-hidden
          className="annaijo-bg annaijo-bg--photo"
          style={
            {
              '--bg-land': `url(${ILLUSTRATIONS.background})`,
              '--bg-port': `url(${
                ILLUSTRATIONS.backgroundPortrait ?? ILLUSTRATIONS.background
              })`,
            } as CSSProperties
          }
        />
      ) : (
        <AnnaijoBackdrop />
      )}

      <div className="stage">
        <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          className="stack"
          style={{ flex: 1 }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.32, ease: 'easeOut' }}
        >
          {screen === 'setup' && <SetupScreen />}

          {screen === 'title' && (
            <TitleScreen onStart={() => setScreen('survey')} />
          )}

          {screen === 'survey' && (
            <SurveyScreen
              onDone={(a) => {
                setAnswers(a)
                setScreen('gacha')
              }}
              onBack={() => setScreen('title')}
            />
          )}

          {screen === 'gacha' && answers && (
            <GachaScreen
              answers={answers}
              onReveal={(p) => {
                setPlan(p)
                setScreen('plan')
              }}
              onError={() => setScreen('survey')}
            />
          )}

          {screen === 'plan' && plan && (
            <PlanScreen
              plan={plan}
              onRetry={() => setScreen('gacha')}
              onHome={startOver}
            />
          )}
        </motion.div>
        </AnimatePresence>
      </div>
    </>
  )
}
