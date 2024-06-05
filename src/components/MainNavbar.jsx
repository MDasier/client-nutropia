import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import defaulUserImg from '../assets/images/defaultUser.png'
import logo from '../assets/images/logopeque.png'
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Dropdown } from "react-bootstrap";
import Badge from 'react-bootstrap/Badge';
import { HexColorPicker } from "react-colorful";
import { Anchor, Button } from "react-bootstrap/esm";
import Alert from 'react-bootstrap/Alert';

function MainNavbar() {
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { authenticateUser, isLoggedIn, loggedUserId, setLoggedUserName, loggedUserImage, setLoggedUserImage, isAdmin, isNutri, isDarkTheme, reloadInfo, cantidadMensajesNuevos, getNuevosMensajesParaPaciente,backgroundColor, setBackgroundColor,textColor, setTextColor, guardarConfiguracion } = useContext(AuthContext)
  const [expanded, setExpanded] = useState(false)
  const navigate = useNavigate()

  useEffect(()=>{
    authenticateUser()
    reloadInfo()
    getNuevosMensajesParaPaciente()
  },[])

  const handleLogout = async () => {
    setExpanded(!expanded)
    localStorage.removeItem("authToken")
    setLoggedUserName(null)
    setLoggedUserImage(null)
    await authenticateUser()
    navigate("/login")
  }
  const showAlertyGuardar = async (e) => {
    e.preventDefault();
    setShowAlert(true)
    guardarConfiguracion()
    const delayAlert = setTimeout(() => {  
      setShowAlert(false)
      setShow(false)
    }, 500)

      return () => {
        clearTimeout(delayAlert)
      }
  }
  return (
    <Navbar expanded={expanded} expand="lg" style={{backgroundColor:backgroundColor}} data-bs-theme={isDarkTheme} sticky="top">
    <Container>
      <Navbar.Brand onClick={handleShow}><img src={logo} width={"150px"} alt="logo" /></Navbar.Brand>
     
      {isLoggedIn && 
      <div>
      <Dropdown drop="start">
      <Dropdown.Toggle variant="ligh" id="dropdown-basic">
      <img src={loggedUserImage?loggedUserImage:defaulUserImg} alt="user" height={"30px"} width={"30px"} style={{borderRadius:"20px"}}/>
      <Badge bg={cantidadMensajesNuevos===0?backgroundColor:"warning"}>{cantidadMensajesNuevos}</Badge>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item as={Link} to={`/`}>Inicio</Dropdown.Item>
        {isLoggedIn&&<Dropdown.Item as={Link} to={`/mensajes/${loggedUserId}`}>Mensajes</Dropdown.Item>}
        <Dropdown.Item as={Link} to={`/perfil/${loggedUserId}`}>Perfil</Dropdown.Item>
        <Dropdown.Item as={Link} to={`/perfil/foto-perfil/${loggedUserId}`}>Cambiar foto de perfil</Dropdown.Item>
        <Dropdown.Item onClick={handleLogout}>Cerrar sesión</Dropdown.Item>
      </Dropdown.Menu>
      </Dropdown>
      </div>}

      {!isLoggedIn && 
      <div>

      <Dropdown drop="start">
      <Dropdown.Toggle variant="ligh" id="dropdown-basic">
      <img src={loggedUserImage?loggedUserImage:defaulUserImg} alt="user" height={"30px"} width={"30px"} style={{borderRadius:"20px"}}/>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item as={Link} to={`/`} >Inicio</Dropdown.Item>
        <Dropdown.Item as={Link} to={`/login`}>Entrar</Dropdown.Item>
        <Dropdown.Item as={Link} to={`/signup`}>Registrarse</Dropdown.Item>
      </Dropdown.Menu>
      </Dropdown>      
      </div>}
    </Container>
    
    <Offcanvas show={show} onHide={handleClose} /*responsive="xl"*/>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>⚙️ Opciones generales</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>       
        <Dropdown.Item as={Link} to="/" onClick={handleClose}> 🏠 Inicio </Dropdown.Item>     
        <Dropdown.Item as={Link} to="/alimentos" onClick={handleClose}> 🥕 Info alimentos</Dropdown.Item>    
          
          {isLoggedIn&&<Dropdown.Item as={Link} to="/agenda" onClick={handleClose}> 📅 Agenda</Dropdown.Item>}
          {isLoggedIn&&<Dropdown.Item as={Link} to={`/mensajes/${loggedUserId}`} onClick={handleClose}> ✉️ Mensajes</Dropdown.Item>}

        {isNutri ? 
          <><Dropdown.Item as={Link} to="/control-pacientes" onClick={handleClose}>Control pacientes</Dropdown.Item></>
          :isAdmin ?
          <><Dropdown.Item as={Link} to="/control-usuarios" onClick={() => setExpanded(!expanded)}>Control usuarios</Dropdown.Item></>
          :null}

        {!isLoggedIn && <>
          <Dropdown.Item as={Link} to="/signup" onClick={handleClose}> 📝 Registro </Dropdown.Item>
          <Dropdown.Item as={Link} to="/login" onClick={handleClose}> 👤 Acceso </Dropdown.Item>
          </>}


      {isLoggedIn&&
      <Dropdown.Item onClick={handleLogout}>🔓 Cerrar sesión </Dropdown.Item>}

    <Dropdown.Item as={Link} to="/settings" onClick={handleClose}>⚙️ Configuración de estilos</Dropdown.Item>
<div style={{height:"5%",backgroundColor:"#cdcdcd"}}><h6>Otras opciones y enlaces</h6><hr /></div>
    <Dropdown drop="down">
      <Dropdown.Toggle variant="light" id="dropdown-fondo">
        <h6>🎨 Cambiar color de fondo ⬇</h6>
      </Dropdown.Toggle>
    
      <Dropdown.Menu>
        <Dropdown.Item><HexColorPicker color={backgroundColor} onChange={setBackgroundColor} /></Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

    <Dropdown drop="down">
      <Dropdown.Toggle variant="light" id="dropdown-texto">
        <h6>🖌️ Cambiar color de texto ⬇</h6>
      </Dropdown.Toggle>
    
      <Dropdown.Menu>
      <Dropdown.Item><HexColorPicker color={textColor} onChange={setTextColor} /></Dropdown.Item>
      </Dropdown.Menu>
      <Dropdown.Divider />
    </Dropdown>
    
      <Button variant="success" onClick={showAlertyGuardar} style={{color:textColor}}> 💾 Guardar colores</Button>
      <hr />
      <Dropdown.Item
        href="https://github.com/MDasier/client-nutropia"
        target="_blank"
        rel="noopener noreferrer" // Se recomienda añadir estos valores para seguridad
        onClick={handleClose}
      >
        <span style={{fontSize:"12px"}}>🐈‍⬛{' >'} Enlace al repositorio de github</span>
      </Dropdown.Item>

      <Dropdown.Item
        href="https://github.com/MDasier"
        target="_blank"
        rel="noopener noreferrer" // Se recomienda añadir estos valores para seguridad
        onClick={handleClose}
      >
        <span style={{fontSize:"12px"}}>👨‍💻 Made with ❤️ by asierMD</span>
      </Dropdown.Item>

      <Alert variant="success" style={{width:"100%",alignContent:"center"}} show={showAlert}>
        Colores guardados
      </Alert>
      </Offcanvas.Body>
      
      </Offcanvas>
  </Navbar>  
 );
}

export default MainNavbar;