import { useContext} from "react";
import { AuthContext } from "../context/auth.context";
import ListaUsuarios from "../components/ListaUsuarios";
import { Navigate} from "react-router-dom";

function Controlusuarios() {

const { isNutri, isDarkTheme } = useContext(AuthContext)

return (
    <div>
        {isNutri?
        <div className="d-flex m-2 gap-2 justify-content-center align-items-center flex-wrap">
          <div>
            <h6>LISTA DE USUARIOS:</h6>
            <ListaUsuarios />
          </div>
        </div>
        :<Navigate to="/"/>}
    </div>

)
}

export default Controlusuarios