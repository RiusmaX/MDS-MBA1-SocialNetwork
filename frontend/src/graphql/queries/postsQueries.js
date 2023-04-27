import { gql } from '@apollo/client'

const GET_POSTS = gql`
query {
  posts {
    data {
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
    }
  }
}
`

const GET_POST_COMMENTS = (id) => gql`
query {
  posts {
    data {
      id,
      attributes {
        title, 
        content, 
        medias {
          data {
            id,
            attributes {
              name,
              url
            }
          }
        },
        relativeTo (id: ${id}) {
          data {
            id
          }
        }
      }
    }
  }
}
`

export {
  GET_POSTS
}
