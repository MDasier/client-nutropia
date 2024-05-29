import { Route, Routes } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
//pages
import HomePage from './pages/HomePage.jsx'
import Login from "./pages/auth/Login.jsx"
import Signup from "./pages/auth/Signup.jsx"
// components
import MainNavbar from "./components/MainNavbar.jsx"
import Error404 from './pages/Error404.jsx'
import Perfil from './pages/auth/Perfil.jsx'

function App() {

  return (
    <div>
      <MainNavbar />
      <br />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/perfil" element={<Perfil/>} />
        <Route path="/404" element={<Error404 />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  )
}

export default App
