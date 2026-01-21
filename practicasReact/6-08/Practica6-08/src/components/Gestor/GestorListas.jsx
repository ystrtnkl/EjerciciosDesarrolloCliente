import React from 'react';
import useProductos from '../../hooks/useProductos.js';
import Cargando from '../Principal/Cargando.jsx';
import CajaError from '../Principal/CajaError.jsx';
import './GestorListas.css';
import ListaProductos from '../Productos/ListaProductos.jsx';

//Este componente está pensado que sea la parte privada de la app, osea que solo los usuarios con la sesión iniciada puedan verlo.
function GestorListas(props) {

  const { cargandoProductos, errorProductos, productosCargados } = useProductos();

  return (
    <div className="gestor-listas">
      <p>Gestor de listas, este componente solo es accesible a usuarios con la sesión iniciada.</p>
      {props.logeado && (<div>
        <p>Este será el contenido exclusivo de {props.usuario?.user_metadata?.display_name}.</p>
      </div>)}
      <div className="secciones">
      <span className="seccion seccion-productos">
        <h2>Productos registrados</h2>
        {cargandoProductos ? (<Cargando />) : (errorProductos ? (<CajaError texto="Ha habido un error al cargar los productos" />) : (<>
          <ListaProductos controles={true} productos={productosCargados} />
        </>))}
      </span>
      <span className="seccion seccion-listas">
          <h2>Tus listas</h2>
      </span>
      <span className="seccion seccion-lista-seleccionada">
          <h2>Lista seleccionada</h2>
      </span>
      </div>
    </div>
  );
}

export default GestorListas;
