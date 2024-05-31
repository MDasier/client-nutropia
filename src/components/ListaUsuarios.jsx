import React, { useEffect, useState } from "react";
import service from "../services/config.services";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap/esm";
import UsuarioCard from "./UsuarioCard";

function ListaUsuarios() {

  const [listaUsuarios, setListaUsuarios] = useState(null);
  const navigate = useNavigate()

useEffect(() => {
    const cargaUsuarios = async () => {
      try {
        const response = await service.get("/usuarios");
        setListaUsuarios(response.data);
      } catch (error) {
        navigate("/server-error")
      }
    };
  
    cargaUsuarios();
  }, []);

  if (listaUsuarios === null) {
    return (
      <Spinner animation="border" role="status"></Spinner>
    );
  }

  return (
    <div className="d-flex m-2 gap-2 justify-content-center align-items-center flex-wrap">
        {listaUsuarios.map((usuario)=>{
            return <UsuarioCard key={usuario._id} usuario={usuario} />
        })}
    </div>
  )
}

export default ListaUsuarios