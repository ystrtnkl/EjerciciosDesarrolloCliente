import React from 'react';
import './Interprete.css';

//Este componente representa un intérprete (actor) de una película, está reciclado de otro ejercicio.
const Interprete = (props) => {

  const { id, nombre, biografia, urlImagen } = props.interprete;

  return (
    <div className="interprete_principal">
        <div className="interprete_foto"><img src={urlImagen ?? "#"} /></div>
        <div>
            <h3 className="interprete_nombre">{nombre ?? "Sin nombre"}</h3>
            <p className="interprete_biografia">{biografia ?? "Sin biografía"}</p>
            <p>ID Interno: {id ?? 0}</p>
        </div>
    </div>
  )
}
       
export default Interprete;