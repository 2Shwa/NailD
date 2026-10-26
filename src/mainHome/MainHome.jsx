import { useEffect, useRef, useSyncExternalStore } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import HotCommunity from './components/HotCommunity'
import HotDesign from './components/HotDesign'
import GalleryDesigns from './components/GalleryDesigns'
import { animateScroll } from './animateScroll'
import { getCurrentPage, navigateToPage, subscribeToPageChange } from './pageRouting'
import './MainHome.css'

const MY_PAGE_TARGETS = {
  MyDesign: 'my-design',
  SavedDesign: 'saved-design',
  MyPosts: 'my-posts',
}
const MY_PAGE_ROUTES = ['MyPage', ...Object.keys(MY_PAGE_TARGETS)]

function cancelPendingScroll(pending) {
  window.clearTimeout(pending.timer)
  window.cancelAnimationFrame(pending.frame)
  pending.cancelAnimation?.()
  pending.timer = null
  pending.frame = null
  pending.cancelAnimation = null
}

function GalleryPage() {
  return (
    <section className="mh-page-section">
      <HotDesign />
      <GalleryDesigns />
    </section>
  )
}

function MyPage({ onBrowse, onCreateDesign }) {
  return (
    <section className="mh-page-section">
      <div className="mh-section-title">
        <h2>My Page</h2>
      </div>
      <p className="mh-page-copy">마이페이지 입니다.</p>
      <div id="my-design" className="mh-my-page-anchor">
        <HotDesign onBrowse={onCreateDesign} title="My Designs" actionLabel="새 디자인 만들기" />
      </div>
      <div id="saved-design" className="mh-my-page-anchor">
        <HotDesign onBrowse={onBrowse} title="Saved Designs" actionLabel="더 많은 디자인 구경하기" />
      </div>
      <div id="my-posts" className="mh-my-page-anchor">
        <HotCommunity title="My Posts" />
      </div>
    </section>
  )
}

const footerPages = {
  Contact: ['문의하기', '서비스 이용에 관한 문의를 남길 수 있는 공간입니다.'],
  BugReport: ['버그 제보', '서비스에서 발견한 문제를 제보할 수 있는 공간입니다.'],
}

function FooterPage({ title, description }) {
  return (
    <section className="mh-page-section">
      <div className="mh-section-title">
        <h2>{title}</h2>
      </div>
      <p className="mh-page-copy">{description}</p>
    </section>
  )
}

function MainHome() {
  const activePage = useSyncExternalStore(subscribeToPageChange, getCurrentPage)
  const previousPageRef = useRef(null)
  const handleNavigate = navigateToPage
  const pendingScrollRef = useRef({ timer: null, frame: null, cancelAnimation: null })
  const footerPage = footerPages[activePage]

  useEffect(() => {
    const pending = pendingScrollRef.current
    return () => cancelPendingScroll(pending)
  }, [])

  useEffect(() => {
    const page = activePage
    const pending = pendingScrollRef.current
    cancelPendingScroll(pending)
    const targetId = MY_PAGE_TARGETS[page]
    const isCurrentlyMyPage = MY_PAGE_ROUTES.includes(previousPageRef.current)
    previousPageRef.current = page

    if (!targetId || !isCurrentlyMyPage) {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }

    if (!targetId) {
      return
    }

    const moveToTarget = () => {
      pending.timer = null
      pending.frame = window.requestAnimationFrame(() => {
        pending.frame = window.requestAnimationFrame(() => {
          pending.frame = null
          const target = document.getElementById(targetId)
          if (!target) return

          const targetY = target.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.35
          const root = document.scrollingElement
          if (!root) return
          pending.cancelAnimation = animateScroll(root, { top: Math.max(0, targetY) }, () => {
            pending.cancelAnimation = null
          })
        })
      })
    }

    if (isCurrentlyMyPage) {
      moveToTarget()
    } else {
      pending.timer = window.setTimeout(moveToTarget, 500)
    }
    return () => cancelPendingScroll(pending)
  }, [activePage])

  return (
    <main className="mh-page">
      <Header activePage={activePage} onNavigate={handleNavigate} />
      <div className="mh-main-container">
        {activePage === 'Home' && (
          <>
            <Hero onNavigate={handleNavigate} />
            <div className="mh-section-frame mh-home-sections">
              <HotDesign onBrowse={() => handleNavigate('Gallery')} />
              <HotCommunity onBrowse={() => handleNavigate('Community')} />
            </div>
          </>
        )}

        {activePage === 'Design' && (
          <div className="mh-section-frame" />
        )}

        {activePage === 'Gallery' && (
          <div className="mh-section-frame">
            <GalleryPage />
          </div>
        )}

        {activePage === 'Community' && (
          <div className="mh-section-frame">
            <HotCommunity />
          </div>
        )}

        {MY_PAGE_ROUTES.includes(activePage) && (
          <div className="mh-section-frame">
            <MyPage
              onBrowse={() => handleNavigate('Gallery')}
              onCreateDesign={() => handleNavigate('Design')}
            />
          </div>
        )}

        {footerPage && (
          <div className="mh-section-frame">
            <FooterPage title={footerPage[0]} description={footerPage[1]} />
          </div>
        )}
        {activePage !== 'Design' && <Footer onNavigate={handleNavigate} />}
      </div>
    </main>
  )
}

export default MainHome
