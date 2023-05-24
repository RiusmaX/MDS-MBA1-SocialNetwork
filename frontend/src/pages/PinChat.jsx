import { useEffect, useState } from 'react'
import { subscribeToMessages } from '../services/socket'

const PinChat = () => {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    subscribeToMessages(setMessages)
  }, [])

  return (
    <>
      <h1>TODO Pin Chat</h1>
    </>
  )
}

export default PinChat
