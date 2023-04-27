import React, { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { LOGIN_MUTATION } from '../graphql/mutations/authMutations'
import jwt_decode from 'jwt-decode'

export const AuthContext = createContext()

export function AuthProvider (props) {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  const loginGQL = useLoginMutation()
  useEffect(() => {
    const token = window.localStorage.getItem('token')
    if (token) {
      const decodedToken = jwt_decode(token)
      if (decodedToken.exp * 1000 < Date.now()) {
        setUser(null)
        navigate('/auth')
      }
    }
  }, [])

  function useLoginMutation () {
    const [loginGQL] = useMutation(LOGIN_MUTATION, {
      onError: (error) => {
        console.log(error)
      },
      onCompleted: (data) => {
        window.localStorage.setItem('token', data.login.jwt)
        setUser(data.login.user)
        navigate('/')
      }
    })

    return loginGQL
  }

  function isValidToken () {
    const token = window.localStorage.getItem('token')
    return token && jwt_decode(token).exp * 1000 < Date.now()
  }

  function login (values) {
    loginGQL({ variables: { identifier: values.email, password: values.password } })
      .catch((error) => console.log(error))
  }

  function isLoggedIn () {
    return isValidToken()
  }

  function logout () {
    window.localStorage.removeItem('token')
    setUser(null)
    navigate('/auth')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  )
}
