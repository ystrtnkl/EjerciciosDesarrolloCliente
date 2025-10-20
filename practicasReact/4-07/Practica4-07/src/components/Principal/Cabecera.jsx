import React from 'react';
import VolverInicio from '../Botones/VolverInicio.jsx';
import './Cabecera.css';

//Menu de navegación sencillo para ir a las páginas usando Link en lugar de <a>.
function Cabecera() {

  return (
    <>
        <div className="cabecera_principal">
            <h2>Visualizador de películas</h2>
            <VolverInicio />
        </div>
    </>
  )
}

export default Cabecera;
