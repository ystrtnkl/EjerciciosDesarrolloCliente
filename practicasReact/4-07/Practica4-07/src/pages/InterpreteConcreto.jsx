import React from 'react';
import { useParams } from 'react-router-dom';
import peliculasOriginal from '../assets/peliculas.json';
import validaciones from '../libraries/validacionPeliculas.js';
import Interprete from '../components/PeliculaEntera/Interprete.jsx';
//import './InterpreteConcreto.css';

function InterpreteConcreto() {

  const { id } = useParams();
  const interpretes = validaciones.filtrarInterpretesValidos(peliculasOriginal.peliculas);
  const interprete = validaciones.peliculaEsValida(interpretes[id - 1]);

  return (
    <>
        <h2>Esta es la página de la película {id}.</h2>
        
        {interprete ? <Interprete expandido='true' interprete={interprete} /> : "Actor no encontrado."}

    </>
  )
}

export default InterpreteConcreto;
