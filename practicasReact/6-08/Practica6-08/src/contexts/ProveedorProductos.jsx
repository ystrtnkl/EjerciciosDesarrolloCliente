import React, { createContext, useState, useEffect } from "react";
import { supabaseConexion } from '../supabase/supabase.js';

const ContextoProductos = createContext();

const ProveedorProductos = (props) => {

  const [cargando, setCargando] = useState(false);
  const [errorSupabase, setErrorSupabase] = useState("");
  

  const datosProveer = {
    cargando, errorSupabase
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