import PostListItem from "./PostListItem";

const PostList = ({ posts }) => {
  if (!posts || posts.length < 1) {
    return <h4>No data...</h4>;
  }

  return (
    <div className="postListContainer">
      {posts.map((post) => {
        // list of posts
        return <PostListItem key={post.id} post={post} />;
      })}
    </div>
  );
};

export default PostList;
