import React from 'react';
import './MenuNavegacion.css';
import { Link } from 'react-router-dom';

//Menu de navegación sencillo para ir a las páginas usando Link en lugar de <a>.
function MenuNavegacion() {

  return (
    <>
        <div className="menu-navegacion_principal">
            <span><Link to="/" className="menu-navegacion_enlace">Inicio</Link></span>
            <span><Link to="/acercaDe" className="menu-navegacion_enlace">Acerca de</Link></span>
            <span><Link to="/contacto" className="menu-navegacion_enlace">Contacto</Link></span>
            <span><Link to="/productos" className="menu-navegacion_enlace">Productos</Link></span>
        </div>
    </>
  )
}

export default MenuNavegacion;
