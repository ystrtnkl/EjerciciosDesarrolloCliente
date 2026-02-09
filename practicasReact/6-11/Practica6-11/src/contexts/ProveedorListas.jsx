import React, { createContext, useState, useEffect } from "react";
import useSupabase from "../hooks/useSupabase.js";
import useSesion from "../hooks/useSesion.js";
import { validarDatosLista } from "../libraries/validaciones.js";
import useProductos from '../hooks/useProductos.js';

const ContextoListas = createContext();

//Contexto para las listas en la aplicación.
const ProveedorListas = (props) => {

  const [listasCargadas, setListasCargadas] = useState([]); //Listas cargadas actualmente (solo se pueden descargar las que pertenezcan al usuario).
  const [uuidListaSeleccionada, setUuidListaSeleccionada] = useState(""); //UUID de la lista seleccionada actualmente.
  const { cargandoSupabase, errorSupabase, obtenerPrivado, insertarPrivado, editarPrivado, borrarPrivado } = useSupabase();
  const { usuarioSesion, sesionIniciada } = useSesion(); //Se necesita saber los datos del usuario antes de manipular las listas.
  const [listaActual, setListaActual] = useState({ nombre: "", descripcion: "", productos: [] }); //Datos de la lista a manipular.
  const { getProductoConcreto } = useProductos();

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
    const listaDummy = { nombre: "", descripcion: "", productos: [] }
    if (uuidListaSeleccionada === "" || !sesionIniciada) return listaDummy;
    const encontrado = listasCargadas.filter((e) => { return e.uuid === uuidListaSeleccionada });
    return encontrado.length ? encontrado[0] : listaDummy;
  }

  //Manda a guardar/editar una lista.
  const guardarLista = async (uuid, datos) => {
    if (!validarDatosLista(datos) || !sesionIniciada) return false;
    if (uuid === "") { //Nueva lista.
      const nuevo = await insertarPrivado(usuarioSesion?.user?.id, "listas", { ...datos, productos: undefined, uuid_usuario: usuarioSesion.uuid, fecha: Date.now() });
      if (nuevo) datos.productos.forEach(async (e) => { //Agregar las relaciones producto-lista.
        await insertarPrivado(usuarioSesion?.user?.id, "lista_producto", { uuid_lista: nuevo.uuid, uuid_producto: e.uuid, cantidad: e.cantidad }, true);
      });
      if (nuevo?.uuid?.length) {
        setListasCargadas([...listasCargadas, { ...nuevo, uuid: nuevo.uuid, productos: datos.productos }]);
        return nuevo?.uuid ?? true;
      }
    } else { //Editar lista.
      const edicion = { ...datos, uuid: undefined, productos: undefined, uuid_usuario: usuarioSesion.uuid, fecha: Date.now() };
      const nuevo = await editarPrivado(usuarioSesion?.user?.id, "listas", uuid, edicion);
      await borrarPrivado(usuarioSesion?.user?.id, "lista_producto", uuid, "uuid_lista"); //Eliminar relaciones anteriores.
      if (nuevo) datos.productos.forEach(async (e) => { //Agregar las relaciones producto-lista.
        await insertarPrivado(usuarioSesion?.user?.id, "lista_producto", { uuid_lista: uuid, uuid_producto: e.uuid, cantidad: e.cantidad }, true);
      });
      if (nuevo.length) {
        setListasCargadas([...listasCargadas.filter((e) => { return e.uuid !== uuid }), { ...edicion, uuid, productos: datos.productos }]);
        return nuevo?.uuid ?? true;
      }
    }
  }

  //Borra una lista, y por ende todas las pertenencias en esta (en cascada).
  const borrarLista = async (uuid) => {
    if (sesionIniciada) {
      await borrarPrivado(usuarioSesion?.user?.id, "lista_producto", uuid, "uuid_lista");
      await borrarPrivado(usuarioSesion?.user?.id, "listas", uuid);
      setListasCargadas(listasCargadas.filter((e) => { return e.uuid !== uuid }));
    }
  }

  const cargaInicial = async () => {
    //Descarga todas las listas que pueda (solo las que sean del usuario) (solo si la sesión está iniciada).
    if (sesionIniciada) {
      const resultado = await obtenerPrivado(usuarioSesion?.user?.id, "listas");
      //Descarga todas las listas del usuario, por cada una descarga todas las instancias intermedias de pertenencia en lista_producto, y busca la información de dichos productos para añadirla. Es algo más eficiente que una subconsulta.
      const informacionListas = await Promise.all(resultado.map(async (e) => {
        const intermedios = await obtenerPrivado(usuarioSesion?.user?.id, "lista_producto", { orden: { propiedad: "uuid_producto", descendente: true }, filtros: { propiedad: "uuid_lista", valor: e.uuid } });
        const productosEnLista = intermedios.length ? await Promise.all(intermedios.map(async (ee) => {
          const elProducto = await getProductoConcreto(ee.uuid_producto);
          return { ...elProducto[0], cantidad: ee.cantidad };
        })) : [];
        return { ...e, productos: productosEnLista }
      }));
      setListasCargadas(informacionListas);
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