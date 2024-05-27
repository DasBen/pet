import {Route, Routes} from 'react-router-dom'
import Home from './pages/home'
import AnimalProfile from './pages/animalProfile'
import AnimalEdit from './pages/animalEdit'

export default function Links() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/animal/:id" element={<AnimalProfile />} />
      {/* Create */}
      <Route path="/animal/:id/edit" element={<AnimalEdit />} />
      {/* <Route path="/login" element={<LoginRedirect />} /> */}
      {/* <Route path="/logut" element={<LogoutRedirect />} /> */}
    </Routes>
  )
}
