import React from 'react';
import VolverInicio from '../components/Botones/VolverInicio.jsx';

//Página para el error de ruta, en caso de no encontrar dicha ruta.
function Error() {

  return (
    <>
        <h2>Error</h2>
        <p>Página no encontrada</p>
        <VolverInicio />
    </>
  )
}

export default Error;
