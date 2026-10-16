import { useEffect, useRef, useState } from 'react'
import { ASSETS } from '../../appConfig'
import { headerLinks } from '../mainHomeData'

function Header({ activePage, onNavigate }) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const lastScrollY = useRef(0)
  const frameId = useRef(null)

  useEffect(() => {
    lastScrollY.current = window.scrollY

    const handleScroll = () => {
      if (frameId.current !== null) return

      frameId.current = window.requestAnimationFrame(() => {
        const currentScrollY = Math.max(window.scrollY, 0)
        const delta = currentScrollY - lastScrollY.current

        if (currentScrollY <= 16) {
          setIsCollapsed(false)
          lastScrollY.current = currentScrollY
        } else if (Math.abs(delta) >= 8) {
          setIsCollapsed(delta > 0)
          lastScrollY.current = currentScrollY
        }

        frameId.current = null
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (frameId.current !== null) {
        window.cancelAnimationFrame(frameId.current)
      }
    }
  }, [])

  return (
    <header className={`mh-header${isCollapsed ? ' is-collapsed' : ''}`}>
      <div className="mh-nav">
        <button
          className="mh-logo-button"
          type="button"
          aria-label="Home으로 이동"
          onClick={() => onNavigate('Home')}
        >
          <img className="mh-logo-text" src={ASSETS.pinktextlogo} alt="Nail:D" />
        </button>
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
            className={`mh-profile-button ${['MyPage', 'MyDesign', 'SavedDesign', 'MyPosts'].includes(activePage) ? 'active' : ''}`}
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
