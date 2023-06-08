import io from 'socket.io-client'
import { getProfile } from './Api'

const socket = io('http://localhost:1337')

export const subscribeToPosts = (setPosts) => {
  // Listening to socket events for new posts

  socket.on('post:create', (data) => {
    setPosts((prevPosts) => [
      ...prevPosts,
      { id: String(data.id), attributes: data }
    ])
  })

  // receive new posts sent by the server
  socket.on('post:update', (data) => {
    setPosts((prevPosts) => {
      const index = prevPosts.findIndex(
        (post) => Number(post.id) === Number(data.id)
      )
      prevPosts.splice(index, 1)
      return prevPosts
    })
    setPosts((prevPosts) => [
      ...prevPosts,
      { id: String(data.id), attributes: data }
    ])
  })

  return () => {
    socket.off('connect')
    socket.off('disconnect')
    socket.off('post')
    socket.off('post:create')
    socket.off('post:update')
  }
}

export const subscribeToMessages = (idConv, setMessages) => {
  // Listening to socket events for new messages

  socket.on('message:create', async (data) => {
    data = data.data
    if (parseInt(idConv) === parseInt(data.attributes.chat.data.id)) {
      const user = await getProfile(data.attributes.users_permissions_user.data.id)
      setMessages((prevMessages) => {
        const find = prevMessages.findIndex((_data) => parseInt(_data.id) === parseInt(data.id))
        if (find === -1) {
          return [
            ...prevMessages,
            {
              id: String(data.id),
              attributes: {
                ...data.attributes,
                users_permissions_user: {
                  data: {
                    ...data.attributes.users_permissions_user.data,
                    attributes: {
                      ...user
                    }
                  }
                }
              }
            }
          ]
        }
        return [
          ...prevMessages
        ]
      })
    }
  })

  return () => {
    socket.off('connect')
    socket.off('disconnect')
    socket.off('message')
    socket.off('message:create')
  }
}

export default socket
