import React, { useEffect } from 'react';
import { validarDescripcionLista, validarNombreLista } from '../../libraries/validaciones.js';
import InputBasico from '../Formularios/InputBasico.jsx';
import { manejadorInput } from '../../libraries/manejadorInput.js';
import { timestampAFecha, pesaMucho, floatAPrecio } from '../../libraries/formateos.js';
import imgAceptar from '../../assets/aceptar.png';
import imgBorrar from '../../assets/eliminar.png';
import useListas from '../../hooks/useListas.js';
import Cargando from '../Principal/Cargando.jsx';
import CajaError from '../Principal/CajaError.jsx';
import Producto from '../Productos/Producto.jsx';

//Vista de una lista, muestra sus datos, sus productos y permite editar ambos.
const Lista = (props) => {

  const { cargandoSupabase:cargandoLista, errorSupabase:errorLista, guardarLista, getListaSeleccionada, uuidListaSeleccionada, borrarLista, seleccionarLista, listaActual, setListaActual } = useListas();

  const validar = () => {
    return typeof listaActual !== "undefined"
      && validarDescripcionLista(listaActual.descripcion) 
      && validarNombreLista(listaActual.nombre);
  }

  const guardar = async () => {
    if (validar()) {
      await guardarLista(props.nuevo ? "" : props.uuid, listaActual);
    }
  }

  const productoMasOMenos = (e) => {
    if (e.target.classList.contains("alterar-cantidad")) {
      let cantidad = 0;
      const uuid = e.target.id.replaceAll("ac_", "").replaceAll("?", "");
      const producto = listaActual.productos.filter((e) => {return e.uuid === uuid})[0];
      if (e.target.classList.contains("agnadir-1")) cantidad = 1;
      if (e.target.classList.contains("agnadir-10")) cantidad = 10;
      if (e.target.classList.contains("eliminar-1")) cantidad = -1;
      if (e.target.classList.contains("eliminar-10")) cantidad = -10;
      if (e.target.classList.contains("boton-borrar-lista")) cantidad = -producto.cantidad - 1;
      if (producto.cantidad + cantidad <= 0 ) { //Eliminar de la lista.
        setListaActual({...listaActual, productos: listaActual.productos.filter((e) => {return e.uuid !== uuid})});
      } else { //Alterar cantidad.
        setListaActual({...listaActual, productos: [...(listaActual.productos.filter((e) => {return e.uuid !== uuid})), {...producto, cantidad: producto.cantidad + cantidad}]});
      }
    }
  }

  const borrarEsta = async () => {
    await borrarLista(props.uuid);
    seleccionarLista("");
  }

  useEffect(() => {
    setListaActual(getListaSeleccionada());
  }, [uuidListaSeleccionada]);

  return (
    <>
      {JSON.stringify(listaActual)}
      {errorLista ? (<CajaError texto={errorLista} />) : ((cargandoLista || typeof listaActual === "undefined") ? (<Cargando />) : (<div>
      {props.nuevo && <p>Estás creando una nueva lista</p>}
      <form onChange={(e) => { manejadorInput(e, setListaActual, listaActual) }}>
        <InputBasico nombre="nombre" titulo="Nombre:" tipo="text" valor={listaActual.nombre} validador={validarNombreLista} mensajeError="El nombre de la lista debe tener entre 4 y 20 carácteres" />
        <InputBasico nombre="descripcion" titulo="Descripción:" tipo="textarea" valor={listaActual.descripcion} validador={validarDescripcionLista} mensajeError="La descripción del prudocto debe tener menos de 512 carácteres" />
      </form>
      {listaActual.fecha && (<p>Fecha: {timestampAFecha(listaActual.fecha)}</p>)}
      <h3>Productos: </h3>
      <h4>Peso total: {pesaMucho(listaActual.productos.map((e) => {return e.peso * e.cantidad}).reduce((a, e) => {return a + e}, 0))}</h4>
      <h4>Precio total: {floatAPrecio(listaActual.productos.map((e) => {return e.precio * e.cantidad}).reduce((a, e) => {return a + e}, 0))}</h4>
      <div className="productos-en-lista lista-productos" onClick={productoMasOMenos}>
        {listaActual.productos.length ? (<>{listaActual.productos.sort((a,b) => {return a.uuid.localeCompare(b.uuid)}).map((e) => {
          return (<Producto key={e.uuid} producto={e} enLista={true} cantidad={e.cantidad} />)
        })}</>) : (<p>Esta lista está vacía</p>)}
      </div>
      {props.nuevo || <button className="boton-lista boton-borrar" onClick={borrarEsta}><img src={imgBorrar} alt="Borrar" /></button>}
      <button className="boton-lista boton-aceptar" onClick={guardar}><img src={imgAceptar} alt="Aceptar" /></button>
    </div>))}
    </>
  )
}

export default Lista;