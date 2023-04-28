import PostListItem from './PostListItem'

const PostList = ({ posts }) => {
  if (!posts || posts.length < 1) {
    return <h4>No data...</h4>
  }

  return (
    <>
      {posts.map((post) => {
        // list of posts
        return <PostListItem key={post.id} post={post} />
      })}
    </>
  )
}

export default PostList
