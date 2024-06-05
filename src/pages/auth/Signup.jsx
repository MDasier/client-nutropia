import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context.jsx"
import service from "../../services/config.services.js";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';

function Signup() {

  const navigate = useNavigate()
  const [show, setShow] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const { isDarkTheme } = useContext(AuthContext)
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlVisible, setControlVisible] = useState(true);
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

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }else{
      setValidated(true);
    }

    

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
    <div className="d-flex m-2 gap-2 justify-content-center align-items-center flex-wrap">
        
      
    <Form
        data-bs-theme={isDarkTheme}
        style={{
        borderRadius: "16px",
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
      noValidate validated={validated}
      onSubmit={handleSignup}
    >
      <h6>Todos los campos son obligatorios</h6>
      <Form.Group as={Col} controlId="username" className="mb-3" data-bs-theme={isDarkTheme}>
        <Form.Label>Email*</Form.Label>
        <Form.Control
          type="email"
          name="username"
          value={email}
          placeholder="Escribe tu email"
          required
          onChange={handleEmailChange}
        />
        <Form.Control.Feedback>Parece correcto!</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="user" className="mb-3" data-bs-theme={isDarkTheme}>
        <Form.Label>Nombre de usuario*</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={username}
          placeholder="Cookie Monster"
          required
          onChange={handleUsernameChange}
        />
      </Form.Group>

      <Form.Group controlId="password" className="mb-3" data-bs-theme={isDarkTheme}>
        <Form.Label>Contraseña*</Form.Label>
        <InputGroup hasValidation>
        <Form.Control
          type={controlVisible?"password":"text"}
          name="password"
          value={password}
          placeholder="Escribe una contraseña"
          required
          onChange={handlePasswordChange}
        />
        <InputGroup.Text as={Button} onClick={()=>setControlVisible(!controlVisible)} variant={controlVisible?"light":"dark"}>
          👁️‍🗨️
        </InputGroup.Text>
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3" data-bs-theme={isDarkTheme}>
        <Form.Check
          required
          checked={isChecked}
          onChange={handleCheck}
          label="Aceptar términos y condiones"
          feedback="Debes aceptar los términos y condiciones para registrarte."
          feedbackType="invalid"
        />
      </Form.Group>

      <Button type="submit" disabled={!isChecked}> Registrarme </Button>
      
      {errorMessage && <p>{errorMessage}</p>}

      {/* MODAL */}
      <Modal  data-bs-theme={isDarkTheme}
      show={show}
      size="lg"
      fullscreen="sm-down"
      centered
      scrollable="true"
      onEscapeKeyDown={handleClose}>
        <Modal.Header style={{ display: "flex", justifyContent: "space-between" }} data-bs-theme={isDarkTheme}  bg={isDarkTheme}>
          <Modal.Title  style={isDarkTheme==="light"?{color:"black"}:{color:"white"}} data-bs-theme={isDarkTheme}>Términos y condiciones</Modal.Title>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={handleClose}
          ></button>
        </Modal.Header>
        <Modal.Body data-bs-theme={isDarkTheme}>
          <p style={isDarkTheme==="light"?{color:"black"}:{color:"white"}}>NUTROPIA no envía datos personales a terceros. Los datos son privados para uso exclusivo de nuestro personal en funciones de información personalizada y uso práctico como envio de información nutricional, planes nutricionales, dietas y demás información asociada a los usuarios.</p>
          <p>Para tener acceso completo, un administrador o un nutricionista debe darte permisos de usuario. Este proceso puede tardar un máximo de 24h.</p>
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