import React from 'react'
import notFoundImg from "../assets/images/not-found.jpg"
import { Link } from 'react-router-dom'
import Button from "react-bootstrap/Button";

function NotFound() {
  return (
    <div style={{margin:"70px"}}>
      <img src={notFoundImg} alt="not found" width="100%" />
      <Link to="/">
        <Button variant="primary">Volver</Button>
      </Link>
    </div>
  )
}

export default NotFound