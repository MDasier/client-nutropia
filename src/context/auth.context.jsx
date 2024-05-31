import { createContext, useEffect, useState } from "react";
import service from "../services/config.services";
import { Spinner } from "react-bootstrap/esm";

const AuthContext = createContext()

function AuthWrapper(props) {
 
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  const [ isAuthenticating, setIsAuthenticating ] = useState(true)

  //Datos
  const [ loggedUserId, setLoggedUserId ] = useState(null)
  const [ loggedUserImage, setLoggedUserImage ] = useState(null)
  const [ loggedUserName, setLoggedUserName ] = useState(null)

  //Roles
  const [ isAdmin, setIsAdmin] = useState(false)
  const [ isNutri, setIsNutri] = useState(false)
  const [ isPaciente, setIsPaciente] = useState(false)

  const authenticateUser = async () => {
    const authToken = localStorage.getItem("authToken")

    if (!authToken) {
      setIsLoggedIn(false)
      setLoggedUserId(null)
      setIsAuthenticating(false)
      setIsAdmin(false)
      setIsNutri(false)
      setIsPaciente(false)
      return;
    }

    try {
      const response = await service.get("/auth/verify")
      setIsLoggedIn(true)
      setLoggedUserId(response.data.payload._id)
      //console.log(response.data.payload)//DATOS USUARIO
      setLoggedUserImage(response.data.payload.imageUrl)
      setLoggedUserName(response.data.payload.username)
      setIsAuthenticating(false)

      if (response.data.payload.role === "admin") {
        setIsAdmin(true)
      } else {
        setIsAdmin(false)
      }
      if (response.data.payload.role === "nutri") {
        setIsNutri(true)
      } else {
        setIsNutri(false)
      }
      if (response.data.payload.role === "paciente") {
        setIsPaciente(true)
      } else {
        setIsPaciente(false)
      }

    } catch (error) {
      setIsLoggedIn(false)
      setLoggedUserId(null)
      setIsAuthenticating(false)
      setIsAdmin(false)
      setIsNutri(false)
      setIsPaciente(false)
    }
  }
  //!funcion llamada get para info de perfil
  const passedContext = {
    isLoggedIn,
    loggedUserId,
    loggedUserImage,
    loggedUserName,
    setLoggedUserName,
    authenticateUser,
    //!exportar funcion
    isNutri,
    isPaciente,
    isAdmin
  }

  useEffect(() => {
    authenticateUser()
  }, [])

  if (isAuthenticating){
    return <Spinner animation="grow" variant="warning" />
  }

  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  )

}

export {
  AuthContext,
  AuthWrapper
}