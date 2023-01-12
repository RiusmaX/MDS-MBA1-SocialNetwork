
const PostListItem = ({ post }) => {
  return (
    <div className='postContainer'>
      <h3>{post.attributes.title}</h3>
      <p>{post.attributes.content}</p>
    </div>
  )
}

export default PostListItem
