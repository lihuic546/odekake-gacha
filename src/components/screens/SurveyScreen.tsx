import { useState } from 'react'
import { motion } from 'framer-motion'
import type {
  Answers,
  ActivityId,
  BudgetId,
  DistanceId,
  PeopleId,
  TimeId,
} from '../../types'
import { ACTIVITY, BUDGET, DISTANCE, PEOPLE, TIME } from '../../data/questions'
import type { Choice } from '../../data/questions'

interface Props {
  onDone: (a: Answers) => void
  onBack: () => void
}

function ChipRow<T extends string>({
  choices,
  selected,
  onPick,
  square,
}: {
  choices: Choice<T>[]
  selected: (id: T) => boolean
  onPick: (id: T) => void
  square?: boolean // 複数選択：四角め＆選択で青
}) {
  return (
    <div className="chips">
      {choices.map((c) => (
        <button
          key={c.id}
          className={`chip ${square ? 'chip--sq' : ''}`}
          data-selected={selected(c.id)}
          onClick={() => onPick(c.id)}
        >
          {c.label}
        </button>
      ))}
    </div>
  )
}

// 複数選択のトグル
function toggle<T>(arr: T[], id: T): T[] {
  return arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id]
}

export default function SurveyScreen({ onDone, onBack }: Props) {
  const [people, setPeople] = useState<PeopleId | null>(null)
  const [activity, setActivity] = useState<ActivityId[]>([])
  const [budget, setBudget] = useState<BudgetId | null>(null)
  const [distance, setDistance] = useState<DistanceId | null>(null)
  const [time, setTime] = useState<TimeId[]>([])
  const [note, setNote] = useState('')

  // 未選択の項目はスキップ（それっぽいデフォルト）で回す
  function spin() {
    onDone({
      people: people ?? 'any',
      activity,
      budget: budget ?? 'any',
      distance: distance ?? 'mid',
      time,
      note,
    })
  }

  return (
    <div className="stack survey" style={{ flex: 1, gap: 10 }}>
      <p className="muted center" style={{ margin: '2px 0 -2px' }}>
        お出かけ
      </p>

      <motion.div
        className="gticket"
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      >
        <div className="stripe-bar" style={{ marginBottom: 12 }} />

        <div className="banner" style={{ marginBottom: 8 }}>
          ガチャチケット
        </div>

        <p
          className="muted center"
          style={{ margin: '0 0 4px', fontSize: 13 }}
        >
          決まってない項目はスキップOK！
        </p>

        <div className="qlabel">何人で？</div>
        <ChipRow
          choices={PEOPLE}
          selected={(id) => people === id}
          onPick={setPeople}
        />

        <div className="qlabel">何したい？（複数OK）</div>
        <ChipRow
          choices={ACTIVITY}
          selected={(id) => activity.includes(id)}
          onPick={(id) => setActivity((a) => toggle(a, id))}
          square
        />

        <div className="qlabel">予算は？</div>
        <ChipRow
          choices={BUDGET}
          selected={(id) => budget === id}
          onPick={setBudget}
        />

        <div className="qlabel">距離は？</div>
        <ChipRow
          choices={DISTANCE}
          selected={(id) => distance === id}
          onPick={setDistance}
        />

        <div className="qlabel">時間帯は？（複数OK）</div>
        <ChipRow
          choices={TIME}
          selected={(id) => time.includes(id)}
          onPick={(id) => setTime((t) => toggle(t, id))}
          square
        />

        <div className="qlabel">その他</div>
        <input
          className="field"
          placeholder="例：雨だから屋内がいい"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <motion.button
            className="btn btn--sign"
            onClick={spin}
            whileTap={{ scale: 0.96 }}
            style={{ fontSize: 18 }}
          >
            つぎへ！
          </motion.button>
        </div>
      </motion.div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          className="btn btn--ghost"
          style={{ padding: '10px 28px', fontSize: 15 }}
          onClick={onBack}
        >
          ← もどる
        </button>
      </div>
    </div>
  )
}
