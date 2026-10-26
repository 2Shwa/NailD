import { ASSETS } from '../../appConfig'

function Brand({ onNavigate, className = '' }) {
  return (
    <div className={`mh-footer-brand ${className}`}>
      <button className="mh-footer-logo" type="button" aria-label="Home으로 이동" onClick={() => onNavigate('Home')}>
        <img src={ASSETS.naillogo} alt="" aria-hidden="true" />
        <img src={ASSETS.pinktextlogo} alt="Nail:D" />
      </button>
      <p className="mh-intro-description">
        <span>Create, Design, Share.</span>
        <span>나만의 네일 디자인을 만들고 공유해보세요.</span>
      </p>
    </div>
  )
}

export default Brand
