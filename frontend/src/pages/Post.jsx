import PostDetail from '../components/Posts/PostDetail'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_POST_BY_ID } from '../graphql/queries/postsQueries'

const Post = () => {
  const { id } = useParams()
  const { loading, error, data } = useQuery(GET_POST_BY_ID(id), {
    variables: { id: id },
  });
  

  if (loading) {
    return <h4>Chargement...</h4>
  }

  if (error) {
    return (
      <>
        <h1>ERROR</h1>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </>
    )
  }

  if (data) {
    return (
      <>
        <PostDetail post={data.post.data} comments={data.comments.data}/>
      </>
    )
  }
}

export default Post
