import { Route, Routes } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
//pages
import HomePage from './pages/HomePage.jsx'
import Login from "./pages/auth/Login.jsx"
import Signup from "./pages/auth/Signup.jsx"
import Controlusuarios from './pages/Controlusuarios.jsx';
import Perfil from './pages/auth/Perfil.jsx'
import Editimage from './pages/auth/Editimage.jsx';
import NotFound from './pages/NotFound.jsx'
// components
import MainNavbar from "./components/MainNavbar.jsx"
import PrivateContent from './components/PrivateContent.jsx';
import PublicHomePage from './pages/PublicHomePage.jsx';



function App() {

  return (
    <div>
      <MainNavbar />
      <br />
      <Routes>
        <Route path="/" element={<PublicHomePage />} />
        <Route path="/home" element={<PrivateContent><HomePage /></PrivateContent>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/perfil/:userId" element={<PrivateContent><Perfil/></PrivateContent>} />
        <Route path="/perfil/foto-perfil/:userId" element={<PrivateContent><Editimage/></PrivateContent>} />
        <Route path="/control-usuarios" element={<PrivateContent><Controlusuarios/></PrivateContent>} />
        <Route path="/error" element={<NotFound />}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
