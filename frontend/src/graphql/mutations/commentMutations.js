import { gql } from '@apollo/client'

const ADD_COMMENT = gql`mutation CreatePost($content: String!, $userId: ID!, $relativeToId: ID) {
  createPost(data: {
    content: $content
    user: $userId
    relativeTo: $relativeToId
  }) {data {id}}
}
`

export {
  ADD_COMMENT
}
