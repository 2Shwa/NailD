import { communityPosts } from '../mainHomeData'
import CommunityPost from './CommunityPost'

function HotCommunity({ title = 'Hot Community' }) {
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
    </section>
  )
}

export default HotCommunity
