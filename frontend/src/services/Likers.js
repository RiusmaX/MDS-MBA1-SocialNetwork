import { useQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import {
  GET_LIKER_ID,
  LIKE_POST,
  UNLIKE_POST,
} from "../graphql/queries/likersQueries";

function useLikePost(postId, userId) {
  const [likerId, setLikerId] = useState(null);

  const getLikerId = useQuery(GET_LIKER_ID, {
    variables: { postId, userId },
  });

  useEffect(() => {
    if (getLikerId.data?.likers?.data[0]?.id) {
      setLikerId(getLikerId.data?.likers?.data[0]?.id);
    } else {
      setLikerId(null);
    }
  }, [getLikerId.data?.likers?.data[0]?.id]);

  const [likePost] = useMutation(LIKE_POST, {
    variables: { postId, userId },
  });

  const [unlikePost] = useMutation(UNLIKE_POST, {
    variables: { likerId },
  });

  const handleLikePost = async () => {
    await getLikerId.refetch();

    if (likerId) {
      unlikePost();
      setIsLike(false);
    } else {
      likePost();
      setIsLike(true);
    }
  };

  const [isLike, setIsLike] = useState(false);
  useEffect(() => {
    if (getLikerId.data?.likers?.data[0]?.id) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [getLikerId.data?.likers?.data[0]?.id]);

  return { handleLikePost, isLike, setIsLike };
}

export default useLikePost;
