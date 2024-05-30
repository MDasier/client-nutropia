import { useContext} from "react";
import { AuthContext } from "../context/auth.context";
import ListaPacientes from "../components/ListaPacientes";
import { Link } from "react-router-dom";

function HomePage() {

  const { isLoggedIn, loggedUserName, isAdmin, isNutri, isPaciente, isDarkTheme } = useContext(AuthContext)

  return (
    <div className="d-flex m-2 gap-2 justify-content-center align-items-center flex-wrap">
      <h3>Hola {loggedUserName!==null?loggedUserName:"'Guess'"}!</h3>
      <div>
        {!isLoggedIn
        ?<div className="d-flex m-2 gap-2 justify-content-center align-items-center flex-wrap">
          <p>
            Necesitas registrarte o iniciar sesión para usar la app. Hecha un vistazo a unas recetas saludables mientras te lo piensas! <a href="https://leftnutrition.netlify.app" target="_blank" rel="noopener noreferrer">
              <span>🥕 RECETAS DE MARINA 🥕</span>
            </a>
          </p>

          <h6>Quiero <Link to="/signup"><span>registrarme</span></Link></h6>
        </div>
        :null}
      </div>

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