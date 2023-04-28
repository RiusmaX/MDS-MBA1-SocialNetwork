import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ResponsiveAppBar from '../components/Layout/AppBar'
import Auth from '../pages/Auth'
import Home from '../pages/Home'
import Profile from '../pages/Profile'
import Users from '../pages/Users'
import { AuthContext } from '../contexts/AuthContext'
import { useContext } from 'react'
import { useAuth } from '../contexts/AuthContext'

const Router = () => {
  const { state: { isLoggedIn } } = useAuth()
  // const authContext = useContext(AuthContext)
  // console.log(authContext)
  if (isLoggedIn) {
    return (
      <BrowserRouter>
        <ResponsiveAppBar />
        <Routes>
          <Route path='/' index element={<Home />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='users'>
            <Route index element={<Users />} />
            <Route path=':id' element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    )
  } else {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<Auth />} />
        </Routes>
      </BrowserRouter>
    )
  }
}

export default Router
