import React from 'react';
import { Link } from 'react-router-dom';
import './BotonNavegacion.css';

//Botón sencillo para volver al inicio (/) usando el hook de useNavigate.
function VolverInicio(props) {

  return (
    <>
        <span><Link to={props.direccion ?? "/"} className="boton-navegacion_enlace">{props.titulo ?? ""}</Link></span>
    </>
  )
}

export default VolverInicio;
