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
// Requêtes qui retourne les informations de l'utilisateur connecter ainsi que ses publication
const GET_ME_WITH_POSTS = (id) => gql`
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
        }
      }
    }
  }
}
`

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
        }
      }
    }
  }
}
`

export {
  GET_USERS,
  GET_ME_WITH_POSTS,
  GET_USER_WITH_POSTS_BY_ID
}
