import React, { useContext, useEffect, useState } from "react";
import service from "../services/config.services";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Spinner } from "react-bootstrap/esm";
import PacienteCard from "../components/PacienteCard";

function ListaPacientes() {
  const { authenticateUser, isLoggedIn, loggedUserId, loggedUserName, setLoggedUserName, loggedUserImage, isAdmin, isDarkTheme } = useContext(AuthContext)
  const [listaPacientes, setListaPacientes] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const response = await service.get("/auth/pacientes");
        setListaPacientes(response.data);
      } catch (error) {
        navigate("/server-error")
      }
    };
  
    fetchPacientes();
  }, []);

  if (listaPacientes === null) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return <div className="d-flex m-2 gap-2 justify-content-center align-items-center flex-wrap">{listaPacientes.map((paciente)=>{
    return <PacienteCard key={paciente._id} paciente={paciente} />
  })}</div>;
}

export default ListaPacientes;
