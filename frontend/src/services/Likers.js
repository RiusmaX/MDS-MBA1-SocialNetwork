import { useQuery, useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import {
  GET_LIKER_ID,
  LIKE_POST,
  UNLIKE_POST
} from '../graphql/queries/likersQueries'

function useLikePost (postId, userId) {
  const [likerId, setLikerId] = useState(null)
  const [isLike, setIsLike] = useState(0)

  const getLikerId = useQuery(GET_LIKER_ID, {
    variables: { postId, userId, isLike }
  })

  useEffect(() => {
    if (getLikerId.data?.likers?.data[0]?.id) {
      setLikerId(userId)
      setIsLike(getLikerId.data?.likers?.data[0]?.reaction || 0)
    } else {
      setLikerId(userId)
    }
  }, [getLikerId.data?.likers?.data?.[0], getLikerId.loading])

  const [likePost] = useMutation(LIKE_POST, {
    variables: { postId, userId, isLike }
  })

  const [unlikePost] = useMutation(UNLIKE_POST, {
    variables: { likerId }
  })

  const handleLikePost = async (newReaction) => {
    await getLikerId.refetch()

    if (isLike === newReaction) {
      unlikePost()
      setIsLike(0)
    } else {
      likePost()
      setIsLike(newReaction)
    }
  }

  return { handleLikePost, isLike, setIsLike }
}

export default useLikePost
