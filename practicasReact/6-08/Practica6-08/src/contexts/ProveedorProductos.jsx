import React, { createContext, useState, useEffect } from "react";
import { supabaseConexion } from '../supabase/supabase.js';

const ContextoProductos = createContext();

//Contexto para los productos de la app
const ProveedorProductos = (props) => {

  const [cargando, setCargando] = useState(false);
  const [errorSupabase, setErrorSupabase] = useState("");
  const [productosCargados, setProductosCargados] = useState([]);

  const obtenerProductos = async (filtros, requisito, orden, limite) => {
    setCargando(true);
    setErrorSupabase("");
    try {
      
    } catch (e) {
      setErrorSupabase(e?.message);
    } finally {
      setCargando(false);
    }
  }
  
  const cargaInicial = async () => {
    setProductosCargados(await obtenerProductos());
  }
  useEffect(() => {
    cargaInicial();
  }, []);

  const datosProveer = {
    cargando, errorSupabase, productosCargados, obtenerProductos
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