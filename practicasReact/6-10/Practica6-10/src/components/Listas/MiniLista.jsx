import React from 'react';
import './Lista.css';

//Miniatura de una lista
const MiniLista = (props) => {

  return (
    <div className='minilista'>
      <button className="minilista-boton" id={"ag_" + props.uuid}><strong>{props.nombre ?? "Sin nombre"}</strong></button>
      <button>borrar</button>
    </div>
  )
}

export default MiniLista;