// A single frame loop owns the position; browser scrolling cannot queue a
// second animation or change the requested duration.
export function animateScroll(element, destination, onComplete, duration = 1000) {
  const axis = 'top' in destination ? 'scrollTop' : 'scrollLeft'
  const target = 'top' in destination ? destination.top : destination.left
  const origin = element[axis]
  const savedStyles = {
    scrollBehavior: element.style.scrollBehavior,
    scrollSnapType: element.style.scrollSnapType,
    overflowAnchor: element.style.overflowAnchor,
  }
  Object.assign(element.style, {
    scrollBehavior: 'auto', scrollSnapType: 'none', overflowAnchor: 'none',
  })
  let frame
  let startedAt = null
  let finished = false
  const restore = () => Object.assign(element.style, savedStyles)
  const tick = (now) => {
    startedAt ??= now
    const progress = Math.min((now - startedAt) / duration, 1)
    const eased = (1 - Math.cos(Math.PI * progress)) / 2
    element[axis] = origin + (target - origin) * eased
    if (progress < 1) {
      frame = window.requestAnimationFrame(tick)
    } else {
      finished = true
      restore()
      onComplete?.()
    }
  }
  frame = window.requestAnimationFrame(tick)
  return () => {
    if (finished) return
    window.cancelAnimationFrame(frame)
    finished = true
    restore()
  }
}
