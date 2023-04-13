import { Avatar, Card, CardHeader } from '@mui/material'
import { blueGrey } from '@mui/material/colors'
import Moment from 'moment';

//import FullName from '../Profile/FullName'

const ChatListItem = ({ chat, onClick }) => {
  console.log(chat)

  //display the date properly
  Moment.locale('fr');
  var dt = chat.attributes.lastMessageDate;

  return (
    <Card sx={{ maxWidth: 345 }} onClick={onClick}>
      <CardHeader
        avatar={
          <Avatar
            src={process.env.REACT_APP_IMAGES_URL + chat.attributes.image.data.attributes.url}
            sx={{ bgcolor: blueGrey[500] }}
            aria-label='recipe'
          >
            T
          </Avatar>
        }
        title={chat.attributes.name}
        subheader={Moment(dt).format('d MMM hh:mm')}
      />
    </Card>
  )
}

export default ChatListItem