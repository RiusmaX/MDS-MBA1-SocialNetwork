import { useMutation, useQuery } from '@apollo/client'
import { Button as Buttons } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import PostList from '../components/Posts/PostList'
import Avatar from '../components/Profile/Avatar'
import FullName from '../components/Profile/FullName'
import { GET_ME_PROFILE, GET_FOLLOWERS } from '../graphql/queries/usersQueries'
import { ADD_FOLLOWER } from '../graphql/mutations/usersMutations'
import Button from '../components/Layout/Button'
import { subscribeToPosts } from '../services/socket'

import '../styles/Profile.scss'
import { CREATE_CHAT } from '../graphql/mutations/chatsMutations'
import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { GET_POSTS_BY_USER_ID } from '../graphql/queries/postsQueries'

const Profile = () => {
  // On prépare l'état local qui stockera les données
  const { state: { user, token } } = useAuth()
  const { id } = useParams()
  const { loading, error, data } = useQuery(GET_ME_PROFILE(id))
  const { data: getPosts } = useQuery(GET_POSTS_BY_USER_ID(id))
  const [createChat] = useMutation(CREATE_CHAT)
  const [follow] = useMutation(ADD_FOLLOWER, {
    context: {
      headers: {
        authorization: `Bearer ${token}`
      }
    }
  })
  const [follows, setFollows] = useState([])
  const getFollow = useQuery(GET_FOLLOWERS(user.id))
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])

  // uses the useEffect hook to update the local posts state whenever the data in the getPosts request changes
  useEffect(() => {
    if (getPosts) {
      setPosts(getPosts.posts?.data)
    }
  }, [getPosts])

  useEffect(() => {
    if (getFollow.data) {
      const newFollows = []
      getFollow.data.usersPermissionsUser.data.attributes.follows.data.forEach(element => {
        newFollows.push(element.id)
      })
      setFollows(newFollows)
    }
  }, [getFollow])

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

  function handleFollow (id) {
    const newFollow = follows
    if (follows.includes(id)) {
      newFollow.splice(newFollow.indexOf(2), 1)
    } else {
      newFollow.push(id)
    }
    setFollows(newFollow)
    follow({ variables: { id: user.id, arrayOfFollow: newFollow } })
  }

  if (data) {
    return (
      <>
        <Buttons variant='text' onClick={createNewChat}>+ Conversation</Buttons>
        <div className='profilPageContent'>
          <div className='profil'>
            {profile?.avatar?.data && <Avatar avatar={profile.avatar.data.attributes} />}
            <div className='userInfos'>
              <FullName firstName={profile.firstName} lastName={profile.lastName} username={profile.username} />
              {user.id !== id && <Button value={follows.includes(id) ? 'Ne plus suivre' : 'Suivre'} className='bold' onClick={() => handleFollow(id)} />}
            </div>
          </div>
          <PostList posts={posts} />
        </div>
      </>
    )
  }
}

export default Profile
