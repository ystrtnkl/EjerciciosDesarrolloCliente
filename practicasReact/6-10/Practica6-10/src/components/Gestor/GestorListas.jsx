import React from 'react';
import useProductos from '../../hooks/useProductos.js';
import Cargando from '../Principal/Cargando.jsx';
import CajaError from '../Principal/CajaError.jsx';
import './GestorListas.css';
import ListaProductos from '../Productos/ListaProductos.jsx';
import useListas from '../../hooks/useListas.js';
import ListaListas from '../Listas/ListaListas.jsx';
import Lista from '../Listas/Lista.jsx';

//Este componente está pensado que sea la parte privada de la app, osea que solo los usuarios con la sesión iniciada puedan verlo.
function GestorListas(props) {

  //De normal descarga 50 productos al inicio, y estos son los que se mostrarán. En caso de que la aplicación tenga muchos más habría que implementar un sistema de paginación.
  const { cargandoSupabase: cargandoProductos, errorSupabase: errorProductos, productosCargados } = useProductos();
  //También es necesario tener la información de las listas (en este caso se descargan todas).
  const { listasCargadas, errorSupabase: errorListas, cargandoSupabase: cargandoListas, seleccionarLista, uuidListaSeleccionada, getListaSeleccionada } = useListas();

  //Función (usada por ListaProductos) que añade ese producto a la lista seleccionada.
  const agregarProducto = (uuid) => {

  }

  //Cualquier usuario puede ver los productos, pero solo los que tienen la sesión iniciada pueden ver sus listas y filtrar los productos.
  return (
    <div className="gestor-listas">
      <div className="secciones">
        <span className="seccion seccion-productos">
          <h2>Productos registrados</h2>
          {cargandoProductos ? (<Cargando />) : (errorProductos ? (<CajaError texto="Ha habido un error al cargar los productos" />) : (<>
            <ListaProductos controles={props.logeado} productos={productosCargados} borrarProductos={props.logeado} editarProductos={props.logeado} agregar={agregarProducto} />
          </>))}
        </span>
        {props.logeado && (<>
          <span className="seccion seccion-listas">
            <h2>Tus listas</h2>
            {cargandoListas ? (<Cargando />) : (errorListas ? (<CajaError texto="Ha habido un error al cargar las listas" />) : (<>
              <ListaListas listas={listasCargadas} botonNuevo={() => { seleccionarLista("") }} />
            </>))}
          </span>
          <span className="seccion seccion-lista-seleccionada">
            <h2>Lista seleccionada</h2>
            {cargandoListas ? (<Cargando />) : (errorListas ? (<CajaError texto="Ha habido un error al cargar la lista" />) : (<>
              {uuidListaSeleccionada === "" ? (<Lista nuevo={true} />) : (<Lista nuevo={false} lista={getListaSeleccionada()} uuid={uuidListaSeleccionada} />)}
            </>))}
          </span>
        </>)}
      </div>
    </div>
  );
}

export default GestorListas;
