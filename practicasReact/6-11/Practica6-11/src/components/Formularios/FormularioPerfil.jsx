import React, { useState } from 'react';
import Cargando from '../Principal/Cargando.jsx';
import InputBasico from './InputBasico.jsx';
import { manejadorInput } from '../../libraries/manejadorInput.js';
import { validarUrl, validarNombreUsuario, validarDescripcionPerfil, validarPerfil } from '../../libraries/validaciones.js';
import CajaError from '../Principal/CajaError.jsx';
import useSesion from '../../hooks/useSesion.js';

function FormularioPerfil() {

  const { cargandoAutenticacion, errorAutenticacion, cambiarPerfil, datosPerfil } = useSesion();
  const datosOriginales = { nombre_completo: "", avatar: "https://i.ibb.co/8SQJtJ1/sinportada.jpg", descripcion: "" }
  const [datosEdicion, setDatosEdicion] = useState(datosOriginales);

  const validar = () => {
    return validarPerfil(datosEdicion);
  }

  const enviar = async (e) => {
    e.preventDefault();
    if (validar()) {
      
    }
  }

  const reset = (e) => {
    e.preventDefault();
    setDatosEdicion(datosOriginales)
  }

  return (
    <>
      <form onChange={(e) => { manejadorInput(e, setDatosEdicion, datosEdicion) }}>
        <InputBasico nombre="nombre_completo" titulo="Nombre completo:" tipo="text" valor={datosEdicion.nombre_completo} validador={validarNombreUsuario} mensajeError="El nombre del producto debe tener entre 3 y 128 carácteres" /><br />
        <img src={datosEdicion.avatar ?? "https://i.ibb.co/8SQJtJ1/sinportada.jpg"} alt="Sin portada" />
        <InputBasico nombre="avatar" titulo="URL de la imágen:" tipo="text" valor={datosEdicion.avatar} validador={validarUrl} mensajeError="Debes poner una URL válida" />
        <InputBasico nombre="descripcion" titulo="Descripción:" tipo="textarea" valor={datosEdicion.descripcion} validador={validarDescripcionPerfil} mensajeError="La descripción del prudocto debe tener menos de 512 carácteres" />
        <button onClick={enviar}>Guardar perfil</button>
        <button onClick={reset}>Reiniciar</button>
      </form>
      {cargandoAutenticacion && (<Cargando />)}
      {errorAutenticacion && (<CajaError texto={errorAutenticacion} />)}
      {JSON.stringify(datosPerfil)}
    </>
  )
}

export default FormularioPerfil;
