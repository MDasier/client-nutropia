import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { Dropdown, FormControl, Form } from "react-bootstrap";
import { HexColorPicker } from "react-colorful";
import { Button, FormGroup, FormLabel } from "react-bootstrap/esm";
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from "react-router-dom";

function Settings() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate()
  
  const {
    backgroundColor,
    setBackgroundColor,

    textColor,
    setTextColor,

    fontWeigth,
    setFontWeigth,

    isDarkTheme,
    setIsDarkTheme,

    guardarConfiguracion,
  } = useContext(AuthContext);

  const showAlert = async (e) => {
    e.preventDefault();
    setShow(true)
    guardarConfiguracion()
    const delayBusqueda = setTimeout(() => {  
      setShow(false)
    }, 2500)

      return () => {
        clearTimeout(delayBusqueda)
        navigate(0)
      }
  }

  return (
    <div
      style={{
        fontWeight: fontWeigth,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="d-flex-c m-2 gap-2 justify-content-center align-items-center flex-wrap"
    >
      <Dropdown drop="down" data-bs-theme={isDarkTheme}>
        <Dropdown.Toggle variant={isDarkTheme} id="dropdown-fondo">
          <h6  style={{ fontWeight: fontWeigth}}>🪣 Cambiar color de fondo ⬇</h6>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item>
            <HexColorPicker
              color={backgroundColor}
              onChange={setBackgroundColor}
            />
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown drop="down" data-bs-theme={isDarkTheme}>
        <Dropdown.Toggle variant={isDarkTheme} id="dropdown-texto">
          <h6 style={{ fontWeight: fontWeigth}}>🖌️ Cambiar color de texto ⬇</h6>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item>
            <HexColorPicker color={textColor} onChange={setTextColor} />
          </Dropdown.Item>
        </Dropdown.Menu>
        <Dropdown.Divider />
      </Dropdown>

      <FormGroup>
      <FormLabel>Ancho o grosor de texto (Font weight) </FormLabel>
      <Form.Select
        data-bs-theme={isDarkTheme}
        aria-label="Default select example"
        onChange={(e) => setFontWeigth(e.target.value)}
        style={{ fontWeight: fontWeigth, maxWidth: "400px" }}
      >
        <option value="400" disabled>
          Por defecto '400'
        </option>
        <option value="400">400 - Normal</option>
        <option value="500">500 - Medium</option>
        <option value="600">600 - Semi BOLD</option>
        <option value="700">700 - BOLD</option>
      </Form.Select>
      </FormGroup>

      <FormGroup>
      <FormLabel>Modo claro o modo oscuro para los 'formularios' </FormLabel>
      <Form.Select
        data-bs-theme={isDarkTheme}
        aria-label="select example"
        onChange={(e) => setIsDarkTheme(e.target.value)}
        style={{ fontWeight: fontWeigth, maxWidth: "400px" }}
      >
        <option value="light" disabled>Por defecto 'Claro'</option>
        <option value="light">Claro</option>
        <option value="dark">Oscuro</option>
      </Form.Select>
      </FormGroup>

      <Button variant="success" onClick={showAlert}>
        Guardar
      </Button>

      <Alert variant="info" style={{width:"100%",alignContent:"center"}} show={show}>
        Configuración guardada correctamente
      </Alert>
    </div>
  );
}

export default Settings;
