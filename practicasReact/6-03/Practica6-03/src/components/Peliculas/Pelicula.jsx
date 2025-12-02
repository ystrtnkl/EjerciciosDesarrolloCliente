import React from 'react';
import { Link } from 'react-router-dom';
import './Pelicula.css';

//Botón sencillo para volver al inicio (/) usando el hook de useNavigate.
function Pelicula(props) {

  const enlace = "/pelicula/" + ((props.pelicula.url.match(/\/(\d+)\/$/)[1]) ?? "");

  return (
    <div className={(props.expandir && "pelicula-expandida") + " pelicula"}>
      <div className="titulo-pelicula"><Link to={enlace}>{props.pelicula.title ?? "sin titulo"}</Link></div>
      <div>Director(es): {props.pelicula.director}</div>
      <div>Productor(es): {props.pelicula.producer}</div>
      <div>Fecha de salida: {props.pelicula.release_date}</div>
      {props.expandir && (
        <div>
          <p>{props.pelicula.opening_crawl.replaceAll("\\r\\n", "<br>")}</p>
          <p><strong>Personajes:</strong></p>
          <li>
            ...
          </li>
          </div>
        )}
    </div>
  )
}

export default Pelicula;
