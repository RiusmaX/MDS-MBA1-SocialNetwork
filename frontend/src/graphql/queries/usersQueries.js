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
}`

// Requêtes qui retourne les informations de profil d'autre utilisateur
// ainsi que ses publication
const GET_USER_WITH_POSTS_BY_ID = (id) => gql`
query {
  usersPermissionsUser (id: ${id}) {
    data {
      id,
      attributes {
        username,
        posts {
          data {
            id,
            attributes {
              title,
              content
              medias {
                data {
                  id,
                  attributes {
                    name,
                    url
                  }
                }
              }
            },
          }
        },
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
const GET_FRIENDS = (userId) => gql`
query {
  friendships(filters:
    {
        or: [
          {
          status: {
            eq: "friends"
          }
          },
          {
            status: {
              eq: "sent"
            }
          }

      ]
      and: {
        or: [
          {        
            user1: {
              id: {
            eq: ${userId}
          }
        }}
          {
            user2: {
              id: {
            eq: ${userId}
          }
        }}
        ]
      }
    }
  ) {
    data {
      attributes {
        user1 { 
          data {
            id
            attributes 
            {
              firstName 
              lastName
            }
          }
        }
        user2 { 
          data {
            id
            attributes 
            {
              firstName 
              lastName
            }
          }
        }
      }
    }
  }
}
`

const GET_FRIENDS_REQUEST = (userId) => gql`
query {
  friendships(filters:
    {
      status: {eq: "sent"}
      and: {
            user2: {
              id: {
            eq: ${userId}
          }
            }
          }
      
    }
  ) {
    data {
      id
      attributes {
        user1 { 
          data {
            id
            attributes 
            {
              firstName 
              lastName
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
    }
  }
}
`

export {
  GET_USERS,
  GET_ME_PROFILE,
  GET_USER_PROFILE,
  GET_USER_BY_EMAIL,
  GET_USER_WITH_POSTS_BY_ID,
  GET_FRIENDS,
  GET_FRIENDS_REQUEST,
  GET_FOLLOWERS
}
