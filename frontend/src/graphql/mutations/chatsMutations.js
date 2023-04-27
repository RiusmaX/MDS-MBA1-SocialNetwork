import { gql } from '@apollo/client'

// idUsers => list of users id that participate in the chat, minimum is 2 users
const POST_CHAT_MESSAGE = (name, mediaUrl, idUsers) => gql`
mutation {
  createChat(input: {
    data: {
      name: ${name},
      image: ${mediaUrl},
      users_permissions_users: ${idUsers}
    }
  }) {
    data {
      id
      attributes{
        name, 
        image{
          data{
            id
          }
        }, 
        users_permissions_users{
          data{
            id
          }
        }
      }
    }
  }
}
`
const ADD_USER_TO_CHAT = (id) => gql`
mutation{
  createChat{
    data{
      id, 
      attributes{
        name, 
        image,
        users_permissions_users{
          data{
            id
          }
        }
      }
    }
  }
}
`

export {
    POST_CHAT_MESSAGE,
    ADD_USER_TO_CHAT
}