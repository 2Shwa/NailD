import { afterEach, beforeEach, test } from 'node:test'
import assert from 'node:assert/strict'
import { animateScroll } from '../src/mainHome/animateScroll.js'

let frames
let id
beforeEach(() => {
  frames = new Map()
  id = 0
  globalThis.window = {
    requestAnimationFrame(callback) { frames.set(++id, callback); return id },
    cancelAnimationFrame(key) { frames.delete(key) },
  }
})
afterEach(() => { delete globalThis.window })

function advance(time) {
  const callbacks = [...frames.values()]
  frames.clear()
  callbacks.forEach((callback) => callback(time))
}

function element(top = 0) {
  return {
    scrollTop: top, scrollLeft: 0,
    style: { scrollBehavior: 'smooth', scrollSnapType: 'y mandatory', overflowAnchor: 'auto' },
  }
}

test('downward and upward movement each take a full second', () => {
  const root = element()
  for (const [origin, target, startTime] of [[0, 1000, 0], [1000, 0, 2000]]) {
    let complete = false
    animateScroll(root, { top: target }, () => { complete = true })
    advance(startTime)
    assert.equal(root.scrollTop, origin)
    advance(startTime + 500)
    assert.ok(Math.abs(root.scrollTop - 500) < 0.01)
    assert.equal(complete, false)
    advance(startTime + 1000)
    assert.equal(root.scrollTop, target)
    assert.equal(complete, true)
    assert.equal(root.style.scrollBehavior, 'smooth')
    assert.equal(root.style.scrollSnapType, 'y mandatory')
  }
})

test('a delayed first browser frame cannot skip the animation', () => {
  const root = element()
  animateScroll(root, { top: 1000 })
  advance(5000)
  assert.equal(root.scrollTop, 0)
  advance(5500)
  assert.ok(Math.abs(root.scrollTop - 500) < 0.01)
  advance(6000)
  assert.equal(root.scrollTop, 1000)
})

test('canceling a transition restores styles and stops further updates', () => {
  const root = element()
  let complete = false
  const cancel = animateScroll(root, { top: 1000 }, () => { complete = true })
  advance(0)
  advance(500)
  const position = root.scrollTop
  cancel()
  advance(1000)
  assert.equal(root.scrollTop, position)
  assert.equal(complete, false)
  assert.deepEqual(root.style, {
    scrollBehavior: 'smooth', scrollSnapType: 'y mandatory', overflowAnchor: 'auto',
  })
})

test('horizontal cards use the same duration without moving the page vertically', () => {
  const list = element(80)
  animateScroll(list, { left: 900 })
  advance(0)
  advance(500)
  assert.ok(Math.abs(list.scrollLeft - 450) < 0.01)
  assert.equal(list.scrollTop, 80)
  advance(1000)
  assert.equal(list.scrollLeft, 900)
})
