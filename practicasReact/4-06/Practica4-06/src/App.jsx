import React from 'react';
import './App.css';
import Rutas from './routes/Rutas.jsx';
import MenuNavegacion from './components/MenuNavegacion/MenuNavegacion.jsx';

//En la app aparecerán el menu de navegación y el "contenedor" del contenido de la página, que sería Rutas.
function App() {

  return (
    <>
      <MenuNavegacion />
      <Rutas/>
    </>
  )
}

export default App
