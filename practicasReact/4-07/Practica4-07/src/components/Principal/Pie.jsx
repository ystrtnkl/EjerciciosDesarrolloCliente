import React from 'react';
import { Link } from 'react-router-dom';
import './Pie.css';

//Menu de navegación sencillo para ir a las páginas usando Link en lugar de <a>.
function Pie() {

  return (
    <>
        <footer className='pie_principal'>
            <p>Contenido del footer</p>
            <p>Aquí pueden haber muchas cosas, como un enlace para 
              <span><Link className="boton-navegacion_enlace" to="/">Volver al inicio</Link></span>.
            </p>
        </footer>
    </>
  )
}

export default Pie;
