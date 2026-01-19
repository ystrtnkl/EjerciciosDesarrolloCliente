import React from 'react';
import './MenuNavegacion.css';
import BotonNavegacion from '../Botones/BotonNavegacion.jsx';
import useSesion from '../../hooks/useSesion.js';

//Menu de navegación sencillo para ir a las páginas usando Link en lugar de <a>.
function MenuNavegacion() {

  const { sesionIniciada } = useSesion();

  return (
    <>
      <div className="menu-navegacion_principal">
        <BotonNavegacion direccion="/" titulo="Inicio" />
        {sesionIniciada ? (<>
          <BotonNavegacion direccion="/gestor" titulo="Gestor de listas" />
          <BotonNavegacion direccion="/logout" titulo="Cerrar sesión" />
        </>) : (<>
          <BotonNavegacion direccion="/registrarse" titulo="Crear cuenta" />
          <BotonNavegacion direccion="/login" titulo="Iniciar sesión" />
        </>)}
      </div>
    </>
  )
}

export default MenuNavegacion;
