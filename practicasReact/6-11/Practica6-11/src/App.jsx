import React from 'react'
import './App.css'
import Cabecera from './components/Principal/Cabecera.jsx';
import MenuNavegacion from './components/Principal/MenuNavegacion.jsx';
import Pie from './components/Principal/Pie.jsx';
import Contenedor from './components/Contenedor.jsx';
import Contenido from './components/Contenido.jsx';
import ProveedorSesion from './contexts/ProveedorSesion.jsx';
import ProveedorProductos from './contexts/ProveedorProductos.jsx';
import ProveedorListas from './contexts/ProveedorListas.jsx';

function App() {

  return (
    <>
      <Contenedor>
        <ProveedorSesion>
          <Cabecera />
          <MenuNavegacion />
          <ProveedorProductos>
            <ProveedorListas>
              <Contenido />
            </ProveedorListas>
          </ProveedorProductos>
        </ProveedorSesion>
        <Pie />
      </Contenedor>
    </>
  )
}

export default App

/*
INFORMACIÓN DE SUPABASE:









NOTAS EXTRA:

*/
