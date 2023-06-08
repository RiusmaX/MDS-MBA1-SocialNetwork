import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ResponsiveAppBar from '../components/Layout/AppBar'
import Auth from '../pages/Auth'
import Chats from '../pages/Chats'
import Home from '../pages/Home'
import Profile from '../pages/Profile'
import Users from '../pages/Users'
import { AuthContext, useAuth } from '../contexts/AuthContext'
import { useContext } from 'react'
import Post from '../pages/Post'

const Router = () => {
  const { state: { isLoggedIn } } = useAuth()
  if (isLoggedIn) {
    return (
      <BrowserRouter>
        <ResponsiveAppBar />
        <Routes>
          <Route path='/' index element={<Home />} />

          <Route path='/auth' element={<Auth />} />
          <Route path='/chats' element={<Chats />} />
          <Route path='users'>
            <Route index element={<Users />} />
            <Route path=':id' element={<Profile />} />
          </Route>
          <Route path='/post/:id' element={<Post />} />
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
