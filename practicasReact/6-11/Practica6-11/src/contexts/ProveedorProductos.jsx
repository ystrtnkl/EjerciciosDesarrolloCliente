import React, { createContext, useState, useEffect } from "react";
import useSupabase from "../hooks/useSupabase.js";
import { validarDatosProducto } from "../libraries/validaciones.js";
import useSesion from "../hooks/useSesion.js";

const ContextoProductos = createContext();

//Contexto para los productos de la app.
const ProveedorProductos = (props) => {

  //Actualmente, funciona de tal manera que en el inicio se descargan 50 productos de la base de datos (inevitablemente) y son ofrecidos mediante el hook useProductos al resto de componentes.
  //Está pensado de tal manera que un usuario usará esta aplicación por la característica de la lista, no por la característica de ver productos. Así que se supone que querrá ver una buena cantidad de productos al iniciar la aplicación.
  //También es posible hacer click en un producto y ver su página detallada, en ese caso sería ilogico descargar los 50 productos iniciales pero está pensado que el usuario también usará la característica de listas, así que eventualmetne acabará consumiendo dicha información, mejor tenerla de antemano.

  const [productosCargados, setProductosCargados] = useState([]); //Los productos actualmente cargados (para la magnitud de la aplicación, se descargan 50 al inicio y ya).
  const { obtenerPublico, errorSupabase, cargandoSupabase, insertarPublico, editarPublico, borrarPublico, borrarPrivado } = useSupabase(); //Por cuestiones de dividir el código, las funciones que hacen operaciones sobre la base de datos en Supabase están en un hook aparte.
  const TAMAGNO_INICIAL = 50; //Cuantos productos descarga de primeras.
  const { sesionIniciada, usuarioSesion } = useSesion(); //Se necesita saber los datos del usuario.
  

  //Devuelve un producto en concreto. Si ya está en el estado lo devuelve, si no lo descarga de Supaabse y lo añade al estado.
  //Esta carga está optimizada en caso de que puedan llegar a haber millones de productos (no se confía en que el producto a buscar esté en el estado del contexto, pero si lo está pues mejor porque así se ahorra una petición).
  const getProductoConcreto = async (uuid) => {
    //Primero mira si el producto ya ha sido cargado por la carga inicial del contexto (que de normal carga 50 al inicio).
    let productoBuscar = productosCargados.filter((e) => { return e.uuid === uuid });
    //Si no está cargado, entonces manda una petición para buscar ese producto en concreto (puede ser que el producto a buscar no esté entre los 50 ya descargados).
    if (!productoBuscar.length) {
      productoBuscar = await obtenerPublico("productos", { limite: 1, orden: { propiedad: "nombre", descendente: true }, filtros: { propiedad: "uuid", valor: uuid } });
      setProductosCargados([...productosCargados, ...productoBuscar]);
      if (!productosCargados.length) await cargaInicial(); //En caso de que esta búsqueda se haga antes de la carga inicial, provocarla igualmente.
    }
    return productoBuscar ?? []; //Aún puede darse el caso de que no devuelva nada porque el producto no existe. (siempre se devuelve envuelto en un array para compatibilidad con otros componentes).
  }

  //Llama a guardar un nuevo producto a la base de datos, y si todo va bien se suma a la lista de productos cargados.
  const nuevoProducto = async (producto) => {
    if (!validarDatosProducto(producto) || !sesionIniciada) return false;
    const nuevo = await insertarPublico("productos", {...producto, duegno: usuarioSesion?.user?.id});
    if (nuevo?.uuid?.length) {
      setProductosCargados([...productosCargados], { ...nuevo, uuid: nuevo.uuid });
      return nuevo?.uuid ?? true;
    }
  }

  //Llama a eliminar un producto, y si todo va bien también lo quita de los productos cargados.
  const eliminarProducto = async (uuid) => {
    if (!sesionIniciada) return false;
    const resultado = await borrarPublico("lista_producto", uuid, "uuid_producto"); //De momento se hace el borrado en cascada de tal manera que también se borran las inserciones en lista_producto aunque el usuario que lo borre no sea el dueño de las listas en las que aparece ese producto. Esto se solucionará más adelante con la funcionalidad de los permisos.
    const resultado2 = await borrarPublico("productos", uuid);
    //if (resultado) setProductosCargados(productosCargados.filter((e) => {return e.uuid !== uuid})); //Versión óptima en la que no vuelve a descargar los productos de la base de datos PERO el usuario verá 49 en lugar de 50.
    //Borrar coincidencias de ese producto en cada una de las listas.
    //await borrarPrivado(usuarioSesion?.user?.id, "lista_producto", resultado?.uuid, "uuid_producto");
    await borrarPublico("lista_producto", resultado?.uuid, "uuid_producto"); //La funcion borrarPrivado hace una búsqueda segun uuid_usuario, según está configurado Supabase ahora mismo hace un borrado en cascada que trasciende al RLS, así que conviene más usar esta función para poder borrar pertenencias de listas ajenas para un correcto borrado en cascada.
    if (resultado && resultado2) await cargaInicial(); //Versión no tan optimizada en la que cuando se borra un producto se re-descargan los 50 iniciales PERO al menos el usuario tendrá una mejor experiencia pudiendo ver 50.
    //Ambas maneras son solo soluciones temporales, más adelante se usarán WebSockets para ver los datos a tiempo real (el servidor avisaría al usuario cuando un producto que está viendo es eliminado o editado).
  }

  //Llama a editar un producto, y si todo va bien aplica dichos cambios en los productos cargados.
  const cambiarProducto = async (uuid, nuevo) => {
    if (!validarDatosProducto(nuevo) || !sesionIniciada) return false;
    const resultado = await editarPublico("productos", uuid, nuevo);
    if (resultado?.uuid?.length) {
      setProductosCargados([...productosCargados.filter((e) => { return e.uuid !== uuid }), resultado]);
      return true;
      //En este caso (al contrario que al eliminar) no hace falta re-descargar los productos por ese motivo, ya que realmente el número de productos sigue siendo el mismo.
    }
  }

  const cargaInicial = async () => {
    //Carga inicial de la base de datos.
    setProductosCargados([...(await obtenerPublico("productos", { limite: TAMAGNO_INICIAL, orden: { propiedad: "nombre", descendente: true } }))]); //Esta función viene de un hook.
  }
  useEffect(() => {
    cargaInicial();
  }, []);

  const datosProveer = {
    cargandoSupabase, errorSupabase, productosCargados, obtenerPublico, getProductoConcreto, nuevoProducto, cambiarProducto, eliminarProducto, cargaInicial
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