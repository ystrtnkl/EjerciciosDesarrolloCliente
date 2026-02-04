import React, { useEffect } from 'react';
import { validarDescripcionLista, validarNombreLista } from '../../libraries/validaciones.js';
import InputBasico from '../Formularios/InputBasico.jsx';
import { manejadorInput } from '../../libraries/manejadorInput.js';
import { timestampAFecha } from '../../libraries/formateos.js';
import imgAceptar from '../../assets/aceptar.png';
import imgBorrar from '../../assets/eliminar.png';
import useListas from '../../hooks/useListas.js';
import Cargando from '../Principal/Cargando.jsx';
import CajaError from '../Principal/CajaError.jsx';

//Vista de una lista, muestra sus datos, sus productos y permite editar ambos.
const Lista = (props) => {

  const { cargandoSupabase, errorSupabase, guardarLista, getListaSeleccionada, uuidListaSeleccionada, borrarLista, seleccionarLista, listaActual, setListaActual } = useListas();
  
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
      {errorSupabase ? (<CajaError texto={errorSupabase} />) : ((cargandoSupabase || typeof listaActual === "undefined") ? (<Cargando />) : (<div>
      {props.nuevo && <p>Estás creando una nueva lista</p>}
      <form onChange={(e) => { manejadorInput(e, setListaActual, listaActual) }}>
        <InputBasico nombre="nombre" titulo="Nombre:" tipo="text" valor={listaActual.nombre} validador={validarNombreLista} mensajeError="El nombre de la lista debe tener entre 4 y 20 carácteres" />
        <InputBasico nombre="descripcion" titulo="Descripción:" tipo="textarea" valor={listaActual.descripcion} validador={validarDescripcionLista} mensajeError="La descripción del prudocto debe tener menos de 512 carácteres" />
      </form>
      {listaActual.fecha && (<p>Fecha: {timestampAFecha(listaActual.fecha)}</p>)}
      <h3>Productos: </h3>
      <div className="productos-en-lista" onClick={() => {}}>
        {JSON.stringify(listaActual.productos)}
      </div>
      {props.nuevo || <button className="boton-lista boton-borrar" onClick={borrarEsta}><img src={imgBorrar} alt="Borrar" /></button>}
      <button className="boton-lista boton-aceptar" onClick={guardar}><img src={imgAceptar} alt="Aceptar" /></button>
    </div>))}
    </>
  )
}

export default Lista;