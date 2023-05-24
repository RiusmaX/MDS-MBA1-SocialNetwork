import { from, useQuery } from '@apollo/client'
import ChatSendingForm from '../components/Chat/ChatSendingForm'
import { GET_CHAT_MESSAGE } from '../graphql/queries/chatsQueries'
import { useParams } from 'react-router-dom'
import { ChatBubble } from '../components/Chat/ChatBubble'
import { useEffect, useRef, useState } from 'react'
import { subscribeToMessages } from '../services/socket'
import { useAuth } from '../contexts/AuthContext'
import { Button } from '@mui/material'
import { usePin } from '../contexts/PinMessagesContext'

const Chat = () => {
  const { id } = useParams()
  const getMessages = useQuery(GET_CHAT_MESSAGE(id))
  const [messages, setMessages] = useState([])
  const [togglePin, setTogglePin] = useState([])

  const { state, addPin, removePin } = usePin()
  const { pinnedMessages } = state

  // setTogglePin(false)
  // this.state = {isToggleOn: false};

  const { state: { user } } = useAuth()

  useEffect(() => {
    if (getMessages.data) {
      setMessages(getMessages.data.messages.data)
    }
  }, [getMessages])

  useEffect(() => {
    subscribeToMessages(id, setMessages)
  }, [id])

  const lastMessage = useRef(null)
  useEffect(() => {
    lastMessage.current.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleClickPin = () => {
    console.log('handleClickPin')
    setTogglePin(!togglePin)
    if (togglePin) {
      addPin(id)
    } else {
      removePin(id)
    }
    console.log(pinnedMessages)
  }

  return (
    <>
      <br />
      <Button onClick={handleClickPin} variant='outlined'>
        {togglePin ? 'Pin chat 📌' : 'Pinned chat 📍'}
      </Button>
      <h1>Chat</h1>
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
      <ChatSendingForm chatId={id} />
    </>
  )
}

export default Chat
