import React, { createContext, useState, useEffect } from "react";
import useSupabase from "../hooks/useSupabase.js";
import useSesion from "../hooks/useSesion.js";
import { validarDatosLista } from "../libraries/validaciones.js";

const ContextoListas = createContext();

//Contexto para las listas en la aplicación.
const ProveedorListas = (props) => {

  const [listasCargadas, setListasCargadas] = useState([]); //Listas cargadas actualmente (solo se pueden descargar las que pertenezcan al usuario).
  const [uuidListaSeleccionada, setUuidListaSeleccionada] = useState(""); //UUID de la lista seleccionada actualmente.
  const { cargandoSupabase, errorSupabase, obtenerPrivado, insertarPrivado, editarPrivado, borrarPrivado } = useSupabase();
  const { usuarioSesion, sesionIniciada } = useSesion(); //Se necesita saber los datos del usuario antes de manipular las listas.
  const [listaActual, setListaActual] = useState({nombre: "", descripcion: "", productos: []}); //Datos de la lista a manipular.

  //Manda a seleccionar una lista a partir de su uuid, tiene que estar cargada.
  const seleccionarLista = (uuid) => {
    if (uuid === "") {
      setUuidListaSeleccionada("");
    } else if (listasCargadas.filter((e) => { return e.uuid === uuid }).length) {
      setUuidListaSeleccionada(uuid);
    }
  }

  //Devuelve los datos de la lista seleccionada.
  const getListaSeleccionada = () => {
    const listaDummy = {nombre: "", descripcion: "", productos: []}
    if (uuidListaSeleccionada === "" || !sesionIniciada) return listaDummy;
    const encontrado = listasCargadas.filter((e) => { return e.uuid === uuidListaSeleccionada });
    encontrado.productos = []; //fasdhfasioufdhsaiudfhgsidufghsaidfhg
    return encontrado.length ? encontrado[0] : listaDummy;
  }

  //Manda a guardar/editar una lista.
  const guardarLista = async (uuid, datos) => {
    if (!validarDatosLista(datos) || !sesionIniciada) return false;
    if (uuid === "") { //Nueva lista.
      const nuevo = await insertarPrivado(usuarioSesion?.user?.id, "listas", {...datos, productos: undefined, uuid_usuario: usuarioSesion.uuid, fecha: Date.now()});
      if (nuevo?.uuid?.length) {
        setListasCargadas([...listasCargadas, { ...nuevo, uuid: nuevo.uuid }]);
        return nuevo?.uuid ?? true;
      }
    } else { //Editar lista.
      const edicion = {...datos, uuid: undefined, productos: undefined, uuid_usuario: usuarioSesion.uuid, fecha: Date.now()};
      const nuevo = await editarPrivado(usuarioSesion?.user?.id, "listas", uuid, edicion);
      if (nuevo.length) {
        setListasCargadas([...listasCargadas.filter((e) => {return e.uuid !== uuid}), {...edicion, uuid}]);
        return nuevo?.uuid ?? true;
      }
    }

    //GUARDAR PRODUCTOS
  }

  const borrarLista = async (uuid) => {
    //BORRADO EN CASCADA
    if (sesionIniciada) await borrarPrivado(usuarioSesion?.user?.id, "listas", uuid);
    setListasCargadas(listasCargadas.filter((e) => {return e.uuid !== uuid}));
  }

  const cargaInicial = async () => {
    //Descarga todas las listas que pueda (solo las que sean del usuario) (solo si la sesión está iniciada).
    if (sesionIniciada) {
      const resultado = await obtenerPrivado(usuarioSesion?.user?.id, "listas");
      //Fowehfwfhdfjhksjdfhljkfhsdjkfhskdjf 
      setListasCargadas(resultado.map((e) => {return {...e, productos: []}}));
    }
  }
  useEffect(() => {
    cargaInicial();
  }, [usuarioSesion]);

  const datosProveer = {
    seleccionarLista, cargandoSupabase, errorSupabase, listasCargadas, uuidListaSeleccionada, getListaSeleccionada, guardarLista, borrarLista, listaActual, setListaActual
  }

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