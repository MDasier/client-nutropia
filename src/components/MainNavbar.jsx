import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import defaulUserImg from '../assets/images/defaultUser.png'
import logo from '../assets/images/logopeque.png'
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Divider } from "@mui/material";
import { Dropdown } from "react-bootstrap";

function MainNavbar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { authenticateUser, isLoggedIn, loggedUserId, setLoggedUserName, loggedUserImage, isAdmin, isNutri, isDarkTheme, reloadInfo } = useContext(AuthContext)
  const [expanded, setExpanded] = useState(false)
  const navigate = useNavigate()

  useEffect(()=>{
    authenticateUser()
    reloadInfo()
  },[])

  const handleLogout = async () => {
    setExpanded(!expanded)
    localStorage.removeItem("authToken")
    setLoggedUserName(null)
    await authenticateUser()
    navigate("/login")
  }

  return (
    <Navbar expanded={expanded} expand="lg" bg={isDarkTheme?"dark":"light"} data-bs-theme={isDarkTheme?"dark":"light"} className="bg-body-tertiary" sticky="top">
    <Container>
      <Navbar.Brand onClick={handleShow}><img src={logo} width={"150px"} alt="logo" /></Navbar.Brand>
     
      {isLoggedIn && 
      <div>
      <Dropdown drop="start">
      <Dropdown.Toggle variant="ligh" id="dropdown-basic">
      <img src={loggedUserImage?loggedUserImage:defaulUserImg} alt="user" height={"30px"} width={"30px"} style={{borderRadius:"20px"}}/>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item as={Link} to={`/`}>Inicio</Dropdown.Item>
        <Dropdown.Item as={Link} to={`/perfil/${loggedUserId}`}>Perfil</Dropdown.Item>
        <Dropdown.Item as={Link} to={`/perfil/foto-perfil/${loggedUserId}`}>Cambiar foto de perfil</Dropdown.Item>
        <Dropdown.Item onClick={handleLogout}>Cerrar sesión</Dropdown.Item>
      </Dropdown.Menu>
      </Dropdown>
      </div>}

      {!isLoggedIn && 
      <div>
      <Dropdown>
      <Dropdown.Toggle variant="ligh" id="dropdown-basic">
      <img src={loggedUserImage?loggedUserImage:defaulUserImg} alt="user" height={"30px"} width={"30px"} style={{borderRadius:"20px"}}/>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item as={Link} to={`/`}>Inicio</Dropdown.Item>
        <Dropdown.Item as={Link} to={`/login`}>Entrar</Dropdown.Item>
        <Dropdown.Item as={Link} to={`/signup`}>Registrarse</Dropdown.Item>
      </Dropdown.Menu>
      </Dropdown>
      </div>}
    </Container>
    
    <Offcanvas show={show} onHide={handleClose} /*responsive="lg"*/ style={{width:"50%"}}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Opciones</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <Link to="/" onClick={handleClose}>Inicio</Link> 
    <Divider />         
          <Link to="/alimentos" onClick={handleClose}>Info alimentos</Link>     
    <Divider />     
          <Link to="/agenda" onClick={handleClose}>Agenda</Link>
    <Divider />
          <Link to={`/mensajes/${loggedUserId}`} onClick={handleClose}>Mensajes</Link>
    <Divider />
        {isNutri ? 
          <><Link to="/control-pacientes" onClick={handleClose}>Control pacientes</Link></>
          :isAdmin ?
          <><Link as={Link} to="/control-usuarios" onClick={() => setExpanded(!expanded)}>Control usuarios</Link></>
          :null}
    <Divider />
        {isLoggedIn === false && <>
          <Link as={Link} to="/signup" onClick={() => setExpanded(!expanded)}> Registro </Link>
          <Link as={Link} to="/login" onClick={() => setExpanded(!expanded)}> Acceso </Link>
          </>}
    <Divider />
    {isLoggedIn&&
    <Link onClick={handleLogout}> Cerrar sesión </Link>}
        </Offcanvas.Body>
      </Offcanvas>
  </Navbar>  
 );
}

export default MainNavbar;