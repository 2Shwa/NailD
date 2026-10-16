function CommunityPost({ post }) {
  return (
    <article className="mh-post-row">
      <div className="mh-post-title">
        <span>{post.category}</span>
        <strong>{post.title}</strong>
        <em>[{post.comments}]</em>
      </div>
      <time dateTime={post.date.replaceAll('.', '-')}>{post.date}</time>
    </article>
  )
}

export default CommunityPost
