import { useQuery } from '@apollo/client'
import { Container } from '@mui/material'
import UserList from '../components/Users/UserList'
import { GET_USERS } from '../graphql/queries/usersQueries'

const Users = () => {
  const { loading, error, data } = useQuery(GET_USERS)

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
      <UserList users={data.usersPermissionsUsers ? data.usersPermissionsUsers.data : []} />
    </Container>
  )
}

export default Users
