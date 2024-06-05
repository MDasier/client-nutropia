import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import service from "../../services/config.services";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from 'react-bootstrap/InputGroup';

function Login() {

  const { authenticateUser, isDarkTheme } = useContext(AuthContext)
  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlVisible, setControlVisible] = useState(true);
  const [errorMessage, setErrorMessage] = useState("")

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();

    const userCredentials = {
      email: email,
      password: password
    }

    try {
      const response = await service.post("/auth/login", userCredentials)

      localStorage.setItem("authToken", response.data.authToken)
      authenticateUser()
      navigate("/")

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
      onSubmit={handleLogin}
    >
      <Form.Group controlId="email" className="mb-3" data-bs-theme={isDarkTheme}>
        <Form.Label bg={isDarkTheme} data-bs-theme={isDarkTheme}>Email*</Form.Label>
        <Form.Control
          data-bs-theme={isDarkTheme}
          bg={isDarkTheme}
          type="email"
          name="email"
          value={email}
          placeholder="Escribe tu email"
          required
          onChange={handleEmailChange}
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

      <Button type="submit"> Acceder </Button>
      {errorMessage && <p>{errorMessage}</p>}
      <Form.Label as={Link} to="/forget">He olvidado mi contraseña</Form.Label>
    </Form>
      
    </div>
  );
}

export default Login;