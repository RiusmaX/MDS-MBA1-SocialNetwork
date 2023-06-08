import { gql } from '@apollo/client';

const GET_CHATS = gql`
  query {
    chats {
      data {
        id
        attributes {
          name
          image {
            data {
              id
              attributes {
                name
                url
              }
            }
          }
        }
      }
    }
  }
}
`

const GET_CHAT_BY_ID = (id) => gql`
query {
  chats(filters: {id: {eq: ${id}}}) {
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
const GET_CHATS_BY_IDS = (ids) => gql`
query {
  chats(filters: {id: {in: ${JSON.stringify(ids)}}}) {
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
}`

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

const GET_CHAT = (id) => gql`
query{
  chat(id: ${id}) {
    data {
      id
      attributes {
        name
        image {
          data {
            id
            attributes {
              name
              url
            }
          }
        }
        messages(pagination: {pageSize: 100})  {
          data {
            id
            attributes {
              messageText
              sendDate
              media {
                data {
                  id
                  attributes {
                    url
                  }
                }
              }
              users_permissions_user {
                data {
                  id
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
`

const GET_CHAT_MESSAGE = (id) => gql`
query{
  messages(pagination: { limit: 100 }, filters: {chat: {id: {eq: ${id}}}}){
    data {
      id,
      attributes{
        messageText,
        sendDate,
        media {
          data{
            id,
            attributes{
              url
            }
          }
        },
        users_permissions_user{
          data{
            id,
            attributes{
              username,
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

const GET_LAST_CHAT_MESSAGE = (id) => gql`
query{
  messages(sort: "sendDate:desc", filters: {chat: {id: {eq: ${id}}}}, pagination: { limit: 1 }){
    data {
      id,
      attributes{
        messageText,
        sendDate,
        media {
          data{
            id,
            attributes{
              url
            }
          }
        },
        users_permissions_user{
          data{
            id,
            attributes{
              username
            }
          }
        }
      }
    }
  }
}
`

export {
  GET_CHATS,
  GET_CHAT_BY_ID,
  GET_CHATS_BY_IDS,
  GET_CHATS_WITH_USER,
  GET_CHAT_MESSAGE,
  GET_LAST_CHAT_MESSAGE,
  GET_CHAT
};
