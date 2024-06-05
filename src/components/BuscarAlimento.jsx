import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Form from "react-bootstrap/Form";
import { useContext } from "react";
import service from '../services/config.services';
import { AuthContext } from '../context/auth.context';

function BuscarAlimento(props) {
  const [ busqueda , setBusqueda ] = useState('')
  const navigate = useNavigate()
  const {isDarkTheme} = useContext(AuthContext)

  useEffect(() => {       
    const delayBusqueda = setTimeout(() => {  
    service.get(`/alimentos/${busqueda}`)
      .then((resp)=>{
        props.setListaAlimentos(resp.data)
      })
      .catch((error)=>{
        navigate('/server-error')
      })
    }, 200)//el tiempo que tarda en volver a buscar

    return () => clearTimeout(delayBusqueda)

  }, [busqueda])

  return (
    <div className="d-flex-r m-2 gap-2 justify-content-center align-items-center flex-wrap" >
      <Form.Control
          data-bs-theme="light"
          type="text"
          placeholder="Buscar alimento...🔍"
          onChange={(e) => setBusqueda(e.target.value)}
      />
    </div>
  )
}

export default BuscarAlimento