import React from 'react';
import Rutas from '../routes/Rutas';

//Este componente muestra un grupo de actores (o lo que sea que se le pase como children)
const Contenedor = () => {

  return (
    <div className="contenido_pagina">
        <Rutas />
    </div>
  )
}

export default Contenedor;