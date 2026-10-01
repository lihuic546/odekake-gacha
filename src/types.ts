// ===== アンケートの回答（ガチャチケット） =====
export type PeopleId = 'solo' | 'two' | 'group' | 'any'
export type ActivityId =
  | 'eat'
  | 'cafe'
  | 'shopping'
  | 'nature'
  | 'art'
  | 'fun'
  | 'relax'
  | 'any'
export type BudgetId = 'u2000' | 'u5000' | 'over5000' | 'any'
export type DistanceId = 'near' | 'mid' | 'far'
export type TimeId = 'morning' | 'noon' | 'afternoon' | 'night' | 'any'

export interface Answers {
  people: PeopleId // 何人で？（単一）
  activity: ActivityId[] // 何したい？（複数）
  budget: BudgetId // 予算は？（単一）
  distance: DistanceId // 距離は？（単一）
  time: TimeId[] // 時間帯は？（複数）
  note: string // その他（自由記入）
}

// ===== 位置の起点 =====
export interface Origin {
  lat: number
  lng: number
  label: string
}

// ===== 抽選されたスポット（旅行チケット1枚） =====
export interface SpotResult {
  id: string
  name: string
  address?: string
  rating?: number
  userRatingCount?: number
  priceLevel?: string | null
  photoUrl?: string
  mapsUrl: string
  primaryType?: string
  typeLabel: string
  lat: number
  lng: number
}

// ===== 本日のプラン（複数スポットの旅程） =====
export interface Plan {
  spots: SpotResult[]
  origin: Origin
  answers: Answers
  rainoLine: string
  nyankoLine: string
}

// ===== 画面ステート =====
export type Screen = 'title' | 'survey' | 'gacha' | 'plan' | 'setup'
