import { useQuery } from '@apollo/client'
import { Container } from '@mui/material'
import ChatList from '../components/Chat/ChatList'
import { GET_CHATS } from '../graphql/queries/chatsQueries'

const Chats = () => {
    const { loading, error, data } = useQuery(GET_CHATS)

    if (loading) {
      return <h2>Chargement...</h2>
    }
  
    if (error) {
      return (
        <>
          <h1>ERROR</h1>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </>
      )
    }
  
    return (
      <Container maxWidth='md'>
        <ChatList chats={data.chats.data} />
      </Container>
    )
  }
  
  export default Chats