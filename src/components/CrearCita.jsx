import React, { useContext, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { AuthContext } from '../context/auth.context';
import service from "../services/config.services.js"
import { Link, useNavigate } from "react-router-dom"
import Calendar from 'react-calendar';

function CrearCita(props) {
    const { loggedUserId, isDarkTheme } = useContext(AuthContext)
    const [fecha, setFecha] = useState("")
    const [paciente, setPaciente] = useState(props.pacienteId)
    const navigate = useNavigate()
    const [show, setShow] = useState(false);

    // control del modal
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevaCita = {
      paciente,
      fecha,
    }

    try {
      await service.post(`/citas/nueva-cita`, nuevaCita)
      navigate("/agenda")
    } catch (error) {
      navigate("/error");
    }
  };

  return (

<div>
      <Form
        data-bs-theme={isDarkTheme?"dark":"light"}
        style={{
        backgroundColor: isDarkTheme?"#303030":"whitesmoke",
        borderRadius: "16px",
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
      onSubmit={handleShow}
    >

  {/*2030-06-03T09:30//! CONSEGUIR DATE PICKER */}
  <Calendar /*defaultActiveStartDate={new Date()}*/ /*value={fecha}*/ onChange={(e)=>setFecha(e.target.value)}/>
  
      <Form.Group controlId="fecha" className="mb-3">
        <Form.Label>FECHA</Form.Label>
        <Form.Control
          type="text"
          name="fecha"
          value={fecha}
          placeholder="YYYY-MM-DDT00:00"
          onChange={(e)=>setFecha(e.target.value)}
        />
      </Form.Group>
      <Button onClick={handleShow}> Nueva Cita </Button>

      {/* MODAL */}
      <Modal show={show} data-bs-theme={isDarkTheme?"dark":"light"}>
        <Modal.Header>
          <Modal.Title  style={{color:isDarkTheme?"#fff":"#212529"}}>Crear cita</Modal.Title>
        </Modal.Header>
        <Modal.Body  style={{color:isDarkTheme?"#fff":"#212529"}}>
          ¿Crear cita?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Volver
          </Button>
          <Button variant="primary" onClick={handleSubmit} type="submit">
            Crear
          </Button>
        </Modal.Footer>
      </Modal>
    </Form>
    </div>
  )
}

export default CrearCita