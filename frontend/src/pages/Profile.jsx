import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import PostList from '../components/Posts/PostList'
import Avatar from '../components/Profile/Avatar'
import FullName from '../components/Profile/FullName'
import { GET_ME_PROFILE } from '../graphql/queries/usersQueries'
import Button from '../components/Layout/Button'
import { subscribeToPosts } from '../services/socket'

import '../styles/Profile.scss'
import { useEffect, useState } from 'react'
import { GET_POSTS_BY_USER_ID } from '../graphql/queries/postsQueries'

const Profile = () => {
  // On prépare l'état local qui stockera les données
  const { id } = useParams()
  const { loading, error, data } = useQuery(GET_ME_PROFILE(id))
  const { data: getPosts } = useQuery(GET_POSTS_BY_USER_ID(id))
  const [posts, setPosts] = useState([])

  // uses the useEffect hook to update the local posts state whenever the data in the getPosts request changes
  useEffect(() => {
    if (getPosts) {
      setPosts(getPosts.posts?.data)
    }
  }, [getPosts])

  useEffect(() => {
    subscribeToPosts(setPosts)
  }, [])

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
          {profile?.avatar?.data && <Avatar avatar={profile.avatar.data.attributes} />}
          <div className='userInfos'>
            <FullName firstName={profile.firstName} lastName={profile.lastName} username={profile.username} />
            <Button value='Suivre' className='bold' />
          </div>
        </div>
        <PostList posts={posts} />
      </div>
    )
  }
}

export default Profile
