import React from 'react';
import './Contenedor.css';

//Este componente muestra un grupo de actores (o lo que sea que se le pase como children)
const Contenedor = (props) => {

  return (
    <div className="contenedor_principal">
        <p><b>Actores:</b></p>
        {props.children}
    </div>
  )
}

export default Contenedor;