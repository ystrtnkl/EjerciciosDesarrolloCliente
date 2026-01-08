import React from 'react'
import './App.css'
import Cabecera from './components/Principal/Cabecera.jsx';
import MenuNavegacion from './components/Principal/MenuNavegacion.jsx';
import Pie from './components/Principal/Pie.jsx';
import Contenedor from './components/Contenedor.jsx';
import Contenido from './components/Contenido.jsx';
import ProveedorDiscos from './contexts/ProveedorDiscos.jsx';

function App() {

  return (
    <>
      <Contenedor>
        <ProveedorDiscos >
          <Cabecera />
          <MenuNavegacion />
          <Contenido />
        </ProveedorDiscos>
        <Pie />
      </Contenedor>
    </>
  )
}

export default App
