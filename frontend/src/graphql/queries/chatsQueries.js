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

export {
    GET_CHATS,
    GET_CHATS_WITH_USER
}