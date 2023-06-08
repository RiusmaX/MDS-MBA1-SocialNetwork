import { gql } from '@apollo/client'

const GET_POSTS = gql`
query {
  posts(filters: {relativeTo: { id: {eq: null}}}) {
    data {
      id,
      attributes {
        title, 
        content,
        likers {
          data {
            id
          }
        },
        createdAt, 
        medias {
          data {
            id,
            attributes {
              name,
              url
            }
          }
        },
        user {
          data {
            id,
            attributes{
              username,
              firstName,
              avatar {
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
    }
  }
}

`
const GET_POST_BY_ID = (id) => gql`
query GetPostById($id: ID!) {
  post(id: $id) {
    data {
      id
      attributes {
        title
        content,
        likers {
          data {
            id
          }
        },
        createdAt, 
        medias {
          data {
            id,
            attributes {
              name,
              url
            }
          }
        },
        user {
          data {
            id,
            attributes{
              username,
              firstName,
              avatar {
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
    }
  },
  comments: posts(filters: {relativeTo: { id: { eq : $id } }}) {
    data {
      id
      attributes {
        title
        content,
        likers {
          data {
            id
          }
        },
        createdAt, 
        medias {
          data {
            id,
            attributes {
              name,
              url
            }
          }
        },
        user {
          data {
            id,
            attributes{
              username,
              firstName,
              avatar {
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
    }
  }
}
`

const GET_POSTS_BY_USER_ID = (id) => gql`
query {
  posts (filters: {user: {id: {eq: ${id} }}}){
    data {
      id,
      attributes {
        title, 
        content,
        likers {
          data {
            id
          }
        },
        createdAt, 
        medias {
          data {
            id,
            attributes {
              name,
              url
            }
          }
        },
        user {
          data {
            id,
            attributes{
              username,
              firstName,
              avatar {
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
    }
  }
}
`

const GET_POST_COMMENTS = (id) => gql`
query {
  posts {
    data {
      id,
      attributes {
        title, 
        content, 
        medias {
          data {
            id,
            attributes {
              name,
              url
            }
          }
        },
        relativeTo (id: ${id}) {
          data {
            id
          }
        }
      }
    }
  }
}
`

const GET_REPOSTS = (id) => gql`
query {
  usersPermissionsUser(id: ${id}) {
    data {
      attributes {
        reposts {
          data {
            attributes {
              post {
                data {
                  attributes {
                    title
                    content
                    medias {
                      data {
                        attributes {
                          url
                        }
                      }
                    }
                    user {
                      data {
                        attributes {
                          username
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
          }
        }
      }
    }
  }
}
`

export {
  GET_POSTS,
  GET_POST_BY_ID,
  GET_POST_COMMENTS,
  GET_POSTS_BY_USER_ID,
  GET_REPOSTS
}
