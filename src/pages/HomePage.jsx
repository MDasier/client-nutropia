import { useContext, useEffect, useState} from "react";
import { AuthContext } from "../context/auth.context";
import ListaPacientes from "../components/ListaPacientes";
import { Link } from "react-router-dom";
import service from "../services/config.services";
import { Spinner } from "react-bootstrap";

function HomePage() {

  const { isLoggedIn, loggedUserId, isNutri, isPaciente} = useContext(AuthContext)
  const [datosUsuarioLogueado,setDatosUsuarioLogueado] = useState(null)

  useEffect(() =>{
      const getLoggedUserData = async()=>{
        const loggedUserData = await service.get(`/perfil/${loggedUserId}`)
        setDatosUsuarioLogueado(loggedUserData.data)
      }
      getLoggedUserData()
  },[])

  if(datosUsuarioLogueado===null){
    return (
      <Spinner animation="border" role="status"></Spinner>
    );
  }

  return (
    <div className="d-flex m-2 gap-2 justify-content-center align-items-center flex-wrap">
      
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
        {isLoggedIn&&`Hola ${datosUsuarioLogueado.username}! `}
        <div>PROXIMA CONSULTA: || ABRIR AGENDA</div>{/* CARGAR COMPONENTE AGENDA/CITA */}
        <div>CREAR UN PLAN NUTRICIONAL</div>{/* CARGAR COMPONENTE PLAN NUTRICIONAL */}
        <div>
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
          <h6>TU PRÓXIMA REVISIÓN</h6>{/* CARGAR COMPONENTE AGENDA/CITA */}
        </div>

        <div className="d-flex m-2 gap-2 justify-content-center align-items-center flex-wrap">
          <h6>TU PLAN NUTRICIONAL</h6>{/* CARGAR COMPONENTE PLAN NUTRICIONAL */}
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