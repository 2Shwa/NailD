import { ASSETS } from '../appConfig'
import './OnboardingScreen.css'

const TAGLINE_WORDS = ['네일', '디자인']

function OnboardingScreen() {
  return (
    <section className="screen onboarding-screen" aria-label="Starting screen">
      <div className="pink-arch" aria-hidden="true" />
      <img className="nail-icon" src={ASSETS.nailIcon} alt="" aria-hidden="true" />

      <div className="brand-stage">
        <img className="logo-mark" src={ASSETS.textlogo} alt="Nail:D" />
        <p className="tagline" aria-label="Nail design">
          {TAGLINE_WORDS.map((word) => (
            <span key={word}>{word}</span>
          ))}
        </p>
      </div>
    </section>
  )
}

export default OnboardingScreen
