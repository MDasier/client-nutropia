import { useEffect, useState } from "react"
import service from "../services/config.services"
import { Spinner } from "react-bootstrap"

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Citas(props) {
    const [citas,setCitas] = useState(null)
    const [fecha, setFecha] = useState("")//useState(new Date());
    const [consulta, setConsulta] = useState("")

    useEffect(()=>{
        const buscarCitas = async () => {
            const resp = await service.get(`/citas/${props.role}`)
            setCitas(resp.data)
            
            const arrFechas = []
            if(resp.data.length>0){//empezando a controlar posibles fallos
              resp.data.map((eachCita)=>{
                return arrFechas.push(eachCita.fecha)
              })
              const restaFechas = arrFechas.map(fecha => Math.abs(new Date(fecha) - new Date()))
              const iFechaMasCercana = restaFechas.indexOf(Math.min(...restaFechas))
              setFecha(resp.data[iFechaMasCercana].fecha)//fecha más cercana a la de 'hoy'
              const horaArr = resp.data[iFechaMasCercana].fecha.split('T')
              const horaExacta = horaArr[1].split('.')
              setConsulta(horaExacta[0])
            }            
        }
        buscarCitas()
    },[])

    if(citas===null){
        return <Spinner animation="border" role="status"></Spinner>
    }
  return (
    <div className="d-flex-c m-2 gap-2 justify-content-center align-items-center flex-wrap">
        
      <Calendar defaultActiveStartDate={new Date()} /*onChange={setFecha}*/ value={fecha} />
      <p style={{margin:"40px"}}>{consulta===""?"Agenda vacía":"A las "+consulta}</p>
        {/*citas.map((eachCita)=>{
            return <p key={eachCita._id}>{eachCita.fecha}</p>
        })*/}
    </div>
  )
}

export default Citas