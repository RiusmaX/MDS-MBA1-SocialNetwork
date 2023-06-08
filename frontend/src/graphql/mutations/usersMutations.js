import { gql } from '@apollo/client'

// idUsers => list of users id that participate in the chat, minimum is 2 users
const ADD_FOLLOWER = gql`
mutation addFollower ($id: ID!, $arrayOfFollow: [ID]){
  updateUsersPermissionsUser(
    id: $id,
    data: {
      follows: $arrayOfFollow
    }
  )
  {
    data {
      attributes {
        follows {
          data {id}
        }
      }
    }
  }
}`

export {
  ADD_FOLLOWER
}
