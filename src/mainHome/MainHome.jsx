import { useRef, useState } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import HotCommunity from './components/HotCommunity'
import HotDesign from './components/HotDesign'
import './MainHome.css'

function scrollToPosition(targetY, duration = 1000) {
  const startY = window.scrollY
  const distance = targetY - startY
  const startTime = performance.now()

  const animate = (currentTime) => {
    const progress = Math.min((currentTime - startTime) / duration, 1)
    const easedProgress = 1 - Math.pow(1 - progress, 3)

    window.scrollTo(0, startY + distance * easedProgress)

    if (progress < 1) {
      window.requestAnimationFrame(animate)
    }
  }

  window.requestAnimationFrame(animate)
}

function GalleryPage() {
  return (
    <section className="mh-page-section">
      <HotDesign />
    </section>
  )
}

function MyPage() {
  return (
    <section className="mh-page-section">
      <div className="mh-section-title">
        <h2>My Page</h2>
      </div>
      <p className="mh-page-copy">마이페이지 입니다.</p>
      <div id="my-design" className="mh-my-page-anchor">
        <HotDesign title="My Designs" actionLabel="새 디자인 만들기" />
      </div>
      <div id="saved-design" className="mh-my-page-anchor">
        <HotDesign title="Saved Designs" actionLabel="더 많은 디자인 구경하기" />
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
  const [activePage, setActivePage] = useState('Home')
  const scrollTimerRef = useRef(null)
  const footerPage = footerPages[activePage]
  const myPageRoutes = ['MyPage', 'MyDesign', 'SavedDesign', 'MyPosts']

  const handleNavigate = (page) => {
    if (scrollTimerRef.current !== null) {
      window.clearTimeout(scrollTimerRef.current)
      scrollTimerRef.current = null
    }

    const targetIds = {
      MyDesign: 'my-design',
      SavedDesign: 'saved-design',
      MyPosts: 'my-posts',
    }
    const targetId = targetIds[page]
    const isCurrentlyMyPage = myPageRoutes.includes(activePage)

    if (!targetId || !isCurrentlyMyPage) {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }

    setActivePage(page)

    if (!targetId) {
      return
    }

    const moveToTarget = () => window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const target = document.getElementById(targetId)
        if (!target) return

        const targetY = target.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.35
        scrollToPosition(targetY)
      })
    })

    if (isCurrentlyMyPage) {
      moveToTarget()
    } else {
      scrollTimerRef.current = window.setTimeout(moveToTarget, 500)
    }
  }

  return (
    <main className="mh-page">
      <Header activePage={activePage} onNavigate={handleNavigate} />
      <div className="mh-main-container">
        {activePage === 'Home' && (
          <>
            <Hero onNavigate={handleNavigate} />
            <div className="mh-section-frame">
              <HotDesign />
              <HotCommunity />
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

        {myPageRoutes.includes(activePage) && (
          <div className="mh-section-frame">
            <MyPage />
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
