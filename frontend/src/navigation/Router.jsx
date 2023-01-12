import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Profile from '../pages/Profile'
import Users from '../pages/Users'

const Router = () => {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path='/' index element={<Home />} />
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='/users' element={<Users />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
