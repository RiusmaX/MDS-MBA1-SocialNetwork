import { Avatar, Card, CardHeader } from '@mui/material'
import { blueGrey } from '@mui/material/colors'
import Moment from 'moment'
import { useQuery } from '@apollo/client'
import { GET_LAST_CHAT_MESSAGE } from '../../graphql/queries/chatsQueries'
import 'moment/locale/fr';

const ChatListItem = ({ chat, onClick }) => {

  const { loading, error, data } = useQuery(GET_LAST_CHAT_MESSAGE(chat.id))

  //console.log(data)
  //console.log(data.attributes.sendDate)

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

  //display the date properly
  var dt = Moment(data.sendDate)
  console.log(dt)
  if(dt == null){
    dt = Moment(new Date())
  }

  return (
    <Card sx={{ maxWidth: 345 }} onClick={onClick}>
      <CardHeader
        avatar={
          <Avatar
            src={process.env.REACT_APP_IMAGES_URL + chat?.attributes?.image?.data?.attributes?.url}
            sx={{ bgcolor: blueGrey[500] }}
            aria-label='recipe'
          >
          </Avatar>
        }
        title={chat.attributes.name}
        subheader={dt.format('D MMMM YYYY HH[h]mm')}
      />
    </Card>
  )
}

export default ChatListItem