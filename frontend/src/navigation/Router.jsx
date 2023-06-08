import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ResponsiveAppBar from '../components/Layout/AppBar'
import Auth from '../pages/Auth'
import Register from '../pages/Register'
import Chats from '../pages/Chats'
import Home from '../pages/Home'
import Profile from '../pages/Profile'
import Users from '../pages/Users'
import { useAuth } from '../contexts/AuthContext'
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
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    )
  }
}

export default Router
