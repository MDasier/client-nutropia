import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context.jsx"
import service from "../../services/config.services";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function Signup() {

  const navigate = useNavigate()
  const [show, setShow] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const { authenticateUser, isLoggedIn, isAdmin, isDarkTheme } = useContext(AuthContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("")

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);

  const handleCheck = () => setIsChecked(!isChecked)
  const handleTermCond = () => {
    setIsChecked(true)
    setShow(false)
  }
  // control del modal
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleSignup = async (e) => {
    e.preventDefault();

    const newUser = {
      email: email,
      password: password,
      username: username
    }

    try {
      await service.post("/auth/signup", newUser)
      navigate("/login")

    } catch (error) {
      if(error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage)
      }
    }

  };

  return (
    <div>
        <h6>Todos los campos son obligatorios</h6>
      
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
      onSubmit={handleSignup}
    >
      <Form.Group controlId="email" className="mb-3">
        <Form.Label>Email*</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={email}
          placeholder="Escribe tu email"
          required
          onChange={handleEmailChange}
        />
      </Form.Group>
      <Form.Group controlId="username" className="mb-3">
        <Form.Label>Nombre de usuario*</Form.Label>
        <Form.Control
          type="text"
          name="username"
          value={username}
          placeholder="Escribe un nombre de usuario"
          required
          onChange={handleUsernameChange}
        />
      </Form.Group>
      <Form.Group controlId="password" className="mb-3">
        <Form.Label>Contraseña*</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={password}
          placeholder="Escribe una contraseña"
          required
          onChange={handlePasswordChange}
        />
      </Form.Group>

      <h6><input type="checkbox" checked={isChecked} onChange={handleCheck}></input>Aceptar los términos y condiones de NUTROPIA</h6>
      <Button type="submit" disabled={!isChecked}> Registrarme </Button>
      
      {errorMessage && <p>{errorMessage}</p>}

      {/* MODAL */}
      <Modal  data-bs-theme={isDarkTheme?"dark":"light"}
      show={show}
      size="lg"
      fullscreen="sm-down"
      centered
      scrollable="true"
      onEscapeKeyDown={handleClose}>
        <Modal.Header style={{ display: "flex", justifyContent: "space-between" }}>
          <Modal.Title  style={{color:isDarkTheme?"#fff":"#212529"}}>Términos y condiciones</Modal.Title>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={handleClose}
          ></button>
        </Modal.Header>
        <Modal.Body  style={{color:isDarkTheme?"#fff":"#212529"}}>
          <p>NUTROPIA no envía datos personales a terceros. Los datos son privados para uso exclusivo de nuestro personal en funciones de información personalizada y uso práctico como envio de información nutricional, planes nutricionales, dietas y demás información asociada a los usuarios.</p>
          <h6>¿Estás de acuerdo?</h6>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
          <Button variant="secondary" onClick={handleTermCond}>Aceptar</Button>
        </Modal.Footer>
      </Modal>
      <Button variant="secondary" onClick={handleShow}>Términos y Condiciones</Button>
    </Form>
      
    </div>
  );
}

export default Signup;