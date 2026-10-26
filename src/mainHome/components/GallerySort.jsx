export default function GallerySort({ sort, onChange }) {
  return (
    <details className="gallery-sort" onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) event.currentTarget.open = false
    }} onKeyDown={(event) => {
      if (event.key === 'Escape') {
        event.currentTarget.open = false
        event.currentTarget.querySelector('summary').focus()
      }
    }}>
      <summary aria-label={`디자인 정렬: ${sort === 'latest' ? '최신순' : '인기순'}`}>
        {sort === 'latest' ? '최신순' : '인기순'}
        <span className="gallery-sort-icon" aria-hidden="true" />
      </summary>
      <div className="gallery-sort-options" role="group" aria-label="디자인 정렬">
        {[['latest', '최신순'], ['popular', '인기순']].map(([value, label]) => (
          <button key={value} type="button" aria-pressed={sort === value} onClick={(event) => {
            onChange(value)
            const dropdown = event.currentTarget.closest('details')
            dropdown.open = false
            dropdown.querySelector('summary').focus()
          }}>
            {label}{sort === value && <span aria-hidden="true">✓</span>}
          </button>
        ))}
      </div>
    </details>
  )
}
