import { gql } from '@apollo/client'

const GET_CHATS = gql`
query {
  chats {
    data {
      id,
      attributes {
        name, 
        lastMessageDate, 
        image {
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
    GET_CHATS
}