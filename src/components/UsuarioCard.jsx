import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import service from "../services/config.services";
import { CardText } from "react-bootstrap";
import { CardHeader } from "react-bootstrap/esm";

function UsuarioCard(props) {
  const navigate = useNavigate();
  const {
    isLoggedIn,
    isDarkTheme,
    isAdmin,
    isNutri,
  } = useContext(AuthContext);

  const handleRolePaciente = async (e) => {
    e.preventDefault();
    try {
      await service.patch(`/usuarios/${props.usuario._id}/paciente`);
      navigate("/");
    } catch (error) {
      navigate("/server-error");
    }
  };
  const handleRoleInvitado = async (e) => {
    e.preventDefault();
    try {
      await service.patch(`/usuarios/${props.usuario._id}/invitado`);
      navigate("/");
    } catch (error) {
      navigate("/server-error");
    }
  };
  const handleRoleNutri = async (e) => {
    e.preventDefault();
    try {
      await service.patch(`/usuarios/${props.usuario._id}/nutricionista`);
      navigate("/");
    } catch (error) {
      navigate("/server-error");
    }
  };

  return (
    <Card
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth:"100%",
        minHeight:"150px"
      }}
      data-bs-theme={isDarkTheme}
    >
      <Card.Header>
        {props.usuario.username.toUpperCase()}{" : "+ props.usuario.role}
      </Card.Header>
      <Card.Body
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
          gap:"2px",
          alignItems: "center",
          scrollbarWidth: "none",
          overflowY: "scroll"
        }}
      >

        <Button
          style={{ width: "100px", height:"80px", fontSize: "0.7rem" }}
          variant="success"
          disabled={!isAdmin}
          onClick={handleRoleNutri}
        >
          Dar permisos de nutricionita
        </Button>

        <Button
          style={{ width: "100px", height:"80px", fontSize: "0.7rem" }}
          variant="success"
          disabled={!isLoggedIn}
          onClick={handleRolePaciente}
        >
          {isNutri?"Aceptar paciente":"Dar permisos de usuario"}
        </Button>

        <Button
          style={{ width: "100px", height:"80px", fontSize: "0.7rem" }}
          variant="danger"
          disabled={!isLoggedIn}
          onClick={handleRoleInvitado}
        >
          {isNutri?"Borrar paciente":"Borrar permisos"}
        </Button>


      </Card.Body>
    </Card>
  );
}

export default UsuarioCard;
