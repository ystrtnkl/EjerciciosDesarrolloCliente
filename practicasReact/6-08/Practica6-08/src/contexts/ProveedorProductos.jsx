import React, { createContext, useState, useEffect } from "react";
import useSupabase from "../hooks/useSupabase.js";

const ContextoProductos = createContext();

//Contexto para los productos de la app.
const ProveedorProductos = (props) => {

  //Actualmente, funciona de tal manera que en el inicio se descargan 50 productos de la base de datos (inevitablemente) y son ofrecidos mediante el hook useProductos al resto de componentes.
  //Está pensado de tal manera que un usuario usará esta aplicación por la característica de la lista, no por la característica de ver productos. Así que se supone que querrá ver una buena cantidad de productos al iniciar la aplicación.
  //También es posible hacer click en un producto y ver su página detallada, en ese caso sería ilogico descargar los 50 productos iniciales pero está pensado que el usuario también usará la característica de listas, así que eventualmetne acabará consumiendo dicha información, mejor tenerla de antemano.
  //Además, los productos son una entidad que no solo NO se van editando/borrando/añadiendo rápidamente, sino que solo un administrador podría hacer esto. Así que se tratan como si fuesen un dato inmutable.
  //Además no se hacen validaciones sobre productos porque no es una entidad que se pueda crear en el frontend.

  const [productosCargados, setProductosCargados] = useState([]); //Los productos actualmente cargados (para la magnitud de la aplicación, se descargan 50 al inicio y ya).
  const { obtenerProductos, errorSupabase, cargandoSupabase } = useSupabase(); //Por cuestiones de dividir el código, las funciones que hacen operaciones sobre la base de datos en Supabase están en un hook aparte.

  //Devuelve un producto en concreto. Si ya está en el estado lo devuelve, si no lo descarga de Supaabse y lo añade al estado.
  //Esta carga está optimizada en caso de que puedan llegar a haber millones de productos (no se confía en que el producto a buscar esté en el estado del contexto, pero si lo está pues mejor porque así se ahorra una petición).
  const getProductoConcreto = async (uuid) => {
    //Primero mira si el producto ya ha sido cargado por la carga inicial del contexto (que de normal carga 50 al inicio).
    let productoBuscar = productosCargados.filter((e) => { return e.uuid === uuid });
    //Si no está cargado, entonces manda una petición para buscar ese producto en concreto (puede ser que el producto a buscar no esté entre los 50 ya descargados).
    if (!productoBuscar) {
      productoBuscar = await obtenerProductos(1, { propiedad: "nombre", descendente: true }, { propiedad: "uuid", valor: uuid });
      setProductosCargados([...productosCargados, productoBuscar]);
    }
    return productoBuscar ?? []; //Aún puede darse el caso de que no devuelva nada porque el producto no existe. (siempre se devuelve envuelto en un array para compatibilidad con otros componentes).
  }

  const cargaInicial = async () => {
    //Carga inicial de la base de datos.
    setProductosCargados(await obtenerProductos(50, { propiedad: "uuid", descendente: true })); //Esta función viene de un hook;
  }
  useEffect(() => {
    cargaInicial();
  }, []);

  const datosProveer = {
    cargandoSupabase, errorSupabase, productosCargados, obtenerProductos, getProductoConcreto
  }

  return (
    <>
      <ContextoProductos.Provider value={datosProveer}>
        {props.children}
      </ContextoProductos.Provider>
    </>
  );
};

export default ProveedorProductos;
export { ContextoProductos };