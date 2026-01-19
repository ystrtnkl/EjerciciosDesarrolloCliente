import React, { createContext, useState, useEffect } from "react";
import { useAPI } from "../hooks/useAPI.js";
import { supabaseConexion } from '../supabase/supabase.js';

const ContextoSesion = createContext();

//Contexto encargado del manejo de la sesión de Supabase, usa useAPI para las peticiones.
const ProveedorSesion = (props) => {

    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState("");
    const [usuarioSesion, setUsuarioSesion] = useState({});
    const [sesionIniciada, setSesionIniciada] = useState(false);

    const crearCuenta = async () => {

    }

    const iniciarSesion = async () => {

    }

    const cerrarSesion = async () => {

    }

    useEffect(() => {

    }, []);

  const datosProveer = {
    crearCuenta, iniciarSesion, cerrarSesion, usuarioSesion, sesionIniciada, cargando, error
  }

  return (
    <>
      <ContextoSesion.Provider value={datosProveer}>
        {props.children}
      </ContextoSesion.Provider>
    </>
  );
};

export default ProveedorSesion;
export { ContextoSesion };