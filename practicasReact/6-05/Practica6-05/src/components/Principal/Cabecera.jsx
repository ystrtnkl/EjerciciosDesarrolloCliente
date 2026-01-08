import React from 'react';
import VolverInicio from '../Botones/VolverInicio.jsx';
import './Cabecera.css';

//Cabecera de la página, no tiene mucho ya que los enlaces están en el componente MenuNavegacion.
function Cabecera() {

  return (
    <>
      <div className="cabecera_principal">
        <h2>Gestor de discos.</h2>
        <VolverInicio />
      </div>
    </>
  )
}

export default Cabecera;
