import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import PostList from '../components/Posts/PostList'
import Avatar from '../components/Profile/Avatar'
import FullName from '../components/Profile/FullName'
import UserInfos from '../components/Profile/UserInfos'
import { GET_USER_WITH_POSTS } from '../graphql/queries/usersQueries'
import Button from '../components/Layout/Button'

import '../styles/Profile.scss'

const Profile = () => {
  // On prépare l'état local qui stockera les données
  const { id } = useParams()
  const { loading, error, data } = useQuery(GET_USER_WITH_POSTS(id))

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

  if (data) {
    const profile = data?.usersPermissionsUser?.data?.attributes
    return (
      <div className='profilPageContent'>
        <div className='profil'>
          <Avatar avatar={profile.avatar.data.attributes} />
          <div className='userInfos'>
            <FullName firstName={profile.firstName} lastName={profile.lastName} username={profile.username} />
            <Button value='Suivre' className='bold' />
          </div>
        </div>
        <div className='postsList'>
          <PostList posts={profile.posts.data} />
        </div>
      </div>
    )
  }
}

export default Profile
