import { useEffect, useState } from 'react'
import { subscribeToMessages } from '../../services/socket'
import '../../styles/PinnedChat.scss'
import { Grid } from '@mui/material'
import { PinProvider, usePin } from '../../contexts/PinMessagesContext'
import { GET_CHATS_BY_IDS } from '../../graphql/queries/chatsQueries'
import { useQuery } from '@apollo/client'
import ChatListItemPinned from './ChatListItemPinned'
import { useNavigate } from 'react-router-dom'

const PinnedChat = (chatId) => {
  const { state, addPin, removePin } = usePin()
  const navigate = useNavigate()

  let { pinnedIds } = state
  // const { loading, error, data } = useQuery(GET_CHAT_BY_ID(pinnedIds[0]))
  if (pinnedIds.length <= 0) {
    pinnedIds = [0]
  }
  const { loading, error, data } = useQuery(GET_CHATS_BY_IDS(pinnedIds))

  // switch to the selected chat view
  const selectChat = () => {
    // then view page in little
  }

  const [messages, setMessages] = useState([])

  useEffect(() => {
    subscribeToMessages(setMessages)
  }, [])

  if (loading) {
    return <h2>Chargement...</h2>
  }

  if (error) {
    return (
      <>
        {/* <h1>ERROR</h1>
        <pre>{JSON.stringify(error, null, 2)}</pre> */}
      </>
    )
  }

  if (data === undefined || !data.chats.data || data.chats.data.length < 1) {
    return <></>
  }

  const PinnedView2 = () => {
    return (
      data.chats.data.map(chat => {
        return (
          <Grid
            key={chat.id}
            xs={8}
            sx={{ p: 1 }}
          >

            <ChatListItemPinned
              chat={chat}
              onClick={() => navigate(`/chats?id=${chat.id}`)}
              onClickPin={() => removePin(chat.id)}
            />
          </Grid>
        )
      })
    )
  }

  return (
    <div id='pinnedchat'>
      <PinProvider>
        <PinnedView2 />
      </PinProvider>
    </div>
  )
}

export default PinnedChat
