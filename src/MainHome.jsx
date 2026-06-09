import { ASSETS } from './appConfig'
import {
  communityPosts,
  designCards,
  footerColumns,
  headerLinks,
} from './mainHomeData'
import './MainHome.css'

function ArrowIcon({ size = 'default' }) {
  return (
    <span
      className={`mh-arrow ${size === 'large' ? 'mh-arrow-large' : ''}`}
      style={{ '--arrow-url': `url(${ASSETS.rightArrowIcon})` }}
      aria-hidden="true"
    />
  )
}

function Header() {
  return (
    <header className="mh-header">
      <div className="mh-nav">
        <img className="mh-logo-text" src={ASSETS.pinktextlogo} alt="Nail:D" />
        <div className="mh-header-actions">
          <nav className="mh-link-list" aria-label="Main navigation">
            {headerLinks.map((link) => (
              <button className={link === 'Home' ? 'active' : ''} type="button" key={link}>
                {link}
              </button>
            ))}
          </nav>
          <button className="mh-profile-button" type="button" aria-label="마이페이지">
            <img src={ASSETS.userIcon} alt="" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="mh-hero">
      <div className="mh-hero-backdrop" aria-hidden="true" />
      <div className="mh-container mh-hero-container">
        <div className="mh-hero-copy">
          <h1>나만의 네일 디자인, <br />상상하는 그대로</h1>
          <p>
            디자인부터 공유, 소통까지 한 곳에서.<br />
            나만의 네일을 디자인하고, 다양한 작품을 탐색하며 경험과 노하우를 자유롭게 나눠보세요.
          </p>
          <div className="mh-hero-buttons">
            <button className="mh-cta primary" type="button">
              <span>디자인 하러 가기</span>
              <ArrowIcon size="large" />
            </button>
            <button className="mh-cta secondary" type="button">
              <span>디자인 구경하기</span>
              <ArrowIcon size="large" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function SectionTitle({ children }) {
  return (
    <div className="mh-section-title">
      <h2>{children}</h2>
    </div>
  )
}

function DesignCard({ card }) {
  return (
    <article className="mh-design-card">
      <div className={`mh-design-art ${card.className}`}>
        <button className="mh-save-button" type="button" aria-label="디자인 저장" />
      </div>
      <div className="mh-design-info">
        <div>
          <h3>{card.name}</h3>
          <p>{card.author}</p>
        </div>
        <div className="mh-like-count">
          <span className="mh-heart-icon" aria-hidden="true" />
          <strong>{card.likes}</strong>
        </div>
      </div>
    </article>
  )
}

function HotDesign() {
  return (
    <section className="mh-showcase-section">
      <SectionTitle>Hot Design</SectionTitle>
      <div className="mh-design-list">
        {designCards.map((card) => (
          <DesignCard card={card} key={`${card.className}-${card.name}`} />
        ))}
      </div>
      <button className="mh-outline-button" type="button">더 많은 디자인 구경하기</button>
    </section>
  )
}

function CommunityPost({ post }) {
  return (
    <article className="mh-post-row">
      <div className="mh-post-title">
        <span>{post.category}</span>
        <strong>{post.title}</strong>
        <em>[{post.comments}]</em>
      </div>
      <time>{post.date}</time>
    </article>
  )
}

function HotCommunity() {
  return (
    <section className="mh-showcase-section community">
      <SectionTitle>Hot Community</SectionTitle>
      <div className="mh-community-head">
        <button type="button">전체 보기</button>
      </div>
      <div className="mh-post-list">
        {communityPosts.map((post) => (
          <CommunityPost post={post} key={post.id} />
        ))}
      </div>
      <button className="mh-outline-button" type="button">커뮤니티 구경하기</button>
    </section>
  )
}

function Footer() {
  return (
    <footer className="mh-footer">
      <div className="mh-footer-inner">
        <div className="mh-footer-brand">
          <div className="mh-footer-logo">
            <img src={ASSETS.pinktextlogo} alt="Nail:D" />
          </div>
          <p>Create, Design, Share. 나만의 네일 디자인을 만들고 공유해보세요.</p>
        </div>
        <div className="mh-footer-columns">
          {footerColumns.map((column) => (
            <section className="mh-footer-column" key={column.title}>
              <h2>{column.title}</h2>
              {column.links.map((link) => (
                <button type="button" key={link}>{link}</button>
              ))}
            </section>
          ))}
        </div>
      </div>
    </footer>
  )
}

function MainHome() {
  return (
    <main className="mh-page">
      <Header />
      <div className="mh-main-container">
        <Hero />
        <div className="mh-section-frame">
          <HotDesign />
          <HotCommunity />
        </div>
        <Footer />
      </div>
    </main>
  )
}

export default MainHome
