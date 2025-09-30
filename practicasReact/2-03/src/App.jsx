import React from 'react';
import './App.css';
import Pelicula from './components/Ejercicio3/Pelicula.jsx';
import Interprete from './components/Ejercicio2/Interprete.jsx';

function App() {
  //Ahora mismo esta app está esneñando datos de ejemplo para dos películas
  //Cada película además tiene tres agentes en dirección y cuatro intérpretes (actores)
  //Las imágenes se recogen de cataas.com
  return (
    <>
      <Pelicula titulo="Primera película" direccion={["Director maestro", "Director principiante", "Otro director"]} resumen="La primera película de todas." portada="https://cataas.com/cat/orange">
            <Interprete nombre="Actor principal" biografia="Hace de protagonista de la película." imagen="https://cataas.com/cat/black" />
            <Interprete nombre="Actor secundario" biografia="Otro actor." imagen="https://cataas.com/cat/sleepy" />
            <Interprete nombre="Actor complejo" biografia="Tiene una biografía muy larga y Tiene una biografía muy larga y Tiene una biografía muy larga y Tiene una biografía muy larga y Tiene una biografía muy larga y Tiene una biografía muy larga." imagen="https://cataas.com/cat/computer" />
            <Interprete nombre="Actor de fondo" biografia="No hizo nada." imagen="https://cataas.com/cat/cute" />
      </Pelicula>
      <Pelicula titulo="Segunda película" direccion={["Director principiante", "Director maestro", "Otro director"]} resumen="Esta película es mucho mejor que la anterior y tiene una descripción muy muy muy muy muy muy muy muy muy muy muy muy muy muy muy larga." portada="https://cataas.com/cat/tuxedo">
            <Interprete nombre="Actor secundario" biografia="Otro actor." imagen="https://cataas.com/cat/tired" />
            <Interprete nombre="Actor de fondo" biografia="No hizo nada." imagen="https://cataas.com/cat/sleeping" />
            <Interprete nombre="Actor principal" biografia="Hace de protagonista de la película." imagen="https://cataas.com/cat/outside" />
            <Interprete nombre="Actor complejo" biografia="Tiene una biografía muy larga y Tiene una biografía muy larga y Tiene una biografía muy larga y Tiene una biografía muy larga y Tiene una biografía muy larga y Tiene una biografía muy larga." imagen="https://cataas.com/cat/blanket" />
      </Pelicula>
    </>
  )
}

export default App
