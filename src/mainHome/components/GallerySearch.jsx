import { useEffect, useRef, useState } from 'react'
import { popularSearches, readRecentSearches, saveRecentSearches } from '../galleryData'
import Icon from './GalleryIcon'
import { getRelatedSearches } from '../galleryLogic'

export default function GallerySearch({ appliedQuery, onSearch }) {
  const [query, setQuery] = useState(appliedQuery)
  const [searchOpen, setSearchOpen] = useState(false)
  const [recentSearches, setRecentSearches] = useState(readRecentSearches)
  const searchRef = useRef(null)
  useEffect(() => {
    const closeSearch = (event) => {
      if (!searchRef.current?.contains(event.target)) setSearchOpen(false)
    }
    document.addEventListener('pointerdown', closeSearch)
    return () => document.removeEventListener('pointerdown', closeSearch)
  }, [])
  const updateRecentSearches = (items) => {
    setRecentSearches(items)
    try { saveRecentSearches(items) } catch { /* Search works when storage is unavailable. */ }
  }
  const runSearch = (value) => {
    const term = value.trim().replace(/^#/, '')
    setQuery(term)
    onSearch(term)
    if (term) updateRecentSearches([term, ...recentSearches.filter((item) => item !== term)].slice(0, 5))
    setSearchOpen(false)
  }
  const relatedSearches = getRelatedSearches(query, recentSearches)
  const suggestionsVisible = searchOpen && (!query.trim() || relatedSearches.length > 0)
  return (
    <div className="gallery-search-container" ref={searchRef} onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setSearchOpen(false)
    }} onKeyDown={(event) => {
      if (event.key === 'Escape') {
        searchRef.current.querySelector('input').focus()
        setSearchOpen(false)
      }
    }}>
      <form className={`gallery-search ${searchOpen ? 'is-open' : ''}`} role="search" onSubmit={(event) => { event.preventDefault(); runSearch(query) }}>
        <button className="gallery-search-submit" type="submit" aria-label="디자인 검색"><Icon type="search" /></button>
        <input type="search" aria-label="디자인 이름, 태그, 작성자 검색" aria-expanded={suggestionsVisible} aria-controls="gallery-search-suggestions" placeholder="디자인 이름, 태그, 작성자 검색" value={query} onFocus={() => setSearchOpen(true)} onClick={() => setSearchOpen(true)} onChange={(event) => { setQuery(event.target.value); setSearchOpen(true) }} onKeyDown={(event) => {
          if (event.key === 'Enter' && (event.nativeEvent.isComposing || event.keyCode === 229)) event.preventDefault()
        }} />
        {query && <button className="gallery-search-clear" type="button" aria-label="검색어 지우기" onClick={() => {
          setQuery('')
          onSearch('')
          searchRef.current.querySelector('input').focus()
        }}>×</button>}
      </form>
      {suggestionsVisible && <div id="gallery-search-suggestions" className="gallery-search-suggestions">
        {query.trim() ? <div className="gallery-related-searches">
          <h3>연관 검색어</h3>
          <ul className="gallery-related-list">
            {relatedSearches.map((term) => <li key={term}>
              <button type="button" onClick={() => runSearch(term)}>
                <Icon type="search" /><span>{term}</span><span className="gallery-related-arrow" aria-hidden="true">↗</span>
              </button>
            </li>)}
          </ul>
        </div> : <>
        {recentSearches.length > 0 && <>
        <div className="gallery-recent-heading"><h3>최근 검색어</h3><button type="button" onClick={() => updateRecentSearches([])}>전체 삭제</button></div>
        <ul className="gallery-recent-list">
          {recentSearches.map((term) => <li key={term}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><circle cx="12" cy="12" r="8" /><path d="M12 7v5l3 2" /></svg>
            <button className="gallery-recent-term" type="button" onClick={() => runSearch(term)}>{term}</button>
            <button className="gallery-recent-delete" type="button" aria-label={`${term} 검색어 삭제`} onClick={() => updateRecentSearches(recentSearches.filter((item) => item !== term))}>×</button>
          </li>)}
        </ul>
        </>}
        <div className={`gallery-popular ${recentSearches.length === 0 ? 'without-recent' : ''}`}>
          <div className="gallery-popular-heading"><h3>인기 검색어</h3><span>샘플 순위</span></div>
          <ol className="gallery-popular-list">
            {popularSearches.map((term, index) => <li key={term}>
              <button type="button" onClick={() => runSearch(term)}><span className="gallery-popular-rank">{index + 1}</span><span>{term}</span></button>
            </li>)}
          </ol>
        </div>
        <div className="gallery-recommended"><h3>추천 태그</h3>
          <div>{['심플네일', '리본', '프렌치'].map((tag) => <button key={tag} type="button" onClick={() => runSearch(tag === '심플네일' ? '심플 네일' : tag)}>#{tag}</button>)}</div>
        </div>
        </>}
      </div>}
    </div>
  )
}
