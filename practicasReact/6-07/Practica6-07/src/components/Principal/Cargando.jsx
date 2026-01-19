import React from 'react';
import imgCargando from '../../assets/cargando.gif';

//Componente con el logo de cargando
function Cargando() {

  return (
    <>
       <img className="cargando" src={imgCargando} alt="Cargando..." />
    </>
  )
}

export default Cargando;
