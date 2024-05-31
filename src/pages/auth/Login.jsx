import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import service from "../../services/config.services";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Login() {

  const { authenticateUser, isDarkTheme } = useContext(AuthContext)
  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      onSubmit={handleLogin}
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
      <Form.Group controlId="password" className="mb-3">
        <Form.Label>Contraseña*</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={password}
          placeholder="Escribe tu contraseña"
          required
          onChange={handlePasswordChange}
        />
      </Form.Group>

      <Button type="submit"> Acceder </Button>
      {errorMessage && <p>{errorMessage}</p>}
    </Form>
      
    </div>
  );
}

export default Login;