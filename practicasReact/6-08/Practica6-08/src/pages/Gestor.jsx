import React from 'react';
import useSesion from '../hooks/useSesion.js';
import GestorListas from '../components/Gestor/GestorListas.jsx';

//Pagina que carga el gestor principal.
function Gestor() {

  const { sesionIniciada, usuarioSesion } = useSesion();

  return (
    <>
      <h2>Gestor de listas de la compra</h2>
      {/*El componente siguiente debe saber ciertos datos sobre la sesión y el usuario (sobre el usuario ya que desde aquí se administrarán sus listas, y sobre la sesión para sabe que mostrar y que no).*/}
      <GestorListas usuario={usuarioSesion?.user} logeado={sesionIniciada} />
    </>
  )
}

export default Gestor;
