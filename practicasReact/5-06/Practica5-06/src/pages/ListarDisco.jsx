import React, {useEffect, useState} from 'react';
import ListaDiscos from '../components/Discos/ListaDiscos.jsx';
import { getTodosLosDiscos } from '../libraries/persistencia.js';

function ListarDisco() {

  //const [discos, setDiscos] = useState([]);

  /*useEffect(() => {
    setDiscos(getTodosLosDiscos());

  }, []);*/

  const discos = getTodosLosDiscos();


  return (
    <>
        <h2>Lista de discos.</h2>
        <ListaDiscos discos={discos} />
    </>
  )
}

export default ListarDisco;
