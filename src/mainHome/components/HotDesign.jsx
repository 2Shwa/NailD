import { useEffect, useRef, useState } from 'react'
import { ASSETS } from '../../appConfig'
import { designCards } from '../mainHomeData'
import DesignCard from './DesignCard'
import { animateScroll } from '../animateScroll'

function HotDesign({ title = 'Hot Design', actionLabel = '더 많은 디자인 구경하기' }) {
  const listRef = useRef(null)
  const animationRef = useRef(null)
  const [edges, setEdges] = useState({ start: true, end: false })

  useEffect(() => {
    const list = listRef.current
    const updateEdges = () => setEdges({
      start: list.scrollLeft <= 1,
      end: list.scrollLeft + list.clientWidth >= list.scrollWidth - 1,
    })
    const observer = new ResizeObserver(updateEdges)
    observer.observe(list)
    list.addEventListener('scroll', updateEdges, { passive: true })
    return () => {
      animationRef.current?.()
      observer.disconnect()
      list.removeEventListener('scroll', updateEdges)
    }
  }, [])

  const moveCards = (direction) => {
    const list = listRef.current
    const card = list.firstElementChild
    const step = card.getBoundingClientRect().width + parseFloat(getComputedStyle(list).columnGap)
    const count = Math.max(1, Math.floor(list.clientWidth / step))
    animationRef.current?.()
    const start = list.scrollLeft
    const target = Math.max(0, Math.min(list.scrollWidth - list.clientWidth,
      (Math.round(start / step) + direction * count) * step))
    animationRef.current = animateScroll(list, { left: target }, () => {
      animationRef.current = null
    })
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
      <div className="mh-design-actions">
        <button className="mh-outline-button" type="button">
          {actionLabel}
        </button>
      </div>
    </section>
  )
}

export default HotDesign
