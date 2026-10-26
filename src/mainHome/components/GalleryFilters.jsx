import { styles, shapes, colors } from '../galleryData'

export default function GalleryFilters({ open, draft, onToggle, onReset, onApply }) {
  return (
    <div id="gallery-filters" className="gallery-filters" hidden={!open} role="group" aria-label="디자인 필터">
      <div className="gallery-filter-row" role="group" aria-labelledby="gallery-style-label">
        <strong id="gallery-style-label">스타일</strong>
        <div className="gallery-filter-options">{styles.map((style) => (
          <button key={style} type="button" aria-pressed={style === '전체' ? !draft.style.length : draft.style.includes(style)} onClick={() => onToggle('style', style)}>
            {style}
          </button>
        ))}</div>
      </div>
      <div className="gallery-filter-row" role="group" aria-labelledby="gallery-color-label">
        <strong id="gallery-color-label">컬러</strong>
        <div className="gallery-filter-options gallery-color-options">{colors.map((color) => (
          <button className="gallery-color-swatch" key={color.name} type="button" aria-label={color.name} aria-pressed={draft.color.includes(color.name)} style={{ '--swatch-color': color.hex }} onClick={() => onToggle('color', color.name)} />
        ))}</div>
      </div>
      <div className="gallery-filter-row" role="group" aria-labelledby="gallery-shape-label">
        <strong id="gallery-shape-label">모양</strong>
        <div className="gallery-filter-options">{shapes.map((shape) => (
          <button key={shape} type="button" aria-pressed={shape === '전체' ? !draft.shape.length : draft.shape.includes(shape)} onClick={() => onToggle('shape', shape)}>{shape}</button>
        ))}</div>
      </div>
      <div className="gallery-filter-footer">
        <button className="gallery-filter-reset" type="button" onClick={onReset}><span aria-hidden="true">⟳</span> 초기화</button>
        <button className="gallery-filter-apply" type="button" onClick={onApply}>적용하기</button>
      </div>
    </div>
  )
}
