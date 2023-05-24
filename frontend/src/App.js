import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import './App.css'
import React, { useState, useEffect } from 'react'
import Router from './navigation/Router'
import { AuthProvider } from './contexts/AuthContext'
import SwitchButtonTheme from './components/Global/Buttons/SwitchButtonTheme'
import './styles/SwitchButtonTheme.scss'
import { PinProvider } from './contexts/PinMessagesContext'

export const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URL,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore'
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all'
    }
  }
})

function App () {
  const [theme, setTheme] = useState(
    window.localStorage.getItem('theme') || 'light'
  )
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }
  useEffect(() => {
    window.localStorage.setItem('theme', theme)
    document.body.className = theme
  }, [theme])
  return (
    <ApolloProvider client={client}>
      <div className='App'>
        <AuthProvider>
          <PinProvider>
            <Router />
          </PinProvider>
        </AuthProvider>
      </div>
    </ApolloProvider>
  )
}

export default App
