import React from 'react';
import './Contenedor.css';

//Componente principal que envuelve toda la aplicación.
const Contenedor = (props) => {

  return (
    <div className="contenedor_principal">
      {props.children}
    </div>
  )
}

export default Contenedor;