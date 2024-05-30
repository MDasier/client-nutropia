import React, { useContext, useEffect, useState } from "react";
import service from "../services/config.services";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Spinner } from "react-bootstrap/esm";
import UsuarioCard from "./UsuarioCard";

function ListaUsuarios() {
//!COMPONENTE QUE LISTA TODOS LOS USUARIOS PARA CONTROLAR SUS ROLES Y ASIGNAR NUTRICIONISTA 
const { authenticateUser, isLoggedIn, loggedUserId, loggedUserName, setLoggedUserName, loggedUserImage, isAdmin, isDarkTheme } = useContext(AuthContext)
  const [listaUsuarios, setListaUsuarios] = useState(null);
  const navigate = useNavigate()

useEffect(() => {
    const cargaUsuarios = async () => {
      try {
        const response = await service.get("/usuarios");
        setListaUsuarios(response.data);
      } catch (error) {
        console.log(error)
        //navigate("/server-error")
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
        {isLoggedIn?"Conectado":"Conexion perdida"}
        {listaUsuarios.map((usuario)=>{
            return <UsuarioCard key={usuario._id} usuario={usuario} />
        })}
    </div>
  )
}

export default ListaUsuarios