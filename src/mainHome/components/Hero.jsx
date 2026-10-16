import { ASSETS } from '../../appConfig'
import { heroContent } from '../mainHomeData'

const actionPages = {
  primary: 'Design',
  secondary: 'Gallery',
}

function Hero({ onNavigate }) {
  return (
    <section className="mh-hero">
      <div className="mh-hero-backdrop" aria-hidden="true" />
      <div className="mh-container mh-hero-container">
        <div className="mh-hero-copy">
          <h1>
            {heroContent.titleLines.map((line, index) => (
              <span key={line}>
                {index > 0 && <br />}
                {line}
              </span>
            ))}
          </h1>
          <p>
            {heroContent.descriptionLines.map((line, index) => (
              <span key={line}>
                {index > 0 && <br />}
                {line}
              </span>
            ))}
          </p>
          <div className="mh-hero-buttons">
            {heroContent.actions.map((action) => (
              <button
                className={`mh-cta ${action.variant}`}
                type="button"
                key={action.label}
                onClick={() => onNavigate(actionPages[action.variant])}
              >
                <span>{action.label}</span>
                <span
                  className="mh-arrow mh-arrow-large"
                  style={{ '--arrow-url': `url(${ASSETS.rightArrowIcon})` }}
                  aria-hidden="true"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
