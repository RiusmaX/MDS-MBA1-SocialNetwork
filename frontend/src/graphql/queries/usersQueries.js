import { gql } from '@apollo/client'

// Requête qui retourne la liste des utilisateurs
const GET_USERS = gql`
query {
  usersPermissionsUsers {
    data {
      id,
      attributes {
        username,
        email,
        firstName,
        lastName,
        avatar {
          data {
            attributes {
              url
            }
          }
        }
      }
    }
  }
}
`
// Requêtes qui retourne les informations de l'utilisateur connecté ainsi que ses publication
const GET_ME_PROFILE = (id) => gql`
query {
  usersPermissionsUser (id: ${id}) {
    data {
      id,
      attributes {
        username,
        email,
        firstName,
        lastName,
        phone,
        avatar {
          data {
            attributes {
              url
            }
          }
        }
      }
    }
  }
}
`

// Requêtes qui retourne les informations de profil d'autre utilisateur
// ainsi que ses publication
const GET_USER_PROFILE = (id) => gql`
query {
  usersPermissionsUser (id: ${id}) {
    data {
      id,
      attributes {
        username,
        avatar {
          data {
            attributes {
              url
            }
          }
        },
        email,
        firstName,
        lastName,
        phone,
      }
    }
  }
}
`

const GET_USER_BY_EMAIL = (email) => gql`
query {
  usersPermissionsUsers (filters: {email: {eq: "${email}" }}){
    data {
      id,
      attributes {
        username,
        email,
        firstName,
        lastName,
        phone,
      }
    }
  }
}
`

const GET_FOLLOWERS = (id) => gql`
query getFollower{
  usersPermissionsUser (id: ${id}){
    data {
      id
      attributes {
        follows {
          data {
            id
          }
        }
      }
    }
  }
}
`

export {
  GET_USERS,
  GET_ME_PROFILE,
  GET_USER_PROFILE,
  GET_USER_BY_EMAIL,
  GET_FOLLOWERS
}
