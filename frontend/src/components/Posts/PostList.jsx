import PostListItem from './PostListItem'

const PostList = ({ posts }) => {
  if (!posts || posts.length < 1) {
    return <h4>No data...</h4>
  }

  return (
    <div className='postListContainer'>
      {posts.map((post) => {
        return <PostListItem key={post} post={post} seeDetails={true} />
      })}
    </div>
  )
}

export default PostList
