import React, { createContext, useState, useEffect } from "react";
import useSupabase from "../hooks/useSupabase.js";

const ContextoProductos = createContext();

//Contexto para los productos de la app.
const ProveedorProductos = (props) => {

  const [cargandoProductos, setCargandoProductos] = useState(false);
  const [errorProductos, setErrorProductos] = useState("");
  const [productosCargados, setProductosCargados] = useState([]); //Los productos actualmente cargados (para la magnitud de la aplicación, se descargan 50 al inicio y ya).
  const { obtenerProductos } = useSupabase();
  
  const cargaInicial = async () => {
    setCargandoProductos(true);
    setErrorProductos("");
    try {
      //Carga inicial de la base de datos.
      setProductosCargados(await obtenerProductos(50, {propiedad: "nombre", descendente: true})); //Esta función viene de un hook;
    } catch (e) {
      setErrorProductos(e?.message);
    } finally {
      setCargandoProductos(false);
    }
  }
  useEffect(() => {
    cargaInicial();
  }, []);

  const datosProveer = {
    cargandoProductos, errorProductos, productosCargados, obtenerProductos
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