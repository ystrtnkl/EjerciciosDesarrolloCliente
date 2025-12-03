import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { traerMultiplesDatos } from '../../libraries/traerDatos.js';
import './Pelicula.css';

//Botón sencillo para volver al inicio (/) usando el hook de useNavigate.
function Pelicula(props) {

  const [personajesPelicula, setPersonajesPelicula] = useState([]);

  const leerPersonajes = async () => {
    setPersonajesPelicula(await traerMultiplesDatos(props.pelicula.characters));
  }
  useEffect(() => {
    if (props.expandir) {
      leerPersonajes();
    }
  }, []);

  return (
    <div className={(props.expandir && "pelicula-expandida") + " pelicula"}>
      {props.expandir
      ? <div className="titulo-pelicula">{props.pelicula.title ?? "Sin título"}</div>
      : <div className="titulo-pelicula"><Link to={"/pelicula/" + (props.pelicula.url.match(/(\d+)$/)[0] ?? "")}>{props.pelicula.title ?? "Sin título"}</Link></div>}
      <div>Director(es): {props.pelicula.director ?? "Sin directores"}</div>
      <div>Productor(es): {props.pelicula.producer ?? "Sin productores"}</div>
      <div>Fecha de salida: {props.pelicula.release_date ?? "Fecha desconocida"}</div>
      {props.expandir && (
        <div>
          <p>{props.pelicula.opening_crawl.replaceAll("\\r\\n", "<br>")}</p>
          <p><strong>Personajes:</strong></p>
          <li>
            {JSON.stringify(personajesPelicula)}
          </li>
          </div>
        )}
    </div>
  )
}

export default Pelicula;
