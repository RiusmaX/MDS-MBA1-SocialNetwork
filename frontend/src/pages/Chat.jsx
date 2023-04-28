import { useQuery } from '@apollo/client'
import ChatSendingForm from '../components/Chat/ChatSendingForm'
import { GET_CHAT_MESSAGE } from '../graphql/queries/chatsQueries'
import { useParams } from 'react-router-dom'
import {ChatBubble} from '../components/Chat/ChatBubble'
import { useEffect, useRef, useState } from 'react'
import { subscribeToMessages } from '../services/socket'
import { useAuth } from '../contexts/AuthContext'

const Chat = () => {
  const { id } = useParams()
  const getMessages = useQuery(GET_CHAT_MESSAGE(id))
  const [messages, setMessages] = useState([]);

  const { state: { user } } = useAuth()

  useEffect(() => {
    if (getMessages.data) {
      setMessages(getMessages.data.messages.data);
    }
  }, [getMessages]);

  useEffect(() => {
    subscribeToMessages(setMessages);
  }, []);

  const lastMessage = useRef(null);
    useEffect(() => {
      lastMessage.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <h1>Chat</h1>
      {messages.map((message) => (
        <ChatBubble
          key={message.id}
          content={message?.attributes?.messageText}
          date={message?.attributes?.sendDate}
          author={message?.attributes?.users_permissions_user?.data?.attributes}
          reverse={message?.attributes?.users_permissions_user?.data?.id === user.id}
          isMySelf={message?.attributes?.users_permissions_user?.data?.id === user.id}
        />
      ))}
      <div ref={lastMessage} />
      <ChatSendingForm chatId={id}/>
    </>
  )
}

export default Chat
