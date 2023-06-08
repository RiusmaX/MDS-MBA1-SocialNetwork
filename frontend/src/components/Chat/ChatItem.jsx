import { Box, Toolbar, Typography, Button } from '@mui/material'
import { useQuery } from '@apollo/client'
import ChatSendingForm from './ChatSendingForm'
import { GET_CHAT } from '../../graphql/queries/chatsQueries'
import { ChatBubble } from './ChatBubble'
import { useEffect, useRef, useState } from 'react'
import { subscribeToMessages } from '../../services/socket'
import { useAuth } from '../../contexts/AuthContext'
import { styled, alpha } from '@mui/material/styles'
import { usePin } from '../../contexts/PinMessagesContext'

const MyToolbar = styled(Toolbar)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.common.black, 0.20),
  border: `2px solid ${alpha(theme.palette.common.black, 0.60)}`
}))

const ChatItem = ({ id }) => {
  const getChat = useQuery(GET_CHAT(id))
  const [messages, setMessages] = useState([])
  const [chat, setChat] = useState()
  const [togglePin, setTogglePin] = useState([])

  const { state, addPin, removePin } = usePin()
  const { pinnedIds } = state
  const { state: { user } } = useAuth()

  useEffect(() => {
    if (getChat.data) {
      setChat(getChat.data.chat.data.attributes)
      setMessages(getChat.data.chat.data.attributes.messages.data)
    }
  }, [getChat])

  useEffect(() => {
    subscribeToMessages(id, setMessages)
  }, [id])

  useEffect(() => {
    console.log(pinnedIds)
    if (pinnedIds.length > 0 && pinnedIds.includes(id)) {
      setTogglePin(false)
    }
  }, [id, pinnedIds])

  const lastMessage = useRef(null)
  useEffect(() => {
    lastMessage.current.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleClickPin = () => {
    setTogglePin(!togglePin)
    if (togglePin) {
      addPin(id)
    } else {
      removePin(id)
    }
  }

  return (
    <Box width='100%' height='100%' display='flex' flexDirection='column'>
      <MyToolbar>
        <Box display='flex' justifyContent='space-between'>
          <Button onClick={handleClickPin} variant='outlined'>
            {togglePin ? 'Pin chat 📌' : 'Pinned chat 📍'}
          </Button>
          <Typography
            variant='subtitle'
            component='div'
          >
            {chat?.name}
          </Typography>
        </Box>
      </MyToolbar>
      <Box flexGrow={1} sx={{ overflow: 'auto' }}>
        {messages.map((message) => (
          <ChatBubble
            key={message.id}
            content={message?.attributes?.messageText}
            date={message?.attributes?.sendDate}
            author={message?.attributes?.users_permissions_user?.data?.attributes}
            reverse={parseInt(message?.attributes?.users_permissions_user?.data?.id) === parseInt(user.id)}
            isMySelf={parseInt(message?.attributes?.users_permissions_user?.data?.id) === parseInt(user.id)}
          />
        ))}
        <div ref={lastMessage} />
      </Box>
      <ChatSendingForm chatId={id} />
    </Box>
  )
}

export default ChatItem
