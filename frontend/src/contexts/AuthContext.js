import { createContext, useContext, useEffect, useReducer } from 'react'
import { client } from '../App'
import { LOGIN_MUTATION, SIGNUP_MUTATION } from '../graphql/mutations/authMutations'

const AuthContext = createContext()

const actionTypes = {
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  SIGNUP_SUCCESS: 'SIGNUP_SUCCESS',
  SIGNUP_FAILURE: 'SIGNUP_FAILURE',
  LOGOUT: 'LOGOUT',
  RESET: 'RESET'
}

const initialState = {
  isLoggedIn: false,
  user: null,
  token: null,
  error: null,
  loading: false
}

const AuthReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...initialState, isLoggedIn: true, user: action.data.user, token: action.data.token
      }
    case actionTypes.LOGIN_FAILURE:
      return {
        ...initialState, error: action.data.error
      }
    case actionTypes.SIGNUP_SUCCESS:
      return {
        ...initialState, isLoggedIn: true, user: action.data.user, token: action.data.token
      }
    case actionTypes.SIGNUP_FAILURE:
      return {
        ...initialState, error: action.data.error
      }
    case actionTypes.LOGOUT:
      return initialState
    default:
      throw new Error(`Unhandled action type : ${action.type}`)
  }
}

const AuthContextFactory = (dispatch) => ({
  login: async (credentials) => {
    try {
      const result = await client.mutate({
        mutation: LOGIN_MUTATION,
        variables: credentials
      })
      if (result && result.data && result.data.login) {
        const { data: { login } } = result
        dispatch({
          type: actionTypes.LOGIN_SUCCESS,
          data: { user: login.user, token: login.jwt }
        })
      }
    } catch (error) {
      dispatch({
        type: actionTypes.LOGIN_FAILURE,
        data: { error }
      })
    }
  },
  register: async (credentials) => {
    try {
      const result = await client.mutate({
        mutation: SIGNUP_MUTATION,
        variables: credentials
      })
      if (result && result.data && result.data.register) {
        const { data: { register } } = result
        dispatch({
          type: actionTypes.SIGNUP_SUCCESS,
          data: { user: register.user, token: register.jwt }
        })
      }
    } catch (error) {
      dispatch({
        type: actionTypes.SIGNUP_FAILURE,
        data: { error }
      })
    }
  },
  logout: () => {
    dispatch({ type: actionTypes.LOGOUT })
  }
})

const AuthProvider = ({ children }) => {
  const savedState = window.localStorage.getItem('AUTH')
  const _initialState = savedState ? JSON.parse(savedState) : initialState
  const [state, dispatch] = useReducer(AuthReducer, _initialState)

  useEffect(() => {
    window.localStorage.setItem('AUTH', JSON.stringify(state))
  }, [state])

  return (
    <AuthContext.Provider value={{ state, ...AuthContextFactory(dispatch) }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside a AuthProvider')
  return context
}

export {
  AuthProvider,
  useAuth
}
