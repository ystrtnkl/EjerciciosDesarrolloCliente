import React from 'react';
import useSesion from '../hooks/useSesion.js';
import { useParams } from 'react-router-dom';

//Página con el formulario para editar un producto
function EditarProducto() {
  
  const { sesionIniciada } = useSesion();
  const { uuidProducto } = useParams("uuidProducto");

  return (
    <>
      <h2>Editar producto </h2>
      {sesionIniciada ? (<></>) : (<p>Posiblemente no tengas permisos para editar este producto</p>)}
    </>
  )
}

export default EditarProducto;