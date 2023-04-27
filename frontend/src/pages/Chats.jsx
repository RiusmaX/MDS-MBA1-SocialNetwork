import { useQuery } from '@apollo/client'
import { Container } from '@mui/material'
import ChatList from '../components/Chat/ChatList'
import { GET_CHATS_WITH_USER } from '../graphql/queries/chatsQueries'
import { useParams } from 'react-router-dom'

const Chats = () => {
  const { id } = useParams()
  // const { loading, error, data } = useQuery(GET_CHATS)
  const { loading, error, data } = useQuery(GET_CHATS_WITH_USER(id))
  console.log(useQuery(GET_CHATS_WITH_USER(id)))

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
      <ChatList chats={data.usersPermissionsUser.data.attributes.chats.data} />
    </Container>
  )
}

export default Chats
