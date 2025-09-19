import React from 'react';
import './App.css';
import Pelicula from './components/Ejercicio3/Pelicula.jsx';
import Interprete from './components/Ejercicio2/Interprete.jsx';

function App() {

  return (
    <>
      <Pelicula titulo="hola" direccion={["uno", "dos", "tres"]} resumen="resumen de la pelicula" portada="https://placecats.com/louie/100/100">
            <Interprete nombre="Item 1" biografia="Biografía de ejemplo para el item 1Biografía de ejemplo para el item 4Biografía de ejemplo para el item 4Biografía de ejemplo para el item 4Biografía de ejemplo para el item 4Biografía de ejemplo para el item 4Biografía de ejemplo para el item 4Biografía de ejemplo para el item 4Biografía de ejemplo para el item 4Biografía de ejemplo para el item 4" imagen="https://placecats.com/neo/100/200" />
            <Interprete nombre="Item 2" biografia="Biografía de ejemplo para el item 2" imagen="https://placecats.com/millie/100/100" />
            <Interprete nombre="Item 3" biografia="Biografía de ejemplo para el item 3" imagen="https://placecats.com/bella/100/100" />
            <Interprete nombre="Item 4" biografia="Biografía de ejemplo para el item 4" imagen="https://placecats.com/poppy/100/100" />
      </Pelicula>
      <Pelicula titulo="hola" direccion={["uno", "dos", "tres"]} resumen="resumen de la pelicula Biografía de ejemplo para el item 4Biografía de ejemplo para el item 4Biografía de ejemplo para el item 4Biografía de ejemplo para el item 4Biografía de ejemplo para el item 4Biografía de ejemplo para el item 4Biografía de ejemplo para eBiografía de ejemplo para el item 4Biografía de ejemplo para el item 4Biografía de ejemplo para el item 4Biografía de ejemplo para el item 4Biografía de ejemplo para el item 4Biografía de ejemplo para el item 4Biografía de ejemplo para eBiografía de ejemplo para el item 4Biografía de ejemplo para el item 4Biografía de ejemplo para el item 4Biografía de ejemplo para el item 4Biografía de ejemplo para el item 4Biografía de ejemplo para el item 4Biografía de ejemplo para e" portada="https://placecats.com/louie/100/200">
            <Interprete nombre="Item 1" biografia="Biografía de ejemplo para el item 1" imagen="https://placecats.com/neo/100/100" />
            <Interprete nombre="Item 2" biografia="Biografía de ejemplo para el item 2" imagen="https://placecats.com/millie/100/100" />
            <Interprete nombre="Item 3" biografia="Biografía de ejemplo para el item 3" imagen="https://placecats.com/bella/100/100" />
            <Interprete nombre="Item 4" biografia="Biografía de ejemplo para el item 4" imagen="https://placecats.com/poppy/100/100" />
      </Pelicula>
    </>
  )
}

export default App
