import { useContext} from "react";
import { AuthContext } from "../context/auth.context";
import ListaUsuarios from "../components/ListaUsuarios";
import { useNavigate } from "react-router-dom";

function Controlusuarios() {
//! PAGINA PARA ADMIN O NUTRICIONISTA DONDE SE MUESTRAN LOS USUARIOS
const { isLoggedIn, loggedUserName, isAdmin, isNutri, isPaciente, isDarkTheme } = useContext(AuthContext)
const navigate = useNavigate()

  return (
    <div>
        {isNutri || isAdmin
        ?<div className="d-flex m-2 gap-2 justify-content-center align-items-center flex-wrap">
          <div>
            <h6>LISTA DE USUARIOS:</h6>
            <ListaUsuarios />
          </div>
        </div>
        :navigate("/error")}
    </div>
  )
}

export default Controlusuarios