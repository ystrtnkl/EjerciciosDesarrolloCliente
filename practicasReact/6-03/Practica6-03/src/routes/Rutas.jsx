import { React, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Inicio from '../pages/Inicio.jsx';
import Error from '../pages/Error.jsx';
import Peliculas from '../pages/Peliculas.jsx';
import Personajes from '../pages/Personajes.jsx';
import PersonajeConcreto from '../pages/PersonajeConcreto.jsx';
import PeliculaConcreta from '../pages/PeliculaConcreta.jsx';
import { traerDatos } from '../libraries/traerDatos.js';

//Enrutador que lleva a las distintas páginas de la aplicación, incluyendo un componente en caso de no encontrar la ruta.
function Rutas() {

  //Las pelícluas van a ser las mismas toda la aplicación, así que solo se reciben una vez, cuando cargue la aplicación. Luego se le pasa dicho array de películas a las páginas que lo necesiten.
  const [peliculas, setPeliculas] = useState([]);
  const recibirDatos = async () => {
    setPeliculas(await traerDatos("films", true));
  }
  useEffect(() => {
    recibirDatos();
  }, []);
  //Se podría hacer lo mismo con los personajes, pero algunas de las APIs solo devuelven hasta 10 a la vez, así que se trata a los personajes como un dato que puede variar en el tiempo, descargándolos cada vez.

  return (
    <>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/peliculas" element={<Peliculas peliculas={peliculas} />} />
        <Route path="/personajes" element={<Personajes />} />
        <Route path="/personaje/:id" element={<PersonajeConcreto />} />
        <Route path="/pelicula/:id" element={<PeliculaConcreta peliculas={peliculas} />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </>
  )
}

export default Rutas;
