import { gql } from "@apollo/client";

const LIKE_POST = gql`
  mutation LikePost($postId: ID!, $userId: ID!) {
    createLiker(data: { post: $postId, user: $userId }) {
      data {
        id
      }
    }
  }
`;

const UNLIKE_POST = gql`
  mutation UnlikePost($likerId: ID!) {
    deleteLiker(id: $likerId) {
      data {
        id
      }
    }
  }
`;

const GET_LIKER_ID = gql`
  query GetLikerId($postId: ID!, $userId: ID!) {
    likers(
      filters: { post: { id: { eq: $postId } }, user: { id: { eq: $userId } } }
    ) {
      data {
        id
      }
    }
  }
`;

export { LIKE_POST, UNLIKE_POST, GET_LIKER_ID };
