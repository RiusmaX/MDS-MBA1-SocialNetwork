import { gql } from '@apollo/client'

const REQUEST_FRIEND = gql`mutation CreateFriendship($user1: ID, $user2: ID, $status: ENUM_FRIENDSHIP_STATUS){
    createFriendship(data: {
        user1: $user1
        user2: $user2
        status: $status
    }){
        data {
            id
        }
    }
}`

const CHANGE_FRIENDSHIP_STATUS = gql`mutation  UpdateFriendship($id: ID!, $status: ENUM_FRIENDSHIP_STATUS) {
    updateFriendship(
      id: $id
      data: {
        status: $status
    }){
        data {
            id
        }
    }
}

`

export {
    REQUEST_FRIEND,
    CHANGE_FRIENDSHIP_STATUS
}
