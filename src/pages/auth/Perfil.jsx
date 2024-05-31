import { useContext, useEffect, useState } from "react"
import service from "../../services/config.services.js"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/auth.context.jsx"
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function Perfil() {

  const navigate = useNavigate()

  const [show, setShow] = useState(false);

  const [ id, setId ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ username, setUsername ] = useState("")
  const [ password, setPassword ] = useState("")
  const { loggedUserId, isDarkTheme } = useContext(AuthContext)

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);

  // control del modal
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const perfilEditado = {
      email,
      username,
      password
    }

    try {
      await service.patch(`/perfil/${loggedUserId}`, perfilEditado)
      navigate("/home")
    } catch (error) {
      navigate("/error");
    }
  };


  useEffect(() => {

    service.get(`/perfil/${loggedUserId}`)

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
      navigate("/server-error")
    })

  }, [])

  return (
    
    <div>
      <Form
        data-bs-theme={isDarkTheme?"dark":"light"}
        style={{
        backgroundColor: isDarkTheme?"#303030":"whitesmoke",
        borderRadius: "16px",
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
      onSubmit={handleShow}
    >

  
      <Form.Group controlId="email" className="mb-3">
        <Form.Label>Contacta con tu nutricionista o un administrador para cambiar el email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={email}
          disabled
          placeholder="Escribe tu email"
          onChange={handleEmailChange}
        />
      </Form.Group>
      <Form.Group controlId="username" className="mb-3">
        <Form.Label>Cambiar nombre de usuario:</Form.Label>
        <Form.Control
          type="text"
          name="username"
          value={username}
          placeholder={username}
          onChange={handleUsernameChange}
        />
      </Form.Group>

      <Button onClick={handleShow}> Guardar cambios </Button>
      <Button as={Link} to={`/perfil/foto-perfil/${loggedUserId}`}> Cambiar foto de perfil </Button>


      {/* MODAL */}
      <Modal show={show} data-bs-theme={isDarkTheme?"dark":"light"}>
        <Modal.Header>
          <Modal.Title  style={{color:isDarkTheme?"#fff":"#212529"}}>Editar perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body  style={{color:isDarkTheme?"#fff":"#212529"}}>
          ¿Guardar cambios?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Volver
          </Button>
          <Button variant="primary" onClick={handleSubmit} type="submit">
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </Form>
    </div>
  )
}

export default Perfil