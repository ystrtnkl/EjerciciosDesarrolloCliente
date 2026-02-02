import React from 'react';
import useSesion from '../hooks/useSesion.js';
import FormularioProducto from '../components/Formularios/FormularioProducto.jsx';

//Página con el formulario para añadir un nuevo producto.
function NuevoProducto() {

  const { sesionIniciada } = useSesion();

  return (
    <>
      <h2>Agregar nuevo producto</h2>
      <p>ATENCIÓN: conforme está hecha la aplicación ahora mismo, el resto de usuarios podrán ver/editar/borrar tu producto</p> {/*Esto cambiará más adelante.*/}
      {sesionIniciada ? (<FormularioProducto />) : (<p>Posiblemente no tengas permisos para agregar nuevos productos</p>)}
    </>
  )
}

export default NuevoProducto;
