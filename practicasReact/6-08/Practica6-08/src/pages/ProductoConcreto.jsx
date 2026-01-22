import React, { useEffect, useState } from 'react';
import useProductos from '../hooks/useProductos.js';
import { useParams } from 'react-router-dom';
import ListaProductos from '../components/Productos/ListaProductos.jsx';
import useSupabase from '../hooks/useSupabase.js';
import Cargando from '../components/Principal/Cargando.jsx';

function ProductoConcreto() {

  const { uuidProducto } = useParams("uuidProducto");
  const { productosCargados } = useProductos();
  const [producto, setProducto] = useState([]);
  const { obtenerProductos } = useSupabase();
  const [cargando, setCargando] = useState(true);

  //Esta carga está optimizada en caso de que puedan llegar a haber millones de productos (no se confía en que el producto a buscar esté en el estado del contexto, pero si lo está pues mejor porque así se ahorra una petición).
  //Aunque esta sea una página para ver un solo producto, se ha considerado que es mejor descargar los 50 iniciales también ya que se espera que el usuario valla a hacer uso también de la lista completa, por eso se hace uso del estado del contexto.
  const cargaInicial = async () => {
    setCargando(true);
    //Primero mira si el producto ya ha sido cargado por la carga inicial del contexto (que de normal carga 50 al inicio).
    let productoMostrar = productosCargados.filter((e) => {return e.uuid === uuidProducto});
    //Si no está cargado, entonces manda una petición para buscar ese producto en concreto (puede ser que el producto a buscar no esté entre los 50 ya descargados).
    if (!productoMostrar) productoMostrar = await obtenerProductos(1, { propiedad: "nombre", descendente: true }, {propiedad: "uuid", valor: uuidProducto});
    setProducto(productoMostrar ?? []); //Aun así, cabe la posibilidad de que tampoco lo encuentre porque no existe
    if (productosCargados.length) setCargando(false); //No se considera que deja de cargar si aún no están los productos de la carga inicial.
  }
  useEffect(() => {
    cargaInicial();
  }, [productosCargados]); //Empieza la búsqueda una vez el contexto ha cargado los 50 primeros (para aprovechar en caso de que el producto a buscar esté ahí).

  return (
    <>
        {producto.length ? (<ListaProductos productos={producto} />) : (cargando ? (<Cargando />) : (<p>Ha habido un error o no se ha encontrado el producto</p>))}
    </>
  )
}

export default ProductoConcreto;