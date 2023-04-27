import React, { useState, useEffect } from 'react'
import socket from '../services/socket'
import { gql, useQuery } from '@apollo/client'
import PostList from '../components/Posts/PostList'
import { GET_POSTS } from '../graphql/queries/postsQueries'

function Home () {
  const [posts, setPosts] = useState([])
  const getPosts = useQuery(GET_POSTS)
  useEffect(() => {
    if (getPosts.data) {
      setPosts(getPosts.data.posts.data)
    }
  }, [getPosts])

  console.log(posts)

  useEffect(() => {
    // Écoute des événements de socket pour les nouveaux posts
    socket.on('connect', () => {
      console.log('Socket connected')
    })

    socket.on('disconnect', () => {
      console.log('Socket disconnected')
    })

    socket.on('post:create', (data) => {
      console.log('New post received', data)
      setPosts((prevPosts) => [
        ...prevPosts,
        { id: String(data.id), attributes: data }
      ])
    })

    socket.on('post:update', (data) => {
      console.log('Post updated', data)
      setPosts((prevPosts) => {
        const index = prevPosts.findIndex(
          (post) => Number(post.id) === Number(data.id)
        )
        prevPosts[index] = { id: String(data.id), attributes: data }
        return prevPosts
      })
    })

    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('post')
      socket.off('post:create')
      socket.off('post:update')
    }
  }, [])

  return (
    <div>
      <PostList posts={posts} />
    </div>
  )
}

export default Home
