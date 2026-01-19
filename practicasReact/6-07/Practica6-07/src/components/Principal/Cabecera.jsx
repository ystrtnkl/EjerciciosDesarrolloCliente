import React from 'react';
import VolverInicio from '../Botones/VolverInicio.jsx';
import './Cabecera.css';
import useSesion from '../../hooks/useSesion.js';

//Cabecera de la página, no tiene mucho ya que los enlaces están en el componente MenuNavegacion.
function Cabecera() {

  const { sesionIniciada, usuarioSesion } = useSesion();

  return (
    <>
      <div className="cabecera_principal">
        <h2>Gestor de listas de la compra.</h2>
        {sesionIniciada ? (<p>Hola invitado, autentícate</p>) : (<p>Hola de nuevo {usuarioSesion?.nombre ?? "desconocido"}</p>)}
        <VolverInicio />
      </div>
    </>
  )
}

export default Cabecera;
