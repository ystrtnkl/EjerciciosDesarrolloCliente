import React from 'react';
import ListaPeliculas from '../components/Peliculas/ListaPeliculas.jsx';

//Página que muestra todas las películas.
function Peliculas(props) {

  return (
    <>
      <h2>Peliculas de Star Wars.</h2>
      {props.peliculas.fallo
        ? (<p className="error">Parece que ha habido un error al conectar con la(s) API.</p> /*Si falla, lo notifica al usuario.*/)
        : (<ListaPeliculas peliculas={props.peliculas} />)}


    </>
  )
}

export default Peliculas;
