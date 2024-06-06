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
import { Button } from "react-bootstrap/esm";
import Alert from 'react-bootstrap/Alert';

function MainNavbar() {
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { authenticateUser, isLoggedIn, loggedUserId, setLoggedUserName, loggedUserImage, setLoggedUserImage, isAdmin, isNutri, isPaciente, isDarkTheme, reloadInfo, cantidadMensajesNuevos, getNuevosMensajesParaPaciente,backgroundColor, setBackgroundColor,textColor, setTextColor, guardarConfiguracion } = useContext(AuthContext)
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

    <Navbar expanded={expanded} expand="lg" style={{backgroundColor:backgroundColor,color:textColor}} data-bs-theme={isDarkTheme} sticky="top">
    <Container>
      <Navbar.Brand onClick={handleShow}><img src={logo} width={"150px"} alt="logo" /></Navbar.Brand>
     
      {isLoggedIn && 
      <div>
      <Dropdown drop="start" style={{backgroundColor:backgroundColor,color:textColor}}>
      <Dropdown.Toggle variant="terciary" id="dropdown-basic" style={{backgroundColor:backgroundColor,color:textColor}}>
      <img src={loggedUserImage?loggedUserImage:defaulUserImg} alt="user" height={"30px"} width={"30px"} style={{borderRadius:"20px"}}/>
      <Badge bg={cantidadMensajesNuevos===0?backgroundColor:"warning"}>{cantidadMensajesNuevos}</Badge>
      </Dropdown.Toggle>

      <Dropdown.Menu  style={{backgroundColor:backgroundColor,color:textColor}}>
        <Dropdown.Item as={Link} to={`/`} style={{backgroundColor:backgroundColor,color:textColor}}>Inicio</Dropdown.Item>
        {
          isLoggedIn&&isNutri || isLoggedIn&&isPaciente
          ?<>{isLoggedIn&&<Dropdown.Item as={Link} to={`/mensajes/${loggedUserId}`} style={{backgroundColor:backgroundColor,color:textColor}}>Mensajes</Dropdown.Item>}</>
          :null
        }
        
        <Dropdown.Item as={Link} to={`/perfil/${loggedUserId}`} style={{backgroundColor:backgroundColor,color:textColor}}>Perfil</Dropdown.Item>
        <Dropdown.Item as={Link} to={`/perfil/foto-perfil/${loggedUserId}`} style={{backgroundColor:backgroundColor,color:textColor}}>Cambiar foto de perfil</Dropdown.Item>
        <Dropdown.Item onClick={handleLogout} style={{backgroundColor:backgroundColor,color:textColor}}>Cerrar sesión</Dropdown.Item>
      </Dropdown.Menu>
      </Dropdown>
      </div>}

      {!isLoggedIn && 
      <div>
        <Dropdown drop="start" style={{backgroundColor:backgroundColor,color:textColor}}>
        <Dropdown.Toggle variant="ligh" id="dropdown-basic">
        <img src={loggedUserImage?loggedUserImage:defaulUserImg} alt="user" height={"30px"} width={"30px"} style={{borderRadius:"20px"}}/>
        </Dropdown.Toggle>

        <Dropdown.Menu style={{backgroundColor:backgroundColor,color:textColor,}}>
          <Dropdown.Item as={Link} to={`/`} style={{backgroundColor:backgroundColor,color:textColor}} >Inicio</Dropdown.Item>
          <Dropdown.Item as={Link} to={`/login`} style={{backgroundColor:backgroundColor,color:textColor}}>Entrar</Dropdown.Item>
          <Dropdown.Item as={Link} to={`/signup`} style={{backgroundColor:backgroundColor,color:textColor}}>Registrarse</Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown>      
      </div>}
    </Container>
    
    <Offcanvas show={show} onHide={handleClose} style={{backgroundColor:backgroundColor,color:textColor}}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title  style={{color:textColor}}>⚙️ Opciones generales</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{backgroundColor:backgroundColor,color:textColor}}>       
        <Dropdown.Item as={Link} to="/" onClick={handleClose}> 🏠 Inicio </Dropdown.Item>     
        <Dropdown.Item as={Link} to="/info" onClick={handleClose}> ℹ️ Uso</Dropdown.Item>    
        <Dropdown.Item as={Link} to="/alimentos" onClick={handleClose}> 🍱 Dieta</Dropdown.Item>

          {
            isLoggedIn&&isNutri || isLoggedIn&&isPaciente?
            <>
              <Dropdown.Item as={Link} to="/agenda" onClick={handleClose}> 📅 Agenda</Dropdown.Item>
              <Dropdown.Item as={Link} to={`/mensajes/${loggedUserId}`} onClick={handleClose}> ✉️ Mensajes</Dropdown.Item>
              <Dropdown.Item to="https://leftnutrition.netlify.app" target="_blank" rel="noopener noreferrer" onClick={handleClose}> 🥕 Recetas (Alfa)</Dropdown.Item>              
            </>
            :null
          }

        {isNutri ? 
          <><Dropdown.Item as={Link} to="/control-pacientes" onClick={handleClose}> 👥 Control pacientes</Dropdown.Item></>
          :isAdmin ?
          <><Dropdown.Item as={Link} to="/control-pacientes" onClick={handleClose}/*onClick={() => setExpanded(!expanded)}*/>👥 Control usuarios</Dropdown.Item></>
          :null}

        {!isLoggedIn && <>
          <Dropdown.Item as={Link} to="/signup" onClick={handleClose}> 📝 Registro </Dropdown.Item>
          <Dropdown.Item as={Link} to="/login" onClick={handleClose}> 👤 Acceso </Dropdown.Item>
          </>}


      {isLoggedIn&&
      <Dropdown.Item onClick={handleLogout}>🔓 Cerrar sesión </Dropdown.Item>}

    <Dropdown.Item as={Link} to="/settings" onClick={handleClose}>⚙️ Configuración</Dropdown.Item>
  <div style={{maxHeight:"5%",backgroundColor:textColor,color:backgroundColor}}><h6>#Colores y enlaces -</h6><hr /></div>
    <Dropdown drop="down">
      <Dropdown.Toggle variant="light" id="dropdown-fondo">
        <h6 style={{color:textColor}}>🎨 Cambiar color de fondo ⬇</h6>
      </Dropdown.Toggle>
    
      <Dropdown.Menu>
        <Dropdown.Item><HexColorPicker color={backgroundColor} onChange={setBackgroundColor} /></Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

    <Dropdown drop="down">
      <Dropdown.Toggle variant="light" id="dropdown-texto" >
        <h6 style={{color:textColor}}>🖌️ Cambiar color de texto ⬇</h6>
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
        rel="noopener noreferrer" 
        onClick={handleClose}
      >
        <span style={{fontSize:"12px"}}>🐈‍⬛{' >'} Enlace al repositorio de github</span>
      </Dropdown.Item>

      <Dropdown.Item
        href="https://github.com/MDasier"
        target="_blank"
        rel="noopener noreferrer"
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

 )
}

export default MainNavbar;