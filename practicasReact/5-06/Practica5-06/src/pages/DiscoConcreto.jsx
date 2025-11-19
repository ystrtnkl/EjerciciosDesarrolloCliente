import React from 'react';
import ListaDiscos from '../components/Discos/ListaDiscos.jsx';
import { useParams } from 'react-router-dom';
import { getDisco } from '../libraries/persistencia.js';

function DiscoConcreto() {

  const { localizacion } = useParams();
  //const disco = getDisco(localizacion);

  return (
    <>
        <ListaDiscos getDiscosOriginales={() => {return getDisco(localizacion) ? [getDisco(localizacion)] : []}} filtros={false} />
    </>
  )
}

export default DiscoConcreto;