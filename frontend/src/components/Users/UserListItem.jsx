import { Avatar, Button, Card, CardHeader } from '@mui/material'
import { blueGrey } from '@mui/material/colors'

import FullName from '../Profile/FullName'

const UserListItem = ({ user, onClick }) => {

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar
            src={process.env.REACT_APP_IMAGES_URL + user.attributes.avatar.data.attributes.url}
            sx={{ bgcolor: blueGrey[500] }}
            aria-label='recipe'
          >
            T
          </Avatar>
        }
        title={<FullName {...user.attributes} />}
      />
      <Button onClick={onClick}>Voir le profil</Button>
    </Card>
  )
}

export default UserListItem
