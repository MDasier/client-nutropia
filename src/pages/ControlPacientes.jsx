import { useContext} from "react";
import { AuthContext } from "../context/auth.context";
import ListaUsuarios from "../components/ListaUsuarios";
import { Navigate} from "react-router-dom";

function ControlPacientes() {

const { isNutri, isDarkTheme } = useContext(AuthContext)

return (
    <div>
        {isNutri?
        <div className="d-flex m-2 gap-2 justify-content-center align-items-center">
          <div>
            <h6>Gestión de pacientes:</h6>
            <ListaUsuarios /> {/* CARGA LOS USUARIOS DE TIPO PACIENTE O INVITADO PARA AÑADIRLOS O QUITARLOS DE LA LISTA DE PACIENTES DEL NUTRICIONISTA QUE ESTÉ CON LA SESION INICIADA*/}
          </div>
        </div>
        :<Navigate to="/"/>}
    </div>

)
}

export default ControlPacientes