import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context.jsx"
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import axios from "axios";
import Alert from 'react-bootstrap/Alert';
import service from "../../services/config.services.js";

const ForgetPassword = () => {

  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);
  const { isDarkTheme } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleEmailChange = (e) => setEmail(e.target.value);
  
  const handleSendEmail = async (e) => {
    e.preventDefault();

    const emailToSend = {
      email: email,
    }

    try {
  //comprobar email en bbdd

  //mandar link al email comprobado
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/password/forget-password`, emailToSend)  
      setShow(true)

      const delayBusqueda = setTimeout(() => {  
        setShow(false)
      }, 2500)
    
        return () => clearTimeout(delayBusqueda)
    } catch (error) {
      //navigate("/server-error")
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
      onSubmit={handleSendEmail}
    >
      <h6>Proceso de recuperación de contraseña:</h6>
      <Form.Group controlId="email" className="mb-3">
        <Form.Control
          type="email"
          name="email"
          value={email}
          placeholder="Escribe tu email"
          required
          onChange={handleEmailChange}
        />
      </Form.Group>

      <Button type="submit"> Comprobar y enviar </Button>
      <Alert variant="info" style={{width:"100%",alignContent:"center"}} show={show}>
        Email enviado, puede tardar unos minutos en llegar
      </Alert>
    </Form>
    
    </div>
  );
};

export default ForgetPassword;
