import React from 'react';
import './App.css';
import Pelicula from './components/Pelicula/Pelicula.jsx';
import Interprete from './components/Interprete/Interprete.jsx';
function App() {

  //Ahora hay películas de ejemplo, hay una sin datos para ver como se formatearía
  //Las imágenes se recogen de cataas.com
  return (
    <div className="peliculas">
      <Pelicula facturado="5948.27" titulo="Primera película" direccion={["Director maestro", "Director principiante", "Otro director"]} resumen="La primera película de todas." portada="https://cataas.com/cat/orange">
            <Interprete nombre="Actor principal" biografia="Hace de protagonista de la película." imagen="https://cataas.com/cat/black" />
            <Interprete nombre="Actor secundario" biografia="Otro actor." imagen="https://cataas.com/cat/sleepy" />
            <Interprete nombre="Actor complejo" biografia="Tiene una biografía muy larga y Tiene una biografía muy larga y Tiene una biografía muy larga y Tiene una biografía muy larga y Tiene una biografía muy larga y Tiene una biografía muy larga." imagen="https://cataas.com/cat/computer" />
            <Interprete nombre="Actor de fondo" biografia="No hizo nada." imagen="https://cataas.com/cat/cute" />
      </Pelicula>
      <Pelicula facturado="5674.27" titulo="Segunda película" direccion={["Director principiante", "Director maestro", "Otro director"]} resumen="Esta película es mucho mejor que la anterior y tiene una descripción muy muy muy muy muy muy muy muy muy muy muy muy muy muy muy larga." portada="https://cataas.com/cat/tuxedo">
            <Interprete nombre="Actor secundario" biografia="Otro actor." imagen="https://cataas.com/cat/tired" />
            <Interprete nombre="Actor de fondo" biografia="No hizo nada." imagen="https://cataas.com/cat/sleeping" />
            <Interprete nombre="Actor principal" biografia="Hace de protagonista de la película." imagen="https://cataas.com/cat/outside" />
            <Interprete nombre="Actor complejo" biografia="Tiene una biografía muy larga y Tiene una biografía muy larga y Tiene una biografía muy larga y Tiene una biografía muy larga y Tiene una biografía muy larga y Tiene una biografía muy larga." imagen="https://cataas.com/cat/blanket" />
      </Pelicula>
      <Pelicula >
            <Interprete />
      </Pelicula>



    </div>
  )
}

export default App;
