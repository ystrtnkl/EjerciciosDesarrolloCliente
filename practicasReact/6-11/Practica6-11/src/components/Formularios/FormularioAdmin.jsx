import React, { useState, useEffect } from 'react';
import useSesion from '../../hooks/useSesion.js';
import Cargando from '../Principal/Cargando.jsx';
import InputBasico from './InputBasico.jsx';
import { manejadorInput } from '../../libraries/manejadorInput.js';
import CajaError from '../Principal/CajaError.jsx';
import { useNavigate } from 'react-router-dom';
import { validarCorreo } from '../../libraries/validaciones.js';

function FormularioAdmin() {

  const [datos, setDatos] = useState({correo: ""});
  const { errorAutenticacion, cargandoAutenticacion, cambiarAdmin, soyAdmin } = useSesion();
  const navegar = useNavigate();

  const enviar = async (e) => {
    e.preventDefault();
    
    const resultado = await cambiarAdmin(datos);

  }


  useEffect(() => {
    if (!soyAdmin) navegar("/");
  }, [])

  return (
    <>
      <form onChange={(e) => { manejadorInput(e, setDatos, datos) }}>
        <InputBasico nombre="correo" titulo="Correo electrónico:" tipo="text" valor={datos.correo} validador={validarCorreo} mensajeError="Introduce un correo válido" />
        <button onClick={enviar}>Convertir en administrador</button>
      </form>
      {cargandoAutenticacion && (<Cargando />)}
      {errorAutenticacion && (<CajaError texto={errorAutenticacion} />)}
    </>
  )
}

export default FormularioAdmin;
