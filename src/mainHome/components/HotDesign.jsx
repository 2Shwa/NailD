import { useEffect, useRef, useState } from 'react'
import { ASSETS } from '../../appConfig'
import { designCards } from '../mainHomeData'
import DesignCard from './DesignCard'
import { createCarouselScroller } from '../createCarouselScroller'

function HotDesign({ title = 'Hot Design', actionLabel = '더 많은 디자인 구경하기', onBrowse }) {
  const listRef = useRef(null)
  const scrollerRef = useRef(null)
  const [edges, setEdges] = useState({ start: true, end: false })

  useEffect(() => {
    const list = listRef.current
    const getEnd = () => {
      const endPadding = parseFloat(getComputedStyle(list).paddingRight) || 0
      return Math.max(0, list.scrollWidth - list.clientWidth - endPadding)
    }
    const updateEdges = () => {
      const position = scrollerRef.current?.getTarget() ?? list.scrollLeft
      setEdges({ start: position <= 1, end: position >= getEnd() - 1 })
    }
    const scroller = createCarouselScroller(list, updateEdges, getEnd)
    scrollerRef.current = scroller
    const observer = new ResizeObserver(() => scroller.cancel())
    observer.observe(list)
    list.addEventListener('scroll', updateEdges, { passive: true })
    const cancel = () => scroller.cancel()
    const handleKeyDown = (event) => {
      if (['ArrowLeft', 'ArrowRight', 'Home', 'End', 'PageUp', 'PageDown'].includes(event.key)) cancel()
    }
    list.addEventListener('pointerdown', cancel)
    list.addEventListener('wheel', cancel, { passive: true })
    list.addEventListener('keydown', handleKeyDown)
    return () => {
      observer.disconnect()
      list.removeEventListener('scroll', updateEdges)
      list.removeEventListener('pointerdown', cancel)
      list.removeEventListener('wheel', cancel)
      list.removeEventListener('keydown', handleKeyDown)
      scrollerRef.current = null
      scroller.cancel()
    }
  }, [])

  const moveCards = (direction) => {
    const list = listRef.current
    const card = list.firstElementChild
    const step = card.getBoundingClientRect().width + parseFloat(getComputedStyle(list).columnGap)
    const count = Math.max(1, Math.floor(list.clientWidth / step))
    scrollerRef.current?.move(direction, step, count)
  }

  return (
    <section className="mh-showcase-section mh-hot-design">
      <div className="mh-section-title">
        <h2>{title}</h2>
      </div>
      <div className="mh-design-carousel">
        <button className="mh-carousel-arrow previous" type="button" aria-label="이전 디자인" disabled={edges.start} onClick={() => moveCards(-1)}>
          <span className="mh-carousel-arrow-icon" style={{ '--arrow-url': `url(${ASSETS.rightArrowIcon})` }} aria-hidden="true" />
        </button>
        <div ref={listRef} className="mh-design-list" role="region" aria-label={`${title} 슬라이드`} tabIndex={0}>
          {designCards.map((card) => (
            <DesignCard card={card} key={`${card.pattern}-${card.name}`} />
          ))}
        </div>
        <button className="mh-carousel-arrow next" type="button" aria-label="다음 디자인" disabled={edges.end} onClick={() => moveCards(1)}>
          <span className="mh-carousel-arrow-icon" style={{ '--arrow-url': `url(${ASSETS.rightArrowIcon})` }} aria-hidden="true" />
        </button>
      </div>
      {onBrowse && (
        <div className="mh-design-actions">
          <button className="mh-outline-button" type="button" onClick={onBrowse}>
            {actionLabel}
          </button>
        </div>
      )}
    </section>
  )
}

export default HotDesign
