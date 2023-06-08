import { gql } from '@apollo/client'

const ADD_POST = gql`mutation CreatePost($content: String!, $userId: ID!, $media: [ID!]) {
  createPost(data: {
    content: $content
    user: $userId
    medias: $media
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
  ADD_POST
}
