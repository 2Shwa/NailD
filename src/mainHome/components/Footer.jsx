import Brand from './Brand'
import { footerColumns } from '../mainHomeData'

function Footer({ onNavigate }) {
  return (
    <footer className="mh-footer">
      <div className="mh-footer-inner">
        <Brand onNavigate={onNavigate} />
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
