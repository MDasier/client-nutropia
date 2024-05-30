import { Route, Routes } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
//pages
import HomePage from './pages/HomePage.jsx'
import Login from "./pages/auth/Login.jsx"
import Signup from "./pages/auth/Signup.jsx"
// components
import MainNavbar from "./components/MainNavbar.jsx"
import NotFound from './pages/NotFound.jsx'
import Perfil from './pages/auth/Perfil.jsx'
import Editimage from './pages/auth/Editimage.jsx';

function App() {

  return (
    <div>
      <MainNavbar />
      <br />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/perfil/:userId" element={<Perfil/>} />
        <Route path="/perfil/foto-perfil/:userId" element={<Editimage/>} />
        {/*<Route path="/error" element={/*CONTROL ERRORES INTERNOS} />*/}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
