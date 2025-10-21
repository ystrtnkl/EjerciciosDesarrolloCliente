import React from 'react';
import './MuestraPortada.css';
import BotonFiltrado from '../Botones/BotonFiltrado';

//Este componente representa una película entera con sus datos, está reciclado de otro ejercicio.
const MuestraPortada = (props) => {

    

  return (
    <div>
        <img src={props.urlPortada} alt="" />
    </div>
  )
}
       
export default MuestraPortada;
