import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { traerMultiplesDatos } from '../../libraries/traerDatos.js';
import ListaPersonajes from '../Personajes/ListaPersonajes.jsx';
import './Pelicula.css';

//Componente que representa una película, si tiene el atributo "expandido" mostrará también su descripción y sus personajes.
function Pelicula(props) {

  const [personajesPelicula, setPersonajesPelicula] = useState([]); //Estado con los personajes de la película (permanecerá vacío si el atributo "expandido" no es true)
  //El episode_id que proporciona la API no es el id para poner en el endpoint por alguna razón, la única manera de saber el número es sacándolo del atributo url.
  const url = props.pelicula.url ? props.pelicula.url.replace(/\//g, "").match(/(\d+)$/)[0] : "";

  //Cuando cargue el componente (y solo con el atributo "expandido"), hará las llamadas necesarias a la API para conseguir los datos de los personajes.
  const leerPersonajes = async () => {
    setPersonajesPelicula(await traerMultiplesDatos(props.pelicula.characters));
  }
  useEffect(() => {
    if (props.expandir) {
      leerPersonajes();
    }
  }, []);

  return (
    <div className={(props.expandir ? "pelicula-expandida" : "") + " pelicula"}>
      {props.expandir
        ? <div className="titulo-pelicula">{props.pelicula.title ?? "Sin título"}</div>
        : <div className="titulo-pelicula"><Link to={"/pelicula/" + (url ?? "")}>{props.pelicula.title ?? "Sin título"}</Link></div> /*También hay un enlace para ir a la página concreta de esa película.*/}
      <div>Director(es): {props.pelicula.director ?? "Sin directores"}</div>
      <div>Productor(es): {props.pelicula.producer ?? "Sin productores"}</div>
      <div>Fecha de salida: {props.pelicula.release_date ?? "Fecha desconocida"}</div>
      {props.expandir && (
        <div>
          <p>{props.pelicula.opening_crawl.replaceAll("\\r\\n", "<br>")}</p>
          <p><strong>Personajes:</strong></p>
          {personajesPelicula.fallo
            ? (<p className="error">Parece que ha habido un error al conectar con la(s) API.</p>)
            : (<ListaPersonajes personajes={personajesPelicula} limitado={10} />) /*Solo muestra hasta 10 personajes.*/}
        </div>
      )}
    </div>
  )
}

export default Pelicula;
