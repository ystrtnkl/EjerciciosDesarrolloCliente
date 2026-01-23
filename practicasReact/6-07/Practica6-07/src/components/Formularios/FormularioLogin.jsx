import React, { useState } from 'react';
import useSesion from '../../hooks/useSesion.js';
import Cargando from '../Principal/Cargando.jsx';
import InputBasico from './InputBasico.jsx';
import { manejadorInput } from '../../libraries/manejadorInput.js';

//Formulario de login.
function FormularioLogin() {

  //Para iniciar sesión pide tanto el correo como la contraseña.
  const datosOriginales = { correo: "", contrasegna: "", verContrasegna: false }
  const [datosAutenticacion, setDatosAutenticacion] = useState(datosOriginales);
  const { iniciarSesion, errorAutenticacion, cargandoAutenticacion } = useSesion();

  const enviar = async (e) => {
    e.preventDefault();
    //Si falla, muestra el error, si tiene éxito, establece la sesión y redirige a la parte privada.
    await iniciarSesion(datosAutenticacion.correo, datosAutenticacion.contrasegna);
  }

  return (
    <>
      <form onChange={(e) => { manejadorInput(e, setDatosAutenticacion, datosAutenticacion) }}>
        <InputBasico nombre="correo" titulo="Correo electrónico:" tipo="text" valor={datosAutenticacion.correo} />
        <InputBasico nombre="contrasegna" titulo="Contraseña:" tipo={datosAutenticacion.verContrasegna ? "text" : "password"} valor={datosAutenticacion.contrasegna} />
        <InputBasico nombre="verContrasegna" titulo="Ver contraseña" tipo="checkbox" estaChecked={datosAutenticacion.verContrasegna} />
        <button onClick={enviar}>Iniciar sesión</button>
      </form>
      {cargandoAutenticacion && (<Cargando />)}
      {errorAutenticacion && <p className="error">{errorAutenticacion}</p>}
    </>
  )
}

export default FormularioLogin;
