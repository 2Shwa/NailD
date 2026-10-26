import { useEffect, useRef, useState } from 'react'
import { ASSETS } from '../../appConfig'
import { footerColumns, headerLinks } from '../mainHomeData'
import Brand from './Brand'

function Header({ activePage, onNavigate }) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuButtonRef = useRef(null)
  const lastScrollY = useRef(0)
  const frameId = useRef(null)

  const navigateFromMenu = (page) => {
    setIsMenuOpen(false)
    onNavigate(page)
    menuButtonRef.current?.focus()
  }

  useEffect(() => {
    const closeMenu = () => setIsMenuOpen(false)
    window.addEventListener('popstate', closeMenu)
    window.addEventListener('hashchange', closeMenu)
    return () => {
      window.removeEventListener('popstate', closeMenu)
      window.removeEventListener('hashchange', closeMenu)
    }
  }, [])

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
    <header className={`mh-header${isMenuOpen ? ' is-menu-open' : ''}${isCollapsed && !isMenuOpen ? ' is-collapsed' : ''}`} onKeyDown={(event) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }}>
      <div className="mh-nav">
        <button ref={menuButtonRef} className="mh-menu-button" type="button" aria-label={isMenuOpen ? '메뉴 닫기' : '메뉴 열기'} aria-expanded={isMenuOpen} aria-controls="mh-mobile-menu" onClick={() => setIsMenuOpen((open) => !open)}>
          <svg className="mh-menu-icon" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
            <path className="mh-menu-icon-path" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5l7 0l7 0M5 12h14M5 19l7 0l7 0" />
          </svg>
        </button>
        <button
          className="mh-logo-button"
          type="button"
          aria-label="Home으로 이동"
          onClick={() => {
            setIsMenuOpen(false)
            onNavigate('Home')
          }}
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
      <nav id="mh-mobile-menu" className="mh-mobile-menu" aria-label="모바일 메뉴" aria-hidden={!isMenuOpen} inert={!isMenuOpen}>
        <div className="mh-mobile-menu-inner">
          <div className="mh-mobile-menu-groups">
            <section className="mh-mobile-menu-group" aria-labelledby="mh-mobile-links-title">
              <h2 id="mh-mobile-links-title">Link</h2>
              <div className="mh-mobile-menu-links">
                {[...headerLinks, 'MyPage'].map((page) => (
                  <button key={page} type="button" aria-current={activePage === page ? 'page' : undefined} onClick={() => navigateFromMenu(page)}>
                    {page === 'MyPage' ? 'My Page' : page}
                  </button>
                ))}
              </div>
            </section>
            <section className="mh-mobile-menu-group mh-mobile-support" aria-labelledby="mh-mobile-support-title">
              <h2 id="mh-mobile-support-title">Support</h2>
              <div className="mh-mobile-menu-links">
                {footerColumns.find((column) => column.title === 'Support').links.map((link) => (
                  <button key={link.page} type="button" onClick={() => navigateFromMenu(link.page)}>{link.label}</button>
                ))}
              </div>
            </section>
          </div>
          <Brand className="mh-mobile-menu-brand" onNavigate={navigateFromMenu} />
        </div>
      </nav>
    </header>
  )
}

export default Header
