import React from 'react';
import ListaDiscos from '../components/Discos/ListaDiscos.jsx';
import { getTodosLosDiscos } from '../libraries/persistencia.js';

//Página donde se mostrará la lista de discos completa y con filtros.
function ListarDisco() {

  return (
    <>
      <h2>Lista de discos.</h2>
      <ListaDiscos getDiscosOriginales={getTodosLosDiscos} filtros={true} />
    </>
  )
}

export default ListarDisco;
