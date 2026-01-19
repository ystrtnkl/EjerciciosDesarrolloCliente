import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSesion from '../hooks/useSesion.js';
import GestorListas from '../components/Gestor/GestorListas.jsx';

function Gestor() {

  const navegar = useNavigate();
  const { sesionIniciada } = useSesion();
  useEffect(() => {
    if (!sesionIniciada) navegar("/login");
  }, []);

  return (
    <>
        <h2>Gestor de listas de la compra</h2>
        {sesionIniciada && (<GestorListas />)}
    </>
  )
}

export default Gestor;
