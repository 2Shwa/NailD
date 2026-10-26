import { useState } from 'react'
import { ASSETS } from '../../appConfig'

function DesignCard({ card }) {
  const [isLiked, setIsLiked] = useState(false)

  return (
    <article className="mh-design-card">
      <div className={`mh-design-art ${card.pattern}`} />
      <div className="mh-design-info">
        <div>
          <h3>{card.name}</h3>
          <p>{card.author}</p>
        </div>
        <div className="mh-like-count">
          <button
            className="mh-heart-icon"
            type="button"
            aria-label={`${card.name} 좋아요`}
            aria-pressed={isLiked}
            onClick={() => setIsLiked((liked) => !liked)}
          >
            <img src={isLiked ? ASSETS.heartActive : ASSETS.heartInactive} alt="" />
          </button>
          <strong>{card.likes}</strong>
        </div>
      </div>
    </article>
  )
}

export default DesignCard
