import React, { createContext, useState, useEffect } from "react";
import useSupabase from "../hooks/useSupabase.js";

const ContextoListas = createContext();

const ProveedorListas = (props) => {

  const [listasCargadas, setListasCargadas] = useState([]);
  const [uuidListaSeleccionada, setUuidListaSeleccionada] = useState("");
  const { cargandoSupabase, errorSupabase, obtenerListas, crearLista, actualizarLista, borrarLista, cambiarProductoLista } = useSupabase();

  const seleccionarLista = (uuid) => {
    if (listasCargadas.filter((e) => {return e.uuid === uuid}).length) {
      setUuidListaSeleccionada(uuid);
    }
  }

  const getListaSeleccionada = () => {
    if (uuidListaSeleccionada === "") return false;
    return listasCargadas.filter((e) => {return e.uuid === uuidListaSeleccionada});
  }

  const cargaInicial = async () => {
      setListasCargadas(await obtenerListas());
  }
    useEffect(() => {
      cargaInicial();
    }, []);
  
  const datosProveer = {
    seleccionarLista, cargandoSupabase, errorSupabase, listasCargadas, uuidListaSeleccionada, getListaSeleccionada
  }


  //¿?¿?¿?¿?¿¿?¿?¿?
  return (
      <>
        <ContextoListas.Provider value={datosProveer}>
          {props.children}
        </ContextoListas.Provider>
      </>
    );
  };
  
  export default ProveedorListas;
  export { ContextoListas };