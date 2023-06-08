import { Avatar, Card, CardHeader } from '@mui/material'
import { blueGrey } from '@mui/material/colors'
import { useQuery } from '@apollo/client'
import { GET_LAST_CHAT_MESSAGE } from '../../graphql/queries/chatsQueries'
import { formatDistance } from 'date-fns'
import { fr } from 'date-fns/locale'
import { useAuth } from '../../contexts/AuthContext'

const ChatListItem = ({ chat, onClick, active }) => {
  const { state: { token } } = useAuth()
  const { loading, error, data } = useQuery(GET_LAST_CHAT_MESSAGE(chat.id), {
    context: {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  })

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
    <Card
      sx={{
        minWidth: 250,
        maxWidth: 345,
        cursor: 'pointer',
        backgroundColor: active ? '#C8C8C8' : ''
      }}
      onClick={onClick}
    >
      <CardHeader
        avatar={
          <Avatar
            src={process.env.REACT_APP_IMAGES_URL + chat?.attributes?.image?.data?.attributes?.url}
            sx={{ bgcolor: blueGrey[500] }}
            aria-label='recipe'
          />
        }
        title={chat.attributes.name}
        subheader={formatDistance(new Date(data?.messages?.data?.[0]?.attributes?.sendDate), new Date(), { addSuffix: true, locale: fr })}
      />
    </Card>
  )
}

export default ChatListItem
