import PostListItem from "./PostListItem";

const PostList = ({ posts }) => {
  if (!posts || posts.length < 1) {
    return <h4>No data...</h4>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {posts.map((post) => {
        return <PostListItem post={post} />;
      })}
    </div>
  );
};

export default PostList;
