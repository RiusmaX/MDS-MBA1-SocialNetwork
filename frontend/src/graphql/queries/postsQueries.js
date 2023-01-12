import { gql } from '@apollo/client'

const GET_POSTS = gql`
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
        }
      }
    }
  }
}
`

export {
  GET_POSTS
}
