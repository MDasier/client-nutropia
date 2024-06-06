import { useContext, useEffect, useState } from "react";
import service from "../services/config.services";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { AuthContext } from "../context/auth.context";
import { Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';

function ListaCitas() {
  const navigate = useNavigate()
  const [citas, setCitas] = useState(null);
  const [fecha, setFecha] = useState(""); //useState(new Date());
  const [consulta, setConsulta] = useState("");
  const [show, setShow] = useState(false);
  const { isNutri, isPaciente } = useContext(AuthContext);

  const handleMarcarRealizada = async (id)=>{
    try {
      await service.patch(`/citas/cita-realizada`,{id:id})
      setShow(true)

      const delayBusqueda = setTimeout(() => {  
        setShow(false)
        navigate(0)
      }, 1500)
    
        return () => clearTimeout(delayBusqueda)
      
  } catch (error) {
      //console.log(error)
  }
  }
  const buscarCitas = async () => {

    if (isNutri) {
      const resp = await service.get(`/citas/nutri`);
      setCitas(resp.data)
      const arrFechas = [];
      citas.map((eachCita) => {
        return arrFechas.push(eachCita.fecha);
      });
      const restaFechas = arrFechas.map((fecha) =>
        Math.abs(new Date(fecha) - new Date())
      );
      const iFechaMasCercana = restaFechas.indexOf(Math.min(...restaFechas));
      setFecha(citas[iFechaMasCercana].fecha); //fecha más cercana a la de 'hoy'
      const horaArr = citas[iFechaMasCercana].fecha.split("T");
      const horaExacta = horaArr[1].split(".");
      setConsulta(horaExacta[0]);
      
    } else if (isPaciente) {
      const resp = await service.get(`/citas/paciente`);
      setCitas(resp.data);
      const arrFechas = [];
      citas.map((eachCita) => {
        return arrFechas.push(eachCita.fecha);
      });
      const restaFechas = arrFechas.map((fecha) =>
        Math.abs(new Date(fecha) - new Date())
      );
      const iFechaMasCercana = restaFechas.indexOf(Math.min(...restaFechas));
      setFecha(citas[iFechaMasCercana].fecha); //fecha más cercana a la de 'hoy'
      const horaArr = citas[iFechaMasCercana].fecha.split("T");
      const horaExacta = horaArr[1].split(".");
      setConsulta(horaExacta[0]);
    }
  }

  useEffect(() => {
    buscarCitas();
  }, []);

  if (citas === null) {
    return <Spinner animation="border" role="status"></Spinner>;
  }

  return (
  <div className="d-flex-c m-2 gap-2 justify-content-center align-items-center" style={{width:"100%"}}>
    <div className="d-flex-c m-2 gap-2 justify-content-center align-items-center">
    <Calendar defaultActiveStartDate={new Date()} /*onClickDay={(e)=>handleTest}*/ value={fecha&&fecha}/>
      <div className="d-flex-c m-2 gap-2 justify-content-center align-items-center">
        {citas&&
            citas.map((eachCita) => {
              return (<div key={eachCita._id} style={{padding:"20px",backgroundColor:"#dcdcdc",borderRadius:"15px",maxWidth:"95%"}}>
                      <h4>Cita: {eachCita.fecha}</h4>
                      {eachCita.estado==="pendiente" &&
                      <Button variant="success" onClick={()=>handleMarcarRealizada(eachCita._id)}>Marcar como realizada</Button>}
                    </div> )              
            })}
            {citas===null?"No hay citas":"No hay más citas por ahora"}
        
      </div>
      <Alert variant="info" style={{width:"90%"}} show={show}>
        Cita marcada como realizada
      </Alert>
    </div>
  </div>
  );
}

export default ListaCitas;
