import { animateScroll } from './animateScroll.js'

export function createCarouselScroller(list, onTargetChange, getEnd = () => Math.max(0, list.scrollWidth - list.clientWidth)) {
  let targets = []
  let target = null
  let cancelAnimation = null

  const playNext = () => {
    if (!targets.length) {
      target = null
      cancelAnimation = null
      onTargetChange()
      return
    }
    cancelAnimation = animateScroll(list, { left: targets.shift() }, playNext)
  }

  return {
    getTarget: () => target,
    getEnd,
    move(direction, step, count) {
      const origin = target ?? list.scrollLeft
      const next = Math.max(0, Math.min(getEnd(),
        (Math.round(origin / step) + direction * count) * step))
      if (Math.abs(next - origin) < 1) return
      target = next
      targets.push(next)
      onTargetChange()
      if (!cancelAnimation) playNext()
    },
    cancel() {
      cancelAnimation?.()
      cancelAnimation = null
      targets = []
      target = null
      onTargetChange()
    },
  }
}
