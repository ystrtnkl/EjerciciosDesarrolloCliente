import React from 'react';
import peliculasOriginal from '../assets/peliculas.json';
import Pelicula from '../components/PeliculaEntera/Pelicula.jsx';
import Interprete from '../components/PeliculaEntera/Interprete.jsx';
import validaciones from '../libraries/validacionPeliculas.js'

//Página para ver todas las películas, en formato reducido pero ampliable.
function Peliculas() {

  const peliculas = validaciones.filtrarPeliculasValidas(peliculasOriginal.peliculas);


  return (
    <>
      <h2>Esta es la página de Peliculas.</h2>
      <p>Aquí puedes ver todas las películas a la vez.</p>
      <div className="lista-peliculas">
        {peliculas.length === 0 ? "Sin películas" : peliculas.map((e, i) => {
          return (
            <Pelicula key={i} pelicula={e}>
              {e.interpretes.map((e, i) => {
                return (
                  <Interprete key={i} interprete={e} />
                )
              }) ?? "Sin intérpretes"}
            </Pelicula>
          );
        })}
      </div>
    </>
  )
}

export default Peliculas;
