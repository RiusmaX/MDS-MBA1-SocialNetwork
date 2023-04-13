import { gql } from '@apollo/client'

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

const GET_USER_WITH_POSTS_MYSELF = (id) => gql`
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

const GET_USER_WITH_POSTS_OTHER = (id) => gql`
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
  GET_USER_WITH_POSTS_MYSELF,
  GET_USER_WITH_POSTS_OTHER
}
