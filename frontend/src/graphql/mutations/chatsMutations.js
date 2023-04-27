import { gql } from '@apollo/client'

const CREATE_CHAT = gql`
   mutation CreateChat($name: String!, $users: [ID!], $date: DateTime!) {
    createChat(data: {name: $name, users_permissions_users: $users, publishedAt: $date}) {
      data {
        id,
        attributes {
          users_permissions_users {data {id}}
          name, 
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
  CREATE_CHAT
}
