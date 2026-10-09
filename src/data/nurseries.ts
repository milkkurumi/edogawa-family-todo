export type NurseryType = '区立保育園' | '私立保育園' | '幼稚園' | '認定こども園' | '小規模保育'

export interface Nursery {
  id: string
  name: string
  type: NurseryType
  note?: string
  url?: string
}

export const NURSERIES: Nursery[] = [
  { id: 'kasai', name: '区立葛西保育園', type: '区立保育園' },
  { id: 'funabori', name: '区立船堀保育園', type: '区立保育園' },
  { id: 'koiwa', name: '区立小岩保育園', type: '区立保育園' },
  { id: 'komatsugawa', name: '区立小松川保育園', type: '区立保育園' },
  { id: 'hirai', name: '区立平井保育園', type: '区立保育園' },
  { id: 'mizue', name: '区立瑞江保育園', type: '区立保育園' },
  { id: 'harue', name: '区立春江保育園', type: '区立保育園' },
  { id: 'ichinoe', name: '区立一之江保育園', type: '区立保育園' },
  { id: 'shinozaki', name: '区立篠崎保育園', type: '区立保育園' },
  { id: 'shishibone', name: '区立鹿骨保育園', type: '区立保育園' },
  { id: 'minamikoiwa', name: '区立南小岩保育園', type: '区立保育園' },
  { id: 'nishikasai', name: '区立西葛西保育園', type: '区立保育園' },
  { id: 'nakakasai', name: '区立中葛西保育園', type: '区立保育園' },
  { id: 'minamikasai', name: '区立南葛西保育園', type: '区立保育園' },
  { id: 'higashikasai', name: '区立東葛西保育園', type: '区立保育園' },
  { id: 'seishincho', name: '区立清新町保育園', type: '区立保育園' },
  { id: 'rinkaicho', name: '区立臨海町保育園', type: '区立保育園' },
  { id: 'matsue', name: '区立松江保育園', type: '区立保育園' },
  { id: 'osugi', name: '区立大杉保育園', type: '区立保育園' },
  { id: 'chuo', name: '区立中央保育園', type: '区立保育園' },
]

export const searchNurseriesUrl = (nursery: Nursery): string => {
  if (nursery.url) return nursery.url
  return \https://www.google.com/search?q=江戸川区+\\
}
