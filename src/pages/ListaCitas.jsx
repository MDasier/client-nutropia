import { useContext, useEffect, useState } from "react";
import service from "../services/config.services";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { AuthContext } from "../context/auth.context";
import { Spinner } from "react-bootstrap";

function ListaCitas() {
  const [citas, setCitas] = useState(null);
  const [fecha, setFecha] = useState(""); //useState(new Date());
  const [consulta, setConsulta] = useState("");
  const [test, setTest] = useState("");
  const { isNutri, isPaciente } = useContext(AuthContext);
/*
  const handleTest = (e) =>{
    setTest(e.target.value)
    console.log(test)
  }
*/
  useEffect(() => {
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
    };
    buscarCitas();
  }, []);

  if (citas === null) {
    return <Spinner animation="border" role="status"></Spinner>;
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
      <Calendar defaultActiveStartDate={new Date()} /*onClickDay={(e)=>handleTest}*/ value={fecha&&fecha}/>

      {citas&&
      citas.map((eachCita) => {
        return <p key={eachCita._id}>Cita: {eachCita.fecha}</p>;
      })}
    </div>
  );
}

export default ListaCitas;
