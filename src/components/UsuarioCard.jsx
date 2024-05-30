import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import service from "../services/config.services";

function UsuarioCard(props) {
  const navigate = useNavigate()
  const {
    authenticateUser,
    isLoggedIn,
    loggedUserId,
    loggedUserName,
    setLoggedUserName,
    loggedUserImage,
    isAdmin,
    isDarkTheme,
  } = useContext(AuthContext);

  //PATCH PARA CAMBIAR EL PARAMETRO 'role' => 'paciente' + PARAMETRO 'nutricionista' => loggedUserId
  const handleAcept = async (e) => {
    e.preventDefault();
      const pacienteAñadir = {
        role:"paciente",
        nutricionista:loggedUserId
      }
  
      try {
        await service.patch(`/usuarios/${props.usuario._id}`, pacienteAñadir)
        navigate("/")
      } catch (error) {
        console.log(error)
        //navigate("/error");
      } 
  };
  const handleDelete = async (e) => {
    e.preventDefault();
      const pacienteBorrar = {
        role:"invitado",
        nutricionista:loggedUserId//no hace falta pero así se controla quien lo 'borra'
      }
  
      try {
        await service.patch(`/usuarios/${props.usuario._id}`, pacienteBorrar)
        navigate("/")
      } catch (error) {
        console.log(error)
        //navigate("/error");
      } 
  };

  return (
    <Card
      style={{ width: "100%", minWidth: "fit-content", height: "fit-content" }}
      data-bs-theme={isDarkTheme ? "dark" : "light"}
    >
      <Card.Body
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          gap: "8px",
          scrollbarWidth: "none",
          overflowY: "scroll",
          maxHeight: "fit-content",
          backgroundColor: "#dcdcdc",
        }}
      >
        <Card.Title>{props.usuario.username}</Card.Title>

        <Link to={`/usuario/${props.usuario._id}`}>
          <Card.Img
            variant="top"
            src={props.usuario.imageUrl}
            width="100rem"
            height="100rem"
            style={{ objectFit: "cover" }}
          />
        </Link>

        <Button variant="primary" disabled={!isLoggedIn} onClick={handleAcept}>
          Añadir paciente
        </Button>
        <Button variant="primary" disabled={!isLoggedIn} onClick={handleDelete}>
          Borrar paciente
        </Button>

        {/*<Link to={`/usuario/${props.usuario._id}`}>
          <Button variant="primary">Detalles de usuario</Button>
      </Link>*/}
      </Card.Body>
    </Card>
  );
}

export default UsuarioCard;
