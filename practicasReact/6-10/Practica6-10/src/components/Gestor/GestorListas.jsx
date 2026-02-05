import React from 'react';
import useProductos from '../../hooks/useProductos.js';
import Cargando from '../Principal/Cargando.jsx';
import CajaError from '../Principal/CajaError.jsx';
import './GestorListas.css';
import ListaProductos from '../Productos/ListaProductos.jsx';
import useListas from '../../hooks/useListas.js';
import ListaListas from '../Listas/ListaListas.jsx';
import Lista from '../Listas/Lista.jsx';
import useSesion from '../../hooks/useSesion.js';

//Este componente está pensado que sea la parte privada de la app, osea que solo los usuarios con la sesión iniciada puedan verlo.
//Aquí además se gestiona la lógica que involucra a las tres columnas a la vez.
function GestorListas() {

  const { sesionIniciada, usuarioSesion } = useSesion();
  //De normal descarga 50 productos al inicio, y estos son los que se mostrarán. En caso de que la aplicación tenga muchos más habría que implementar un sistema de paginación.
  const { cargandoSupabase: cargandoProductos, errorSupabase: errorProductos, productosCargados, getProductoConcreto } = useProductos();
  //También es necesario tener la información de las listas (en este caso se descargan todas).
  const { listasCargadas, errorSupabase: errorListas, cargandoSupabase: cargandoListas, seleccionarLista, uuidListaSeleccionada, borrarLista, listaActual, setListaActual } = useListas();
  
  //Función (usada por ListaProductos) que añade ese producto a la lista seleccionada.
  const agregarProducto = async (uuid) => {
    let productoAgnadir = await getProductoConcreto(uuid);
    if (!productoAgnadir.length) return false;
    productoAgnadir = productoAgnadir[0];
    if (listaActual.productos.map((e) => {return e.uuid}).includes(uuid)) {
      setListaActual({...listaActual, productos: [...listaActual.productos.filter((e) => {return e.uuid !== uuid}), {uuid, ...productoAgnadir, cantidad: listaActual.productos.filter((e) => {return e.uuid === uuid})[0].cantidad + 1}]});
    } else {
      setListaActual({...listaActual, productos: [...listaActual.productos, {uuid, ...productoAgnadir, cantidad: 1}]});
    }
  }

  //Función para cuando se seleccione una lista pulsando al botón.
  const seleccionar = async (e) => {
    if (e.target.classList.contains("minilista-boton")) {
      const uuid = e.target.id.replaceAll("ag_", "");
      seleccionarLista(uuid);
    }
    if (e.target.classList.contains("minilista-boton-borrar")) {
      const uuid = e.target.id.replaceAll("bl_", "");
      seleccionarLista("");
      await borrarLista(uuid);
    }
  }

  //Cualquier usuario puede ver los productos, pero solo los que tienen la sesión iniciada pueden ver sus listas y filtrar los productos.
  return (
    <div className="gestor-listas">
      <div className="secciones">
        {/*Layout de 3 columnas: productos en la base de datos | listas del usuario | datos de la lista seleccionada.*/}
        <span className="seccion seccion-productos">
          <h2>Productos registrados</h2>
          {cargandoProductos ? (<Cargando />) : (errorProductos ? (<CajaError texto="Ha habido un error al cargar los productos" />) : (<>
            <ListaProductos controles={sesionIniciada} productos={productosCargados} borrarProductos={sesionIniciada} editarProductos={sesionIniciada} agregar={agregarProducto} />
          </>))}
        </span>
        {(sesionIniciada && usuarioSesion?.user?.id) && (<>
          <span className="seccion seccion-listas">
            <h2>Tus listas</h2>
            {cargandoListas ? (<Cargando />) : (errorListas ? (<CajaError texto="Ha habido un error al cargar las listas" />) : (<>
              <ListaListas seleccionar={seleccionar} listas={listasCargadas} botonNuevo={() => { seleccionarLista(""); }} />
            </>))}
          </span>
          <span className="seccion seccion-lista-seleccionada">
            <h2>Lista seleccionada</h2>
            {cargandoListas ? (<Cargando />) : (errorListas ? (<CajaError texto="Ha habido un error al cargar la lista" />) : (<>
              {uuidListaSeleccionada === "" ? (<Lista nuevo={true} />) : (<Lista nuevo={false} uuid={uuidListaSeleccionada} />)}
            </>))}
          </span>
        </>)}
      </div>
    </div>
  );
}

export default GestorListas;
