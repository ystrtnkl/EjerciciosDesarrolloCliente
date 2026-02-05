import React from 'react';
import './Lista.css';
import imgPapelera from '../../assets/eliminar.png';
import imgOjo from '../../assets/ver.png';

//Miniatura de una lista seleccionable.
const MiniLista = (props) => {

  return (
    <div className='minilista'>
      <button className="minilista-boton" id={"ag_" + props.uuid}><img className='minilista-seleccionar' src={imgOjo} alt="Seleccionar" /></button>
      <button className="minilista-boton-borrar" id={"bl_" + props.uuid}><img className='minilista-borrar' src={imgPapelera} alt="Borrar" /></button>
      <span><strong>{props.nombre ?? "Sin nombre"}</strong></span>
    </div>
  )
}

export default MiniLista;