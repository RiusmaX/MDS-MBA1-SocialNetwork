import { gql } from '@apollo/client'

const GET_CHATS = gql`
query {
  chats {
    data {
      id,
      attributes {
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
const GET_CHATS_WITH_USER = (id) => gql`
query {
  chats(filters: {users_permissions_users: {id: {eq: ${id}}}}) {
    data {
      id,
      attributes {
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

// const GET_CHATS_WITH_USER = (id) => gql`
// query {
//   usersPermissionsUser(id: ${id}){
//     data{
//       id,
//       attributes{
//         username,
//         chats{
//           data{
//             id,
//             attributes{
//               name,
//               users_permissions_users{
//                 data{
//                   id,
//                   attributes{username}
//                 }
//               }
//              image {
//                 data {
//                     id,
//                     attributes {
//                     name,
//                     url
//                     }
//                 }
//              }
//             }
//           }
//         }
//       }
//     }
//   }
// }
// `

const GET_CHAT_MESSAGE = (id) => gql`
query{
  messages(filters: {chat: {id: {eq: 1}}}){
    data {
      id,
      attributes{
        messageText,
        sendDate,
        media {
          data{
            id,
            attributes{
              url
            }
          }
        },
        users_permissions_user{
          data{
            id,
            attributes{
              username
            }
          }
        }
      }
    }
  }
}
`

export {
    GET_CHATS,
    GET_CHATS_WITH_USER
}