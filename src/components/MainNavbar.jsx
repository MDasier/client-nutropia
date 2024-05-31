import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import defaulUserImg from '../assets/images/defaultUser.png'
import logo from '../assets/images/logopeque.png'

function MainNavbar() {

  const { authenticateUser, isLoggedIn, loggedUserId, loggedUserName, setLoggedUserName, loggedUserImage, isAdmin, isNutri, isDarkTheme } = useContext(AuthContext)
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
      {isLoggedIn&&<Navbar.Brand as={Link} to="/home"><img src={logo} width={"150px"} alt="logo" /></Navbar.Brand>}
      {!isLoggedIn&&<Navbar.Brand as={Link} to="/"><img src={logo} width={"150px"} alt="logo" /></Navbar.Brand>}
      
      
      <Navbar.Toggle onClick={() => setExpanded(!expanded)} aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          
          {isLoggedIn&&<Nav.Link as={Link} to="/home" onClick={() => setExpanded(!expanded)}>Home</Nav.Link>}
          {!isLoggedIn&&<Nav.Link as={Link} to="/" onClick={() => setExpanded(!expanded)}>Home</Nav.Link>}
          

          {isNutri ? <><Nav.Link as={Link} to="/control-usuarios" onClick={() => setExpanded(!expanded)}>Control usuarios</Nav.Link></>:isAdmin ?<><Nav.Link as={Link} to="/control-usuarios" onClick={() => setExpanded(!expanded)}>Control usuarios</Nav.Link></>:null}
          {isLoggedIn === false && <>
          <Nav.Link as={Link} to="/signup" onClick={() => setExpanded(!expanded)}> Registro </Nav.Link>
          <Nav.Link as={Link} to="/login" onClick={() => setExpanded(!expanded)}> Acceso </Nav.Link>
          </>}
        </Nav>

        {isLoggedIn === true && <><Nav.Link as={Link} to={`/perfil/${loggedUserId}`} onClick={() => setExpanded(!expanded)}> <img src={loggedUserImage?loggedUserImage:defaulUserImg} alt="user" width={"30px"}/></Nav.Link>

        <Nav.Link onClick={handleLogout}> Cerrar sesión </Nav.Link></>}
        
      </Navbar.Collapse>
    </Container>
  </Navbar>  
 );
}

export default MainNavbar;