import { Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ChatListItem from './ChatListItem'

const ChatList = ({ chats }) => {
  const navigate = useNavigate()

  if (!chats || chats.length < 1) {
    return <h4>No data...</h4>
  }

  return (
    <Grid container columns={16} marginTop={5}>
      {
            chats.map(chat => {
              return (
                <Grid
                  key={chat.id}
                  xs={8}
                >

                  <ChatListItem
                    chat={chat}
                    onClick={() => navigate(`/users/:id/chat/${chat.id}`)}
                  />

                </Grid>
              )
            })
          }
    </Grid>
  )
}

export default ChatList
