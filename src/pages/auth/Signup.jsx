import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context.jsx"
import service from "../../services/config.services";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Signup() {

  const navigate = useNavigate()
  const { authenticateUser, isLoggedIn, isAdmin, isDarkTheme } = useContext(AuthContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("")

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);

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
        {errorMessage && <p>{errorMessage}</p>}
      
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

      <Button type="submit"> Registrarme </Button>
      {errorMessage && <p>{errorMessage}</p>}
    </Form>

    </div>
  );
}

export default Signup;