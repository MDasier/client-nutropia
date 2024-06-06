
function InfoPage() {
  return (
    <div className="d-flex-c m-2 gap-2 justify-content-center align-items-center flex-wrap">
        <h3>NUTROPIA - INFO.</h3>
        <hr />
        <h5>La idea era crear una app web para una consulta de nutrición. Esto es lo que se ha conseguido...</h5>
        <h6>1- Esta app es el resultado del esfuerzo de un estudiante de IRONHACK en su proyecto final de bootcamp (WEB development) - <a href="https://www.linkedin.com/in/asiermd/" target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>linkedin AsierMD</a> </h6>
        <h6>2- El contenido de la página 'Inicio' cambia en función de la persona que acceda. Esto se debe a que cada usuario tiene un 'role' asignado en la base de datos. ("Nutricionista", "Paciente", "Invitado" o "Administrador".) </h6>
        <h6>3- En la sección 'dieta' puedes comprobar la información de cada alimento y configurar una dieta con los que selecciones de la lista y comprobar la cantidad de datos totales que acumula dicha selección.</h6>
        <h6>4- La sección 'Configuración de estilos' está diseñada para que cada usuario registrado o no personalice su experiencia visual. Se permite el cambio de color del fondo de la mayoría de elementos de la app, el color del texto, su grosor y el cambio de ciertos elementos de modo claro a modo oscuro. Esta con</h6>
        <h6>5- Los datos de configuración de estilos se guardan en 'localStorage' en tu navegador si accedes a tu cuenta desde otro terminal tendrás que volver a configurarla.</h6>
        <h6>6- Las secciones finales del menú izquierdo son dos enlaces al repositorio del proyecto y al perfil del desarrollador en Github.</h6>
        <h6>7- Gracias por acceder y dar vuestra opinión. Toda ayuda es bienvenida. Para cualquier necesidad o curiosidad envía un mensaje de correo a: < a href="mailto:infonutropia@gmail.com">infonutropia@gmail.com</a></h6>
    </div>
  )
}

export default InfoPage