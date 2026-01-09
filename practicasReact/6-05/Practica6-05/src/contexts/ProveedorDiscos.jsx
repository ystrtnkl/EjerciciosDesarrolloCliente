import React, { useState, useEffect, createContext } from "react";
import { peticionGenerica } from "../libraries/peticionHttp.js";
import { validarDisco, validarUuid, validarDiscos } from "../libraries/validaciones.js";

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
    let discosAgregar = validarDiscos(discosNuevos);
    if (!discosAgregar.length) return { fallo: true };
    //Se suben solo los que no estén repetidos.
    discosAgregar = discosAgregar.filter(async (e) => {
      const resultado = await getDisco(e.id).fallo
      return resultado.fallo ? true : false; //Si falla el GET es que el uuid no está en uso.
    });
    console.log(discosAgregar);
    try {
      return await peticionGenerica(URL_API, "PATCH", { discos: discosAgregar });
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

  //Borra todos los discos del localStorage.
  const borrarTodosLosDiscos = async () => {
    try {
      return await peticionGenerica(URL_API, "DELETE");
    } catch (error) {
      return { fallo: true, error };
    }
  }

  //Borra todos los discos almacenados y guarda solo los almacenados por parámetros (se requiere que sean discos enteros y válidos, pero se usa patch porque se altera parcialmente el array de discos).
  const reemplazarDiscos = async (discosNuevos) => {
    const discosEditar = validarDiscos(discosNuevos);
    if (!discosEditar.length) return { fallo: true };
    try {
      return await peticionGenerica(URL_API, "PATCH", { discos: discosEditar });
    } catch (error) {
      return { fallo: true, error };
    }
  }

  //Edita los datos de un disco a partir de su uuid, se requiere de un disco entero y válido.
  const editarDisco = async (uuid, discoNuevo) => {
    if (!validarUuid(uuid)) return { fallo: true };
    const discosEditar = validarDiscos(discoNuevo);
    if (!discosEditar.length) return { fallo: true };
    try {
      return await peticionGenerica(`${URL_API}/${uuid}`, "PUT", { discos: discosEditar });
    } catch (error) {
      return { fallo: true, error };
    }
  }

  const datosAProveer = {
    discosActuales, setDiscosActuales, getDisco, getTodosLosDiscos, guardarDiscos, borrarDisco, borrarTodosLosDiscos, reemplazarDiscos, editarDisco
  }


  const cargaInicial = async () => {
    setDiscosActuales(await getTodosLosDiscos());
    console.log(await guardarDiscos([{
            "id": "gggc6061-3f07-48bb-96ab-da8e23c4695f",
            "localizacion": "ES-008CB",
            "nombre": "Nombre de disco erspecial",
            "caratula": "https://i.ibb.co/zh7F0HD6/A7.png",
            "grupo": "Artistas uno",
            "agno": "2001",
            "genero": ["pop"],
            "prestado": true
        }]));
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