import { afterEach, beforeEach, test } from 'node:test'
import assert from 'node:assert/strict'
import { getCurrentPage, navigateToPage, subscribeToPageChange } from '../src/mainHome/pageRouting.js'

let entries
let position
beforeEach(() => {
  const events = new EventTarget()
  entries = ['']
  position = 0
  globalThis.window = {
    location: { get hash() { return entries[position] } },
    history: {
      pushState(_state, _title, url) {
        entries.splice(++position, entries.length, url)
      },
      go(delta) {
        position = Math.max(0, Math.min(entries.length - 1, position + delta))
        events.dispatchEvent(new Event('popstate'))
      },
    },
    addEventListener: events.addEventListener.bind(events),
    removeEventListener: events.removeEventListener.bind(events),
    dispatchEvent: events.dispatchEvent.bind(events),
  }
})
afterEach(() => { delete globalThis.window })

test('navigation updates the address and back/forward restores the corresponding page', () => {
  const pages = []
  const unsubscribe = subscribeToPageChange(() => pages.push(getCurrentPage()))
  assert.equal(getCurrentPage(), 'Home')
  navigateToPage('Gallery')
  assert.equal(window.location.hash, '#/gallery')
  navigateToPage('MyDesign')
  window.history.go(-1)
  window.history.go(-1)
  window.history.go(1)
  assert.deepEqual(pages, ['Gallery', 'MyDesign', 'Gallery', 'Home', 'Gallery'])
  unsubscribe()
  navigateToPage('Community')
  assert.equal(pages.length, 5)
})

test('direct links resolve every screen and repeated navigation adds no history entry', () => {
  for (const page of ['Design', 'Gallery', 'Community', 'MyPage', 'MyDesign', 'SavedDesign', 'MyPosts', 'Contact', 'BugReport', 'Home']) {
    navigateToPage(page)
    assert.equal(getCurrentPage(), page)
    const count = entries.length
    navigateToPage(page)
    assert.equal(entries.length, count)
  }
  navigateToPage('Unknown')
  assert.equal(getCurrentPage(), 'Home')
  entries[position] = '#/unknown'
  assert.equal(getCurrentPage(), 'Home')
  entries[position] = '#/my-page/saved-design'
  assert.equal(getCurrentPage(), 'SavedDesign')
})
