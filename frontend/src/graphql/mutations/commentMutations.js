import { gql } from '@apollo/client'

const ADD_COMMENT = gql`mutation CreatePost($content: String!, $userId: ID!, $relativeToId: ID) {
  createPost(data: {
    content: $content
    user: $userId
    relativeTo: $relativeToId
  }) {data {
      id,
      attributes {
        title, 
        content,
        likers {
          data {
            id
          }
        },
        createdAt, 
        medias {
          data {
            id,
            attributes {
              name,
              url
            }
          }
        },
        user {
          data {
            id,
            attributes{
              username,
              firstName,
              avatar {
                data {
                  id,
                  attributes {
                    name,
                    url
                  }
                }
              }
            }
          }
        }
      }
    }}
}
`

const UPDATE_COMMENT = gql`
mutation UpdatePost($postId: ID!, $content: String!) {
  updatePost(    
    id: $postId,
    data: {
    content: $content
  }) {data {
      id,
      attributes {
        title, 
        content,
        likers {
          data {
            id
          }
        },
        createdAt, 
        medias {
          data {
            id,
            attributes {
              name,
              url
            }
          }
        },
        user {
          data {
            id,
            attributes{
              username,
              firstName,
              avatar {
                data {
                  id,
                  attributes {
                    name,
                    url
                  }
                }
              }
            }
          }
        }
      }
    }}
}
`

export {
  ADD_COMMENT,
  UPDATE_COMMENT
}
