import React, { useState } from 'react';
import useSesion from '../../hooks/useSesion.js';
import Cargando from '../Principal/Cargando.jsx';
import InputBasico from './InputBasico.jsx';
import { manejadorInput } from '../../libraries/manejadorInput.js';
import { validarContrasegna, validarCorreo, validarNombreUsuario } from '../../libraries/validaciones.js';
import CajaError from '../Principal/CajaError.jsx';

//Formulario para registrarse con un usuario nuevo.
function FormularioRegister() {

  //Se necesita el nombre, el correo (que luego se verifica) y la contraseña (2 veces por si acaso).
  const datosOriginales = { correo: "", contrasegna: "", contrasegna2: "", nombre: "", verContrasegna: false }
  const [datosAutenticacion, setDatosAutenticacion] = useState(datosOriginales);
  const { crearCuenta, errorAutenticacion, cargandoAutenticacion } = useSesion();

  //Valida los datos antes de enviar, aunque también se validan cada vez que cambian.
  const validar = () => {
    return datosAutenticacion.contrasegna === datosAutenticacion.contrasegna2
      && validarContrasegna(datosAutenticacion.contrasegna)
      && validarCorreo(datosAutenticacion.correo)
      && validarNombreUsuario(datosAutenticacion.nombre);
  }

  const enviar = async (e) => {
    e.preventDefault();
    if (validar()) {
      //Si falla, muestra el error, si tiene éxito pide al usuario que mire su correo para confirmarlo (y de momento no hace nada más).
      await crearCuenta(datosAutenticacion.nombre, datosAutenticacion.correo, datosAutenticacion.contrasegna);
    }
  }

  return (
    <>
      <form onChange={(e) => { manejadorInput(e, setDatosAutenticacion, datosAutenticacion) }}>
        <InputBasico nombre="nombre" titulo="Tu nombre:" tipo="text" valor={datosAutenticacion.nombre} validador={validarNombreUsuario} mensajeError="El nombre debe tener entre 4 y 20 carácteres" />
        <InputBasico nombre="correo" titulo="Correo electrónico:" tipo="text" valor={datosAutenticacion.correo} validador={validarCorreo} mensajeError="Introduce un correo válido" />
        <InputBasico nombre="contrasegna" titulo="Contraseña:" tipo={datosAutenticacion.verContrasegna ? "text" : "password"} valor={datosAutenticacion.contrasegna} validador={validarContrasegna} mensajeError="La contraseña debe tener entre 8 y 32 carácteres, una mayúscula, una minúscula, un número y un símbolo." />
        <InputBasico nombre="contrasegna2" titulo="Contraseña otra vez:" tipo={datosAutenticacion.verContrasegna ? "text" : "password"} valor={datosAutenticacion.contrasegna2} validador={(e) => { return e === datosAutenticacion.contrasegna }} mensajeError="Ambas contraseñas deben de ser iguales." />
        <InputBasico nombre="verContrasegna" titulo="Ver contraseña" tipo="checkbox" estaChecked={datosAutenticacion.verContrasegna} />
        <button onClick={enviar}>Crear cuenta</button>
      </form>
      {cargandoAutenticacion && (<Cargando />)}
      {errorAutenticacion && (<CajaError texto={errorAutenticacion} />)}
    </>
  )
}

export default FormularioRegister;
