import { useState } from 'react'
import { ASSETS } from '../../appConfig'

function DesignCard({ card }) {
  const [isSaved, setIsSaved] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  return (
    <article className="mh-design-card">
      <div className={`mh-design-art ${card.pattern}`}>
        <button
          className="mh-save-button"
          type="button"
          aria-label={`${card.name} 저장`}
          aria-pressed={isSaved}
          onClick={() => setIsSaved((saved) => !saved)}
        >
          <img src={isSaved ? ASSETS.bookmarkActive : ASSETS.bookmarkInactive} alt="" />
        </button>
      </div>
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
