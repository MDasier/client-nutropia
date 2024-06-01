import { Route, Routes } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
//pages
import HomePage from './pages/HomePage.jsx'
import Login from "./pages/auth/Login.jsx"
import Signup from "./pages/auth/Signup.jsx"
import ControlPacientes from './pages/ControlPacientes.jsx';
import Perfil from './pages/auth/Perfil.jsx'
import Editimage from './pages/auth/Editimage.jsx';
import NotFound from './pages/NotFound.jsx'
import ListaAlimentos from './pages/ListaAlimentos.jsx';
/*import Dashboard from './pages/Dashboard.jsx';*/
// components
import MainNavbar from "./components/MainNavbar.jsx"
import PrivateContent from './components/PrivateContent.jsx';
import DetallesPaciente from './components/DetallesPaciente.jsx';



function App() {

  return (
    <div>
      <MainNavbar />
      <br />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/alimentos" element={<ListaAlimentos />} />
        <Route path="/perfil/:userId" element={<PrivateContent><Perfil/></PrivateContent>} />
        <Route path="/perfil/foto-perfil/:userId" element={<PrivateContent><Editimage/></PrivateContent>} />
        <Route path="/control-pacientes" element={<PrivateContent><ControlPacientes/></PrivateContent>} />
        <Route path="/pacientes/:pacienteId" element={<PrivateContent><DetallesPaciente/></PrivateContent>} />

        <Route path="/server-error" element={<NotFound />}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
