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
    const delayAlert = setTimeout(() => {  
      setShow(false)
      navigate('/')
    }, 1500)

      return () => {
        clearTimeout(delayAlert)
      }
  }

  return (
    <div className="d-flex-c m-2 gap-2 justify-content-center align-items-center flex-wrap">
      <Form 
        data-bs-theme={isDarkTheme}
        style={{
        borderRadius: "16px",
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        justifyContent:"center",
        alignItems:"center",
        alignContent:"center",
        gap: "16px",
        width:"100%"
      }}>

      <Form.Group controlId="cfondo" className="mb-3" data-bs-theme={isDarkTheme}>
        <Dropdown drop="down" data-bs-theme={isDarkTheme}>
          <Dropdown.Toggle variant={isDarkTheme} id="dropdown-fondo">
            <h6  style={{ fontWeight: fontWeigth}}>🎨 Cambiar color de fondo ⬇</h6>
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
      </Form.Group>

      <Form.Group controlId="ctexto" className="mb-3" data-bs-theme={isDarkTheme}>
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
      </Form.Group>

      <Form.Group controlId="gtexto" className="mb-3" data-bs-theme={isDarkTheme}>
        <Form.Label>Ancho o grosor de texto (Font weight) </Form.Label>
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
      </Form.Group>

      <Form.Group controlId="theme" className="mb-3" data-bs-theme={isDarkTheme}>
        <Form.Label>Modo claro o modo oscuro </Form.Label>
        <Form.Select
          data-bs-theme={isDarkTheme}
          aria-label="select example"
          onChange={(e) => setIsDarkTheme(e.target.value)}
          style={{ fontWeight: fontWeigth, maxWidth: "400px" }}
        >
          <option value={isDarkTheme}>{isDarkTheme==="dark"?"Actual: Oscuro":"Actual: Claro"}</option>
          {/*<option value={isDarkTheme} disabled>{isDarkTheme==="dark"?"Oscuro":"Claro"}</option>*/}
          <option value="light">Claro</option>
          <option value="dark">Oscuro</option>
        </Form.Select>
      </Form.Group>

      <Button variant="success" onClick={showAlert}>
        Guardar
      </Button>

      <Alert variant="success" style={{width:"50%",alignContent:"center"}} show={show}>
        Configuración guardada correctamente
      </Alert>
      </Form>
    </div>
  );
}

export default Settings;
