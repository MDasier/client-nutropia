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
// components
import MainNavbar from "./components/MainNavbar.jsx"
import PrivateContent from './components/PrivateContent.jsx';
import DetallesPaciente from './pages/DetallesPaciente.jsx';
import ListaCitas from './pages/ListaCitas.jsx';
import CrearCita from './pages/CrearCita.jsx';
import EnviarMensaje from './pages/EnviarMensaje.jsx';
import ListaMensajes from './pages/ListaMensajes.jsx';
import ForgetPassword from './pages/auth/ForgetPassword.jsx';
import ResetPassword from './pages/auth/ResetPassword.jsx';
import Settings from './pages/Settings.jsx';
import InfoPage from './pages/InfoPage.jsx';



function App() {

  return (
    <div>
      <MainNavbar />
      <br />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/info" element={<InfoPage />}/>
        <Route path="/settings" element={<Settings />}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget" element={<ForgetPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/alimentos" element={<ListaAlimentos />} />
        <Route path="/perfil/:userId" element={<PrivateContent><Perfil/></PrivateContent>} />
        <Route path="/perfil/foto-perfil/:userId" element={<PrivateContent><Editimage/></PrivateContent>} />
        <Route path="/control-pacientes" element={<PrivateContent><ControlPacientes/></PrivateContent>} />
        <Route path="/agenda" element={<PrivateContent><ListaCitas/></PrivateContent>} />
        <Route path="/nueva-cita/:pacienteId" element={<PrivateContent><CrearCita/></PrivateContent>} />
        <Route path="/mensajes/:id" element={<PrivateContent><ListaMensajes/></PrivateContent>} />
        <Route path="/nuevo-mensaje/:pacienteId" element={<PrivateContent><EnviarMensaje/></PrivateContent>} />
        <Route path="/pacientes/:pacienteId" element={<PrivateContent><DetallesPaciente/></PrivateContent>} />

        <Route path="/server-error" element={<NotFound />/* debería crear una página para 'server-error' */}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
