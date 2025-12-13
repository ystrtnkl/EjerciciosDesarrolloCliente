import React from 'react';
import cargando from '../../assets/cargando.gif';
import Nave from './Nave.jsx';

function ListaNaves(props) {

  return (
    <div className="lista-naves">
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
