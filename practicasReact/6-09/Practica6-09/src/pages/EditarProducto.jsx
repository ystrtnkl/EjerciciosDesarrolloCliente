import React, { useEffect, useState } from 'react';
import useSesion from '../hooks/useSesion.js';
import { useParams } from 'react-router-dom';
import FormularioProducto from '../components/Formularios/FormularioProducto.jsx';
import useProductos from '../hooks/useProductos.js';

//Página con el formulario para editar un producto.
function EditarProducto() {
  
  const { sesionIniciada } = useSesion();
  const { uuidProducto } = useParams("uuidProducto");
  const [cargandoOriginal, setCargandoOriginal] = useState(true);
  const { productosCargados, getProductoConcreto } = useProductos();
  const [productoPrevio, setProductoPrevio] = useState(null);
  
  //Búsqueda optimizada de igual manera que en ProductoConcreto.
    const cargaInicial = async () => {
      setCargandoOriginal(true);
      setProductoPrevio(await getProductoConcreto(uuidProducto));
      if (productosCargados.length) setCargandoOriginal(false); //No se considera que deja de cargar si aún no están los productos de la carga inicial.
    }
    useEffect(() => {
      cargaInicial();
    }, []); //Empieza la búsqueda una vez el contexto ha cargado los 50 primeros (para aprovechar en caso de que el producto a buscar esté ahí). Esto es porque el usuario podría entrar a la aplicación a través de la página propia de un producto, momento en el cual podrían no haberse cargado los productos iniciales.
  

  return (
    <>
      <h2>Editar producto </h2>
      {(sesionIniciada && !cargandoOriginal) ? (<FormularioProducto uuid={uuidProducto} previo={productoPrevio[0]} editar={true} />) : (<p>Posiblemente no tengas permisos para editar este producto (o no exista)</p>)}
    </>
  )
}

export default EditarProducto;