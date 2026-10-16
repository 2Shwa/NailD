import { ASSETS } from '../../appConfig'
import { footerColumns } from '../mainHomeData'

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
                <button type="button" key={link}>
                  {link}
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
