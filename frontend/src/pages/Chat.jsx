import { useQuery } from '@apollo/client'
import ChatSendingForm from '../components/Chat/ChatSendingForm'
import { GET_CHAT_MESSAGE } from '../graphql/queries/chatsQueries'
import { useParams } from 'react-router-dom'
import {ChatBubble} from '../components/Chat/ChatBubble'

const Chat = () => {
  const { id } = useParams()
  const { loading, error, data } = useQuery(GET_CHAT_MESSAGE(id))
  return (
    <>
      <h1>Chat</h1>
      {data?.messages?.data.map((message) => (
        <ChatBubble
          key={message.id}
          content={message?.attributes?.messageText}
          date={message?.attributes?.sendDate}
          author={message?.attributes?.users_permissions_user?.data?.attributes}
          // remplacer 1 par l'utilisateur courant
          reverse={message?.attributes?.users_permissions_user?.data?.id === 1}
          isMySelf={message?.attributes?.users_permissions_user?.data?.id === 1}
        />
      ))}
      <ChatSendingForm chatId={id}/>
    </>
  )
}

export default Chat
