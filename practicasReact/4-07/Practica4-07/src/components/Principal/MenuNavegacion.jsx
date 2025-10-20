import React from 'react';
import './MenuNavegacion.css';
import BotonNavegacion from '../Botones/BotonNavegacion.jsx';

//Menu de navegación sencillo para ir a las páginas usando Link en lugar de <a>.
function MenuNavegacion() {

  return (
    <>
        <div className="menu-navegacion_principal">
            <BotonNavegacion direccion="/" titulo="Inicio" />
            <BotonNavegacion direccion="/peliculas" titulo="Películas" />
            <BotonNavegacion direccion="/interpretes" titulo="Intérpretes" />
            <BotonNavegacion direccion="/galeria" titulo="Galería" />
            <BotonNavegacion direccion="/acercade" titulo="Acerca de" />
        </div>
    </>
  )
}

export default MenuNavegacion;
