import React from 'react';
import './MenuNavegacion.css';
import BotonNavegacion from '../Botones/BotonNavegacion.jsx';
import useSesion from '../../hooks/useSesion.js';

//Menu de navegación sencillo para ir a las páginas usando Link en lugar de <a>.
function MenuNavegacion() {

  //Dependiendo de si has iniciado sesión o no, muestra unos enlaces u otros.
  const { sesionIniciada, soyAdmin } = useSesion();

  return (
    <>
      <div className="menu-navegacion_principal">
        <BotonNavegacion direccion="/" titulo="Inicio" />
        {sesionIniciada ? (<>
          <BotonNavegacion direccion="/gestor" titulo="Gestor de listas" />
          <BotonNavegacion direccion="/logout" titulo="Cerrar sesión" />
          <BotonNavegacion direccion="/miPerfil" titulo="Mi perfil" />
          {soyAdmin && (<>
            {/*Páginas solo disponibles para admins.*/}
            <BotonNavegacion direccion="/gestorRoles" titulo="Gestor de roles" />
            <BotonNavegacion direccion="/nuevoProducto" titulo="Nuevo producto" />
          </>)}
        </>) : (<>
          <BotonNavegacion direccion="/registrarse" titulo="Crear cuenta" />
          <BotonNavegacion direccion="/login" titulo="Iniciar sesión" />
          <BotonNavegacion direccion="/gestor" titulo="Ver productos" />
        </>)}
      </div>
    </>
  )
}

export default MenuNavegacion;
