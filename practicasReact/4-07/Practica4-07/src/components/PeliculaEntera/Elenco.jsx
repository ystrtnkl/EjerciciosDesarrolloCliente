import React from 'react';
import './Elenco.css';

//Este componente muestra un grupo de actores (o lo que sea que se le pase como children).
const Elenco = (props) => {

  return (
    <div className="elenco_principal">
      <p><b>Actores:</b></p>
      {props.children}
    </div>
  )
}

export default Elenco;