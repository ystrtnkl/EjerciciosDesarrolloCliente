import React from 'react';
import useSesion from '../hooks/useSesion.js';
import FormularioProducto from '../components/Formularios/FormularioProducto.jsx';

//Página con el formulario para añadir un nuevo producto.
function NuevoProducto() {

  const { soyAdmin } = useSesion();

  return (
    <>
      <h2>Agregar nuevo producto</h2>
      {soyAdmin ? (<FormularioProducto />) : (<p>Posiblemente no tengas permisos para agregar nuevos productos</p>)}
    </>
  )
}

export default NuevoProducto;
