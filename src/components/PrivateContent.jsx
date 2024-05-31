import { useContext } from "react"
import { AuthContext } from "../context/auth.context"
import { Navigate } from "react-router-dom"

function PrivateContent(props) {
  const {isLoggedIn}=useContext(AuthContext)
  if (isLoggedIn){
    return props.children
  }else{
    return (
      //alert MUI "contenido privado, necesitas estar registrado para entrar"
      <Navigate to="/login"/>
    )
  }
}
export default PrivateContent