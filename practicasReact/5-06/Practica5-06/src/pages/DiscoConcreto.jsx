import React from 'react';
import Disco from '../components/Discos/Disco';
import { useParams } from 'react-router-dom';
import { getDisco } from '../libraries/persistencia.js';

function DiscoConcreto() {

  const { localizacion } = useParams();
  const disco = getDisco(localizacion);

  return (
    <>
        <Disco disco={disco}/>
    </>
  )
}

export default DiscoConcreto;
