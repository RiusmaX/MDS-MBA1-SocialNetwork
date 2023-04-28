import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ResponsiveAppBar from '../components/Layout/AppBar'
import Auth from '../pages/Auth'
import Home from '../pages/Home'
import Profile from '../pages/Profile'
import Users from '../pages/Users'
import { AuthContext, AuthProvider } from '../contexts/AuthContext'
import { useContext } from 'react'

const Router = () => {
  const authContext = useContext(AuthContext)
  console.log(authContext)
  if (authContext.isLoggedIn()) {
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
          <Route path='/auth' index element={<Auth />} />
        </Routes>
      </BrowserRouter>
    )
  }
}

export default Router
