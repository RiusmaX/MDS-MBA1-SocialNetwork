import { useEffect, useState } from 'react'
import { subscribeToMessages } from '../../services/socket'
// import Chat from '../../pages/Chat'
import '../../styles/PinnedChat.scss'
import { Card, CardHeader, IconButton } from '@mui/material'

const PinnedChat = (chatId) => {
  // unpin the chat in db

  // switch to the selected chat view
  const selectChat = () => {
    console.log('chat selected')
  }

  const [messages, setMessages] = useState([])

  useEffect(() => {
    subscribeToMessages(setMessages)
  }, [])

  return (
    <div id='pinnedchat'>
      {/* <Chat /> */}

      <Card sx={{ maxWidth: 345 }}>
        <Card sx={{ maxWidth: 345 }} onClick={selectChat} style={{ cursor: 'pointer' }}>
          <CardHeader
            action={
              <IconButton aria-label='unpin'>
                📍
              </IconButton>
        }
            title='La bande'
            subheader='▬Nouveau message▬'
          />
        </Card>
        <Card sx={{ maxWidth: 345 }} onClick={selectChat} style={{ cursor: 'pointer' }}>
          <CardHeader
            action={
              <IconButton aria-label='unpin'>
                📍
              </IconButton>
        }
            title='Projet X'
            subheader='▬Nouveau message▬'
          />
        </Card>
      </Card>
    </div>
  )
}

export default PinnedChat
