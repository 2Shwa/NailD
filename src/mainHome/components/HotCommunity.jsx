import { communityPosts } from '../mainHomeData'
import CommunityPost from './CommunityPost'

function HotCommunity() {
  return (
    <section className="mh-showcase-section community">
      <div className="mh-section-title">
        <h2>Hot Community</h2>
      </div>
      <div className="mh-community-head">
        <button type="button">전체 보기</button>
      </div>
      <div className="mh-post-list">
        {communityPosts.map((post) => (
          <CommunityPost post={post} key={post.id} />
        ))}
      </div>
      <button className="mh-outline-button" type="button">
        커뮤니티 구경하기
      </button>
    </section>
  )
}

export default HotCommunity
