import React from 'react';
import Pelicula from './Pelicula.jsx';
import './ListaPeliculas.css';

//Botón sencillo para volver al inicio (/) usando el hook de useNavigate.
function ListaPeliculas(props) {

  return (
    <div className="lista-pelicula">
      {props.peliculas.length 
      ? (props.peliculas.map((pelicula) => {
        return (<Pelicula key={pelicula.episode_id} pelicula={pelicula}/>);
      }))
      : (<img src="https://media.tenor.com/tga0EoNOH-8AAAAM/loading-load.gif" alt="Cargando..." />)}
    </div>
  )
}

export default ListaPeliculas;
