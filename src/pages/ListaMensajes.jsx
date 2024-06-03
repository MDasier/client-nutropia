import { useContext, useEffect, useState } from "react";
import service from "../services/config.services";
import "react-calendar/dist/Calendar.css";
import { AuthContext } from "../context/auth.context";
import { Button,Spinner } from "react-bootstrap";

function ListaMensajes() {
  const [mensajesNuevos, setMensajesNuevos] = useState(null);
  const [mensajes, setMensajes] = useState(null);
  const [placeholder, setPlaceholder] = useState("");
  const { loggedUserId, getNuevosMensajesParaPaciente } = useContext(AuthContext);


  const buscarMensajes = async () => {
    if (loggedUserId) {
      const nuevos = await service.get(`/mensajes/nuevos`);
      setMensajesNuevos(nuevos.data)    
      const todos = await service.get(`/mensajes/recibidos`);
      setMensajes(todos.data) 
    }
  };
  const marcarComoLeido = async(id) => {
    //console.log(id)
    try {
        await service.patch(`/mensajes/mensaje-leido`,{id:id})
    } catch (error) {
        //console.log(error)
    }
    getNuevosMensajesParaPaciente()
  }

  useEffect(() => {
    buscarMensajes();
    if(mensajes===null && mensajesNuevos===null){
      setPlaceholder("NO HAY MENSAJES QUE MOSTRAR")
    }
  }, []);

  if (mensajes === null) {
    return <Spinner animation="border" role="status"></Spinner>
  }

  return (
    <div
      style={{
        color: "black",
        width: "fit-content",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="d-flex-c m-2 gap-2 justify-content-center align-items-center"
    >
      {mensajesNuevos&&
      mensajesNuevos.map((eachMensaje) => {
        return <div style={{
            backgroundColor: "#dcdcdc",
            width: "10rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }} className="d-flex-c m-2 gap-2 justify-content-center align-items-center" key={eachMensaje._id}><p>Mensaje:</p> <h6>{eachMensaje.texto}</h6>
          <Button variant="success" onClick={()=>marcarComoLeido(eachMensaje._id)}>marcar como leído</Button></div>
      })}

    {mensajes&&
      mensajes.map((eachMensaje) => {
        return <div style={{
            backgroundColor: "#dcdcdc",
            width: "10rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }} className="d-flex-c m-2 gap-2 justify-content-center align-items-center" key={eachMensaje._id}><p>Mensaje:</p> <h6>{eachMensaje.texto}</h6>
          </div>
      })}
      <div><h3>{placeholder}</h3></div>
    </div>
  );
}

export default ListaMensajes;
