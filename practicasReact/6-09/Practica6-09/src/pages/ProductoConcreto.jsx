import React, { useEffect, useState } from 'react';
import useProductos from '../hooks/useProductos.js';
import { useParams } from 'react-router-dom';
import ListaProductos from '../components/Productos/ListaProductos.jsx';
import Cargando from '../components/Principal/Cargando.jsx';
import useSesion from '../hooks/useSesion.js';

//Página que muestra un solo producto (y si el usuario ha iniciado sesión, la posibilidad de borrarlo o editarlo).
function ProductoConcreto() {

  const { uuidProducto } = useParams("uuidProducto");
  const { getProductoConcreto, productosCargados } = useProductos();
  const [producto, setProducto] = useState([]);
  const [cargando, setCargando] = useState(true);
  const { sesionIniciada } = useSesion();

  //Aunque esta sea una página para ver un solo producto, se ha considerado que es mejor descargar los 50 iniciales también ya que se espera que el usuario valla a hacer uso también de la lista completa, por eso se hace uso del estado del contexto.

  //Esta carga está optimizada en caso de que puedan llegar a haber millones de productos (no se confía en que el producto a buscar esté en el estado del contexto, pero si lo está pues mejor porque así se ahorra una petición).
  const cargaInicial = async () => {
    setCargando(true);
    setProducto(await getProductoConcreto(uuidProducto));
    if (productosCargados.length) setCargando(false); //No se considera que deja de cargar si aún no están los productos de la carga inicial.
  }
  useEffect(() => {
    cargaInicial();
  }, [productosCargados]); //Empieza la búsqueda una vez el contexto ha cargado los 50 primeros (para aprovechar en caso de que el producto a buscar esté ahí). Esto es porque el usuario podría entrar a la aplicación a través de la página propia de un producto, momento en el cual podrían no haberse cargado los productos iniciales.

  return (
    <>
      {producto.length ? (<ListaProductos productos={producto} borrarProductos={sesionIniciada} editarProductos={sesionIniciada} />) : (cargando ? (<Cargando />) : (<p>Ha habido un error o no se ha encontrado el producto</p>))}
    </>
  )
}

export default ProductoConcreto;