import { ASSETS } from './appConfig'

function OnboardingScreen() {
  return (
    <section className="screen onboarding-screen" aria-label="Starting screen">
      <div className="pink-arch" aria-hidden="true" />

      <div className="brand-stage">
        <img className="nail-icon" src={ASSETS.nailIcon} alt="" />
        <img className="logo-mark" src={ASSETS.logo} alt="Nail:D" />
        <p className="tagline" aria-label="Nail design">
          <span>네일</span>
          <span>디자인</span>
        </p>
      </div>
    </section>
  )
}

export default OnboardingScreen
