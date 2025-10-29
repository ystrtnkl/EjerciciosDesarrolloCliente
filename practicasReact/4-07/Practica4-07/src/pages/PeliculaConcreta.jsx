import React from 'react';
import { useParams } from 'react-router-dom';
import peliculasOriginal from '../assets/peliculas.json';
import PeliculaDetalle from '../components/PeliculaEntera/PeliculaDetalle';
import validaciones from '../libraries/validacionPeliculas.js';
import Interprete from '../components/PeliculaEntera/Interprete.jsx';

//Página para ver los datos de una película en concreto (especificando su id en la url).
function PeliculaConcreta() {

  const { id } = useParams();
  const peliculas = validaciones.filtrarPeliculasValidas(peliculasOriginal.peliculas);
  const pelicula = validaciones.peliculaEsValida(peliculas[id - 1]);

  return (
    <>
      <h2>Esta es la página de la película {id}.</h2>
      {pelicula ? <PeliculaDetalle pelicula={pelicula} expandido='true'>
        {pelicula.interpretes.map((e, i) => {
          return (
            <Interprete key={i} interprete={e} />
          )
        }) ?? "Sin intérpretes"}
      </PeliculaDetalle> : "Película no encontrada"}

    </>
  )
}

export default PeliculaConcreta;
