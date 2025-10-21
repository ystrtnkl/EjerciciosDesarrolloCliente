import React from 'react';
//import './Interpretes.css';
import validaciones from '../libraries/validacionPeliculas.js';
import Interprete from '../components/PeliculaEntera/Interprete.jsx';
import peliculasOriginal from '../assets/peliculas.json';


function Interpretes() {

  const interpretes = validaciones.filtrarInterpretesValidos(peliculasOriginal.peliculas);
  return (
    <>
        <h2>Esta es la página de Interpretes.</h2>
        <p>Aquí puedes ver la información de todos los actores.</p>
        <div>
              {interpretes.map((e, i) => {
                return (
                  <Interprete key={i} interprete={e} />
                )
              }) ?? "Sin intérpretes"}
        </div>
    </>
  )
}

export default Interpretes;
