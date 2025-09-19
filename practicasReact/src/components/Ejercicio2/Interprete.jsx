import React from 'react';
import './Interprete.css';

const Interprete = (props) => {

  return (
    <div className="interprete_principal">
        <div className="interprete_foto"><img src={props.imagen} /></div>
        <div>
            <h3 className="interprete_nombre">{props.nombre}</h3>
            <p className="interprete_biografia">{props.biografia}</p>
        </div>
    </div>
  )
}
       
export default Interprete;