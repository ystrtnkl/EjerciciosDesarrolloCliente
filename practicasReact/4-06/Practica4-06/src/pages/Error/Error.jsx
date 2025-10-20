import React from 'react';
import './Error.css';
import VolverInicio from '../../components/VolverInicio/VolverInicio';

//Esta página (que en realidad es un componente) se mostrará cuando la ruta no se encuentre (error 404).
function Error() {

  return (
    <>
      <h2>Esta es la página de Error, la ruta no ha sido encontrada.</h2>
      <VolverInicio />
    </>
  )
}

export default Error;
