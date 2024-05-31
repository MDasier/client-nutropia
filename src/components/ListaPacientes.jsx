import React, { useEffect, useState } from "react";
import service from "../services/config.services";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap/esm";
import PacienteCard from "./PacienteCard";

function ListaPacientes() {
  const [listaPacientes, setListaPacientes] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const cargaPacientes = async () => {
      try {
        const response = await service.get("/auth/pacientes");
        setListaPacientes(response.data);
      } catch (error) {
        navigate("/server-error")
      }
    };
  
    cargaPacientes();
  }, []);

  if (listaPacientes === null) {
    return (
      <Spinner animation="border" role="status"></Spinner>
    );
  }

  return <div className="d-flex m-2 gap-2 justify-content-center align-items-center flex-wrap">{listaPacientes.map((paciente)=>{
    return <PacienteCard key={paciente._id} paciente={paciente} />
  })}</div>;
}

export default ListaPacientes;
