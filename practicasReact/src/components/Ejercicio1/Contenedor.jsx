import React from 'react';
import './Contenedor.css';

const Contenedor = (props) => {

  return (
    <div className="contenedor_principal">
        <p><b>Actores:</b></p>
        {props.children}
    </div>
  )
}

export default Contenedor;