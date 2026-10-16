import { useState } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import HotCommunity from './components/HotCommunity'
import HotDesign from './components/HotDesign'
import './MainHome.css'

function GalleryPage() {
  return (
    <section className="mh-page-section">
      <div className="mh-section-title">
        <h2>Gallery</h2>
      </div>
      <p className="mh-page-copy">저장한 디자인과 새로운 네일 아이디어를 모아볼 수 있는 공간입니다.</p>
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
      <p className="mh-page-copy">내가 저장한 디자인과 작성한 게시글을 확인할 수 있는 공간입니다.</p>
    </section>
  )
}

function MainHome() {
  const [activePage, setActivePage] = useState('Home')

  return (
    <main className="mh-page">
      <Header activePage={activePage} onNavigate={setActivePage} />
      <div className="mh-main-container">
        {activePage === 'Home' && (
          <>
            <Hero onNavigate={setActivePage} />
            <div className="mh-section-frame">
              <HotDesign />
              <HotCommunity />
            </div>
          </>
        )}

        {activePage === 'Design' && (
          <div className="mh-section-frame">
            <HotDesign />
          </div>
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

        {activePage === 'MyPage' && (
          <div className="mh-section-frame">
            <MyPage />
          </div>
        )}
        <Footer />
      </div>
    </main>
  )
}

export default MainHome
