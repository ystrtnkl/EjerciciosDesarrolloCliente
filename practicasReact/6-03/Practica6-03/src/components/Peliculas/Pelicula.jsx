import React from 'react';
import { Link } from 'react-router-dom';
import './Pelicula.css';

//Botón sencillo para volver al inicio (/) usando el hook de useNavigate.
function Pelicula(props) {

  return (
    <span className="pelicula">
      <div className="titulo-pelicula"><Link to={"/pelicula/" + props.pelicula.id}>{props.pelicula.title ?? "sin titulo"}</Link></div>
      <div>Número de película: {props.pelicula.episode_id}</div>
      <div>Director: {props.pelicula.director}</div>
      <div>Productor: {props.pelicula.producer}</div>
      <div>Fecha de salida: {props.pelicula.release_date}</div>
      {props.expandir === true && (<p>hola</p>)}
    </span>
  )
}

export default Pelicula;
