import { useContext, useEffect, useState} from "react";
import { AuthContext } from "../context/auth.context";
import ListaPacientes from "../components/ListaPacientes";
import { Link } from "react-router-dom";
import service from "../services/config.services";
import { Button, Spinner } from "react-bootstrap";
import Citas from "../components/Citas";

function HomePage() {

  const { isLoggedIn, loggedUserId, isNutri, isPaciente, getNuevosMensajesParaPaciente,cantidadMensajesNuevos,backgroundColor,textColor} = useContext(AuthContext)
  const [datosUsuarioLogueado,setDatosUsuarioLogueado] = useState(null)


  useEffect(() =>{
      const getLoggedUserData = async()=>{
        const loggedUserData = await service.get(`/perfil/${loggedUserId}`)
        setDatosUsuarioLogueado(loggedUserData.data)
      }
      getLoggedUserData()
      getNuevosMensajesParaPaciente()
  },[])

  if(isLoggedIn&&datosUsuarioLogueado===null){
    return (
      <Spinner animation="border" role="status"></Spinner>
    );
  }


  return (
    <div style={{color:textColor,backgroundColor:backgroundColor}} className="d-flex m-2 gap-2 justify-content-center align-items-center flex-wrap">

      {/* CONTENIDO PUBLICO */}
      {!isLoggedIn&&
      <div>
        <p>
          Necesitas registrarte o iniciar sesión para usar la app. Hecha un
          vistazo a unas recetas saludables mientras te lo piensas!{" "}
          <a
            href="https://leftnutrition.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>🥕 RECETAS DE MARINA 🥕</span>
          </a>
        </p>

        <h6>
          Quiero{" "}
          <Link to="/signup">
            <span>registrarme</span>
          </Link>
        </h6>
      </div>}
      

      {/*CONTENIDO EN FUNCION DEL ROLE */}
      
        {/* nutricionistas */}
      {isNutri
      ?<div className="d-flex-c m-2 gap-2 justify-content-center align-items-center flex-wrap">
        <h3>{isLoggedIn&&`Hola ${datosUsuarioLogueado.username}! `}</h3>
        <div  className="d-flex-c m-2 gap-2 justify-content-center align-items-center flex-wrap"><h6>PROXIMA CONSULTA:<Citas role="nutri" /></h6> 
        <Button as={Link} to="/agenda">IR A AGENDA</Button>
        <div className="d-flex m-2 gap-2 justify-content-center align-items-center flex-wrap">

        <h6>Tienes {cantidadMensajesNuevos>0?cantidadMensajesNuevos:"0"} mensajes nuevos</h6>

        <Button variant={cantidadMensajesNuevos===0?"light":"warning"} disabled={cantidadMensajesNuevos>0?false:true} as={Link} to={`/mensajes/${loggedUserId}`}>IR A MENSAJES</Button>{/* CARGAR COMPONENTE DE MENSAJES */}
        </div>
        </div>{/* CARGAR COMPONENTE AGENDA/CITA */}
        
        {/*<Button>CREAR UN PLAN NUTRICIONAL</Button>{/* CARGAR COMPONENTE PLAN NUTRICIONAL }*/}
        <div className="d-flex-c m-2 gap-2 justify-content-center align-items-center flex-wrap">
          <h6>LISTA DE PACIENTES:</h6>
          <ListaPacientes />{/* CARGA LOS USUARIOS QUE YA SON PACIENTES DEL NUTRICIONISTA */}
        </div>
      </div>
      :null}

        {/* pacientes */}
      {isPaciente
      ?<div className="d-flex-c m-2 gap-2 justify-content-center align-items-center flex-wrap">
        {isLoggedIn&&`Hola ${datosUsuarioLogueado.username}! `}
        <div className="d-flex m-2 gap-2 justify-content-center align-items-center flex-wrap">
          <div ><h6>TU PROXIMA REVISIÓN:<Citas role="paciente" /></h6> </div>
        </div>

        <div className="d-flex m-2 gap-2 justify-content-center align-items-center flex-wrap">
          <h6>Tienes <span>{cantidadMensajesNuevos}</span> mensajes nuevos</h6>

          <Button variant={cantidadMensajesNuevos===0?"light":"warning"} /*disabled={cantidadMensajesNuevos>0?false:true}*/ as={Link} to={`/mensajes/${loggedUserId}`}>IR A MENSAJES</Button>
        </div>

        <div className="d-flex m-2 gap-2 justify-content-center align-items-center flex-wrap">
          {/*<h6>TU PLAN NUTRICIONAL</h6>{/* CARGAR COMPONENTE PLAN NUTRICIONAL }*/}
        </div>

        <div className="d-flex m-2 gap-2 justify-content-center align-items-center flex-wrap">
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