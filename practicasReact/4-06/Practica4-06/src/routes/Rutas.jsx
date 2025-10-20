import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inicio from '../pages/Inicio/Inicio.jsx';
import Contacto from '../pages/Contacto/Contacto.jsx';
import AcercaDe from '../pages/AcercaDe/AcercaDe.jsx';
import Productos from '../pages/Productos/Productos.jsx';
import Error from '../pages/Error/Error.jsx';

//Enrutador que lleva a las distintas páginas de la aplicación, incluyendo un componente en caso de no encontrar la ruta.
function Rutas() {

  return (
    <>
        <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/acercaDe" element={<AcercaDe />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/*" element={<Error />} />
        </Routes>
    </>
  )
}

export default Rutas;
