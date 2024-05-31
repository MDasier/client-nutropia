import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import service from "../services/config.services";
import { CardText } from "react-bootstrap";

function UsuarioCard(props) {
  const navigate = useNavigate();
  const {
    isLoggedIn,
    isDarkTheme,
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

  return (
    <Card
      style={{
        display: "flex",
        flexDirection: "row",
        width: "10rem",
        minWidth: "fit-content",
        minHeight:"2rem",
        maxHeight:"4rem"
      }}
      data-bs-theme={isDarkTheme ? "dark" : "light"}
    >
      
      <Card.Body
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap:"2px",
          alignItems: "center",
          scrollbarWidth: "none",
          overflowY: "scroll",
          maxHeight: "fit-content"
        }}
      >
        <Card.Title
        style={{ width: "5rem",fontSize:"0.5em"}}
      >
        {props.usuario.username.toUpperCase()}
      </Card.Title>
      
        <CardText style={{ width: "5rem", height: "3rem"}}>
          {"Role: "+ props.usuario.role}
        </CardText>

        <Button
          style={{ width: "5rem", height: "3rem", fontSize: "0.7rem" }}
          variant="primary"
          disabled={!isLoggedIn}
          onClick={handleRolePaciente}
        >
          Añadir paciente
        </Button>
        <Button
          style={{ width: "5rem", height: "3rem", fontSize: "0.7rem" }}
          variant="primary"
          disabled={!isLoggedIn}
          onClick={handleRoleInvitado}
        >
          Borrar paciente
        </Button>
      </Card.Body>
    </Card>
  );
}

export default UsuarioCard;
