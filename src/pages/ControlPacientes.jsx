import { useContext, useEffect, useState} from "react";
import { AuthContext } from "../context/auth.context";
import ListaUsuarios from "../components/ListaUsuarios";
import { Navigate} from "react-router-dom";

function ControlPacientes() {

const { isNutri, isAdmin, isPaciente, isLoggedIn, roleControlUsuarios } = useContext(AuthContext)
const [palabraRef,setPalabraRef]=useState(null)

  useEffect(()=>{
    if(isNutri){
      setPalabraRef("pacientes")
    }
    if(isAdmin){
      setPalabraRef("usuarios")
    }
  })

return (
    <div>
        {isPaciente || !isLoggedIn &&<Navigate to="/"/>}
        {!isLoggedIn&&<Navigate to="/"/>}
        <div className="d-flex m-2 gap-2 justify-content-center align-items-center">
          <div>
            <h3>Gestión de {palabraRef}:</h3>
            <ListaUsuarios role={roleControlUsuarios}/>
            {/* CARGA LOS USUARIOS DE TIPO PACIENTE O INVITADO PARA AÑADIRLOS O QUITARLOS DE LA LISTA DE PACIENTES DEL NUTRICIONISTA QUE ESTÉ CON LA SESION INICIADA*/}
          </div>
        </div>         
    </div>
)
}

export default ControlPacientes