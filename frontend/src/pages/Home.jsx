import React, { useState, useEffect } from 'react'
import { subscribeToPosts } from '../services/socket'
import { useQuery } from '@apollo/client'
import PostList from '../components/Posts/PostList'
import { GET_POSTS } from '../graphql/queries/postsQueries'
import { CounterProvider, useCounter } from '../contexts/CounterContext'
import PinnedChat from '../components/Chat/PinnedChat'

function Home () {
  const [posts, setPosts] = useState([])
  const getPosts = useQuery(GET_POSTS)

  // uses the useEffect hook to update the local posts state whenever the data in the getPosts request changes
  useEffect(() => {
    if (getPosts.data) {
      setPosts(getPosts.data.posts.data)
    }
  }, [getPosts])

  useEffect(() => {
    subscribeToPosts(setPosts)
  }, [])

  return (
    <div>
      <PinnedChat />
      <CounterProvider>
        <CounterView />
        <CounterActions />
      </CounterProvider>
      <PostList posts={posts} />
    </div>
  )
}

const CounterView = () => {
  const { state } = useCounter()
  return <h3>Counter: {state.counter}</h3>
}

const CounterActions = () => {
  const [value, setValue] = useState()
  const { increment, decrement } = useCounter()
  return (
    <>
      <button onClick={decrement}>-</button>
      <button onClick={() => increment()}>+</button>
      <br />
      <label>
        Nombre :
        <input
          type='number'
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </label>
      <br />
      <button onClick={() => increment(Number(value))}>
        Ajouter au compteur
      </button>
    </>
  )
}

export default Home
