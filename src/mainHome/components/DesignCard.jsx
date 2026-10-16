function DesignCard({ card }) {
  return (
    <article className="mh-design-card">
      <div className={`mh-design-art ${card.pattern}`}>
        <button className="mh-save-button" type="button" aria-label={`${card.name} 저장`} />
      </div>
      <div className="mh-design-info">
        <div>
          <h3>{card.name}</h3>
          <p>{card.author}</p>
        </div>
        <div className="mh-like-count">
          <span className="mh-heart-icon" aria-hidden="true" />
          <strong>{card.likes}</strong>
        </div>
      </div>
    </article>
  )
}

export default DesignCard
