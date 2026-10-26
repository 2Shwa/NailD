const pagePaths = {
  Home: '/',
  Design: '/design',
  Gallery: '/gallery',
  Community: '/community',
  MyPage: '/my-page',
  MyDesign: '/my-page/my-design',
  SavedDesign: '/my-page/saved-design',
  MyPosts: '/my-page/my-posts',
  Contact: '/contact',
  BugReport: '/bug-report',
}

export function getCurrentPage() {
  const path = window.location.hash.slice(1)
  return Object.keys(pagePaths).find((page) => pagePaths[page] === path) ?? 'Home'
}

export function subscribeToPageChange(callback) {
  window.addEventListener('popstate', callback)
  window.addEventListener('hashchange', callback)
  return () => {
    window.removeEventListener('popstate', callback)
    window.removeEventListener('hashchange', callback)
  }
}

export function navigateToPage(page) {
  if (!Object.hasOwn(pagePaths, page) || getCurrentPage() === page) return
  window.history.pushState(null, '', `#${pagePaths[page]}`)
  window.dispatchEvent(new Event('popstate'))
}
