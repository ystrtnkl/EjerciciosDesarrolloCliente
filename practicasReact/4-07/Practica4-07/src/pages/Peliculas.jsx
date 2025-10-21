import React from 'react';
import peliculasOriginal from '../assets/peliculas.json';
import Pelicula from '../components/PeliculaEntera/Pelicula.jsx';
import Interprete from '../components/PeliculaEntera/Interprete.jsx';
import validaciones from '../libraries/validacionPeliculas.js'
//import './Peliculas.css';

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
        

        {/*<Pelicula facturado="5948.27" titulo="Primera película" direccion={["Director maestro", "Director principiante", "Otro director"]} resumen="La primera película de todas." portada="https://cataas.com/cat/orange">
            <Interprete nombre="Actor principal" biografia="Hace de protagonista de la película." imagen="https://cataas.com/cat/black" />
            <Interprete nombre="Actor secundario" biografia="Otro actor." imagen="https://cataas.com/cat/sleepy" />
            <Interprete nombre="Actor complejo" biografia="Tiene una biografía muy larga y Tiene una biografía muy larga y Tiene una biografía muy larga y Tiene una biografía muy larga y Tiene una biografía muy larga y Tiene una biografía muy larga." imagen="https://cataas.com/cat/computer" />
            <Interprete nombre="Actor de fondo" biografia="No hizo nada." imagen="https://cataas.com/cat/cute" />
        </Pelicula>*/}
    </>
  )
}

export default Peliculas;
