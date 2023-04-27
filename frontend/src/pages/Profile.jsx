import { useMutation, useQuery } from '@apollo/client'
import { Button, Container, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import PostList from '../components/Posts/PostList'
import Avatar from '../components/Profile/Avatar'
import FullName from '../components/Profile/FullName'
import UserInfos from '../components/Profile/UserInfos'
import { GET_USER_WITH_POSTS } from '../graphql/queries/usersQueries'

import '../styles/Profile.scss'
import { CREATE_CHAT } from '../graphql/mutations/chatsMutations'

const Profile = () => {
  // On prépare l'état local qui stockera les données
  const { id } = useParams()
  const { loading, error, data } = useQuery(GET_USER_WITH_POSTS(id))
  const [createChat] = useMutation(CREATE_CHAT)
  const navigate = useNavigate()

  if (loading) {
    return <h4>Chargement...</h4>
  }

  if (error) {
    return (
      <>
        <h1>ERROR</h1>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </>
    )
  }

  const profile = data?.usersPermissionsUser?.data?.attributes

  const createNewChat = () => {
    // remplacer 1 par l'utilisateur courant
    const res = createChat(
      { 
        variables: { 
          name: profile.firstName,
          users: [1, id],
          date: new Date().toISOString()
        } 
      }
    )
    res.then((data) => {
      navigate(`/chats/${data?.data?.createChat?.data?.id}`)
    })
  }

  if (data) {
    return (
      <>
        <Button variant="text" onClick={createNewChat}>+ Conversation</Button>
        <Container maxWidth='md'>
          <div className='row'>
            <Avatar avatar={profile.avatar.data.attributes} />
            <div>
              <FullName firstName={profile.firstName} lastName={profile.lastName} username={profile.username} />
              <UserInfos email={profile.email} phone={profile.phone} />
            </div>
          </div>
        </Container>
        <Container maxWidth='lg'>
          <Typography variant='h3' marginY={5}>
            Les articles de {profile.firstName}
          </Typography>;
          <PostList posts={profile.posts.data} />
        </Container>
      </>
    )
  }
}

export default Profile
