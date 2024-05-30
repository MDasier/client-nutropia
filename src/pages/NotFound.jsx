import React from 'react'
import notFoundImg from "../assets/images/not-found.jpg"
import { Link } from 'react-router-dom'
import Button from "react-bootstrap/Button";

function NotFound() {
  return (
    <div>
      <h6>Hemos perdido la página que buscas 😨, lo sentimos!</h6>
      
      <Link to="/">
        <Button variant="primary">Volver al inicio</Button>
      </Link>

      <img src={notFoundImg} alt="not found" width="100%" />
    </div>
  )
}

export default NotFound