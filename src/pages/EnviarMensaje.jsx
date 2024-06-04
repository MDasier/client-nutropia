import React, { useContext, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { AuthContext } from '../context/auth.context.jsx';
import service from "../services/config.services.js"
import { useNavigate, useParams } from "react-router-dom"

function EnviarMensaje() {
    const { loggedUserId, isDarkTheme } = useContext(AuthContext)
    const [texto, setTexto] = useState("")
    const {pacienteId} = useParams()
    const navigate = useNavigate()
    const [show, setShow] = useState(false);

    // control del modal
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoMensaje = {
      receptor:pacienteId,
      texto
    }

    try {
      await service.post(`/mensajes/nuevo-mensaje`, nuevoMensaje)
      navigate("/")
    } catch (error) {
      navigate("/server-error");
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
  
      <Form.Group controlId="texto" className="mb-3">
        <Form.Label>MENSAJE</Form.Label>
        <Form.Control
          type="text"
          name="mensaje"
          value={texto}
          placeholder="Escribe el mensaje"
          onChange={(e)=>setTexto(e.target.value)}
        />
      </Form.Group>
      <Button onClick={handleShow}> Enviar </Button>

      {/* MODAL */}
      <Modal show={show} data-bs-theme={isDarkTheme?"dark":"light"}>
        <Modal.Header>
          <Modal.Title  style={{color:isDarkTheme?"#fff":"#212529"}}>MENSAJE NUEVO</Modal.Title>
        </Modal.Header>
        <Modal.Body  style={{color:isDarkTheme?"#fff":"#212529"}}>
          ¿Enviar mensaje?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Volver
          </Button>
          <Button variant="primary" onClick={handleSubmit} type="submit">
            Enviar
          </Button>
        </Modal.Footer>
      </Modal>
    </Form>
    </div>
  )
}

export default EnviarMensaje