import React from 'react';
import peliculasOriginal from '../assets/peliculas.json';
import Pelicula from '../components/PeliculaEntera/Pelicula.jsx';
import Interprete from '../../../../4-05/Practica4-05/src/components/Interprete/Interprete.jsx';
//import './Peliculas.css';

function Peliculas() {
  
  

  const filtrarCorrectos = (listaPeliculas) => {
    
      return [...listaPeliculas];
  }

  const peliculas = filtrarCorrectos(peliculasOriginal.peliculas);


  return (
    <>
        <h2>Esta es la página de Peliculas.</h2>
        <p>Aquí puedes ver todas las películas a la vez.</p>
        
        {peliculas.length === 0 ? "Sin películas" : peliculas.map((e, i) => {
          return (
            <Pelicula key={i} pelicula={e}>
              {e.interpretes.map((e, i) => {
                return (
                  <Interprete key={i} interprete={e} />
                )
              })}
            </Pelicula>
          );
        })}
        

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
