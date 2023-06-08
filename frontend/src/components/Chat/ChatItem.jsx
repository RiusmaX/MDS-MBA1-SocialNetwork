import { Box, Toolbar, Typography } from '@mui/material'
import { useQuery } from '@apollo/client'
import ChatSendingForm from './ChatSendingForm'
import { GET_CHAT } from '../../graphql/queries/chatsQueries'
import { ChatBubble } from './ChatBubble'
import { useEffect, useRef, useState } from 'react'
import { subscribeToMessages } from '../../services/socket'
import { useAuth } from '../../contexts/AuthContext'
import { styled, alpha } from '@mui/material/styles'

const MyToolbar = styled(Toolbar)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.common.black, 0.20),
  border: `2px solid ${alpha(theme.palette.common.black, 0.60)}`
}))

const ChatItem = ({ id }) => {
  const { state: { user, token } } = useAuth()

  const getChat = useQuery(GET_CHAT(id), {
    context: {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  })

  const [messages, setMessages] = useState([])

  const [data, setData] = useState({
    chat: null,
    isLoading: true,
    error: null
  })

  useEffect(() => {
    if (getChat.data) {
      setData({
        ...data,
        chat: getChat.data.chat?.data?.attributes ?? null,
        isLoading: false
      })
      setMessages(getChat.data.chat?.data?.attributes?.messages?.data ?? [])
    }
    if (getChat.error) {
      setData({
        ...data,
        error: getChat.error,
        isLoading: false
      })
    }
  }, [getChat])

  useEffect(() => {
    subscribeToMessages(id, setMessages)
  }, [id])

  const lastMessage = useRef(null)
  useEffect(() => {
    lastMessage?.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (data.error) {
    return (
      <>
        <h1>ERROR</h1>
        <pre>{JSON.stringify(data.error, null, 2)}</pre>
      </>
    )
  }

  if (data.isLoading) {
    return <h2>Chargement...</h2>
  }

  if (!data.isLoading && !data.chat) {
    return (
      <>
        <h3>Discussion non trouvée</h3>
      </>
    )
  }

  return (
    <Box width='100%' height='100%' display='flex' flexDirection='column'>
      <MyToolbar>
        <Box display='flex' justifyContent='space-between'>
          <Typography
            variant='subtitle'
            component='div'
          >
            {data.chat?.name}
          </Typography>
        </Box>
      </MyToolbar>
      <Box flexGrow={1} sx={{ overflow: 'auto' }}>
        {messages && messages.length > 0
          ? messages.map((message) => (
            <ChatBubble
              key={message.id}
              content={message?.attributes?.messageText}
              date={message?.attributes?.sendDate}
              author={message?.attributes?.users_permissions_user?.data?.attributes}
              reverse={parseInt(message?.attributes?.users_permissions_user?.data?.id) === parseInt(user.id)}
              isMySelf={parseInt(message?.attributes?.users_permissions_user?.data?.id) === parseInt(user.id)}
            />
          ))
          : (<h3>Aucun message</h3>)}
        <div ref={lastMessage} />
      </Box>
      <ChatSendingForm chatId={id} />
    </Box>
  )
}

export default ChatItem
