import { designCards } from './mainHomeData.js'

const categories = { checker: '체커', petal: '플라워', ribbon: '리본', pearl: '펄' }
export const styles = ['전체', '심플', '프렌치', '플라워', '리본', '글리터']
export const shapes = ['전체', '라운드', '스퀘어', '아몬드', '오벌']
export const colors = [
  { name: '라이트 핑크', hex: '#ffcddd' }, { name: '핑크', hex: '#ff70a0' },
  { name: '코랄', hex: '#ffb9a9' }, { name: '아이보리', hex: '#f8f0e2' },
  { name: '옐로', hex: '#ffe899' }, { name: '민트', hex: '#c9eddf' },
  { name: '블루', hex: '#c3e5fc' }, { name: '퍼플', hex: '#e0c7f2' },
  { name: '그레이', hex: '#c6c6c6' },
]
export const emptyFilters = { style: [], color: [], shape: [] }
const recentSearchKey = 'naild-gallery-recent-searches'
// Preview ranking until aggregated search statistics are available.
export const popularSearches = ['리본 네일', '체커 핑크', '프렌치', '플라워', '펄']
export const normalizeSearch = (value) => value.toLocaleLowerCase().replace(/[#\s]/g, '').replace(/네일/g, '')

export function readRecentSearches() {
  try {
    const saved = JSON.parse(localStorage.getItem(recentSearchKey) || '[]')
    return Array.isArray(saved) ? saved.filter((item) => typeof item === 'string' && item.trim()).slice(0, 5) : []
  } catch {
    return []
  }
}
export const galleryCards = [
  ...designCards,
  { name: '화이트 리본', author: '작성자 아이디', likes: '430', pattern: 'ribbon' },
  { name: '슈가 펄', author: '작성자 아이디', likes: '390', pattern: 'pearl' },
  { name: '모브 체커', author: '작성자 아이디', likes: '350', pattern: 'checker' },
  { name: '체리 블러썸', author: '작성자 아이디', likes: '310', pattern: 'petal' },
  { name: '핑크 새틴', author: '작성자 아이디', likes: '280', pattern: 'ribbon' },
  { name: '로지 펄', author: '작성자 아이디', likes: '240', pattern: 'pearl' },
].map((card, index) => ({
  ...card, id: index, tags: ['핑크', categories[card.pattern]],
  styles: { checker: ['심플'], petal: ['플라워'], ribbon: ['리본', '프렌치'], pearl: ['글리터'] }[card.pattern],
  color: '핑크', shape: shapes[1 + index % 4],
}))

export function popularity(card) {
  return parseFloat(card.likes) * (card.likes.endsWith('k') ? 1000 : 1)
}


export function saveRecentSearches(items) {
  localStorage.setItem(recentSearchKey, JSON.stringify(items))
}
