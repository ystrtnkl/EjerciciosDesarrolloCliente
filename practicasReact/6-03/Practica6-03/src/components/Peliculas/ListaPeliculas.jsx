import React from 'react';
import Pelicula from './Pelicula.jsx';
import './ListaPeliculas.css';
import cargando from '../../assets/cargando.gif';

//Componente que lista las peliculas en el array pasado por parámetros.
function ListaPeliculas(props) {

  return (
    <div className="lista-pelicula">
      {props.peliculas.length
        ? (props.peliculas.map((pelicula, i) => {
          return (<Pelicula key={pelicula.episode_id ?? i} pelicula={pelicula} />);
        }))
        : (<img className="cargando" src={cargando} alt="Cargando..." />) /*Mientras que las películas no están presnetes, muestra un gif de carga.*/}
    </div>
  )
}

export default ListaPeliculas;
