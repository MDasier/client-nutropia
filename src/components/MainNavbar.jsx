import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import defaulUserImg from '../assets/images/defaultUser.png'
import logo from '../assets/images/logopeque.png'
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Divider } from "@mui/material";

function MainNavbar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { authenticateUser, isLoggedIn, loggedUserId, setLoggedUserName, loggedUserImage, isAdmin, isNutri, isDarkTheme, reloadInfo } = useContext(AuthContext)
  const [expanded, setExpanded] = useState(false)
  const navigate = useNavigate()

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
      <Navbar.Brand /*as={Link} to="/"*/ onClick={handleShow}><img src={logo} width={"150px"} alt="logo" /></Navbar.Brand>
      
      
      <Navbar.Toggle onClick={() => setExpanded(!expanded)} aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          
          <Nav.Link as={Link} to="/" onClick={() => setExpanded(!expanded)}>Inicio</Nav.Link>          
          <Nav.Link as={Link} to="/alimentos" onClick={() => setExpanded(!expanded)}>Info alimentos</Nav.Link>          
          <Nav.Link as={Link} to="/agenda" onClick={() => setExpanded(!expanded)}>Agenda</Nav.Link>          

          {isNutri ? 
          <><Nav.Link as={Link} to="/control-pacientes" onClick={() => setExpanded(!expanded)}>Control pacientes</Nav.Link></>
          :isAdmin ?
          <><Nav.Link as={Link} to="/control-usuarios" onClick={() => setExpanded(!expanded)}>Control usuarios</Nav.Link></>
          :null}

          {isLoggedIn === false && <>
          <Nav.Link as={Link} to="/signup" onClick={() => setExpanded(!expanded)}> Registro </Nav.Link>
          <Nav.Link as={Link} to="/login" onClick={() => setExpanded(!expanded)}> Acceso </Nav.Link>
          </>}
        </Nav>

        {isLoggedIn === true && <><Nav.Link as={Link} to={`/perfil/${loggedUserId}`} onClick={() => setExpanded(!expanded)}> <img src={loggedUserImage?loggedUserImage:defaulUserImg} alt="user" height={"30px"} width={"30px"} style={{borderRadius:"20px"}}/> </Nav.Link>

        <Nav.Link onClick={handleLogout}> Cerrar sesión </Nav.Link></>}
       
      </Navbar.Collapse>
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