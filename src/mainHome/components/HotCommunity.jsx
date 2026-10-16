import { communityPosts } from '../mainHomeData'
import CommunityPost from './CommunityPost'

function HotCommunity({ title = 'Hot Community', onBrowse }) {
  return (
    <section className="mh-showcase-section community">
      <div className="mh-section-title">
        <h2>{title}</h2>
      </div>
      <div className="mh-post-list">
        {communityPosts.map((post) => (
          <CommunityPost post={post} key={post.id} />
        ))}
      </div>
      {onBrowse && (
        <div className="mh-community-actions">
          <button className="mh-outline-button" type="button" onClick={onBrowse}>
            커뮤니티 구경하기
          </button>
        </div>
      )}
    </section>
  )
}

export default HotCommunity
