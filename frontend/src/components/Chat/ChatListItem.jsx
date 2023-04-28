import { Avatar, Card, CardHeader } from '@mui/material'
import { blueGrey } from '@mui/material/colors'
import { useQuery } from '@apollo/client'
import { GET_LAST_CHAT_MESSAGE } from '../../graphql/queries/chatsQueries'
import { format } from 'date-fns'
import frLocale from 'date-fns/locale/fr'

const ChatListItem = ({ chat, onClick }) => {
  const { loading, error, data } = useQuery(GET_LAST_CHAT_MESSAGE(chat.id))

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

  let dt = format(new Date(), 'eeee d MMMM yyyy hh:mm', { locale: frLocale })

  if (data?.messages?.data[0]?.attributes?.sendDate) {
    dt = format(new Date(data?.messages?.data[0]?.attributes?.sendDate), 'eeee d MMMM yyyy HH:mm', { locale: frLocale })
  }

  return (
    <Card sx={{ maxWidth: 345 }} onClick={onClick}>
      <CardHeader
        avatar={
          <Avatar
            src={process.env.REACT_APP_IMAGES_URL + chat?.attributes?.image?.data?.attributes?.url}
            sx={{ bgcolor: blueGrey[500] }}
            aria-label='recipe'
          />
        }
        title={chat.attributes.name}
        subheader={dt}
      />
    </Card>
  )
}

export default ChatListItem
