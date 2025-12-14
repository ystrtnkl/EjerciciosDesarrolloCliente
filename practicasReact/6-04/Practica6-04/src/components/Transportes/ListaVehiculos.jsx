import React from 'react';
import cargando from '../../assets/cargando.gif';
import Vehiculo from './Vehiculo.jsx';

function ListaVehiculos(props) {

  return (
    <div className="lista-pilotables-normal">
      {props.vehiculos.length
        ? (props.vehiculos.map((vehiculo, i) => {
          if ((props.limitado && i < props.limitado) || !props.limitado) {
            return (<Vehiculo key={vehiculo.id ?? i} vehiculo={vehiculo} />);
          }
        }))
        : (<img className="cargando" src={cargando} alt="Cargando..." />)}
    </div>
  )
}

export default ListaVehiculos;
