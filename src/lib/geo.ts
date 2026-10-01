import type { Origin } from '../types'
import { loadPlaces } from './maps'

// 現在地を取得（ブラウザの位置情報）
export function getCurrentPosition(): Promise<Origin> {
  return new Promise((resolve, reject) => {
    if (!('geolocation' in navigator)) {
      reject(new Error('この端末では位置情報が使えないみたい'))
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        resolve({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          label: '現在地',
        }),
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          reject(new Error('位置情報が許可されなかったにゃ'))
        } else {
          reject(new Error('現在地がうまく取れなかったにゃ'))
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    )
  })
}

// 駅名・地名から座標を得る（フォールバック）
// Geocoding API を使わず Places の searchByText で解決する
// （有効化するAPIを Maps JS + Places (New) だけに保つため）
export async function geocodeArea(query: string): Promise<Origin> {
  const { Place } = await loadPlaces()
  const { places } = await Place.searchByText({
    textQuery: query,
    fields: ['location', 'displayName', 'formattedAddress'],
    maxResultCount: 1,
    language: 'ja',
    region: 'jp',
  })
  if (!places || places.length === 0) {
    throw new Error('その場所が見つからなかったにゃ')
  }
  const loc = places[0].location
  if (!loc) {
    throw new Error('その場所の座標が取れなかったにゃ')
  }
  return {
    lat: loc.lat(),
    lng: loc.lng(),
    label: query.trim(),
  }
}
