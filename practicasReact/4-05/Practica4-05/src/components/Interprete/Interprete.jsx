import React from 'react';
import './Interprete.css';

//Este componente representa un intérprete (actor) de una película, está reciclado de otro ejercicio.
const Interprete = (props) => {

  return (
    <div className="interprete_principal">
        <div className="interprete_foto"><img src={props.imagen ?? ""} /></div>
        <div>
            <h3 className="interprete_nombre">{props.nombre ?? "Sin nombre"}</h3>
            <p className="interprete_biografia">{props.biografia ?? "Sin biografía"}</p>
        </div>
    </div>
  )
}
       
export default Interprete;