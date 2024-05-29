import { useEffect } from "react"
import { useState } from "react"
import service from "../../services/config.services"
import { useNavigate } from "react-router-dom"

function Perfil() {
  const navigate = useNavigate()
  const [ id, setId ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ username, setUsername ] = useState("")
  const [ password, setPassword ] = useState("")

  useEffect(() => {

    service.get("/auth/perfil")

    .then((response) => {
      //console.log(response.data)
      //const clone = JSON.stringify(response.data)
      //const clone = JSON.parse(response.data)
      
      const idCopy = JSON.stringify(response.data._id)
      setId(idCopy.slice(1,idCopy.length-1))

      const emailCopy = JSON.stringify(response.data.email)
      setEmail(emailCopy.slice(1,emailCopy.length-1))

      const usernameCopy = JSON.stringify(response.data.username)
      setUsername(usernameCopy.slice(1,usernameCopy.length-1))

      const passwordCopy = JSON.stringify(response.data.password)
      setPassword(passwordCopy.slice(1,passwordCopy.length-1))
    })
    .catch((err) => {
      navigate("/404")
    })

  }, [])

  return (
    
    <div>

      <h3>Username actual: {username}</h3>
      <h3>Email actual: {email}</h3>
      {/*<h3>Cambiar contraseña: {password}</h3>*/}

    </div>
  )
}

export default Perfil