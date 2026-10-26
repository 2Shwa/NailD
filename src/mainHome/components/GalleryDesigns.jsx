import { useState } from 'react'
import { emptyFilters } from '../galleryData'
import { getGalleryResults, toggleFilterSelection } from '../galleryLogic'
import GallerySearch from './GallerySearch'
import GallerySort from './GallerySort'
import GalleryFilters from './GalleryFilters'
import Icon from './GalleryIcon'
import { navigateToPage } from '../pageRouting'
import DesignCard from './DesignCard'
import './GalleryDesigns.css'

const PAGE_SIZE = 16

export default function GalleryDesigns() {
  const [appliedQuery, setAppliedQuery] = useState('')
  const [searchResetKey, setSearchResetKey] = useState(0)
  const [filters, setFilters] = useState(emptyFilters)
  const [draft, setDraft] = useState(emptyFilters)
  const [sort, setSort] = useState('latest')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [page, setPage] = useState(1)
  const results = getGalleryResults(appliedQuery, filters, sort)
  const pageCount = Math.max(1, Math.ceil(results.length / PAGE_SIZE))
  const currentPage = Math.min(page, pageCount)
  const reset = () => {
    setAppliedQuery('')
    setSearchResetKey((key) => key + 1)
    setFilters(emptyFilters)
    setDraft(emptyFilters)
    setPage(1)
  }
  const applySearch = (query) => {
    setAppliedQuery(query)
    setPage(1)
  }
  const toggleFilters = () => {
    if (!filtersOpen) setDraft(filters)
    setFiltersOpen(!filtersOpen)
  }
  const toggleFilterOption = (group, value) => {
    setDraft((previous) => toggleFilterSelection(previous, group, value))
  }

  return (
    <section className="gallery-designs" aria-labelledby="gallery-design-title">
      <div className="mh-section-title"><h2 id="gallery-design-title">Design</h2></div>
      <div className="gallery-toolbar">
        <button type="button" className={`gallery-filter-button ${filtersOpen ? 'is-active' : ''}`} aria-expanded={filtersOpen} aria-controls="gallery-filters" onClick={toggleFilters}>
          <img className="gallery-filter-icon" src="/Icon/Filter.svg" alt="" /> 필터
          <span className={`gallery-filter-chevron ${filtersOpen ? 'is-open' : ''}`} aria-hidden="true" />
        </button>
        <GallerySort sort={sort} onChange={(value) => { setSort(value); setPage(1) }} />
        <GallerySearch key={searchResetKey} appliedQuery={appliedQuery} onSearch={applySearch} />
        <button type="button" className="gallery-upload" onClick={() => navigateToPage('Design')}><Icon type="upload" />내 디자인 올리기</button>
      </div>
      <GalleryFilters
        open={filtersOpen}
        draft={draft}
        onToggle={toggleFilterOption}
        onReset={() => setDraft(emptyFilters)}
        onApply={() => {
          setFilters(draft)
          setPage(1)
          setFiltersOpen(false)
        }}
      />
      <span className="gallery-sr-only" role="status">검색 결과 {results.length}개, {currentPage}페이지</span>
      {results.length ? (
        <div className="gallery-grid">
          {results.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE).map((card) => <DesignCard key={card.id} card={card} />)}
        </div>
      ) : (
        <div className="gallery-empty"><p>검색 조건에 맞는 디자인이 없어요.</p><button type="button" onClick={reset}>검색 조건 초기화</button></div>
      )}
      {results.length > 0 && <nav className="gallery-pagination" aria-label="디자인 페이지">
        <button type="button" aria-label="이전 페이지" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}>‹</button>
        {Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => <button key={number} type="button" aria-current={number === currentPage ? 'page' : undefined} onClick={() => setPage(number)}>{number}</button>)}
        <button type="button" aria-label="다음 페이지" disabled={currentPage === pageCount} onClick={() => setPage(currentPage + 1)}>›</button>
      </nav>}
    </section>
  )
}
