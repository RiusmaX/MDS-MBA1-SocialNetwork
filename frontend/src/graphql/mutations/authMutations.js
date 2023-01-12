import { gql } from '@apollo/client'

const LOGIN_MUTATION = gql`
  mutation Login($identifier: String!, $password: String!) {
    login(input: {identifier: $identifier, password: $password}) {
      jwt,
      user {
        id,
        email,
        username
      }
    }
  }
`

export {
  LOGIN_MUTATION
}
