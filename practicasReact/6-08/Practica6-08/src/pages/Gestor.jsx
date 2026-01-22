import React from 'react';
import useSesion from '../hooks/useSesion.js';
import GestorListas from '../components/Gestor/GestorListas.jsx';

//Pagina que carga el gestor principal.
function Gestor() {

  const { sesionIniciada, usuarioSesion } = useSesion();

  return (
    <>
      <h2>Gestor de listas de la compra</h2>
      <GestorListas usuario={usuarioSesion?.user} logeado={sesionIniciada} />
    </>
  )
}

export default Gestor;
