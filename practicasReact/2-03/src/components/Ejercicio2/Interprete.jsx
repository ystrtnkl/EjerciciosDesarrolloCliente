import React from 'react';
import './Interprete.css';

//Este componente representa un intérprete (actor) de una película
const Interprete = (props) => {
  //En el ejercicio se pide que la biografía del intérprete se pase mediante children, pero ha sido mejor usar props ya que colisionaría con el children usado en Contenedor
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