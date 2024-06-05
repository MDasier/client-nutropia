import { useEffect, useState } from "react";
import service from "../services/config.services";
import { Spinner } from "react-bootstrap/esm";
import AlimentoCard from "../components/AlimentoCard";
import BuscarAlimento from "../components/BuscarAlimento";
import BuscarCategoria from "../components/BuscarCategoria";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from "react-bootstrap/Button";

function ListaAlimentos() {
  const [listaAlimentos, setListaAlimentos] = useState(null);
  const [arrAlimentos, setArrAlimentos] = useState([]);
  const [grasas, setGrasas] = useState(0);
  const [hidratos, setHidratos] = useState(0);
  const [proteinas, setProteinas] = useState(0);
  const [calorias, setCalorias] = useState(0);
  
  const getAlimentos = async () => {
    const alimentos = await service.get("/alimentos");
    setListaAlimentos(alimentos.data);
  }
/*arrAlimentos.map((infoAlimento) => {
    setGrasas(grasas+parseInt(infoAlimento.grasas))
    setHidratos(hidratos+parseInt(infoAlimento.HC))
    setProteinas(proteinas+parseInt(infoAlimento.proteinas))
    setCalorias(calorias+parseInt(infoAlimento.energiaKCAL))
  })}*/

  const infoDieta = () => {    
    const sumaGrasas = arrAlimentos.reduce((acumulador, alimento) => {
      return acumulador + parseInt(alimento.grasas)
    }, 0)//valor inicial '0'
    setGrasas(sumaGrasas)

    const sumaHidratos = arrAlimentos.reduce((acumulador, alimento) => {
      return acumulador + parseInt(alimento.HC)
    }, 0)//valor inicial '0'
    setHidratos(sumaHidratos)

    const sumaProteinas = arrAlimentos.reduce((acumulador, alimento) => {
      return acumulador + parseInt(alimento.proteinas)
    }, 0)//valor inicial '0'
    setProteinas(sumaProteinas)

    const sumaCalorias = arrAlimentos.reduce((acumulador, alimento) => {
      return acumulador + parseInt(alimento.energiaKCAL)
    }, 0)//valor inicial '0'
    setCalorias(sumaCalorias)
    
    
  }
  useEffect(() => {    
    getAlimentos()  
    infoDieta()
  }, [])

  if (listaAlimentos === null) {
    return <Spinner animation="border" role="status"></Spinner>;
  }

  return (
    <div className="d-flex-c m-2 gap-2 justify-content-center align-items-center">
      <BuscarAlimento setListaAlimentos={setListaAlimentos} />
      <BuscarCategoria setListaAlimentos={setListaAlimentos} />

      <Tabs
        defaultActiveKey="lista"
        id="uncontrolled-tab-example"
        className="mb-3">

      <Tab eventKey="lista" title="LISTA DE ALIEMENTOS COMPLETA">
      <div
        className="d-flex m-2 gap-2 justify-content-center align-items-center flex-wrap"
        style={{
          scrollbarWidth: "none",
          overflowY: "scroll",
        }}>
        {listaAlimentos.map((alimento) => {
          return <AlimentoCard key={alimento._id} alimento={alimento} arr={false} arrAlimentos={arrAlimentos}setArrAlimentos={setArrAlimentos}/>;
        })}
        </div>
      </Tab>

      <Tab eventKey="dieta" title="DIETA">
      <div
        className="d-flex m-2 gap-2 justify-content-center align-items-center flex-wrap"
        style={{
          scrollbarWidth: "none",
          overflowY: "scroll",
        }}>
      {arrAlimentos.map((alimentoAñadido,i) => {
          return <AlimentoCard key={i} alimento={alimentoAñadido} arr={true} i={i} arrAlimentos={arrAlimentos}setArrAlimentos={setArrAlimentos}/>;
        })}
        {arrAlimentos.length===0?"Añade alimentos a la lista para empezar":null}
        </div>
      </Tab>

      <Tab eventKey="resultados" title="RESULTADOS">      
        <ListGroup variant="flush">
          <Button variant="success" size="sm" onClick={infoDieta}>Actualizar</Button>
          <ListGroup.Item>{"Total de grasas: "+grasas}</ListGroup.Item>
          <ListGroup.Item>{"Total de hidratos: "+hidratos}</ListGroup.Item>
          <ListGroup.Item>{"Total de proteínas: "+proteinas}</ListGroup.Item>
          <ListGroup.Item>{"Total de calorías: "+calorias}</ListGroup.Item>
        </ListGroup>          
      </Tab>

    </Tabs>

    </div>
  );
}

export default ListaAlimentos;
