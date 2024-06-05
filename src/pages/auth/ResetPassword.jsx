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
    setShow(true)
    const passwordToSend = {
      newPassword: password,
    };

    try {
      const resp =  await axios.post(
        `http://localhost:5005/api/password/reset-password/${params.token}`, passwordToSend);
        setMensajeRespuesta(resp.message)
    } catch (error) {
      //navigate("/server-error")
    }
    /*      <ToastContainer
          bg="dark"
          className="p-3"
          position="bottom-center"
          style={{ zIndex: 1 }}
        >
          <Toast autohide delay={2000}>
            <Toast.Header closeButton={true} >
              <strong className="me-auto">Servidor Nutropia</strong>
              <small>mensaje:</small>
            </Toast.Header>
            <Toast.Body>{mensajeRespuesta}</Toast.Body>
          </Toast>
        </ToastContainer>*/
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
        <Alert variant="info" style={{width:"90%"}} show={show}>
          {mensajeRespuesta}
        </Alert>
      </Form>
    </div>
  );
};

export default ResetPassword;
