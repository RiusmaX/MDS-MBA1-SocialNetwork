import React from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN_MUTATION } from '../graphql/mutations/authMutations'

const AuthContext = React.createContext()

const actionTypes = {
  LOGIN: 'login',
  SIGNUP: 'signup',
  SIGNOUT: 'signout'
}

const initialState = {
  email: null,
  username: null
}

const AuthReducer = (state, action) => {
  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION)
  switch (action.type) {
    case actionTypes.LOGIN:
      login({ variables: { identifier: action.data.email, password: action.data.password } }).then((response) => {
        console.log(response)
        return {
          email: response.user.email,
          username: response.user.username
        }
      })
        .catch((error) => console.log(error))
      break
    default:
      throw new Error(`Unhandled action type : ${action.type}`)
  }
}

const AuthContextFactory = (dispatch) => ({
  login: (value) => {
    dispatch({
      type: actionTypes.LOGIN,
      data: value
    })
  }
})

const AuthProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(AuthReducer, initialState)
  return (
    <AuthContext value={{ state, ...AuthContextFactory(dispatch) }}>
      {children}
    </AuthContext>
  )
}

const useContext = () => {
  const context = React.useContext(AuthContext)
  if (!context) throw new Error('useCounter must be used inside a CounterProvider')
  return context
}

export {
  AuthProvider, useContext
}
