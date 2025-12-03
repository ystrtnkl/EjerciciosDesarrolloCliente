import React from 'react';

//Página de inicio de la aplicación, accesible desde / y desde /inicio.
function Inicio() {

  return (
    <>
      <h2>Esta es la página de Inicio.</h2>
      <p>Realmente no hay mucho que mostrar en la página de inicio, prueba a navegar con la barra de navegación.</p>
      <p>Con esta aplicación puedes ver los los protagonistas y las películas de Star Wars.</p>
      <p>La información viene de <a href="https://swapi.info/api/">Swapi 1</a>, <a href="https://swapi.dev/api/">Swapi 2</a> y <a href="https://swapi.py4e.com/api/">Swapi 3</a></p>
      <p>Lamentablemente la API no devuelve más de 10 objetos, así que el número de pelílculas y personajes estará limitado a 10 a la vez.</p>
    </>
  )
}

export default Inicio;
