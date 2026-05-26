import './App.css'

const assets = {
  logo: '/logo_text.png',
  nailIcon: '/nail_icon.png',
}

function App() {
  return (
    <main className="app-shell">
      <section className="screen onboarding-screen" aria-label="Starting screen">
        <div className="pink-arch" aria-hidden="true" />

        <div className="brand-stage">
          <img className="nail-icon" src={assets.nailIcon} alt="" />
          <img className="logo-mark" src={assets.logo} alt="Nail:D" />
          <p className="tagline" aria-label="Nail icon">
            <span>네일</span>
            <span>디자인</span>
          </p>
        </div>
      </section>
    </main>
  )
}

export default App
