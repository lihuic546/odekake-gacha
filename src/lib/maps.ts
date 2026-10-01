import { Loader } from '@googlemaps/js-api-loader'

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined

export function hasApiKey(): boolean {
  return !!API_KEY && API_KEY.trim().length > 0
}

let loader: Loader | null = null
function getLoader(): Loader {
  if (!loader) {
    loader = new Loader({
      apiKey: API_KEY ?? '',
      version: 'weekly',
      language: 'ja',
      region: 'JP',
    })
  }
  return loader
}

// Places ライブラリを読み込む
export async function loadPlaces(): Promise<google.maps.PlacesLibrary> {
  return (await getLoader().importLibrary('places')) as google.maps.PlacesLibrary
}

const PLACE_FIELDS = [
  'id',
  'displayName',
  'formattedAddress',
  'location',
  'rating',
  'userRatingCount',
  'priceLevel',
  'regularOpeningHours',
  'photos',
  'primaryType',
  'primaryTypeDisplayName',
  'businessStatus',
]

export interface NearbyParams {
  center: { lat: number; lng: number }
  radius: number
  includedTypes: string[]
  maxResultCount?: number
}

// 近くのスポットを検索して Place[] を返す
export async function searchNearby(
  params: NearbyParams,
): Promise<google.maps.places.Place[]> {
  const { Place, SearchNearbyRankPreference } = await loadPlaces()
  const request: google.maps.places.SearchNearbyRequest = {
    fields: PLACE_FIELDS,
    locationRestriction: {
      center: params.center,
      radius: params.radius,
    },
    includedPrimaryTypes: params.includedTypes,
    maxResultCount: params.maxResultCount ?? 20,
    rankPreference: SearchNearbyRankPreference.POPULARITY,
    language: 'ja',
    region: 'jp',
  }
  const { places } = await Place.searchNearby(request)
  return places ?? []
}

// テキスト検索（自由記入「雨だから屋内がいい」等を活かす）
export async function searchText(params: {
  textQuery: string
  center: { lat: number; lng: number }
  radius: number
  maxResultCount?: number
}): Promise<google.maps.places.Place[]> {
  const { Place } = await loadPlaces()
  const { places } = await Place.searchByText({
    textQuery: params.textQuery,
    fields: PLACE_FIELDS,
    locationBias: {
      center: params.center,
      radius: params.radius,
    },
    maxResultCount: params.maxResultCount ?? 15,
    language: 'ja',
    region: 'jp',
  })
  return places ?? []
}
