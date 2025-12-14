import { React, useState } from 'react';
import './ListaPilotables.css';
import { traerMultiplesDatos } from '../../libraries/traerDatos.js';
import ListaNaves from './ListaNaves.jsx';
import ListaVehiculos from './ListaVehiculos.jsx';

//Componente para listar ambos naves y vehículos, útil al ponerlo en un personaje para ver que vehículos/naves pilota.
function ListaPilotables(props) { //Necesita dos arrays de endpoints: vehiulos y naves.

  const [mostrando, setMostrando] = useState(false); //Para saber si se están mostrando.
  //Lista de ambos objetos a listar.
  const [listaNaves, setListaNaves] = useState([]);
  const [listaVehiculos, setListaVehiculos] = useState([]);
  //Funciones para consultar la API para recibir tanto las naves como los vehículos.
  const traerVehiculos = async () => {
    setListaVehiculos(await traerMultiplesDatos(props.listaVehiculos));
  }
  const traerNaves = async () => {
    setListaNaves(await traerMultiplesDatos(props.listaNaves));
  }
  //Función para cambiar si se muestran o no, la primera vez será cuando se descarguen los datos.
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
