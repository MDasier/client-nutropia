import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

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
      </div>
      :null}

      {isPaciente
      ?<div>
        <h3>Contenido para los pacientes</h3>
      </div>
      :null}

    </div>
  )
}

export default HomePage