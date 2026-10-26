import { test } from 'node:test'
import assert from 'node:assert/strict'
import { emptyFilters, galleryCards } from '../src/mainHome/galleryData.js'
import { getRelatedSearches, getGalleryResults, toggleFilterSelection } from '../src/mainHome/galleryLogic.js'

test('related searches prioritize exact matches, prefixes and shorter terms', () => {
  assert.deepEqual(getRelatedSearches('체').slice(0, 2), ['체커', '체커 핑크'])
  assert.equal(getRelatedSearches('# 리본 ')[0], '리본')
  assert.deepEqual(getRelatedSearches('없는검색어'), [])
  assert.deepEqual(getRelatedSearches(''), [])
})

test('filter choices combine within groups and intersect across groups', () => {
  const selected = toggleFilterSelection(
    toggleFilterSelection(emptyFilters, 'style', '리본'), 'style', '플라워',
  )
  assert.deepEqual(emptyFilters.style, [])
  const results = getGalleryResults('', { ...selected, shape: ['라운드', '아몬드'] }, 'latest')
  assert.ok(results.length > 0)
  assert.ok(results.every((card) =>
    card.styles.some((style) => ['리본', '플라워'].includes(style)) &&
    ['라운드', '아몬드'].includes(card.shape)))
  assert.deepEqual(toggleFilterSelection(selected, 'style', '리본').style, ['플라워'])
  assert.deepEqual(toggleFilterSelection(selected, 'style', '전체').style, [])
})

test('submitted queries match words and clearing restores the full list', () => {
  const results = getGalleryResults('리본 네일', emptyFilters, 'latest')
  assert.ok(results.length > 0)
  assert.ok(results.every((card) => card.styles.includes('리본')))
  assert.equal(getGalleryResults('', emptyFilters, 'latest').length, galleryCards.length)
  assert.equal(getGalleryResults('', emptyFilters, 'popular')[0].likes, '1.5k')
  assert.deepEqual(getGalleryResults('없는검색어', emptyFilters, 'latest'), [])
})
