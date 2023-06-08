<<<<<<< HEAD
import React, { useState, useEffect } from 'react'
import { subscribeToPosts } from '../services/socket'
import { useQuery } from '@apollo/client'
import PostList from '../components/Posts/PostList'
import { GET_POSTS } from '../graphql/queries/postsQueries'
import { CounterProvider, useCounter } from '../contexts/CounterContext'
import PinnedChat from '../components/Chat/PinnedChat'
=======
import React, { useState, useEffect } from 'react';
import { subscribeToPosts } from '../services/socket';
import { useQuery } from '@apollo/client';
import PostList from '../components/Posts/PostList';
import { GET_POSTS } from '../graphql/queries/postsQueries';
>>>>>>> 2564f05deaad5a748d5900f3515ef5f645e3f1a1

function Home () {
  const [posts, setPosts] = useState([])
  const getPosts = useQuery(GET_POSTS)

  // uses the useEffect hook to update the local posts state whenever the data in the getPosts request changes
  useEffect(() => {
    if (getPosts.data) {
      if (getPosts.data.posts) {
        setPosts(getPosts.data.posts.data)
      }
    }
  }, [getPosts])

  useEffect(() => {
    subscribeToPosts(setPosts)
  }, [])

  return (
    <div>
      <PinnedChat />
      <PostList posts={posts} />
    </div>
  )
}

export default Home
