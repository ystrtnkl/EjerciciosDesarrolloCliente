import React, { useState } from 'react';
import Cargando from '../Principal/Cargando.jsx';
import InputBasico from './InputBasico.jsx';
import { manejadorInput } from '../../libraries/manejadorInput.js';
import { validarUrl, validarNombreUsuario, validarDescripcionPerfil, validarPerfil } from '../../libraries/validaciones.js';
import CajaError from '../Principal/CajaError.jsx';
import useSesion from '../../hooks/useSesion.js';

//Página para ver y editar el perfil.
function FormularioPerfil() {

  const { cargandoAutenticacion, errorAutenticacion, cambiarPerfil, datosPerfil, sesionIniciada } = useSesion();
  const [datosEdicion, setDatosEdicion] = useState(datosPerfil); //Datos mostrados actuales del perfil, por defecto son los datos del perfil en sí.
  const [resultado, setResultado] = useState("");

  //Validar los datos del perfil.
  const validar = () => {
    return validarPerfil(datosEdicion);
  }

  //Guardar cambios en el perfil.
  const enviar = async (e) => {
    e.preventDefault();
    if (validar() && sesionIniciada) {
      const exito = await cambiarPerfil(datosEdicion);
      setResultado(exito ? "Perfil editado correctamente" : "No se ha podido editar el perfil");
    } else {
      setResultado("Los datos de edición no son válidos o no tienes la sesión iniciada");
    }
  }

  //Reiniciar el formulario del perfil, pondrá los datos del perfil original.
  const reset = (e) => {
    e.preventDefault();
    setDatosEdicion(datosPerfil)
  }

  return (
    <>
      {cargandoAutenticacion ? (<Cargando />) : (<form onChange={(e) => { manejadorInput(e, setDatosEdicion, datosEdicion) }}>
        <InputBasico nombre="nombre_completo" titulo="Nombre completo:" tipo="text" valor={datosEdicion.nombre_completo} validador={validarNombreUsuario} mensajeError="El nombre del usuario debe tener entre 3 y 128 carácteres" /><br />
        <img src={datosEdicion.avatar ?? "https://i.ibb.co/q30wzvtk/sinavatar.png"} alt="Sin portada" />
        <InputBasico nombre="avatar" titulo="URL de la imágen:" tipo="text" valor={datosEdicion.avatar} validador={validarUrl} mensajeError="Debes poner una URL válida" />
        <InputBasico nombre="descripcion" titulo="Descripción:" tipo="textarea" valor={datosEdicion.descripcion} validador={validarDescripcionPerfil} mensajeError="La descripción del usuario debe tener menos de 512 carácteres" />
        <button onClick={reset}>Reiniciar</button>
        <button onClick={enviar}>Guardar perfil</button>
      </form>)}
      {errorAutenticacion && (<CajaError texto={errorAutenticacion} />)}
      <p>{resultado}</p>
      {JSON.stringify(datosEdicion)}
    </>
  )
}

export default FormularioPerfil;
