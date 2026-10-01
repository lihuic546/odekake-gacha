import type { SpotResult } from '../types'

function priceLabel(level?: string | null): string {
  switch (level) {
    case 'FREE':
      return '無料'
    case 'INEXPENSIVE':
      return '〜1000円'
    case 'MODERATE':
      return '1000〜3000円'
    case 'EXPENSIVE':
      return '3000円〜'
    case 'VERY_EXPENSIVE':
      return 'ちょい贅沢'
    default:
      return '料金おまかせ'
  }
}

// 旅行タグ・チケット1枚
export default function PlanCard({ spot }: { spot: SpotResult }) {
  return (
    <div className="tag-ticket">
      <div className="tag-ticket__hole" />

      <div className="tag-ticket__body">
        <div className="tag-ticket__name">{spot.name}</div>
        <a
          className="tag-ticket__map"
          href={spot.mapsUrl}
          target="_blank"
          rel="noreferrer"
        >
          @ google map ↗
        </a>
        <div className="tag-ticket__type">
          ▷ {spot.typeLabel}
          {spot.rating ? `　★${spot.rating.toFixed(1)}` : ''}
        </div>
      </div>

      {spot.photoUrl ? (
        <div
          className="tag-ticket__photo"
          style={{ backgroundImage: `url(${spot.photoUrl})` }}
        />
      ) : (
        <div
          className="tag-ticket__photo"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 }}
        >
          🗺️
        </div>
      )}

      <div className="tag-ticket__stub">
        <span style={{ fontSize: 10, color: 'var(--ink-soft)' }}>予算</span>
        <span className="tag-ticket__price">{priceLabel(spot.priceLevel)}</span>
      </div>
    </div>
  )
}
