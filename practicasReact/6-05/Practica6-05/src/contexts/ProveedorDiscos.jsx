import React, { useState, useEffect, createContext } from "react";
import { peticionGenerica } from "../libraries/peticionHttp.js";
import { validarDisco, validarUuid, validarDiscos, validarDiscoSoft } from "../libraries/validaciones.js";

const ContextoDiscos = createContext();

const ProveedorDiscos = (props) => {

  const [discosActuales, setDiscosActuales] = useState([]);
  const URL_API = "http://localhost:3000/discos";

  const getTodosLosDiscos = async () => {
    try {
      return await peticionGenerica(URL_API, "GET");
    } catch (error) {
      return { fallo: true, error };
    }
  }

  //Devuelve el disco que coincida con el uuid si existe.
  const getDisco = async (uuid) => {
    if (!validarUuid(uuid)) return { fallo: true };
    try {
      return await peticionGenerica(`${URL_API}/${uuid}`, "GET");
    } catch (error) {
      return { fallo: true, error };
    }
  }

  //Guarda tantos discos como se le pasen en el array (para guardar uno, pasar un array con un solo elemento).
  const guardarDiscos = async (discosNuevos) => {
    let discosAgregar = validarDiscos(discosNuevos, true);
    if (!discosAgregar.length) return { fallo: true };
    discosAgregar = discosAgregar.map((e) => {return {...e, id: self.crypto.randomUUID()}}); //El uuid se genera aquí.
    try {
      discosAgregar.map(async (e) => {
        await peticionGenerica(URL_API, "POST", e)
      });
      return true;
    } catch (error) {
      return { fallo: true, error };
    }
  }

  //Borra el disco que tenga la uuid (si no coincide ninguno no hace nada).
  const borrarDisco = async (uuid) => {
    if (!validarUuid(uuid)) return { fallo: true };
    try {
      return await peticionGenerica(`${URL_API}/${uuid}`, "DELETE");
    } catch (error) {
      return { fallo: true, error };
    }
  }

  //Edita los datos de un disco a partir de su uuid, se requiere de un disco entero y válido.
  const editarDisco = async (uuid, discoNuevo) => {
    if (!validarUuid(uuid) || !validarDisco(discoNuevo, true)) return { fallo: true };
    try {
      return await peticionGenerica(`${URL_API}/${uuid}`, "PUT", {...discoNuevo, id: uuid}); //PUT porque edita todo el disco.
    } catch (error) {
      return { fallo: true, error };
    }
  }

  //Edita solo los datos proporcionados a partir de un uuid.
  const editarDiscoParcial = async (uuid, datosNuevos) => {
    if (!validarUuid(uuid) || !validarDiscoSoft(datosNuevos, true)) return { fallo: true };
    try {
      return await peticionGenerica(`${URL_API}/${uuid}`, "PATCH", datosNuevos); //PATCH porque solo cambia algunos datos.
    } catch (error) {
      return { fallo: true, error };
    }
  }

  const datosAProveer = {
    discosActuales, setDiscosActuales, getDisco, getTodosLosDiscos, guardarDiscos, borrarDisco, editarDisco, editarDiscoParcial
  }


  const cargaInicial = async () => {
    setDiscosActuales(await getTodosLosDiscos());
  }
  useEffect(() => {
    cargaInicial();
  }, []);

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