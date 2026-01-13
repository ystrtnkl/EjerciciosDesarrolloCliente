import React from 'react';
import ListaDiscos from '../components/Discos/ListaDiscos.jsx';
import useDiscos from '../hooks/useDiscos.js';
import imgCargando from '../assets/cargando.gif';
import { getError } from '../libraries/traducir.js';

//Página donde se mostrará la lista de discos completa y con filtros.
function ListarDisco() {

  const { borrarDisco, error, cargando, discosCargados } = useDiscos(); //Usa el hook intermedio para el contexto de discos para apropiarse de los estados.

  return (
    <>
      <h2>Lista de discos.</h2>
      {/*Se envian al listado los discos del estado que devuelve useDiscos, que de primeras son todos*/}
      {cargando ? (<img src={imgCargando} alt="Cargando..." />) : (error ? (<p>{getError("es", "errorDiscosNinguno")}</p>) : (<ListaDiscos borrarDisco={borrarDisco} discosCargados={discosCargados} filtros={true} />))}
    </>
  )
}

export default ListarDisco;
