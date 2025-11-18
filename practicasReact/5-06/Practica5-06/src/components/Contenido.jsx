import React from 'react';
import Rutas from '../routes/Rutas';

//Componente donde se mostrará en sí la página haciendo el uso de rutas.
const Contenedor = () => {

  return (
    <div className="contenido_pagina">
      <Rutas />
    </div>
  )
}

export default Contenedor;