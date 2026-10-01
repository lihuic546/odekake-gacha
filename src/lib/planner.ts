import type { Answers, Origin, Plan, SpotResult } from '../types'
import {
  ACTIVITY_TYPES,
  ACTIVITY_WORD,
  DISTANCE_RADIUS,
  typeLabel,
  withinBudget,
} from '../data/mapping'
import { searchNearby, searchText } from './maps'

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// 2点間のおおよその距離(m)
export function distanceMeters(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
): number {
  const R = 6371000
  const dLat = ((b.lat - a.lat) * Math.PI) / 180
  const dLng = ((b.lng - a.lng) * Math.PI) / 180
  const la1 = (a.lat * Math.PI) / 180
  const la2 = (b.lat * Math.PI) / 180
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(la1) * Math.cos(la2) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(h))
}

function toSpot(place: google.maps.places.Place): SpotResult {
  const name = place.displayName ?? '名もなきスポット'
  const photoUrl = place.photos?.[0]?.getURI({ maxWidth: 800 }) ?? undefined
  const typeDisp = place.primaryTypeDisplayName ?? undefined
  const loc = place.location
  return {
    id: place.id,
    name,
    address: place.formattedAddress ?? undefined,
    rating: place.rating ?? undefined,
    userRatingCount: place.userRatingCount ?? undefined,
    priceLevel: place.priceLevel ?? null,
    photoUrl,
    primaryType: place.primaryType ?? undefined,
    typeLabel: typeLabel(place.primaryType ?? undefined, typeDisp),
    lat: loc ? loc.lat() : 0,
    lng: loc ? loc.lng() : 0,
    mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      name,
    )}&query_place_id=${place.id}`,
  }
}

const RAINO_LINES = [
  '今日のルート、こんな感じでどうかな。',
  'このコースで回れば、いい一日になりそう。',
  '案内所おすすめの旅程を組んでみたよ。',
]
const NYANKO_LINES = [
  'わくわくにゃ〜！いい旅になりそうにゃ♪',
  'このルート、当たりの予感にゃ！',
  'ぬいの勘、今日も冴えてるにゃ。',
]

export async function buildPlan(answers: Answers, origin: Origin): Promise<Plan> {
  const center = { lat: origin.lat, lng: origin.lng }
  const radius = DISTANCE_RADIUS[answers.distance]
  const note = answers.note.trim()

  // 何したい（複数）→ 種別/キーワードを合成。未選択 or 決めてない は broad
  const acts = answers.activity.filter((a) => a !== 'any')
  const types = acts.length
    ? [...new Set(acts.flatMap((a) => ACTIVITY_TYPES[a]))]
    : ACTIVITY_TYPES.any
  const word = acts.length
    ? acts.map((a) => ACTIVITY_WORD[a]).join(' ')
    : ACTIVITY_WORD.any

  // 自由記入があればテキスト検索（例:「雨だから屋内がいい」を反映）、無ければ種別検索
  let places: google.maps.places.Place[]
  if (note) {
    const query = `${word} ${note}`.trim()
    places = await searchText({ textQuery: query, center, radius })
  } else {
    places = await searchNearby({
      center,
      radius,
      includedTypes: shuffle(types).slice(0, 5),
    })
  }

  const byBudget = places.filter((p) => withinBudget(p.priceLevel, answers.budget))
  const pool = shuffle(byBudget.length ? byBudget : places)
  if (pool.length === 0) {
    throw new Error(
      'この条件だとスポットが見つからなかったにゃ。条件をゆるめてもう一回！',
    )
  }

  // 旅程は最大3スポット。起点から近い順に並べて自然なルートにする
  const spots = pool.slice(0, 3).map(toSpot)
  spots.sort((a, b) => distanceMeters(origin, a) - distanceMeters(origin, b))

  return {
    spots,
    origin,
    answers,
    rainoLine: pick(RAINO_LINES),
    nyankoLine: pick(NYANKO_LINES),
  }
}
