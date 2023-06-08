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

const ADD_BIOGRAPHY = gql`
mutation AddBiography($userId: ID!, $biography: String!) {
  updateUsersPermissionsUser(    
    id: $userId,
    data: {
    biography: $biography
  })
  {
    data {
      attributes {
        biography
      }
    }
  }
}`

export {
  ADD_FOLLOWER,
  ADD_BIOGRAPHY
}
