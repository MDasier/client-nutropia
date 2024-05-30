import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

function PacienteCard(props) {

    const { authenticateUser, isLoggedIn, loggedUserId, loggedUserName, setLoggedUserName, loggedUserImage, isAdmin, isDarkTheme } = useContext(AuthContext)

  return (
    <Card style={{ width: "fit-content", minWidth:"fit-content", height: "fit-content" }}
      data-bs-theme={isDarkTheme?"dark":"light"}
    >
      <Card.Body
          style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          gap: "8px",
          scrollbarWidth:"none",
          overflowY:"scroll",
          /*maxHeight:"fit-content",*/
          backgroundColor:"#dcdcdc"
        }}
      >
        <Link to={`/pacientes/${props.paciente._id}`}><Card.Img variant="top" src={props.paciente.imageUrl} height="120rem" style={{objectFit:"cover"}} /></Link>
        <Card.Title>{props.paciente.username}</Card.Title>
        <Link to={`/pacientes/${props.paciente._id}`}>
          <Button variant="primary">Detalles</Button>
        </Link>
      </Card.Body>
    </Card>
  )
}

export default PacienteCard