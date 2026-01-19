import React, { useState } from 'react';
import useSesion from '../../hooks/useSesion.js';
import Cargando from '../Principal/Cargando.jsx';
import InputBasico from './InputBasico.jsx';
import { manejadorInput } from '../../libraries/manejadorInput.js';
import { validarContrasegna, validarCorreo, validarNombreUsuario } from '../../libraries/validaciones.js';

function FormularioRegister() {

    const datosOriginales = {correo: "", contrasegna: "", contrasegna2: "", nombre: "", verContrasegna: false}
    const [datosAutenticacion, setDatosAutenticacion] = useState(datosOriginales);
    const { crearCuenta, error, cargando } = useSesion();

    const validar = () => {
      return datosAutenticacion.contrasegna === datosAutenticacion.contrasegna2
        && validarContrasegna(datosAutenticacion.contrasegna)
        && validarCorreo(datosAutenticacion.correo)
        && validarNombreUsuario(datosAutenticacion.nombre);
    }

    const enviar = async (e) => {
        e.preventDefault();
        if (validar()) {
          
        }


    }

  return (
    <>
        <form onChange={(e) => {manejadorInput(e, setDatosAutenticacion, datosAutenticacion)}}>
            <InputBasico nombre="nombre" titulo="Tu nombre:" tipo="text" valor={datosAutenticacion.nombre} validador={validarNombreUsuario} mensajeError="El nombre debe tener entre 4 y 20 carácteres" />
            <InputBasico nombre="correo" titulo="Correo electrónico:" tipo="text" valor={datosAutenticacion.correo} validador={validarCorreo} mensajeError="Introduce un correo válido" />
            <InputBasico nombre="contrasegna" titulo="Contraseña:" tipo={datosAutenticacion.verContrasegna ? "text" : "password"} valor={datosAutenticacion.contrasegna} validador={validarContrasegna} mensajeError="La contraseña debe tener entre 8 y 32 carácteres, una mayúscula, una minúscula, un número y un símbolo." />
            <InputBasico nombre="contrasegna2" titulo="Contraseña:" tipo={datosAutenticacion.verContrasegna ? "text" : "password"} valor={datosAutenticacion.contrasegna2} validador={(e) => {return e === datosAutenticacion.contrasegna}} mensajeError="Ambas contraseñas deben de ser iguales." />
            <InputBasico nombre="verContrasegna" titulo="Ver contraseña" tipo="checkbox" estaChecked={datosAutenticacion.verContrasegna} />
            <button onClick={enviar}>Crear cuenta</button>
        </form>
        {cargando && (<Cargando />)}
        {error && <p className="error">{error}</p>}
    </>
  )
}

export default FormularioRegister;
