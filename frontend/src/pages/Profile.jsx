import { useMutation, useQuery } from '@apollo/client'
import { Button as Buttons } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import PostList from '../components/Posts/PostList'
import Avatar from '../components/Profile/Avatar'
import FullName from '../components/Profile/FullName'
import { GET_FRIENDS, GET_FRIENDS_REQUEST, GET_ME_PROFILE, GET_FOLLOWERS } from '../graphql/queries/usersQueries'
import { ADD_FOLLOWER } from '../graphql/mutations/usersMutations'
import Button from '../components/Layout/Button'
import { subscribeToPosts } from '../services/socket'
import '../styles/Profile.scss'
import { CREATE_CHAT } from '../graphql/mutations/chatsMutations'
import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { GET_POSTS_BY_USER_ID } from '../graphql/queries/postsQueries'
import { CHANGE_FRIENDSHIP_STATUS, REQUEST_FRIEND } from '../graphql/mutations/friendshipsMutations'

const Profile = () => {
  // On prépare l'état local qui stockera les données
  const { state: { user, token } } = useAuth()
  const { id } = useParams()
  const { loading, error, data } = useQuery(GET_ME_PROFILE(id))
  const { data: getPosts } = useQuery(GET_POSTS_BY_USER_ID(id))
  const [createChat] = useMutation(CREATE_CHAT, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  })
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
  const [friend, setFriends] = useState(false)
  const getFriends = useQuery(GET_FRIENDS(user.id))
  const [createFriendship] = useMutation(REQUEST_FRIEND)
  const [friendsRequest, setFriendsRequest] = useState([])
  const pendingFriendsRequest = useQuery(GET_FRIENDS_REQUEST(user.id))
  const [updateFriendship] = useMutation(CHANGE_FRIENDSHIP_STATUS)

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

  useEffect(() => {
    if (getFriends.data) {
      getFriends.data.friendships.data.forEach((friendship) => {
        if (friendship.attributes.user1.data.id === id || friendship.attributes.user2.data.id === id) {
          setFriends(true)
        }
      })
    }
  }, [getFriends])

  useEffect(() => {
    if (user.id === id && pendingFriendsRequest.data) {
      setFriendsRequest(pendingFriendsRequest.data.friendships.data)
    }
  }, [pendingFriendsRequest])

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
      navigate('/chats')
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

  const createNewFriendship = () => {
    createFriendship(
      {
        variables: {
          user1: user.id,
          user2: id,
          status: 'sent'
        }
      }
    )
  }

  const acceptFriendship = (id) => {
    updateFriendship(
      {
        variables: {
          id,
          status: 'friends'
        }
      }
    )
  }

  const cancelFriendship = (id) => {
    updateFriendship(
      {
        variables: {
          id,
          status: 'canceled'
        }
      }
    )
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
            {user.id !== id && !friend && <Button value='ajouter un ami' className='bold' onClick={createNewFriendship}>Ajouter un ami</Button>}
          </div>
          <PostList posts={posts} />
        </div>
        {user.id === id && (
          <div className='waitingFriendRequests'>
            {friendsRequest.map((friend) => (
              <div key={friend.attributes.user1.data.id} className='waitingFriendRequest'>
                {friend.attributes.user1.data.attributes.avatar.data.attributes && <Avatar avatar={friend.attributes.user1.data.attributes.avatar.data.attributes} />}
                <div>{friend.attributes.user1.data.attributes.firstName}  {friend.attributes.user1.data.attributes.lastName}</div>
                <Button variant='text' value='Accept' onClick={() => acceptFriendship(friend.id)}>Accept</Button>
                <Button variant='text' value='Cancel' onClick={() => cancelFriendship(friend.id)}>Cancel</Button>
              </div>
            ))}
          </div>
        )}
      </>
    )
  }
}

export default Profile
