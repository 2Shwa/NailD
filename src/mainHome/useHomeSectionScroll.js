import { useEffect } from 'react'
import { animateScroll } from './animateScroll'

export default function useHomeSectionScroll(pageRef, enabled) {
  useEffect(() => {
    if (!enabled) return
    const root = document.scrollingElement
    if (!root) return

    let cancelAnimation = null
    let moving = false
    let activeIndex = null
    let lastWheelAt = -Infinity
    let nativeScrollUntil = 0
    let wheelTimer = null
    let touchStart = null
    let touchConsumed = false

    const getTargets = () => {
      const max = Math.max(0, root.scrollHeight - root.clientHeight)
      const sections = pageRef.current?.querySelectorAll('.mh-showcase-section') ?? []
      return [0, ...Array.from(sections, (section) => {
        const rect = section.getBoundingClientRect()
        return Math.max(0, Math.min(max,
          root.scrollTop + rect.top + rect.height / 2 - window.innerHeight / 2))
      })]
    }

    const move = (direction, origin = root.scrollTop) => {
      window.clearTimeout(wheelTimer)
      wheelTimer = null
      if (moving) return true
      const targets = getTargets()
      const position = origin
      const nearest = targets.reduce((best, target, index) =>
        Math.abs(target - position) < Math.abs(targets[best] - position) ? index : best, 0)
      // Return from the footer to Community before moving on to Design.
      const next = direction < 0 && position > targets.at(-1) + 24
        ? targets.length - 1 : nearest + direction
      if (next < 0 || next >= targets.length) return false
      moving = true
      activeIndex = next
      cancelAnimation = animateScroll(root, { top: targets[next] }, () => {
        moving = false
        activeIndex = null
        cancelAnimation = null
      })
      return true
    }

    const onWheel = (event) => {
      if (event.ctrlKey || event.deltaY === 0 || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return
      if (!event.cancelable) return
      const now = performance.now()
      const repeated = wheelTimer !== null || moving || now - lastWheelAt < 250 || now < nativeScrollUntil
      // Browsers report wheel distances in pixels, lines, or pages. A normal
      // mouse notch can arrive as one large event, not several rapid events.
      const pixels = Math.abs(event.deltaY) * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1)
      const fastUp = event.deltaY < 0 && (repeated || pixels >= 40)
      lastWheelAt = now
      if (repeated || fastUp) {
        // Cancel every pending alignment before jumping to Hero or releasing
        // downward input to native scrolling.
        const interruptedIndex = moving ? activeIndex : null
        cancelAnimation?.()
        window.clearTimeout(wheelTimer)
        wheelTimer = null
        cancelAnimation = null
        moving = false
        activeIndex = null
        nativeScrollUntil = now + 1000
        if (event.deltaY < 0 || interruptedIndex !== null) {
          const targets = getTargets()
          const target = event.deltaY < 0 ? 0 : targets[Math.min(interruptedIndex + 1, targets.length - 1)]
          const previousBehavior = root.style.scrollBehavior
          root.style.scrollBehavior = 'auto'
          root.scrollTop = target
          root.style.scrollBehavior = previousBehavior
          event.preventDefault()
        }
        return
      }
      nativeScrollUntil = 0
      // Let the first wheel event scroll normally too. Start section alignment
      // only after confirming this was an isolated notch, not a fast burst.
      const origin = root.scrollTop
      const direction = Math.sign(event.deltaY)
      wheelTimer = window.setTimeout(() => {
        wheelTimer = null
        move(direction, origin)
      }, 220)
    }

    const onNativeScroll = () => {
      const now = performance.now()
      // Wheel events can pause between notches while native momentum is still
      // moving the page. Stay in native mode until both have been idle.
      if (!moving && now < nativeScrollUntil) nativeScrollUntil = now + 1000
    }

    const onTouchStart = (event) => {
      touchStart = event.touches.length === 1
        ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null
      touchConsumed = false
    }
    const onTouchMove = (event) => {
      if (!touchStart || event.touches.length !== 1 || !event.cancelable) return
      const dx = touchStart.x - event.touches[0].clientX
      const dy = touchStart.y - event.touches[0].clientY
      if (touchConsumed) {
        event.preventDefault()
      } else if (Math.abs(dy) > Math.abs(dx) && dy !== 0 && move(Math.sign(dy))) {
        touchConsumed = true
        event.preventDefault()
      }
    }
    const onKeyDown = (event) => {
      if (event.ctrlKey || event.altKey || event.metaKey ||
        event.target.closest?.('input, textarea, select, button, a, [contenteditable="true"]')) return
      const direction = { ArrowDown: 1, PageDown: 1, ArrowUp: -1, PageUp: -1 }[event.key]
      if (direction && move(direction)) event.preventDefault()
    }

    // Handle input before nested components and native scrolling.
    const inputOptions = { passive: false, capture: true }
    document.addEventListener('wheel', onWheel, inputOptions)
    document.addEventListener('touchstart', onTouchStart, { passive: true, capture: true })
    document.addEventListener('touchmove', onTouchMove, inputOptions)
    document.addEventListener('keydown', onKeyDown, true)
    window.addEventListener('scroll', onNativeScroll, { passive: true })
    return () => {
      window.clearTimeout(wheelTimer)
      cancelAnimation?.()
      document.removeEventListener('wheel', onWheel, true)
      document.removeEventListener('touchstart', onTouchStart, true)
      document.removeEventListener('touchmove', onTouchMove, true)
      document.removeEventListener('keydown', onKeyDown, true)
      window.removeEventListener('scroll', onNativeScroll)
    }
  }, [enabled, pageRef])
}
