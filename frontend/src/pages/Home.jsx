import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../graphql/queries/postsQueries";
import PostList from "../components/Posts/PostList";

const Home = () => {
  const { data, loading, error } = useQuery(GET_POSTS);

  // Loading and error handling
  if (loading) {
    return <h4>Chargement...</h4>;
  }

  if (error) {
    return (
      <>
        <h1>ERROR</h1>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </>
    );
  }

  if (data) {
    return (
      <>
        <h1>Home</h1>
        <PostList posts={data.posts.data} />
      </>
    );
  }
};

export default Home;
