
import Card from "react-bootstrap/Card";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

function AlimentoCard(props) {
  const {isDarkTheme} = useContext(AuthContext);

  return (
    <Card
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: "500px",
        minHeight:"2rem"
      }}
      data-bs-theme="light"
    >
      
      <Card.Body
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap:"2px",
          alignItems: "center",
          scrollbarWidth: "none",
          overflowY: "scroll",
          maxHeight: "fit-content",
          padding:"5px"
        }}
      >
        <Card.Title>
        {props.alimento.nombre.toUpperCase()}
        </Card.Title>
      
        <Card.Title style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap:"2px",
          alignItems: "center",
          scrollbarWidth: "none",
          overflowY: "scroll",
          maxHeight: "fit-content",
          padding:"5px"
        }}>
          <p>{"Categoría: "+ props.alimento.categoria}</p>
          <p>{"Medida: "+ props.alimento.medida}</p>
          <p>{"Grasas: "+ props.alimento.grasas}</p>
          <p>{"Hidratos: "+ props.alimento.HC}</p>
          <p>{"Proteínas: "+ props.alimento.proteinas}</p>
          <p>{"Calorías: "+ props.alimento.energiaKCAL}</p>
        </Card.Title>
      </Card.Body>
    </Card>
  );
}

export default AlimentoCard;