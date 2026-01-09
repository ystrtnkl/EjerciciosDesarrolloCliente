import React, { useContext } from 'react';
import ListaDiscos from '../components/Discos/ListaDiscos.jsx';
import { ContextoDiscos } from '../contexts/ProveedorDiscos.jsx';

//Página donde se mostrará la lista de discos completa y con filtros.
function ListarDisco() {

  const { getTodosLosDiscos } = useContext(ContextoDiscos);

  return (
    <>
      <h2>Lista de discos.</h2>
      <ListaDiscos getDiscosOriginales={getTodosLosDiscos} filtros={true} />
    </>
  )
}

export default ListarDisco;
