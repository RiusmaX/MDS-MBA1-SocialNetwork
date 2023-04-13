import { Grid } from "@mui/material";
import PostListItem from "./PostListItem";

const PostList = ({ posts }) => {
  if (!posts || posts.length < 1) {
    return <h4>No data...</h4>;
  }

  return (
    <Grid container columns={16} spacing={1} marginTop={2}>
      {posts.map((post) => {
        return (
          <div key={post.id}>
            <PostListItem post={post} />
          </div>
        );
      })}
    </Grid>
  );
};

export default PostList;
