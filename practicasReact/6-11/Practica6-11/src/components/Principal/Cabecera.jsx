import React from 'react';
import VolverInicio from '../Botones/VolverInicio.jsx';
import './Cabecera.css';
import useSesion from '../../hooks/useSesion.js';

//Cabecera de la página, no tiene mucho ya que los enlaces están en el componente MenuNavegacion.
function Cabecera() {

  //Dependiendo de si está iniciado sesión o no, te saluda de una manera distinta.
  const { sesionIniciada, usuarioSesion, soyAdmin, datosPerfil } = useSesion();

  return (
    <>
      <div className="cabecera_principal">
        <h2>Gestor de listas de la compra.</h2>
        {sesionIniciada ? (<p>Hola de nuevo {datosPerfil?.nombre_completo ?? (usuarioSesion?.user?.user_metadata?.display_name ?? "desconocido")} {soyAdmin && "ADMIN"}</p>) : (<p>Hola invitado, autentícate</p>)}
        <VolverInicio />
      </div>
    </>
  )
}

export default Cabecera;
