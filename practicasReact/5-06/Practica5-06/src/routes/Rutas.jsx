import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Inicio from '../pages/Inicio.jsx';
import Error from '../pages/Error.jsx';
import InsertarDisco from '../pages/InsertarDisco.jsx';
import ListarDisco from '../pages/ListarDisco.jsx';
import DiscoConcreto from '../pages/DiscoConcreto.jsx';

//Enrutador que lleva a las distintas páginas de la aplicación, incluyendo un componente en caso de no encontrar la ruta.
function Rutas() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/insertarDisco" element={<InsertarDisco />} />
        <Route path="/listarDisco" element={<ListarDisco />} />
        <Route path="/listarDisco/:localizacion" element={<DiscoConcreto/>} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </>
  )
}

export default Rutas;
