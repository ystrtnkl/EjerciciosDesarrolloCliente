import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSesion from '../hooks/useSesion.js';
import GestorListas from '../components/Gestor/GestorListas.jsx';

//Esta página será exclusiva para usuarios con la sesión iniciada.
function Gestor() {

  const navegar = useNavigate();
  const { sesionIniciada, usuarioSesion } = useSesion();
  useEffect(() => {
    //Si no ha iniciado sesión redirige inmediatamente a login.
    if (!sesionIniciada) navegar("/login");
  }, []);

  return (
    <>
        <h2>Gestor de listas de la compra</h2>
        {sesionIniciada && (<GestorListas usuario={usuarioSesion?.user} />)}
    </>
  )
}

export default Gestor;
