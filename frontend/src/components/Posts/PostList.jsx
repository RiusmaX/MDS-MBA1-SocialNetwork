import { Grid } from '@mui/material'
import PostListItem from './PostListItem'

const PostList = ({ posts }) => {
  if (!posts || posts.length < 1) {
    return <h4>No data...</h4>
  }

  return (
    <Grid container columns={16} spacing={1} marginTop={2}>
      {
        posts.map(post => {
          return (
            <Grid
              key={post.id}
              xs={6}
            >
              <PostListItem post={post} />
            </Grid>
          )
        })
      }
    </Grid>
  )
}

export default PostList
