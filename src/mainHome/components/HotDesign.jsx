import { designCards } from '../mainHomeData'
import DesignCard from './DesignCard'

function HotDesign() {
  return (
    <section className="mh-showcase-section">
      <div className="mh-section-title">
        <h2>Hot Design</h2>
      </div>
      <div className="mh-design-list">
        {designCards.map((card) => (
          <DesignCard card={card} key={`${card.pattern}-${card.name}`} />
        ))}
      </div>
      <button className="mh-outline-button" type="button">
        더 많은 디자인 구경하기
      </button>
    </section>
  )
}

export default HotDesign
