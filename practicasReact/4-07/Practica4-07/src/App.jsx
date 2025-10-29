import React from 'react'
import './App.css'
import Cabecera from './components/Principal/Cabecera.jsx';
import MenuNavegacion from './components/Principal/MenuNavegacion.jsx';
import Pie from './components/Principal/Pie.jsx';
import Contenedor from './components/Contenedor.jsx';
import Contenido from './components/Contenido.jsx';

//En app se llama a los elementos que estarán disponibles siempre, como la cabecera, el menú de navegación o el footer.
function App() {

  return (
    <>
      <Contenedor>
        <Cabecera />
        <MenuNavegacion />
        <Contenido />
        <Pie />
      </Contenedor>
    </>
  )
}

export default App
