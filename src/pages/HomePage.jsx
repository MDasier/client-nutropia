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
import ensalada from '../assets/images/ensalada.jpeg'
import panDerecha from '../assets/images/panDerecha.jpeg'
import panIzquierda from '../assets/images/panIzquierda.jpeg'
import maderaOscuraAncha from '../assets/images/maderaOscuraAncha.jpeg'



function HomePage() {

  const { isLoggedIn, loggedUserId, isNutri, isPaciente, getNuevosMensajesParaPaciente,cantidadMensajesNuevos,backgroundColor,textColor,fontWeigth } = useContext(AuthContext)
  const [datosUsuarioLogueado,setDatosUsuarioLogueado] = useState(null)

  const getLoggedUserData = async()=>{
    const loggedUserData = await service.get(`/perfil/${loggedUserId}`)
    setDatosUsuarioLogueado(loggedUserData.data)
  }
  useEffect(() =>{
    if(isLoggedIn){
      getLoggedUserData()
      getNuevosMensajesParaPaciente()
    }else{
      setDatosUsuarioLogueado([])
    }
  },[])

  if(isLoggedIn&&datosUsuarioLogueado===null){
    return (
      <Spinner animation="border" role="status"></Spinner>
    );
  }

  /*
  EL CALENDARIO EN LA SECCION DE NUTRICIONISTA SALE DESPLAZADO A AL IZQUIERA
  LA PAGINA NO CARGA LA HOME CORRECTAMENTE. FALTA REVISION
  */

  return (
    <div style={{color:textColor,backgroundColor:backgroundColor, fontWeight:fontWeigth}} className="d-flex-c m-2 gap-2 justify-content-center align-items-center flex-wrap">
  <Carousel className="d-flex-c m-2 gap-2 justify-content-center align-items-center">

      <Carousel.Item>
      <img src={panDerecha} alt="imgPrueba" width={"100%"} style={{maxWidth:"800px",borderRadius:"15px",opacity:"0.6"}}/>
        <Carousel.Caption>
          <h3 style={{color:textColor}}>NUTROPIA</h3>
          <p style={{color:textColor}}>
            Nuestra aplicación web ha sido diseñada para gestionar tu consulta de nutrición. Entra y descúbrela!
          </p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
      <img src={ensalada} alt="imgPrueba" width={"100%"} style={{maxWidth:"800px",borderRadius:"15px",opacity:"0.6"}}/>
        <Carousel.Caption>
          <h3 style={{color:textColor}}>Verduras y quinoa</h3>
          <p style={{color:textColor}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
      <img src={panDerecha} alt="imgPrueba" width={"100%"} style={{maxWidth:"800px",borderRadius:"15px",opacity:"0.6"}}/>
        <Carousel.Caption>
          <h3 style={{color:textColor}}>Tostas</h3>
          <p style={{color:textColor}}>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
      <img src={panIzquierda} alt="imgPrueba" width={"100%"} style={{maxWidth:"800px",borderRadius:"15px",opacity:"0.6"}}/>
        <Carousel.Caption>
          <h3 style={{color:textColor}}>Sándwiches</h3>
          <p style={{color:textColor}}>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
      <img src={maderaOscuraAncha} alt="imgPrueba" width={"100%"} style={{maxWidth:"800px",borderRadius:"15px",opacity:"0.8"}}/>
        <Carousel.Caption>
          <h3 style={{color:textColor}}>Ensalada</h3>
          <p style={{color:textColor}}>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>

      {/* CONTENIDO PUBLICO */}
      {!isLoggedIn&&
      <div style={{fontWeight:fontWeigth}}>
        <p>
          Necesitas registrarte o iniciar sesión para usar la app. Hecha un
          vistazo a unas recetas saludables mientras te lo piensas!{" "}
          <a
            href="https://leftnutrition.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>🥕 RECETAS DE MARINA 🥕</span>
          </a>
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
          <div><h6>PROXIMA CONSULTA:<Citas role="nutri" /></h6></div>
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

        <div className="d-flex m-2 gap-2 justify-content-center align-items-center flex-wrap">
          <a href="https://leftnutrition.netlify.app" target="_blank" rel="noopener noreferrer">
            <span>🥕 RECETAS DE MARINA 🥕</span>
          </a>
        </div>

      </div>
      :null}
    </div>
  )
}

export default HomePage