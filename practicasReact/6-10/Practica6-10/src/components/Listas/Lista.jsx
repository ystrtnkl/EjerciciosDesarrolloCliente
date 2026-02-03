import React, { useState } from 'react';
import { validarDescripcionLista, validarNombreLista } from '../../libraries/validaciones.js';
import InputBasico from '../Formularios/InputBasico.jsx';
import { manejadorInput } from '../../libraries/manejadorInput.js';
import { timestampAFecha } from '../../libraries/formateos.js';
import imgAceptar from '../../assets/aceptar.png';
import imgBorrar from '../../assets/eliminar.png';

//Vista de una lista, muestra sus datos, sus productos y permite editar ambos.
const Lista = (props) => {

  const [listaActual, setListaActual] = useState(props.nuevo ? {nombre: "", descripcion: ""} : props.lista);

  const validar = () => {
    return typeof listaActual !== "undefined"
      && validarDescripcionLista(listaActual.descripcion) 
      && validarNombreLista(listaActual.nombre);
  }

  const guardar = async () => {
    if (validar()) {

    }
  }

  return (
    <div>
      <form onChange={(e) => { manejadorInput(e, setListaActual, listaActual) }}>
        <InputBasico nombre="nombre" titulo="Nombre:" tipo="text" valor={listaActual.nombre} validador={validarNombreLista} mensajeError="El nombre de la lista debe tener entre 4 y 20 carácteres" />
        <InputBasico nombre="descripcion" titulo="Descripción:" tipo="textarea" valor={listaActual.descripcion} validador={validarDescripcionLista} mensajeError="La descripción del prudocto debe tener menos de 512 carácteres" />
      </form>
      {listaActual.fecha && (<p>Fecha: {timestampAFecha(listaActual.fecha)}</p>)}
      <h3>Productos: </h3>
      <div className="productos-en-lista" onClick={() => {}}>

      </div>
      <button className="boton-lista boton-borrar" onClick={()=>{}}><img src={imgBorrar} alt="Borrar" /></button>
      <button className="boton-lista boton-aceptar" onClick={()=>{}}><img src={imgAceptar} alt="Aceptar" /></button>
    </div>
  )
}

export default Lista;