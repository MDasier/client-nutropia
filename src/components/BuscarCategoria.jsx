import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Form from "react-bootstrap/Form";
import { useContext } from "react";
import service from '../services/config.services';
import { AuthContext } from '../context/auth.context';

function BuscarCategoria(props) {
  const [ categoria , setCategoria ] = useState('')
  const navigate = useNavigate()
  const {isDarkTheme} = useContext(AuthContext)

  useEffect(() => {       
    const delayBusqueda = setTimeout(() => {  
        if(categoria===''){
            service.get(`/alimentos`)
            .then((resp)=>{
              props.setListaAlimentos(resp.data)
            })
            .catch((error)=>{
              navigate('/server-error')
            })
        }else{
            service.get(`/alimentos/categoria/${categoria}`)
            .then((resp)=>{
              props.setListaAlimentos(resp.data)
            })
            .catch((error)=>{
              navigate('/server-error')
            })
        }
    }, 200)//el tiempo que tarda en volver a buscar

    return () => clearTimeout(delayBusqueda)

  }, [categoria])

  return (
    <div className="d-flex-r m-2 gap-2 justify-content-center align-items-center flex-wrap" >
      <Form.Select data-bs-theme={isDarkTheme?"dark":"light"} aria-label="Default select example" onChange={(e) => setCategoria(e.target.value)}>
      <option value=''>Mostrar todos los alimentos</option>
      <option value="lacteos">Lácteos</option>
      <option value="hortaliza-verdura">Hortalizas y verduras</option>
      <option value="fruta-zumo">Frutas frescas, secas y zumos</option>
      <option value="cereales-derivados">Cereales, derivados y legumbres</option>
      <option value="alimentos-proteicos">Alimentos protéicos</option>
      <option value="alimentos-grasos">Alimentos grasos</option>
      <option value="azucares-dulces">Azúcares y dulces</option>
    </Form.Select>
    </div>
  )
}

export default BuscarCategoria