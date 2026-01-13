import React from 'react';
import ListaDiscos from '../components/Discos/ListaDiscos.jsx';
import useDiscos from '../hooks/useDiscos.js';
import imgCargando from '../assets/cargando.gif';

//Página donde se mostrará la lista de discos completa y con filtros.
function ListarDisco() {

  const { borrarDisco, error, cargando, discosCargados } = useDiscos();

  return (
    <>
      <h2>Lista de discos.</h2>
      {cargando ? (<img src={imgCargando} alt="Cargando..." />) : (error ? (<p>Ha habido un error o no se han encontrado discos</p>) : (<ListaDiscos borrarDisco={borrarDisco} discosCargados={discosCargados} filtros={true} />))}
    </>
  )
}

export default ListarDisco;
