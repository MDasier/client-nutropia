import { useContext, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function PublicHomePage() {
  const { isLoggedIn } = useContext(AuthContext)
  
  useEffect(()=>{
    if(isLoggedIn){
      <Navigate to="/home" />
    }
  },[])

  return (
    <div className="d-flex m-2 gap-2 justify-content-center align-items-center flex-wrap">
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
    </div>
  );
}

export default PublicHomePage;
