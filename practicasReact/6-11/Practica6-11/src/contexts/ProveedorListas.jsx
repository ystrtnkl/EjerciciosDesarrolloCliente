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
  const { cargandoSupabase, errorSupabase, obtenerPrivado, insertarPrivado, editarPrivado, borrarPrivado, obtenerPublico } = useSupabase();
  const { usuarioSesion, sesionIniciada, soyAdmin } = useSesion(); //Se necesita saber los datos del usuario antes de manipular las listas.
  const [listaActual, setListaActual] = useState({ nombre: "", descripcion: "", productos: [] }); //Datos de la lista a manipular.
  const { getProductoConcreto } = useProductos();
  const [listasCargadasAjenas, setListasCargadasAjenas] = useState([]); //Almacena hasta 50 listas de otros usuarios, solo para admins (en caso de hacer la aplicación mucho más grande se debería implementar paginado y búsqueda para esta funcionalidad).

  //Manda a seleccionar una lista a partir de su uuid, tiene que estar cargada.
  const seleccionarLista = (uuid) => {
    if (uuid === "") {
      setUuidListaSeleccionada("");
    } else if ([...listasCargadas, ...listasCargadasAjenas].filter((e) => { return e.uuid === uuid }).length) {
      setUuidListaSeleccionada(uuid);
    }
  }

  //Devuelve los datos de la lista seleccionada.
  const getListaSeleccionada = () => {
    const listaDummy = { nombre: "", descripcion: "", productos: [] }
    if (uuidListaSeleccionada === "" || !sesionIniciada) return listaDummy;
    let encontrado = listasCargadas.filter((e) => { return e.uuid === uuidListaSeleccionada });
    if (!encontrado.length) encontrado = listasCargadasAjenas.filter((e) => { return e.uuid === uuidListaSeleccionada });
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
    } else {
      setUuidListaSeleccionada("");
    }
    //Y si el usuario es administrador, descarga además hasta 50 listas de otros usuarios.
    if (soyAdmin) {
      //Aquí se usa obtener publico porque el servidor detecta que el usuario es administrador, desde el punto de vista de un administrador todas las listas son públicas.
      const resultado = await obtenerPublico("listas", { filtros: { propiedad: "uuid_usuario", valor: usuarioSesion?.user?.id, invertido: 1 } });
      let uuidsConocidos = []; //Evita hacer muchas llamadas al servidor en búsqueda de los nombres de los autores de las listas cacheandolos aquí.
      const informacionListas = await Promise.all(resultado.map(async (e) => {
        let autor = uuidsConocidos.filter((ee) => { return ee.uuid_usuario === e.uuid_usuario });
        if (autor.length) {
          autor = autor[0].nombre_completo;
        } else {
          autor = await obtenerPublico("perfil", { limite: 1, orden: { propiedad: "id_usuario" }, filtros: { propiedad: "id_usuario", valor: e.uuid_usuario, invertido: 2 } });
          autor = autor[0];
          uuidsConocidos = [...uuidsConocidos, { uuid_usuario: e.uuid_usuario, nombre_completo: autor.nombre_completo }];
        }
        const intermedios = await obtenerPublico("lista_producto", { orden: { propiedad: "uuid_producto", descendente: true }, filtros: { propiedad: "uuid_lista", valor: e.uuid } });
        const productosEnLista = intermedios.length ? await Promise.all(intermedios.map(async (ee) => {
          const elProducto = await getProductoConcreto(ee.uuid_producto);
          return { ...elProducto[0], cantidad: ee.cantidad };
        })) : [];
        return { ...e, productos: productosEnLista, autor: autor?.nombre_completo ?? "Desconocido" }
      }));
      setListasCargadasAjenas(informacionListas);
    } else {
      setListasCargadasAjenas([]);
    }
  }
  useEffect(() => {
    cargaInicial();
  }, [usuarioSesion, soyAdmin]);

  const datosProveer = {
    seleccionarLista, cargandoSupabase, errorSupabase, listasCargadas, uuidListaSeleccionada, getListaSeleccionada, guardarLista, borrarLista, listaActual, setListaActual, listasCargadasAjenas
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