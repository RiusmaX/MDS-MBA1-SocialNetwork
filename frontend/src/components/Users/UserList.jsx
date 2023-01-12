import { Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import UserListItem from './UserListItem'

const UserList = ({ users }) => {
  const navigate = useNavigate()

  if (!users || users.length < 1) {
    return <h4>No data...</h4>
  }

  return (
    <Grid container columns={16} marginTop={5}>
      {
        users.map(user => {
          return (
            <Grid
              key={user.id}
              xs={8}
            >

              <UserListItem
                user={user}
                onClick={() => navigate(`/users/${user.id}`)}
              />
            </Grid>

          )
        })
      }
    </Grid>
  )
}

export default UserList
