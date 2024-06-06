import { useNavigate, useParams } from "react-router-dom"
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth.context.jsx"
import { Form } from "react-bootstrap";
import axios from "axios";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Alert from 'react-bootstrap/Alert';


const ResetPassword = () => {
  const params = useParams()
  const [mensajeRespuesta, setMensajeRespuesta] = useState("");
  const [password, setPassword] = useState("");
  const [controlVisible, setControlVisible] = useState(true);
  const [show, setShow] = useState(false);
  const { isDarkTheme } = useContext(AuthContext)
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSendPassword = async (e) => {
    e.preventDefault();
        
    const passwordToSend = {
      newPassword: password,
    };

    try {
      await axios.post(
        `http://localhost:5005/api/password/reset-password/${params.token}`, passwordToSend)

        const delay = setTimeout(() => {  
          setShow(false)
          navigate("/login")
        }, 2500)
      
          return () => clearTimeout(delay)
    } catch (error) {
      navigate("/server-error")
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
          alignItems:"center",
          justifyContent:"center",
          gap: "16px"
        }}
        onSubmit={handleSendPassword}
      >
        <h6>Nueva contraseña:</h6>
        <InputGroup hasValidation>          
          <Form.Control
            type={controlVisible?"password":"text"}
            name="password"
            value={password}
            placeholder="Escribe tu nueva contraseña"
            required
            onChange={handlePasswordChange}
          />
          <InputGroup.Text as={Button} onClick={()=>setControlVisible(!controlVisible)} variant="light">
            👁️‍🗨️
          </InputGroup.Text>
        </InputGroup>

        <Button type="submit" style={{width:"100%"}}> Guardar nueva contraseña </Button>

        <Alert variant="info" style={{width:"100%",alignContent:"center"}} show={show}>
          Contraseña actualizada
        </Alert>
        
      </Form>
    </div>
  );
};

export default ResetPassword;
