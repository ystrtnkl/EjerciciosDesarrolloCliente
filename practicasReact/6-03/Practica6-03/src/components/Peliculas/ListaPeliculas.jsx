import React from 'react';
import Pelicula from './Pelicula.jsx';

//Botón sencillo para volver al inicio (/) usando el hook de useNavigate.
function ListaPeliculas(props) {

  return (
    <div>
      {props.peliculas.length 
      ? (props.peliculas.map((pelicula) => {
        return (<Pelicula key={pelicula.id} pelicula={pelicula}/>);
      }))
      : (<img src="https://media.tenor.com/tga0EoNOH-8AAAAM/loading-load.gif" alt="Cargando..." />)}
    </div>
  )
}

export default ListaPeliculas;
