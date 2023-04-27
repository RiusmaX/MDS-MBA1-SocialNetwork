import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ResponsiveAppBar from '../components/Layout/AppBar'
import Auth from '../pages/Auth'
import Home from '../pages/Home'
import Profile from '../pages/Profile'
import Users from '../pages/Users'
import { AuthProvider } from '../contexts/AuthContext'

const Router = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ResponsiveAppBar />
        <Routes>
          <Route path='/' index element={<Home />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='users'>
            <Route index element={<Users />} />
            <Route path=':id' element={<Profile />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default Router
