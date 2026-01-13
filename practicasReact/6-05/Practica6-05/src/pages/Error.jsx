import React from 'react';
import VolverInicio from '../components/Botones/VolverInicio.jsx';
import { getError } from '../libraries/traducir.js';

//Página para el error de ruta, en caso de no encontrar dicha ruta.
function Error() {

  return (
    <>
        <h2>Error</h2>
        <p>{getError("es", "paginaNoEncontrada")}</p>
        <VolverInicio />
    </>
  )
}

export default Error;
