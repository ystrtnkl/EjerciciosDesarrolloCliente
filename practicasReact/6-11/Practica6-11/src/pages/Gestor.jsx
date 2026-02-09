import React from 'react';
import GestorListas from '../components/Gestor/GestorListas.jsx';

//Pagina que carga el gestor principal.
function Gestor() {

  return (
    <>
      <h2>Gestor de listas de la compra</h2>
      {/*El componente siguiente debe saber ciertos datos sobre la sesión y el usuario (sobre el usuario ya que desde aquí se administrarán sus listas, y sobre la sesión para sabe que mostrar y que no).*/}
      <GestorListas />
    </>
  )
}

export default Gestor;
