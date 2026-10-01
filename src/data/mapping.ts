import type { ActivityId, BudgetId, DistanceId } from '../types'

// ===== 何したい → Places の種別 =====
export const ACTIVITY_TYPES: Record<ActivityId, string[]> = {
  eat: ['restaurant', 'bakery', 'dessert_shop'],
  cafe: ['cafe'],
  shopping: ['shopping_mall', 'store', 'clothing_store'],
  nature: ['park', 'tourist_attraction'],
  art: ['museum', 'art_gallery'],
  fun: ['tourist_attraction', 'amusement_center', 'movie_theater', 'bowling_alley'],
  relax: ['spa'],
  any: ['cafe', 'restaurant', 'park', 'tourist_attraction', 'museum', 'shopping_mall'],
}

// 自由記入と一緒にテキスト検索するときのキーワード
export const ACTIVITY_WORD: Record<ActivityId, string> = {
  eat: 'ごはん',
  cafe: 'カフェ',
  shopping: '買い物',
  nature: '公園 自然',
  art: '美術館 アート',
  fun: '遊び',
  relax: '癒し スパ',
  any: 'おでかけ',
}

// ===== 距離 → 検索半径(m) =====
export const DISTANCE_RADIUS: Record<DistanceId, number> = {
  near: 900, // 近場で
  mid: 2500, // そこそこ
  far: 6000, // 遠出
}

// ===== 予算 → 許容する価格帯 =====
const PRICE_ORDER = ['FREE', 'INEXPENSIVE', 'MODERATE', 'EXPENSIVE', 'VERY_EXPENSIVE']

const BUDGET_MAX_INDEX: Record<BudgetId, number> = {
  u2000: 1, // 〜2000円
  u5000: 2, // 2000〜5000円
  over5000: 4, // 5000円〜
  any: 4,
}

export function withinBudget(
  priceLevel: string | null | undefined,
  budget: BudgetId,
): boolean {
  if (!priceLevel) return true
  const idx = PRICE_ORDER.indexOf(String(priceLevel))
  if (idx === -1) return true
  return idx <= BUDGET_MAX_INDEX[budget]
}

// ===== 種別 → 日本語ラベル =====
const TYPE_LABELS: Record<string, string> = {
  cafe: 'カフェ',
  restaurant: 'レストラン',
  bakery: 'ベーカリー',
  dessert_shop: 'スイーツ',
  park: '公園',
  tourist_attraction: '観光スポット',
  amusement_center: '遊び場',
  movie_theater: '映画館',
  bowling_alley: 'ボウリング',
  shopping_mall: 'ショッピング',
  store: 'お店',
  clothing_store: 'ファッション',
  museum: '博物館・美術館',
  art_gallery: 'ギャラリー',
  spa: '温浴・スパ',
  book_store: '本屋',
}

export function typeLabel(primaryType?: string, fallback?: string): string {
  if (primaryType && TYPE_LABELS[primaryType]) return TYPE_LABELS[primaryType]
  return fallback || 'おでかけ先'
}
