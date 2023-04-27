import PostListItem from './PostListItem'
import '../../styles/PostDetail.scss'
import AddComment from './AddComment'

const PostDetail = ({ post, comments }) => {
  if (!post) {
    return <h4>No data...</h4>
  }

  return (
    <div className='postListContainer'>
      <PostListItem key={post} post={post} seeDetails={false}/>
      <div className='line'></div>
      <AddComment relativeToId={post.id} userData={post.attributes.user.data}></AddComment>
      <div className='line'></div>
      {comments.map((comment) => {
        return <PostListItem key={comment} post={comment} seeDetails={false}/>
      })}
    </div>
  )
}

export default PostDetail