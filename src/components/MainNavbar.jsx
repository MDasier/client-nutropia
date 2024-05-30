import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import defaulUserImg from '../assets/images/defaultUser.png'

function MainNavbar() {

  const { authenticateUser, isLoggedIn, loggedUserId, loggedUserName, setLoggedUserName, loggedUserImage, isAdmin, isDarkTheme } = useContext(AuthContext)
  const [expanded, setExpanded] = useState(false)
  const navigate = useNavigate()

  const handleLogout = async () => {
    setExpanded(!expanded)
    localStorage.removeItem("authToken")
    setLoggedUserName(null)
    await authenticateUser()
    navigate("/login")

  }

  return (/*
    <nav>
      <Link to="/"> Home </Link>

      {isLoggedIn === false && <>
        <Link to="/signup"> Registro </Link>
        <Link to="/login"> Acceso </Link>
      </>}

      {isLoggedIn === true && <>
        <Link to="/perfil"> Perfil </Link>
        <Link onClick={handleLogout}> Cerrar sesión </Link>
      </>}

      {isAdmin && <p>eres un admin</p>}

    </nav>
      */
    <Navbar expanded={expanded} expand="lg" bg={isDarkTheme?"dark":"light"} data-bs-theme={isDarkTheme?"dark":"light"} className="bg-body-tertiary" sticky="top">
    <Container>
      <Navbar.Brand as={Link} to="/">LOGO</Navbar.Brand>
      <Navbar.Toggle onClick={() => setExpanded(!expanded)} aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/" onClick={() => setExpanded(!expanded)}>Home</Nav.Link>
          <Nav.Link as={Link} to="/" onClick={() => setExpanded(!expanded)}>INFO</Nav.Link>
          {isLoggedIn === true && <>
            {/*<Nav.Link as={Link} to={`/perfil/${loggedUserId}`} onClick={() => setExpanded(!expanded)}> Perfil </Nav.Link>*/}
            <Nav.Link onClick={handleLogout}> Cerrar sesión </Nav.Link>
          </>}
          {isLoggedIn === false && <>
            <Nav.Link as={Link} to="/signup" onClick={() => setExpanded(!expanded)}> Registro </Nav.Link>
            <Nav.Link as={Link} to="/login" onClick={() => setExpanded(!expanded)}> Acceso </Nav.Link>
          </>}
        </Nav>
        {isLoggedIn === true && <><Nav.Link as={Link} to={`/perfil/${loggedUserId}`} onClick={() => setExpanded(!expanded)}> <img src={loggedUserImage?loggedUserImage:defaulUserImg} alt="user" width={"30px"}/> </Nav.Link></>}
        
      </Navbar.Collapse>
    </Container>
  </Navbar>
  
 );
}

export default MainNavbar;