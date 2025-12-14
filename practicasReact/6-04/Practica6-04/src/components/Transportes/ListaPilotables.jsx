import { React, useState } from 'react';
import './ListaPilotables.css';
import { traerMultiplesDatos } from '../../libraries/traerDatos.js';
import ListaNaves from './ListaNaves.jsx';
import ListaVehiculos from './ListaVehiculos.jsx';


function ListaPilotables(props) {

  const [mostrando, setMostrando] = useState(false);
  const [listaNaves, setListaNaves] = useState([]);
  const [listaVehiculos, setListaVehiculos] = useState([]);

  const traerVehiculos = async () => {
    setListaVehiculos(await traerMultiplesDatos(props.listaVehiculos));
  }
  const traerNaves = async () => {
    setListaNaves(await traerMultiplesDatos(props.listaNaves));
  }

  const cambiarMostrando = () => {
    setMostrando(!mostrando);
    props.listaNaves.length && traerNaves();
    props.listaVehiculos.length && traerVehiculos();
  }

  return (
    <div className="lista-pilotables">
      <button className={mostrando ? "boton-activado" : "boton-desactivado"} onClick={cambiarMostrando}>Pilota</button>
      {mostrando && (<div className="naves-vehiculos">
        <span>
          <h3>Naves del personaje</h3>
          {listaNaves.length
            ? (<ListaNaves naves={listaNaves} />)
            : (<p>No se han encontrado naves para este personaje</p>)}
        </span>
        <span>
          <h3>Vehículos del personaje</h3>
          {listaVehiculos.length
            ? (<ListaVehiculos vehiculos={listaVehiculos} />)
            : (<p>No se han encontrado vehículos para este personaje</p>)}
        </span>
      </div>)}
    </div>
  )
}

export default ListaPilotables;
