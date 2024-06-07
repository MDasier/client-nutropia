import { useContext, useEffect, useState} from "react";
import { AuthContext } from "../context/auth.context";
import ListaPacientes from "../components/ListaPacientes";
import { Link } from "react-router-dom";
import service from "../services/config.services";
import { Button, Spinner } from "react-bootstrap";
import Citas from "../components/Citas";
//galeria de fotos de prueba
import Carousel from 'react-bootstrap/Carousel';
//import logopeque from '../assets/images/logopeque.png'
import champis from '../assets/images/champis.jpeg'
import carbonara from '../assets/images/carbonara.jpeg'
import muffins from '../assets/images/muffins.jpeg'
import ramen from '../assets/images/ramen.jpeg'

function HomePage() {

  const { isLoggedIn, loggedUserId, isAdmin, isNutri, isPaciente, getNuevosMensajesParaPaciente,cantidadMensajesNuevos,backgroundColor,textColor,fontWeigth,reloadInfo,isAuthenticating } = useContext(AuthContext)
  const [datosUsuarioLogueado,setDatosUsuarioLogueado] = useState(null)

  const getLoggedUserData = async()=>{
    const loggedUserData = await service.get(`/perfil/${loggedUserId}`)
    setDatosUsuarioLogueado(loggedUserData.data)
  }

  useEffect(() =>{

    //reloadInfo()

    if(isLoggedIn){      
      getLoggedUserData()
      getNuevosMensajesParaPaciente()
    }else{
      setDatosUsuarioLogueado([])
    }

  },[])

  if(datosUsuarioLogueado===null){
    return (
      <Spinner animation="border" role="status"></Spinner>
    )
  }
  /*
  if(datosUsuarioLogueado!==null){
    //getNuevosMensajesParaPaciente()//!Comprobar mensajes continuamente por falta de socket.io
  }
*/
  /*
  PARA LAS IMAGENES PODRIAMOS USAR 'npm i react-image-holder' Y PONER HOLDER.JS MIENTRAS CARGAN LAS IMAGENES REALES
  */

  return (
    <div style={{color:textColor,backgroundColor:backgroundColor, fontWeight:fontWeigth}} className="d-flex-c m-2 gap-2 justify-content-center align-items-center flex-wrap">



      {/* CONTENIDO PUBLICO */}
      {!isLoggedIn&&
      <div style={{fontWeight:fontWeigth}}>
          <Carousel className="d-flex-c m-2 gap-2 justify-content-center align-items-center">

            <Carousel.Item>
            <a href="https://www.instagram.com/p/CTWvkZrIkAW/" target="_blank">
            <img src={ramen} alt="ramen" width={"100%"} style={{maxWidth:"800px",borderRadius:"15px",opacity:"0.6"}}/>
            </a>
              <Carousel.Caption>
                <h3 style={{color:textColor}}>RAMEN FÁCIL</h3>
                <p style={{color:textColor}}>
                RAMEN FÁCIL CON FIDEOS DE ARROZ - SIN GLUTEN!
                </p>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
            <a href="https://www.instagram.com/p/Crn4q9ZIcZh/" target="_blank">
            <img src={carbonara} alt="carbonara" width={"100%"} style={{maxWidth:"800px",borderRadius:"15px",opacity:"0.6"}}/>
            </a>
              <Carousel.Caption>
                <h3 style={{color:textColor}}>CARBONARA</h3>
                <p style={{color:textColor}}>PASTA DE TRIGO SARRACENO CON SALSA CARBONARA.</p>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
            <a href="https://www.instagram.com/p/CjfITM3IjBf/" target="_blank">
              <img src={champis} alt="champis" width={"100%"} style={{maxWidth:"800px",borderRadius:"15px",opacity:"0.6"}} />
            </a>
              <Carousel.Caption>
                <h3 style={{color:textColor}}>TXAMPIS</h3>
                <p style={{color:textColor}}>
                  CHAMPIÑONES RELLENOS DE SOBRASADA.
                </p>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
            <a href="https://www.instagram.com/p/CVIzrpwI-96/" target="_blank">
            <img src={muffins} alt="muffins" width={"100%"} style={{maxWidth:"800px",borderRadius:"15px",opacity:"0.6"}}/>
            </a>
              <Carousel.Caption>
                <h3 style={{color:textColor}}>Muffins de calabaza y cacahuete</h3>
                <p style={{color:textColor}}>
                MUFFINS DE CALABAZA Y CACAHUETE, CUBIERTOS DE CHOCOLATE Y COCO.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            </Carousel>
        <p>
          Necesitas registrarte o iniciar sesión para usar la app. Hecha un
          vistazo a unas recetas saludables mientras te lo piensas!{" "}
          <a
            href="https://leftnutrition.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <br />
            <span>Recetas de Marina</span>
          </a> (En construcción)
        </p>

        <h6>
          Quiero{" "}
          <Link to="/signup">
            <span>registrarme</span>
          </Link>
        </h6>
      </div>}
      

      {/*CONTENIDO EN FUNCION DEL ROLE */}
        {/* nutricionistas */}
      {isNutri
      ?<div className="d-flex-c m-2 gap-2 justify-content-center align-items-center flex-wrap">
        <h3>{isLoggedIn&&`Hola ${datosUsuarioLogueado.username}! `}</h3>

        <div  className="d-flex-c m-2 gap-2 justify-content-center align-items-center flex-wrap">
          <div><h6>PROXIMA CONSULTA:</h6></div><Citas role="nutri" />
          <Button as={Link} to="/agenda">IR A AGENDA</Button>
        </div>

        <div className="d-flex m-2 gap-2 justify-content-center align-items-center flex-wrap">
          <h6>Tienes {cantidadMensajesNuevos>0?cantidadMensajesNuevos:"0"} mensajes nuevos</h6>
          <Button variant={cantidadMensajesNuevos===0?"light":"warning"} disabled={cantidadMensajesNuevos>0?false:true} as={Link} to={`/mensajes/${loggedUserId}`}>IR A MENSAJES</Button>{/* CARGAR COMPONENTE DE MENSAJES */}
        </div>
        
        {/*<Button>CREAR UN PLAN NUTRICIONAL</Button>{/* CARGAR COMPONENTE PLAN NUTRICIONAL }*/}
        <div className="d-flex-c m-2 gap-2 justify-content-center align-items-center flex-wrap">
          <h6>LISTA DE PACIENTES:</h6>
          <ListaPacientes />{/* CARGA LOS USUARIOS QUE YA SON PACIENTES DEL NUTRICIONISTA */}
        </div>
      </div>
      :null}

        {/* pacientes */}
      {isPaciente
      ?<div className="d-flex-c m-2 gap-2 justify-content-center align-items-center flex-wrap">
        {isLoggedIn&&`Hola ${datosUsuarioLogueado.username}! `}
        <div className="d-flex m-2 gap-2 justify-content-center align-items-center flex-wrap">
          <div ><h6>TU PROXIMA REVISIÓN:<Citas role="paciente" /></h6> </div>
        </div>

        <div className="d-flex m-2 gap-2 justify-content-center align-items-center flex-wrap">
          <h6>Tienes <span>{cantidadMensajesNuevos}</span> mensajes nuevos</h6>

          <Button variant={cantidadMensajesNuevos===0?"light":"warning"} /*disabled={cantidadMensajesNuevos>0?false:true}*/ as={Link} to={`/mensajes/${loggedUserId}`}>IR A MENSAJES</Button>
        </div>

        <div className="d-flex m-2 gap-2 justify-content-center align-items-center flex-wrap">
          {/*<h6>TU PLAN NUTRICIONAL</h6>{/* CARGAR COMPONENTE PLAN NUTRICIONAL }*/}
        </div>
      </div>
      :null}




      {/* admin */}
      {isAdmin
      ?<div className="d-flex-c m-2 gap-2 justify-content-center align-items-center flex-wrap">  
          <h3>Contenido para admin</h3>   
          <hr />   
          <Button variant="success" as={Link} to="/control-pacientes" style={{width:"200px"}}>Gestionar pacientes</Button>
          <hr />
          <Button variant="success" as={Link} to="/info" style={{width:"200px"}}>Información de la app</Button>
          <hr />
          <div>
            <h6>APP en construcción. En el futuro aquí se mostrarán más opciones</h6>
          </div>
      </div>
      :null}
    </div>
  )
}

export default HomePage