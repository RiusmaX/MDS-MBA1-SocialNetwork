import { Avatar, Card, CardHeader } from '@mui/material'
import { blueGrey } from '@mui/material/colors'
import Moment from 'moment'
import { useQuery } from '@apollo/client'
import { GET_LAST_CHAT_MESSAGE } from '../../graphql/queries/chatsQueries'
import 'moment/locale/fr'

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

  // display the date properly
  let dt = Moment(data.sendDate)
  if (dt == null) {
    dt = Moment(new Date())
  }

  return (
    <Card sx={{ minWidth: 250, maxWidth: 345, cursor: 'pointer' }} onClick={onClick}>
      <CardHeader
        avatar={
          <Avatar
            src={process.env.REACT_APP_IMAGES_URL + chat?.attributes?.image?.data?.attributes?.url}
            sx={{ bgcolor: blueGrey[500] }}
            aria-label='recipe'
          />
        }
        title={chat.attributes.name}
        subheader={dt.format('D MMMM YYYY HH[h]mm')}
      />
    </Card>
  )
}

export default ChatListItem
