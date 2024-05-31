import { useContext, useEffect, useState} from "react";
import { AuthContext } from "../context/auth.context";
import ListaPacientes from "../components/ListaPacientes";
import { Link, Navigate } from "react-router-dom";
import service from "../services/config.services";
import { Spinner } from "react-bootstrap";

function HomePage() {

  const { isLoggedIn, loggedUserId, isNutri, isPaciente} = useContext(AuthContext)
  const [datosUsuarioLogueado,setDatosUsuarioLogueado] = useState(null)

  useEffect(()=>{
    if(isLoggedIn){
      const getLoggedUserData = async()=>{
        const loggedUserData = await service.get(`/perfil/${loggedUserId}`)
        setDatosUsuarioLogueado(loggedUserData.data)
      }
      getLoggedUserData()
    }else{
      <Navigate to="/" />
    }
  },[])

  if(datosUsuarioLogueado===null){
    return (
      <Spinner animation="border" role="status"></Spinner>
    );
  }
  return (
    <div className="d-flex m-2 gap-2 justify-content-center align-items-center flex-wrap">
      <h3>Hola {datosUsuarioLogueado.username}!</h3>
      {isNutri
      ?<div className="d-flex-c m-2 gap-2 justify-content-center align-items-center flex-wrap">
        <h3>Contenido para los nutricionistas</h3>
        <div>PROXIMA CITA || AGENDA</div>
        <div>CREAR PLAN NUTRICIONAL</div>
        <div>
          <h6>LISTA DE PACIENTES:</h6>
          <ListaPacientes />
        </div>
      </div>
      :null}

      {isPaciente
      ?<div className="d-flex-c m-2 gap-2 justify-content-center align-items-center flex-wrap">
        <h3>Contenido para los pacientes</h3>
        <div className="d-flex m-2 gap-2 justify-content-center align-items-center flex-wrap">
          <h6>PROXIMA CITA</h6>
        </div>

        <div className="d-flex m-2 gap-2 justify-content-center align-items-center flex-wrap">
          <h6>PLANES NUTRICIONALES</h6>
        </div>

        <div className="d-flex m-2 gap-2 justify-content-center align-items-center flex-wrap">
          <h6>RECETAS SALUDABLES:</h6>
          <a href="https://leftnutrition.netlify.app" target="_blank" rel="noopener noreferrer">
            <span>🥕 RECETAS DE MARINA 🥕</span>
          </a>
        </div>

      </div>
      :null}

    </div>
  )
}

export default HomePage