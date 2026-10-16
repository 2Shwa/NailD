import { ASSETS } from '../../appConfig'
import { headerLinks } from '../mainHomeData'

function Header({ activePage, onNavigate }) {
  return (
    <header className="mh-header">
      <div className="mh-nav">
        <img className="mh-logo-text" src={ASSETS.pinktextlogo} alt="Nail:D" />
        <div className="mh-header-actions">
          <nav className="mh-link-list" aria-label="Main navigation">
            {headerLinks.map((link) => (
              <button
                className={link === activePage ? 'active' : ''}
                type="button"
                key={link}
                onClick={() => onNavigate(link)}
              >
                {link}
              </button>
            ))}
          </nav>
          <button
            className={`mh-profile-button ${activePage === 'MyPage' ? 'active' : ''}`}
            type="button"
            aria-label="마이페이지"
            onClick={() => onNavigate('MyPage')}
          >
            <img src={ASSETS.userIcon} alt="" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
