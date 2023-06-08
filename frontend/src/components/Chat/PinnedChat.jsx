import { useEffect, useState } from 'react'
import { subscribeToMessages } from '../../services/socket'
import '../../styles/PinnedChat.scss'
import { Grid, Container, Button, Box } from '@mui/material'
import { PinProvider, usePin } from '../../contexts/PinMessagesContext'
import { GET_CHATS_BY_IDS } from '../../graphql/queries/chatsQueries'
import { useQuery } from '@apollo/client'
import ChatListItemPinned from './ChatListItemPinned'
import { styled } from '@mui/material/styles'
import ChatItemPinned from './ChatItemPinned'
import { useNavigate } from 'react-router-dom'

const PinnedChat = (chatId) => {
  const { state, removePin } = usePin()
  const navigate = useNavigate()
  const [chatSelected, setChatSelected] = useState(0)

  let { pinnedIds } = state
  // const { loading, error, data } = useQuery(GET_CHAT_BY_ID(pinnedIds[0]))
  if (pinnedIds.length <= 0) {
    pinnedIds = [0]
  }
  const { loading, error, data } = useQuery(GET_CHATS_BY_IDS(pinnedIds))

  // switch to the selected chat view
  const selectChat = (idChat) => {
    // view page in little
    setChatSelected(idChat)
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

  const MyMessageSection = styled(Box)(({ theme }) => ({
    height: 'calc(50vh - 54px);',
    overflow: 'scroll',
    width: '50%',
    [theme.breakpoints.down('sm')]: {
      height: 'calc(50vh - 95px);'
    }
  }))

  // toggle view for little chat conversation
  const PinnedChatView = (idChat) => {
    return (
      <>
        <ChatItemPinned
          key={idChat}
          id={idChat}
          onClickPinned={() => selectChat(-1)}
        />
      </>
    )
  }

  const PinnedView = () => {
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
              onClick={() => { selectChat(chat.id) }}
              onClickNav={() => { navigate(`/chats?id=${chat.id}`) }}
              onClickPin={() => removePin(chat.id)}
            />
          </Grid>
        )
      })
    )
  }

  return (
    <Container id='pinnedchat'>
      <MyMessageSection>
        {chatSelected > 0 ? <PinnedChatView idChat={chatSelected} /> : null}
        <PinProvider>
          {chatSelected <= 0 ? <PinnedView /> : null}
        </PinProvider>
      </MyMessageSection>
    </Container>
  )
}

export default PinnedChat
