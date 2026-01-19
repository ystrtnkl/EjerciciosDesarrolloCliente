import React, { useState } from 'react';
import useSesion from '../../hooks/useSesion.js';
import Cargando from '../Principal/Cargando.jsx';
import InputBasico from './InputBasico.jsx';
import { manejadorInput } from '../../libraries/manejadorInput.js';

function FormularioLogin() {

    const datosOriginales = {correo: "", contrasegna: "", verContrasegna: false}
    const [datosAutenticacion, setDatosAutenticacion] = useState(datosOriginales);
    const { iniciarSesion, error, cargando } = useSesion();


    const enviar = async (e) => {
        e.preventDefault();



    }

  return (
    <>
        <form onChange={(e) => {manejadorInput(e, setDatosAutenticacion, datosAutenticacion)}}>
            <InputBasico nombre="correo" titulo="Correo electrónico:" tipo="text" valor={datosAutenticacion.correo} />
            <InputBasico nombre="contrasegna" titulo="Contraseña:" tipo={datosAutenticacion.verContrasegna ? "text" : "password"} valor={datosAutenticacion.contrasegna} />
            <InputBasico nombre="verContrasegna" titulo="Ver contraseña" tipo="checkbox" estaChecked={datosAutenticacion.verContrasegna} />
            <button onClick={enviar}>Iniciar sesión</button>
        </form>
        {cargando && (<Cargando />)}
        {error && <p className="error">{error}</p>}
    </>
  )
}

export default FormularioLogin;
