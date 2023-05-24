import { useEffect, useState } from 'react'
import { subscribeToMessages } from '../../services/socket'
import Chat from '../../pages/Chat'
import '../../styles/PinnedChat.scss'

const PinnedChat = (chatId) => {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    subscribeToMessages(setMessages)
  }, [])

  return (
    <div id='pinnedchat'>
      <h1>ok</h1>
      <Chat />
    </div>
  )
}

export default PinnedChat
