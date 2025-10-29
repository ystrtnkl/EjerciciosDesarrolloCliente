import React from 'react';
import { useParams } from 'react-router-dom';
import peliculasOriginal from '../assets/peliculas.json';
import validaciones from '../libraries/validacionPeliculas.js';
import Interprete from '../components/PeliculaEntera/Interprete.jsx';

//Página para ver un intérprete concreto (especificando su id en la url).
function InterpreteConcreto() {

  const { id } = useParams();
  const interpretes = validaciones.filtrarInterpretesValidos(peliculasOriginal.peliculas);
  const interprete = interpretes[id - 1];

  return (
    <>
      <h2>Esta es la página del actor {id}.</h2>
      {interprete ? <Interprete expandido='true' interprete={interprete} /> : "Actor no encontrado."}

    </>
  )
}

export default InterpreteConcreto;
