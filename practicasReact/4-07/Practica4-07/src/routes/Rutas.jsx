import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inicio from '../pages/Inicio.jsx';
import Error from '../pages/Error.jsx';
import AcercaDe from '../pages/AcercaDe.jsx';
import Galeria from '../pages/Galeria.jsx';
import Interpretes from '../pages/Interpretes.jsx';
import Peliculas from '../pages/Peliculas.jsx';
import PeliculaConcreta from '../pages/PeliculaConcreta.jsx';

//Enrutador que lleva a las distintas páginas de la aplicación, incluyendo un componente en caso de no encontrar la ruta.
function Rutas() {

  return (
    <>
        <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/acercaDe" element={<AcercaDe />} />
            <Route path="/galeria" element={<Galeria />} />
            <Route path="/interpretes" element={<Interpretes />} />
            <Route path="/peliculas" element={<Peliculas />}>
              <Route path="/peliculas/:id" element={<PeliculaConcreta />} />
            </Route>
            <Route path="/*" element={<Error />} />
        </Routes>
    </>
  )
}

export default Rutas;
