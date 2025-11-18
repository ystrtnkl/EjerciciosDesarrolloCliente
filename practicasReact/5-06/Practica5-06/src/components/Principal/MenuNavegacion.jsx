import React from 'react';
import './MenuNavegacion.css';
import BotonNavegacion from '../Botones/BotonNavegacion.jsx';

//Menu de navegación sencillo para ir a las páginas usando Link en lugar de <a>.
function MenuNavegacion() {

  return (
    <>
      <div className="menu-navegacion_principal">
        <BotonNavegacion direccion="/" titulo="Inicio" />
        <BotonNavegacion direccion="/insertarDisco" titulo="Insertar nuevo disco" />
        <BotonNavegacion direccion="/listarDisco" titulo="Lista de díscos" />
      </div>
    </>
  )
}

export default MenuNavegacion;
