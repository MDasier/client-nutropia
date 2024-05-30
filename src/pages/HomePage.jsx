import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import ListaPacientes from "./ListaPacientes";

function HomePage() {

  const navigate = useNavigate()
  const { authenticateUser, isLoggedIn, loggedUserId, loggedUserName, loggedUserImage, isAdmin, isNutri, isPaciente, isDarkTheme } = useContext(AuthContext)

  return (
    <div>
      <h3>Hola {loggedUserName!==null?loggedUserName:"Invitado"}!</h3>
      <div>
        {!isLoggedIn
        ?<div>
          "Necesitas registrarte o iniciar sesión para usar la app. Hecha un vistazo a unas recetas saludables mientras te lo piensas!"
          <br />
          <p> 
            <a href="https://leftnutrition.netlify.app" target="_blank" rel="noopener noreferrer">
              <span>🥕 RECETAS DE MARINA 🥕</span>
            </a>
          </p>
        </div>
        :null}
      </div>

      {isNutri
      ?<div>
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
      ?<div>
        <h3>Contenido para los pacientes</h3>
        <div>
          <h6>PROXIMA CITA</h6>
        </div>

        <div>
          <h6>PLANES NUTRICIONALES</h6>
        </div>

        <div>
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