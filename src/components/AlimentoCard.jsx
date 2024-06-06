import Card from "react-bootstrap/Card";
import ListGroup from 'react-bootstrap/ListGroup';
import Button from "react-bootstrap/Button";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function AlimentoCard(props) {

  const { isDarkTheme, backgroundColor, textColor } = useContext(AuthContext)

  const handleAñadir = (e)=>{
    e.preventDefault();
    props.setArrAlimentos([...(props.arrAlimentos),props.alimento])
    //console.log(props.arrAlimentos)
  }
  const handleQuitar = (e)=>{
    e.preventDefault()
    const arrClone = [...(props.arrAlimentos)]
    arrClone.splice(props.i, 1)
    //console.log(arrClone)
    props.setArrAlimentos(arrClone)
  }

  return (
    /* //?Cambiar por esta version si consigo imagenes
    <Card.Img src="holder.js/100px270" alt="Card image" />
      <Card.ImgOverlay>
     */
    <Card
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: "500px",
        minHeight:"2rem"
      }}
      data-bs-theme={isDarkTheme}
      
    >
      <Card.Header style={{display:"flex",justifyContent:"space-between"}}>
      <Card.Title>
        {props.alimento.nombre.toUpperCase()}
        </Card.Title>
        {props.arr?<Button variant="danger" size="sm" onClick={handleQuitar}>Borrar</Button>:<Button variant="success" size="sm" onClick={handleAñadir}>Añadir</Button>}
        
      </Card.Header>

      <Card.Body
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap:"20px",
          alignItems:"center",
          scrollbarWidth: "none",
          overflowY: "scroll",
          maxHeight: "fit-content",
          padding:"5px",
          margin:"5px"
        }}
      >

        <Card.Subtitle className="text-muted">
        {"Categoría: "+ props.alimento.categoria}
        </Card.Subtitle>

        <ListGroup variant="flush">
          <ListGroup.Item>{"Medida: "+ props.alimento.medida}</ListGroup.Item>
          <ListGroup.Item>{"Grasas: "+ props.alimento.grasas}</ListGroup.Item>
          <ListGroup.Item>{"Hidratos: "+ props.alimento.HC}</ListGroup.Item>
          <ListGroup.Item>{"Proteínas: "+ props.alimento.proteinas}</ListGroup.Item>
          <ListGroup.Item>{"Calorías: "+ props.alimento.energiaKCAL}</ListGroup.Item>
        </ListGroup>
        
      </Card.Body>
    </Card>
  );
}

export default AlimentoCard;