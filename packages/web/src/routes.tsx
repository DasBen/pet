import {Route, Routes} from 'react-router-dom'
import Home from './pages/home'
import Profile from './pages/profile'

export default function Links() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile/:id" element={<Profile />} />
      {/* <Route path="/login" element={<LoginRedirect />} /> */}
      {/* <Route path="/logut" element={<LogoutRedirect />} /> */}
    </Routes>
  )
}
