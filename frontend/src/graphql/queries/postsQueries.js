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

const GET_POSTS_BY_USER_ID = (id) => gql`
query {
  posts (filters: {user: {id: {eq: ${id} }}}){
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

export {
  GET_POSTS,
  GET_POSTS_BY_USER_ID
}
