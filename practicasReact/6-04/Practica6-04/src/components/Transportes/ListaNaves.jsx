import React from 'react';
import cargando from '../../assets/cargando.gif';
import Nave from './Nave.jsx';

//Componente que lista las naves pasadas por props, similar a ListaPersonajes.
function ListaNaves(props) {

  return (
    <div className="lista-pilotables-normal">
      {props.naves.length
        ? (props.naves.map((nave, i) => {
          if ((props.limitado && i < props.limitado) || !props.limitado) {
            return (<Nave key={nave.id ?? i} nave={nave} />);
          }
        }))
        : (<img className="cargando" src={cargando} alt="Cargando..." />)}
    </div>
  )
}

export default ListaNaves;
