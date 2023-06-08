import { useMutation, useQuery } from '@apollo/client'
import { Button } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import PostList from '../components/Posts/PostList'
import Avatar from '../components/Profile/Avatar'
import FullName from '../components/Profile/FullName'
import { GET_FRIENDS, GET_ME_WITH_POSTS } from '../graphql/queries/usersQueries'
import { subscribeToPosts } from '../services/socket'
import { GET_POSTS } from '../graphql/queries/postsQueries'

import '../styles/Profile.scss'
import { CREATE_CHAT } from '../graphql/mutations/chatsMutations'
import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

const Profile = () => {
  // On prépare l'état local qui stockera les données
  const { id } = useParams()
  const { loading, error, data } = useQuery(GET_ME_WITH_POSTS(id))
  const [createChat] = useMutation(CREATE_CHAT)
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [friends, setFriends] = useState([])
  const getPosts = useQuery(GET_POSTS)
  const { state: { user } } = useAuth()
  const getFriends = useQuery(GET_FRIENDS(user.id))

  // uses the useEffect hook to update the local posts state whenever the data in the getPosts request changes
  useEffect(() => {
    if (getPosts.data) {
      setPosts(getPosts.data.posts.data)
    }
  }, [getPosts])

  useEffect(() => {
    subscribeToPosts(setPosts)
  }, [])

  useEffect(() => {
    if (getFriends.data) {
      setFriends(getFriends.data.friendships.data.map((friendship) => {
        return friendship.attributes.user1.data.id === user.id ? friendship.attributes.user2 : friendship.attributes.user1
      }))
    }
  }, [getFriends])

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
    const res = createChat(
      {
        variables: {
          name: `${user.username} - ${profile.username}`,
          users: [user.id, id],
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
        <Button variant='text' onClick={createNewChat}>+ Conversation</Button>
        <div className='profilPageContent'>
          <div className='profil'>
            {profile?.avatar?.data && <Avatar avatar={profile.avatar.data.attributes} />}
            <div className='userInfos'>
              <FullName firstName={profile.firstName} lastName={profile.lastName} username={profile.username} />
              <Button value='Suivre' className='bold' />
            </div>
            <Button value='ajouter un ami' className='bold'>Ajouter un ami</Button>
          </div>
          <PostList posts={posts} />
        </div>
      </>
    )
  }
}

export default Profile
