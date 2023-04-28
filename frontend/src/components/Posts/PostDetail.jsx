import { useState } from 'react'
import PostListItem from './PostListItem'
import '../../styles/PostDetail.scss'
import AddComment from './AddComment'

const PostDetail = ({ post, comments: initialComments }) => {
  const [comments, setComments] = useState(initialComments)

  const addComment = (newComment) => {
    setComments([...comments, newComment])
  }

  if (!post) {
    return <h4>No data...</h4>
  }

  return (
    <div className='postListContainer'>
      <PostListItem key={post} post={post} seeDetails={false} />
      <div className='line' />
      <AddComment relativeToId={post.id} userData={post.attributes.user.data} addComment={addComment} />
      <div className='line' />
      {comments.map((comment) => {
        return <PostListItem key={comment} post={comment} seeDetails={false} />
      })}
    </div>
  )
}

export default PostDetail
