import React from 'react';
import VolverInicio from '../components/Botones/VolverInicio.jsx';
import useProductos from '../hooks/useProductos.js';
import { useParams } from 'react-router-dom';
import ListaProductos from '../components/Productos/ListaProductos.jsx';

function ProductoConcreto() {

  const uuid = useParams("uuid");

  return (
    <>
        <ListaProductos productos={[]} />
    </>
  )
}

export default ProductoConcreto;