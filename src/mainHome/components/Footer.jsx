import { ASSETS } from '../../appConfig'
import { footerColumns } from '../mainHomeData'

function Footer({ onNavigate }) {
  const handleLogoClick = () => {
    onNavigate('Home')
  }

  return (
    <footer className="mh-footer">
      <div className="mh-footer-inner">
        <div className="mh-footer-brand">
          <button
            className="mh-footer-logo"
            type="button"
            aria-label="Home으로 이동"
            onClick={handleLogoClick}
          >
            <img src={ASSETS.naillogo} alt="" aria-hidden="true" />
            <img src={ASSETS.pinktextlogo} alt="Nail:D" />
          </button>
          <p className="mh-intro-description">
            <span>Create, Design, Share.</span>
            <span>나만의 네일 디자인을 만들고 공유해보세요.</span>
          </p>
        </div>
        <div className="mh-footer-columns">
          {footerColumns.map((column) => (
            <section className="mh-footer-column" key={column.title}>
              <h2>{column.title}</h2>
              {column.links.map((link) => (
                <button type="button" key={link.page} onClick={() => onNavigate(link.page)}>
                  {link.label}
                </button>
              ))}
            </section>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
