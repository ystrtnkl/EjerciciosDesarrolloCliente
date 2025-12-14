import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Nave.css';
import ListaPeliculas from '../Peliculas/ListaPeliculas.jsx';
import { traerMultiplesDatos } from '../../libraries/traerDatos.js';
import ListaPersonajes from '../Personajes/ListaPersonajes.jsx';
import { idPorUrl, formatearMedida, traducirTiempo } from '../../libraries/formateos.js';

//Componente para mostrar una nave, similar al componente Personaje.
function Nave(props) {

  const url = props.nave.url ? idPorUrl(props.nave.url) : "";

  //En caso de estar expandido, también se descargan y muestran los datos de sus personajes (que la pilotan) y sus películas (en las que sale).
  const [listaPersonajes, setListaPersonajes] = useState([]);
  const [listaPeliculas, setListaPeliculas] = useState([]);
  const cargarPeliculasRelacionadas = async () => {
    setListaPeliculas(await traerMultiplesDatos(props.nave.films));
  }
  const cargarPersonajesRelacionados = async () => {
    setListaPersonajes(await traerMultiplesDatos(props.nave.pilots));
  }
  useEffect(() => {
    if (props.expandir) {
      cargarPersonajesRelacionados();
      cargarPeliculasRelacionadas();
    }
  }, []);

  //Algunos datos son recibidos en unidades de medida que desconozco, como los créditos, el MGLT, el hyperdrive_rating o la max_atmosphering_speed.  Datos como la capacidad de carga (que no se si es en toneladas o en kilogramos) o la clase de la nave (que habría que hacer un array de traducción completo).
  return (
    <div className={(props.expandir ? "nave-expandida" : "") + " nave"}>
      {props.nave.fallo
        ? (<p className="error">Parece que ha habido un error al conectar con la(s) API.</p>)
        : (<div>
          {props.expandir
            ? <div className="titulo-nave">{props.nave.name ?? "Sin nombre"}</div>
            : <div className="titulo-nave"><Link to={"/nave/" + url}>{props.nave.name ?? "Sin nombre"}</Link></div>}
          <p>Modelo: {props.nave.model ?? "Desconocido"}</p>
          <p>Fabricante: {props.nave.manufacturer ?? "Desconocido"}</p>
          <p>Costo en créditos: {props.nave.cost_in_credits ?? "Desconocido"}</p>
          <p>Longitud: {formatearMedida(props.nave.length) ?? "Desconocido"}</p>
          <p>Velocidad atmosférica máxima: {props.nave.max_atmosphering_speed ?? "Desconocido"}</p>
          <p>Cantidad de tripulación: {props.nave.crew ?? "Desconocido"}</p>
          <p>Cantidad de pasajeros: {props.nave.passengers ?? "Desconocido"}</p>
          <p>Capacidad de carga: {props.nave.cargo_capacity ?? "Desconocido"}</p>
          <p>Consumibles: {traducirTiempo(props.nave.consumables) ?? "Desconocido"}</p>
          <p>Nota de hiperconducción: {props.nave.hyperdrive_rating ?? "Desconocido"}</p>
          <p>MGLT: {props.nave["MGLT"] ?? "Desconocido"}</p>
          <p>Clase de nave: {props.nave.starship_class ?? "Desconocido"}</p>
          {props.expandir && (<div className="personajes-peliculas">
            <span>
              <h3>Películas donde sale la nave</h3>
              {listaPeliculas.length
                ? (<ListaPeliculas peliculas={listaPeliculas} />)
                : (<p>No se han encontrado naves para este personaje</p>)}
            </span>
            <span>
              <h3>Personajes que usan la nave</h3>
              {listaPersonajes.length
                ? (<ListaPersonajes personajes={listaPersonajes} />)
                : (<p>No se han encontrado vehículos para este personaje</p>)}
            </span>
          </div>)}
        </div>)}
    </div>
  )
}

export default Nave;
