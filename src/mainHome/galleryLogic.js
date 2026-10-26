import { galleryCards, normalizeSearch, popularity } from './galleryData.js'

export function getRelatedSearches(query, recentSearches = []) {
  const typedSearch = normalizeSearch(query)
  return typedSearch ? [...new Set([
    ...galleryCards.map((card) => card.name),
    ...galleryCards.flatMap((card) => [...card.tags, ...card.styles]),
    ...recentSearches,
  ])].filter((term) => normalizeSearch(term).includes(typedSearch))
    .sort((a, b) => {
      const left = normalizeSearch(a)
      const right = normalizeSearch(b)
      const rank = (term) => term === typedSearch ? 0 : term.startsWith(typedSearch) ? 1 : 2
      return rank(left) - rank(right) ||
        left.length - right.length ||
        left.indexOf(typedSearch) - right.indexOf(typedSearch) ||
        a.localeCompare(b, 'ko')
    }).slice(0, 6) : []
}

export function getGalleryResults(appliedQuery, filters, sort) {
  const search = appliedQuery.trim().toLocaleLowerCase()
  return galleryCards.filter((card) =>
    (!filters.style.length || filters.style.some((style) => card.styles.includes(style))) &&
    (!filters.color.length || filters.color.includes(card.color)) &&
    (!filters.shape.length || filters.shape.includes(card.shape)) &&
    search.split(/\s+/).filter((word) => word !== '네일').every((word) =>
      [card.name, card.author, ...card.tags, ...card.styles].some((value) => value.toLocaleLowerCase().includes(word))),
  ).sort((a, b) => sort === 'popular' ? popularity(b) - popularity(a) : b.id - a.id)
}

export function toggleFilterSelection(filters, group, value) {
  const selected = filters[group]
  return {
    ...filters,
    [group]: value === '전체' ? [] : selected.includes(value)
      ? selected.filter((item) => item !== value)
      : [...selected, value],
  }
}
