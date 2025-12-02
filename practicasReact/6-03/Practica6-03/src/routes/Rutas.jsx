import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Inicio from '../pages/Inicio.jsx';
import Error from '../pages/Error.jsx';
import Peliculas from '../pages/Peliculas.jsx';
import Personajes from '../pages/Personajes.jsx';
import PersonajeConcreto from '../pages/PersonajeConcreto.jsx';
import PeliculaConcreta from '../pages/PeliculaConcreta.jsx';

//Enrutador que lleva a las distintas páginas de la aplicación, incluyendo un componente en caso de no encontrar la ruta.
function Rutas() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/peliculas" element={<Peliculas />} />
        <Route path="/personajes" element={<Personajes />} />
        <Route path="/personaje/:id" element={<PersonajeConcreto />} />
        <Route path="/pelicula/:id" element={<PeliculaConcreta />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </>
  )
}

export default Rutas;
