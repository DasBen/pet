import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home.tsx'
import Animal from './pages/Animal.tsx'

export default function Links() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/animals" element={<Animal />} />
      {/* <Route path="/login" element={<LoginRedirect />} /> */}
      {/* <Route path="/logut" element={<LogoutRedirect />} /> */}
    </Routes>
  )
}
