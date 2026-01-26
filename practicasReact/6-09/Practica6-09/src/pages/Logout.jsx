import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSesion from '../hooks/useSesion.js';
import Cargando from '../components/Principal/Cargando.jsx';

//Esta página no tiene contenido realmente.
function Logout() {

  const { cerrarSesion } = useSesion();
  const navegar = useNavigate();
  //En su lugar cierra la sesión y redirige al inicio, inmediatamente.
  const cerrarSesionAsincrono = async () => {
    await cerrarSesion();
    navegar("/");
  }
  useEffect(() => {
    cerrarSesionAsincrono();
  }, []);

  return (
    <>
      <Cargando />
    </>
  )
}

export default Logout;
