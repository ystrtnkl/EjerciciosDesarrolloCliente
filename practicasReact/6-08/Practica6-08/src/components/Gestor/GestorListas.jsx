import React from 'react';
import useProductos from '../../hooks/useProductos.js';
import Cargando from '../Principal/Cargando.jsx';
import CajaError from '../Principal/CajaError.jsx';
import './GestorListas.css';
import ListaProductos from '../Productos/ListaProductos.jsx';

//Este componente está pensado que sea la parte privada de la app, osea que solo los usuarios con la sesión iniciada puedan verlo.
function GestorListas(props) {

  const { cargandoProductos, errorProductos, productosCargados } = useProductos();

  //Cualquier usuario puede ver los productos, pero solo los que tienen la sesión iniciada pueden ver sus listas y filtrar los productos.
  return (
    <div className="gestor-listas">
      <div className="secciones">
        <span className="seccion seccion-productos">
          <h2>Productos registrados</h2>
          {cargandoProductos ? (<Cargando />) : (errorProductos ? (<CajaError texto="Ha habido un error al cargar los productos" />) : (<>
            <ListaProductos controles={props.logeado} productos={productosCargados} botonAgnadir={true} />
          </>))}
        </span>
        {props.logeado && (<>
          <span className="seccion seccion-listas">
            <h2>Tus listas</h2>
          </span>
          <span className="seccion seccion-lista-seleccionada">
            <h2>Lista seleccionada</h2>
          </span>
        </>)}
      </div>
    </div>
  );
}

export default GestorListas;
