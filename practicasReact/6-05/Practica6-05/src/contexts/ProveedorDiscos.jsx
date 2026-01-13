import React, { createContext, useState, useEffect } from "react";
import { validarDisco, validarUuid, validarDiscos, validarDiscoSoft } from "../libraries/validaciones.js";
import { useAPI } from "../hooks/useAPI.js";

const ContextoDiscos = createContext();

//Contexto encargado del manejo de los discos, usa useAPI para las peticiones.
const ProveedorDiscos = (props) => {

  const { leer, crear, borrar, editar, actualizar, cargando, error } = useAPI();
  const [discosCargados, setDiscosCargados] = useState([]);
  const URL_API = "http://localhost:3000/discos/";

  //Devuelve el disco que coincida con el uuid si existe.
  const getDisco = async (uuid) => {
    if (uuid && !validarUuid(uuid)) return { fallo: true };
    try {
      const resultado = await leer(URL_API + (uuid ?? ''));
      setDiscosCargados(resultado.length ? resultado : [resultado]);
      return resultado;
    } catch (error) {
      return { fallo: true, error };
    }
  }

  //Guarda tantos discos como se le pasen en el array (para guardar uno, pasar un array con un solo elemento).
  const guardarDiscos = async (discosNuevos) => {
    let discosAgregar = validarDiscos(discosNuevos, true);
    if (!discosAgregar.length) return { fallo: true };
    discosAgregar = discosAgregar.map((e) => { return { ...e, id: self.crypto.randomUUID() } }); //El uuid se genera aquí.
    try {
      discosAgregar.map(async (e) => {
        await crear(URL_API, e)
      });
      setDiscosCargados([...discosCargados, ...discosAgregar]);
      return discosAgregar;
    } catch (error) {
      return { fallo: true, error };
    }
  }

  //Borra el disco que tenga la uuid (si no coincide ninguno no hace nada).
  const borrarDisco = async (uuid) => {
    if (!validarUuid(uuid)) return { fallo: true };
    try {
      const resultado = await borrar(URL_API + uuid);
      setDiscosCargados([...discosCargados.filter((e) => {return e.id !== uuid})]);
      return resultado;
    } catch (error) {
      return { fallo: true, error };
    }
  }

  //Edita los datos de un disco a partir de su uuid, se requiere de un disco entero y válido.
  const editarDisco = async (uuid, discoNuevo) => {
    if (!validarUuid(uuid) || !validarDisco(discoNuevo, true)) return { fallo: true };
    try {
      const resultado = await actualizar(URL_API + uuid, { ...discoNuevo, id: uuid }); //PUT porque edita todo el disco.
      setDiscosCargados([...discosCargados.filter((e) => {return e.id !== uuid}), discoNuevo]);
      return resultado;
    } catch (error) {
      return { fallo: true, error };
    }
  }

  //Edita solo los datos proporcionados a partir de un uuid.
  const editarDiscoParcial = async (uuid, datosNuevos) => {
    if (!validarUuid(uuid) || !validarDiscoSoft(datosNuevos, true)) return { fallo: true };
    try {
      const resultado = await editar(URL_API + uuid, datosNuevos); //PATCH porque solo cambia algunos datos.
      setDiscosCargados([...discosCargados.filter((e) => {return e.id !== uuid}), resultado]);
      return resultado;
    } catch (error) {
      return { fallo: true, error };
    }
  }

  useEffect(() => {
    getDisco();
  }, []);
  
  const datosAProveer = {
    getDisco, guardarDiscos, borrarDisco, editarDisco, editarDiscoParcial, cargando, error, discosCargados
  }

  return (
    <>
      <ContextoDiscos.Provider value={datosAProveer}>
        {props.children}
      </ContextoDiscos.Provider>
    </>
  );
};

export default ProveedorDiscos;
export { ContextoDiscos };