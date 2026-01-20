import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Inicio from '../pages/Inicio.jsx';
import Error from '../pages/Error.jsx';
import Registrarse from '../pages/Registrarse.jsx';
import Logout from '../pages/Logout.jsx';
import Login from '../pages/Login.jsx';
import Gestor from '../pages/Gestor.jsx';

//Enrutador que lleva a las distintas páginas de la aplicación, incluyendo un componente en caso de no encontrar la ruta.
function Rutas() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/registrarse" element={<Registrarse />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/gestor" element={<Gestor />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </>
  )
}

export default Rutas;
