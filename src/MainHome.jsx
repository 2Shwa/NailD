import { useState } from 'react'
import { ASSETS } from './appConfig'
import {
  designCards,
  footerItems,
  navigationItems,
  shops,
  userStats,
} from './mainHomeData'
import './MainHome.css'

function RightArrowIcon({ size = 'default' }) {
  const sizeClass = size === 'large' ? 'mh-arrow-icon-large' : ''

  return (
    <img
      className={`mh-arrow-icon ${sizeClass}`}
      src={ASSETS.rightArrowIcon}
      alt=""
      aria-hidden="true"
    />
  )
}

function TextButton({ children, className = '', onClick }) {
  return (
    <button className={className} type="button" onClick={onClick}>
      {children}
    </button>
  )
}

function Header() {
  return (
    <header className="mh-header">
      <img className="mh-logo" src={ASSETS.logo} alt="Nail:D" />
      <nav className="mh-nav" aria-label="Main navigation">
        {navigationItems.map((item) => (
          <TextButton key={item}>{item}</TextButton>
        ))}
      </nav>
    </header>
  )
}

function UserSummary({ isLoggedIn, onLogin }) {
  if (!isLoggedIn) {
    return (
      <section className="mh-login-strip">
        <TextButton onClick={onLogin}>로그인</TextButton>
      </section>
    )
  }

  return (
    <section className="mh-user-strip" aria-label="User design summary">
      {userStats.map(({ label, count }) => (
        <TextButton key={label}>
          <span>{label}</span>
          <strong>{count}</strong>
        </TextButton>
      ))}
    </section>
  )
}

function Hero() {
  return (
    <section className="mh-hero">
      <div className="mh-hero-image" aria-hidden="true" />
      <div className="mh-hero-copy">
        <h1>나만의 네일 디자인,<br />상상하는 그대로</h1>
        <TextButton className="mh-primary">
          <span>디자인 하러 가기</span>
          <RightArrowIcon size="large" />
        </TextButton>
      </div>
    </section>
  )
}

function Section({ title, actionLabel, children }) {
  return (
    <section className="mh-section">
      <div className="mh-section-head">
        <h2>{title}</h2>
        <TextButton>
          {actionLabel}
          <RightArrowIcon />
        </TextButton>
      </div>
      {children}
    </section>
  )
}

function DesignGrid() {
  return (
    <div className="mh-design-grid">
      {designCards.map(({ title, className }) => (
        <article className={`mh-design-card ${className}`} key={title}>
          <span>{title}</span>
        </article>
      ))}
    </div>
  )
}

function ShopGrid() {
  return (
    <div className="mh-shop-grid">
      {shops.map(({ name, location }, index) => (
        <article className="mh-shop-card" key={name}>
          <div className="mh-shop-photo" style={{ '--shop-pos': `${20 + index * 18}%` }} />
          <div>
            <h3>{name}</h3>
            <p>{location}</p>
          </div>
        </article>
      ))}
    </div>
  )
}

function Footer() {
  return (
    <footer className="mh-footer">
      {footerItems.map((item) => (
        <TextButton key={item}>{item}</TextButton>
      ))}
    </footer>
  )
}

function MainHome() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <main className="mh-page">
      <Header />
      <div className="mh-content">
        <Hero />
        <UserSummary isLoggedIn={isLoggedIn} onLogin={() => setIsLoggedIn(true)} />
        <Section title="인기 디자인" actionLabel="디자인 더보기">
          <DesignGrid />
        </Section>
        <Section title="가까운 네일샵" actionLabel="네일샵 더보기">
          <ShopGrid />
        </Section>
      </div>
      <Footer />
    </main>
  )
}

export default MainHome
