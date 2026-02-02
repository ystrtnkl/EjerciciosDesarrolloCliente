import React from 'react';
import useProductos from '../../hooks/useProductos.js';
import Cargando from '../Principal/Cargando.jsx';
import CajaError from '../Principal/CajaError.jsx';
import './GestorListas.css';
import ListaProductos from '../Productos/ListaProductos.jsx';

//Este componente está pensado que sea la parte privada de la app, osea que solo los usuarios con la sesión iniciada puedan verlo.
function GestorListas(props) {

  //De normal descarga 50 productos al inicio, y estos son los que se mostrarán. En caso de que la aplicación tenga muchos más habría que implementar un sistema de paginación.
  const { cargandoSupabase, errorSupabase, productosCargados } = useProductos();

  //Cualquier usuario puede ver los productos, pero solo los que tienen la sesión iniciada pueden ver sus listas y filtrar los productos.
  return (
    <div className="gestor-listas">
      <div className="secciones">
        <span className="seccion seccion-productos">
          <h2>Productos registrados</h2>
          {cargandoSupabase ? (<Cargando />) : (errorSupabase ? (<CajaError texto="Ha habido un error al cargar los productos" />) : (<>
            <ListaProductos controles={props.logeado} productos={productosCargados} borrarProductos={props.logeado} editarProductos={props.logeado} />
          </>))}
        </span>
        {props.logeado && (<>
          <span className="seccion seccion-listas">
            <h2>Tus listas</h2>
            {/*Aquí aparecerán las listas guardadas en la cuenta del usuario.*/}
          </span>
          <span className="seccion seccion-lista-seleccionada">
            <h2>Lista seleccionada</h2>
            {/*Aquí aparecerá el formulario de crear/editar lista, así como la lista seleccionada (en la cual se añaden y quitan productos).*/}
          </span>
        </>)}
      </div>
    </div>
  );
}

export default GestorListas;
