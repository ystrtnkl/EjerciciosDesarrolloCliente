import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Inicio from '../pages/Inicio.jsx';
import Error from '../pages/Error.jsx';
import Registrarse from '../pages/Registrarse.jsx';
import Logout from '../pages/Logout.jsx';
import Login from '../pages/Login.jsx';
import Gestor from '../pages/Gestor.jsx';
import ProductoConcreto from '../pages/ProductoConcreto.jsx';
import NuevoProducto from '../pages/NuevoProducto.jsx';
import EditarProducto from '../pages/EditarProducto.jsx';

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
        <Route path="/nuevoProducto" element={<NuevoProducto />} />
        <Route path="/producto/:uuidProducto" element={<ProductoConcreto />} />
        <Route path="/editarProducto/:uuidProducto" element={<EditarProducto />} />
        {/*<Route path="/lista/:uuidLista" element={<ListaConcreta />} /> Estaría interesante que hubiese una página de solo lectura para una lista, pero viendo que las listas son privadas para cada usuario y que además se muestran en el componente Gestor, se decidió no añadir esto. */}
        <Route path="/*" element={<Error />} />
      </Routes>
    </>
  )
}

export default Rutas;
