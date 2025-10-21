import React from 'react';
//import './Galeria.css';
import BotonFiltrado from '../components/Botones/BotonFiltrado.jsx';
import MuestraPortada from '../components/PeliculaEntera/MuestraPortada.jsx';
import validaciones from '../libraries/validacionPeliculas.js';
import peliculasOriginal from '../assets/peliculas.json';



function Galeria() {

  const filtrarPorInterprete = () => {

    }

    const filtrarPorDirector = () => {

    }

    const filtrarPorTitulo = () => {

    }

    const peliculas = validaciones.filtrarPeliculasValidas(peliculasOriginal.peliculas); 

  return (
    <>
        <h2>Esta es la página de Galeria.</h2>
        <p>Aquí puedes ver las portadas de todas las películas.</p>
        <div>
          <BotonFiltrado funcion={filtrarPorInterprete} campo="intérprete" />
          <BotonFiltrado funcion={filtrarPorDirector} campo="director" />
          <BotonFiltrado funcion={filtrarPorTitulo} campo="título" />
        </div>
        <div>
          {peliculas ? peliculas.map((e, i) => <MuestraPortada key={i} id={e.id} urlPortada={e.urlPortada} titulo={e.titulo} agnoExibicion={e.agnoExibicion} />) : "No se han encontrado portadas"}
        </div>
    </>
  )
}

export default Galeria;
