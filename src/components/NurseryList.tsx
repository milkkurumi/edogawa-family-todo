import { useState } from 'react'
import { NURSERIES, mapUrl, searchUrl } from '../data/nurseries'
import type { Nursery } from '../data/nurseries'
import type { Settings } from '../types'

interface NurseryListProps {
  settings: Settings
  onUpdateSettings: (newSettings: Settings) => void
}

const TYPES: (any)[] = ['all', 'fav', '認可保育施設']
const LABEL: Record<string, string> = { all: 'すべて', fav: 'お気に入り' }

export function NurseryList({ settings, onUpdateSettings }: NurseryListProps) {
  const [filter, setFilter] = useState<(typeof TYPES)[number]>('all')
  const [searchText, setSearchText] = useState('')
  const [needZero, setNeedZero] = useState(false)
  const [needExtended, setNeedExtended] = useState(false)
  const [needYard, setNeedYard] = useState(false)
  const [needDiaper, setNeedDiaper] = useState(false)
  const [sortBy, setSortBy] = useState<'default' | 'capacity' | 'rating'>('default')

  const favorites = settings.nurseryFavorites || []
  const memos = settings.nurseryMemos || {}
  const custom = settings.customNurseries || []

  const toggleFavorite = (id: string) => {
    const next = favorites.includes(id) ? favorites.filter((f) => f !== id) : [...favorites, id]
    onUpdateSettings({ ...settings, nurseryFavorites: next })
  }

  const updateMemo = (id: string, text: string) => {
    onUpdateSettings({ ...settings, nurseryMemos: { ...memos, [id]: text } })
  }

  const addCustomNursery = () => {
    if (!searchText.trim()) return
    const newNursery: Nursery = {
      id: `custom-${Date.now()}`,
      name: searchText.trim(),
      type: '私立保育園'
    }
    onUpdateSettings({
      ...settings,
      customNurseries: [...custom, newNursery],
      nurseryFavorites: [...favorites, newNursery.id]
    })
    setSearchText('')
    setFilter('fav')
  }

  let allNurseries = [...NURSERIES, ...custom]

  // Filtering
  let list = allNurseries.filter((n) => {
    if (searchText && !n.name.includes(searchText)) return false
    if (needZero && n.acceptsZero === false) return false
    if (needExtended && n.extendedCare === false) return false
    if (needYard && n.hasYard === false) return false
    if (needDiaper && n.diaperDisposal === false) return false
    return filter === 'all' ? true : filter === 'fav' ? favorites.includes(n.id) : n.type === filter || n.type === '区立保育園'
  })

  // Sorting
  if (sortBy === 'capacity') {
    list.sort((a, b) => (b.capacity || 0) - (a.capacity || 0))
  } else if (sortBy === 'rating') {
    list.sort((a, b) => (b.rating || 0) - (a.rating || 0))
  }

  const isExactMatch = allNurseries.some(n => n.name === searchText.trim())

  const chip = (on: boolean) => ({
    padding: '0.4rem 0.8rem',
    borderRadius: '20px',
    border: '1px solid #ccc',
    background: on ? '#2b7055' : '#fff',
    color: on ? '#fff' : '#333',
    whiteSpace: 'nowrap' as const,
  })
  
  const toggleBtn = (on: boolean) => ({
    padding: '0.4rem 0.8rem', borderRadius: '4px', border: '1px solid #2b7055',
    background: on ? '#2b7055' : '#fff', color: on ? '#fff' : '#2b7055', fontSize: '0.9rem', cursor: 'pointer'
  })

  const renderComparisonTable = () => (
    <div style={{ overflowX: 'auto', marginTop: '1rem', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
        <thead>
          <tr style={{ background: '#e0f2e9', color: '#2b7055', textAlign: 'left' }}>
            <th style={{ padding: '0.8rem', borderBottom: '2px solid #2b7055' }}>保育園名 / 評価</th>
            <th style={{ padding: '0.8rem', borderBottom: '2px solid #2b7055' }}>基本データ</th>
            <th style={{ padding: '0.8rem', borderBottom: '2px solid #2b7055', width: '60px', textAlign: 'center' }}>見学</th>
            <th style={{ padding: '0.8rem', borderBottom: '2px solid #2b7055' }}>比較メモ</th>
            <th style={{ padding: '0.8rem', borderBottom: '2px solid #2b7055', width: '80px', textAlign: 'center' }}>操作</th>
          </tr>
        </thead>
        <tbody>
          {list.map(n => (
            <tr key={n.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '0.8rem', fontWeight: 'bold' }}>
                <a href={searchUrl(n)} target="_blank" rel="noreferrer" style={{ color: '#2b7055', textDecoration: 'none' }}>{n.name}</a>
                {n.rating !== undefined && (
                  <div style={{ marginTop: '0.3rem', fontSize: '0.8rem', color: '#f5b400' }}>
                    ★ {n.rating.toFixed(1)} <span style={{ color: '#666' }}>({n.reviewCount}件)</span>
                  </div>
                )}
              </td>
              <td style={{ padding: '0.8rem', fontSize: '0.8rem', color: '#666' }}>
                {n.capacity ? `定員: ${n.capacity}名` : ''}<br/>
                {n.acceptsZero !== undefined ? (n.acceptsZero ? '✅ 0歳可' : '❌ 0歳不可') : ''}<br/>
                {n.extendedCare !== undefined ? (n.extendedCare ? '✅ 延長有' : '❌ 延長無') : ''}<br/>
                {n.hasYard !== undefined ? (n.hasYard ? '🌳 園庭あり' : '🏢 園庭なし') : ''}<br/>
                {n.diaperDisposal !== undefined ? (n.diaperDisposal ? '🗑️ おむつ処理有' : '🎒 おむつ持帰り') : ''}
              </td>
              <td style={{ padding: '0.8rem', textAlign: 'center' }}>
                <input type="checkbox" style={{ transform: 'scale(1.5)', cursor: 'pointer' }} />
              </td>
              <td style={{ padding: '0.8rem' }}>
                <textarea
                  value={memos[n.id] || ''}
                  onChange={(e) => updateMemo(n.id, e.target.value)}
                  placeholder="延長保育の時間、おむつサブスク、家からの距離など..."
                  style={{ width: '100%', padding: '0.4rem', border: '1px solid #ddd', borderRadius: '4px', resize: 'vertical', minHeight: '60px' }}
                />
              </td>
              <td style={{ padding: '0.8rem', textAlign: 'center' }}>
                <button onClick={() => toggleFavorite(n.id)} style={{ background: 'none', border: 'none', color: '#f5b400', fontSize: '1.2rem', cursor: 'pointer' }}>★</button>
                <br/>
                <a href={mapUrl(n.name)} target="_blank" rel="noreferrer" style={{ fontSize: '1.2rem', textDecoration: 'none' }}>📍</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  return (
    <div style={{ paddingBottom: '80px' }}>
      <h2>江戸川区の保育施設データベース</h2>
      
      <div style={{ background: '#f5f8f6', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
        <div style={{ marginBottom: '0.8rem' }}>
          <input 
            type="text" 
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            placeholder="保育園名で検索..."
            style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc', fontSize: '1rem', boxSizing: 'border-box' }}
          />
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.9rem', fontWeight: 'bold', alignSelf: 'center', marginRight: '0.5rem' }}>絞り込み:</span>
          <button onClick={() => setNeedZero(!needZero)} style={toggleBtn(needZero)}>0歳児受け入れあり</button>
          <button onClick={() => setNeedExtended(!needExtended)} style={toggleBtn(needExtended)}>延長保育あり</button>
          <button onClick={() => setNeedYard(!needYard)} style={toggleBtn(needYard)}>園庭あり</button>
          <button onClick={() => setNeedDiaper(!needDiaper)} style={toggleBtn(needDiaper)}>おむつ処理（持帰不要）</button>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.9rem', fontWeight: 'bold', alignSelf: 'center', marginRight: '0.5rem' }}>並び替え:</span>
          <select value={sortBy} onChange={e => setSortBy(e.target.value as any)} style={{ padding: '0.4rem', borderRadius: '4px', border: '1px solid #ccc' }}>
            <option value="default">デフォルト（地域順）</option>
            <option value="capacity">定員が多い順</option>
            <option value="rating">口コミ評価順 (Google★)</option>
          </select>
        </div>
      </div>

      <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem', overflowX: 'auto' }}>
        {TYPES.map((t) => (
          <button key={t} onClick={() => setFilter(t)} style={chip(filter === t)}>
            {LABEL[t] ?? t}
            {t === 'fav' && favorites.length ? `(${favorites.length})` : ''}
          </button>
        ))}
      </div>

      {searchText.trim() && !isExactMatch && (
        <div style={{ marginBottom: '1rem', padding: '1rem', background: '#e0f2e9', borderRadius: '8px', textAlign: 'center' }}>
          <p style={{ margin: '0 0 0.5rem', color: '#2b7055' }}>お探しの園が見つかりませんか？</p>
          <button onClick={addCustomNursery} style={{ padding: '0.6rem 1rem', background: '#2b7055', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold' }}>
            「{searchText}」をリストに追加
          </button>
        </div>
      )}

      {list.length === 0 && <p className="empty">条件に一致する園がありません。</p>}

      {filter === 'fav' && list.length > 0 ? renderComparisonTable() : <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {filter !== 'fav' && list.map((n) => {
          const fav = favorites.includes(n.id)
          return (
            <div
              key={n.id}
              style={{
                border: '1px solid #eee',
                borderRadius: '10px',
                padding: '0.8rem 1rem',
                background: '#fff',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.8rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.72rem', background: '#e0f2e9', color: '#2b7055', padding: '2px 6px', borderRadius: '4px' }}>
                      {n.type}
                    </span>
                    {n.rating !== undefined && (
                      <span style={{ fontSize: '0.8rem', color: '#f5b400', fontWeight: 'bold' }}>
                        ★ {n.rating.toFixed(1)} <span style={{ color: '#666', fontWeight: 'normal' }}>({n.reviewCount})</span>
                      </span>
                    )}
                  </div>
                  <div style={{ margin: '0.4rem 0 0', fontWeight: 700 }}>{n.name}</div>
                  
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.4rem', fontSize: '0.75rem', color: '#555' }}>
                    {n.capacity && <span style={{ background: '#f0f0f0', padding: '2px 6px', borderRadius: '4px' }}>定員: {n.capacity}名</span>}
                    {n.acceptsZero !== undefined && <span style={{ background: n.acceptsZero ? '#e3f2fd' : '#ffebee', padding: '2px 6px', borderRadius: '4px' }}>{n.acceptsZero ? '0歳可' : '0歳不可'}</span>}
                    {n.extendedCare !== undefined && <span style={{ background: n.extendedCare ? '#e3f2fd' : '#ffebee', padding: '2px 6px', borderRadius: '4px' }}>{n.extendedCare ? '延長有' : '延長無'}</span>}
                    {n.hasYard !== undefined && <span style={{ background: n.hasYard ? '#e8f5e9' : '#f0f0f0', padding: '2px 6px', borderRadius: '4px' }}>{n.hasYard ? '🌳園庭あり' : '🏢園庭なし'}</span>}
                    {n.diaperDisposal !== undefined && <span style={{ background: n.diaperDisposal ? '#e8f5e9' : '#ffebee', padding: '2px 6px', borderRadius: '4px' }}>{n.diaperDisposal ? '🗑️おむつ処理有' : '🎒おむつ持帰り'}</span>}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                  <a href={searchUrl(n)} target="_blank" rel="noreferrer" title={n.url ? 'サイトへ' : 'Webで検索'} style={{ fontSize: '1.2rem', textDecoration: 'none' }}>
                    🔍
                  </a>
                  <a href={mapUrl(n.name)} target="_blank" rel="noreferrer" title="マップで検索" style={{ fontSize: '1.3rem', textDecoration: 'none' }}>
                    📍
                  </a>
                  <button
                    onClick={() => toggleFavorite(n.id)}
                    aria-label="お気に入り"
                    style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: fav ? '#f5b400' : '#ccc', padding: 0 }}
                  >
                    {fav ? '★' : '☆'}
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>}
    </div>
  )
}
