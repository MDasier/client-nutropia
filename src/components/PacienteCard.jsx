import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function PacienteCard(props) {

  return (
    <Card className="d-flex-c m-2 gap-2 justify-content-center align-items-center flex-wrap" data-bs-theme="light">
      <Card.Body
          style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          gap: "8px",
          scrollbarWidth:"none",
          overflowY:"scroll",
          maxHeight:"fit-content",
          backgroundColor:"#dcdcdc"
        }}
      >
        <Link to={`/pacientes/${props.paciente._id}`}><Card.Img variant="top" src={props.paciente.imageUrl} width="100%" style={{objectFit:"cover",maxWidth:"800px"}} /></Link>
        <Card.Title>{props.paciente.username}</Card.Title>

        <Link to={`/nuevo-mensaje/${props.paciente._id}`}>
          <Button variant="primary">Enviar mensaje</Button>
        </Link>

        <Link to={`/nueva-cita/${props.paciente._id}`}>
          <Button variant="primary">Crear Cita</Button>
        </Link>

        <Link to={`/pacientes/${props.paciente._id}`}>
          <Button variant="primary">Detalles</Button>
        </Link>
        
      </Card.Body>
    </Card>
  )
}

export default PacienteCard