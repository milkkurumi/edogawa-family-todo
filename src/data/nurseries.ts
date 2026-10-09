export type NurseryType = '区立保育園' | '私立保育園' | '幼稚園' | '認定こども園' | '小規模保育'

export interface Nursery {
  id: string
  name: string
  type: NurseryType
  note?: string
  url?: string
}

export const NURSERIES: Nursery[] = [
  { id: 'n0', name: '葛西保育園', type: '区立保育園' },
  { id: 'n1', name: '船堀保育園', type: '区立保育園' },
  { id: 'n2', name: '小岩保育園', type: '区立保育園' },
  { id: 'n3', name: '小松川保育園', type: '区立保育園' },
  { id: 'n4', name: '平井保育園', type: '区立保育園' },
  { id: 'n5', name: '瑞江保育園', type: '区立保育園' },
  { id: 'n6', name: '春江保育園', type: '区立保育園' },
  { id: 'n7', name: '一之江保育園', type: '区立保育園' },
  { id: 'n8', name: '篠崎保育園', type: '区立保育園' },
  { id: 'n9', name: '鹿骨保育園', type: '区立保育園' },
  { id: 'n10', name: '南小岩保育園', type: '区立保育園' },
  { id: 'n11', name: '西葛西保育園', type: '区立保育園' },
  { id: 'n12', name: '中葛西保育園', type: '区立保育園' },
  { id: 'n13', name: '南葛西保育園', type: '区立保育園' },
  { id: 'n14', name: '東葛西保育園', type: '区立保育園' },
  { id: 'n15', name: '清新町保育園', type: '区立保育園' },
  { id: 'n16', name: '臨海町保育園', type: '区立保育園' },
  { id: 'n17', name: '松江保育園', type: '区立保育園' },
  { id: 'n18', name: '大杉保育園', type: '区立保育園' },
  { id: 'n19', name: '中央保育園', type: '区立保育園' },
  { id: 'n20', name: '北小岩保育園', type: '区立保育園' },
  { id: 'n21', name: '東小岩保育園', type: '区立保育園' },
  { id: 'n22', name: '西小岩保育園', type: '区立保育園' },
  { id: 'n23', name: '上篠崎保育園', type: '区立保育園' },
  { id: 'n24', name: '下篠崎保育園', type: '区立保育園' },
  { id: 'n25', name: '松本保育園', type: '区立保育園' },
  { id: 'n26', name: '興宮保育園', type: '区立保育園' },
  { id: 'n27', name: '本一色保育園', type: '区立保育園' },
  { id: 'n28', name: '宇喜田保育園', type: '区立保育園' },
  { id: 'n29', name: '二之江保育園', type: '区立保育園' },
  { id: 'n30', name: '新堀保育園', type: '区立保育園' },
  { id: 'n31', name: '谷河内保育園', type: '区立保育園' },
  { id: 'n32', name: '江戸川保育園', type: '区立保育園' },
  { id: 'n33', name: '松島保育園', type: '区立保育園' },
  { id: 'n34', name: '東松本保育園', type: '区立保育園' },
  { id: 'n35', name: '東小松川保育園', type: '区立保育園' },
  { id: 'n36', name: '西小松川保育園', type: '区立保育園' },
  { id: 'n37', name: '東瑞江保育園', type: '区立保育園' },
  { id: 'n38', name: '西瑞江保育園', type: '区立保育園' },
  { id: 'n39', name: '南篠崎保育園', type: '区立保育園' },
  { id: 'n40', name: '仲町保育園', type: '区立保育園' },
  { id: 'n41', name: '清新第一保育園', type: '区立保育園' },
  { id: 'n42', name: '清新第二保育園', type: '区立保育園' },
  { id: 'n43', name: '臨海第一保育園', type: '区立保育園' },
  { id: 'n44', name: '臨海第二保育園', type: '区立保育園' },
  { id: 'n45', name: '葛西第二保育園', type: '区立保育園' },
  { id: 'n46', name: '船堀第二保育園', type: '区立保育園' },
  { id: 'n47', name: '平井第二保育園', type: '区立保育園' },
  { id: 'n48', name: '小岩第二保育園', type: '区立保育園' },
  { id: 'n49', name: '春江第二保育園', type: '区立保育園' },
  { id: 'n50', name: 'まどか保育園', type: '区立保育園' },
  { id: 'n51', name: 'ひまわり保育園', type: '区立保育園' },
  { id: 'n52', name: 'たんぽぽ保育園', type: '区立保育園' },
  { id: 'n53', name: 'さくら保育園', type: '区立保育園' },
  { id: 'n54', name: 'わかば保育園', type: '区立保育園' },
  { id: 'n55', name: 'すずらん保育園', type: '区立保育園' },
  { id: 'n56', name: 'ちゅうりっぷ保育園', type: '区立保育園' },
  { id: 'n57', name: 'ゆりかご保育園', type: '区立保育園' },
  { id: 'n58', name: 'あおぞら保育園', type: '区立保育園' },
  { id: 'n59', name: 'にじいろ保育園', type: '区立保育園' },
  { id: 'n60', name: 'きらきら保育園', type: '区立保育園' },
  { id: 'n61', name: 'ぽけっと保育園', type: '区立保育園' },
  { id: 'n62', name: 'どんぐり保育園', type: '区立保育園' },
  { id: 'n63', name: 'くるみ保育園', type: '区立保育園' },
  { id: 'n64', name: 'のぞみ保育園', type: '区立保育園' },
  { id: 'n65', name: 'ひかり保育園', type: '区立保育園' },
  { id: 'n66', name: 'めばえ保育園', type: '区立保育園' },
  { id: 'n67', name: 'ふたば保育園', type: '区立保育園' },
  { id: 'n68', name: 'つばさ保育園', type: '区立保育園' },
  { id: 'n69', name: 'みなみ保育園', type: '区立保育園' },
  { id: 'n70', name: 'きた保育園', type: '区立保育園' },
  { id: 'n71', name: 'ひがし保育園', type: '区立保育園' },
  { id: 'n72', name: 'にし保育園', type: '区立保育園' },
  { id: 'n73', name: '中央第二保育園', type: '区立保育園' },
  { id: 'n74', name: '松江第二保育園', type: '区立保育園' },
  { id: 'n75', name: '大杉第二保育園', type: '区立保育園' },
  { id: 'n76', name: '鹿骨第二保育園', type: '区立保育園' },
  { id: 'n77', name: '一之江第二保育園', type: '区立保育園' },
  { id: 'n78', name: '瑞江第二保育園', type: '区立保育園' },
  { id: 'n79', name: '篠崎第二保育園', type: '区立保育園' },
]

export const searchNurseriesUrl = (nursery: Nursery): string => {
  if (nursery.url) return nursery.url
  return `https://www.google.com/search?q=江戸川区+${encodeURIComponent(nursery.name)}`
}

export const mapUrl = (name: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + ' 江戸川区')}`
export const searchUrl = (nursery: Nursery) => `https://www.google.com/search?q=${encodeURIComponent(nursery.name + ' 江戸川区')}`
