import type {
  ActivityId,
  BudgetId,
  DistanceId,
  PeopleId,
  TimeId,
} from '../types'

export interface Choice<T extends string> {
  id: T
  label: string
}

// 何人で？（単一選択）
export const PEOPLE: Choice<PeopleId>[] = [
  { id: 'solo', label: '1人' },
  { id: 'two', label: '2人' },
  { id: 'group', label: '3人〜' },
]

// 何したい？（複数選択）
export const ACTIVITY: Choice<ActivityId>[] = [
  { id: 'eat', label: 'たべる' },
  { id: 'cafe', label: 'カフェ' },
  { id: 'shopping', label: '買い物' },
  { id: 'nature', label: '自然・公園' },
  { id: 'art', label: 'アート' },
  { id: 'fun', label: 'エンタメ' },
  { id: 'relax', label: '癒し' },
]

// 予算は？（単一選択）
export const BUDGET: Choice<BudgetId>[] = [
  { id: 'u2000', label: '〜2000円' },
  { id: 'u5000', label: '2000〜5000円' },
  { id: 'over5000', label: '5000円〜' },
]

// 距離は？（単一選択）
export const DISTANCE: Choice<DistanceId>[] = [
  { id: 'near', label: '近場で' },
  { id: 'mid', label: 'そこそこ' },
  { id: 'far', label: '遠出' },
]

// 時間帯は？（複数選択）
export const TIME: Choice<TimeId>[] = [
  { id: 'morning', label: '朝' },
  { id: 'noon', label: '昼' },
  { id: 'afternoon', label: '午後' },
  { id: 'night', label: '夜' },
]
