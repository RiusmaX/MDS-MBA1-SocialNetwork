import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { Container, Box } from '@mui/material'
import { GET_CHATS_WITH_USER } from '../graphql/queries/chatsQueries'
import { useAuth } from '../contexts/AuthContext'
import ChatItem from '../components/Chat/ChatItem'
import { styled } from '@mui/material/styles'
import ChatListItem from '../components/Chat/ChatListItem'

const GlobalSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: 16,
  padding: 16,
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: 16
  }
}))

const MyMessageSection = styled(Box)(({ theme }) => ({
  height: 'calc(100vh - 105px);',
  overflow: 'auto',
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    height: 'calc(100vh - 190px);'
  }
}))

const MyList = styled(Box)(({ theme }) => ({
  height: 'calc(100vh - 105px);',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'auto',
  minWidth: 275,
  gap: 8,
  padding: 4,
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'row',
    width: '100%',
    height: 'auto',
    gap: 8
  }
}))

const Chats = () => {
  const { state: { user } } = useAuth()
  const getChats = useQuery(GET_CHATS_WITH_USER(user.id))
  const [data, setData] = useState({
    chats: null,
    error: null,
    idChat: 0
  })

  const toggleChatId = (id) => {
    setData({
      ...data,
      idChat: id
    })
  }

  useEffect(() => {
    if (getChats.data) {
      setData({
        ...data,
        chats: getChats.data.chats.data,
        idChat: getChats.data.chats.data[0].id
      })
    }
    if (getChats.error) {
      setData({
        ...data,
        error: getChats.error
      })
    }
  }, [getChats])

  if (!data.chats) {
    return <h2>Chargement...</h2>
  }

  if (data.error) {
    return (
      <>
        <h1>ERROR</h1>
        <pre>{JSON.stringify(data.error, null, 2)}</pre>
      </>
    )
  }

  return (
    <Container>
      <GlobalSection>
        <MyList>
          {
            data.chats.map(chat => (
              <ChatListItem
                active={parseInt(data.idChat) === parseInt(chat.id)}
                key={chat.id}
                chat={chat}
                onClick={() => toggleChatId(chat.id)}
              />
            ))
          }
        </MyList>
        <MyMessageSection>
          <ChatItem key={data.idChat} id={data.idChat} />
        </MyMessageSection>
      </GlobalSection>
    </Container>
  )
}

export default Chats
