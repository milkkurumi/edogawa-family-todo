export type NurseryType = '区立保育園' | '私立保育園' | '幼稚園' | '認定こども園' | '小規模保育'

export interface Nursery {
  id: string
  name: string
  type: NurseryType
  note?: string
  url?: string
}

export const NURSERIES: Nursery[] = [
  { id: 'kasai', name: '区立葛西保育園', type: '区立保育園', url: 'https://www.city.edogawa.tokyo.jp/' },
  { id: 'funabori', name: '区立船堀保育園', type: '区立保育園', url: 'https://www.city.edogawa.tokyo.jp/' },
  { id: 'koiwa', name: '区立小岩保育園', type: '区立保育園', url: 'https://www.city.edogawa.tokyo.jp/' },
  { id: 'komatsugawa', name: '区立小松川保育園', type: '区立保育園', url: 'https://www.city.edogawa.tokyo.jp/' },
  { id: 'hirai', name: '区立平井保育園', type: '区立保育園' },
]

export const searchNurseriesUrl = (nursery: Nursery): string => {
  if (nursery.url) return nursery.url
  return \https://www.google.com/search?q=江戸川区+\\
}
