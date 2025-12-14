import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Vehiculo.css';
import ListaPeliculas from '../Peliculas/ListaPeliculas.jsx';
import { traerMultiplesDatos } from '../../libraries/traerDatos.js';
import ListaPersonajes from '../Personajes/ListaPersonajes.jsx';
import { idPorUrl, formatearMedida, traducirTiempo } from '../../libraries/formateos.js';

//Componente para mostrar un vehículo, similar al componente Personaje.
function Vehiculo(props) {

  const url = props.vehiculo.url ? idPorUrl(props.vehiculo.url) : "";

  //En caso de estar expandido, también se descargan y muestran los datos de sus personajes (que lo pilotan) y sus películas (en las que sale).
  const [listaPersonajes, setListaPersonajes] = useState([]);
  const [listaPeliculas, setListaPeliculas] = useState([]);
  const cargarPeliculasRelacionadas = async () => {
    setListaPeliculas(await traerMultiplesDatos(props.vehiculo.films));
  }
  const cargarPersonajesRelacionados = async () => {
    setListaPersonajes(await traerMultiplesDatos(props.vehiculo.pilots));
  }
  useEffect(() => {
    if (props.expandir) {
      cargarPersonajesRelacionados();
      cargarPeliculasRelacionadas();
    }
  }, []);

  //Algunos datos son recibidos en unidades de medida que desconozco, como los créditos o la max_atmosphering_speed. Datos como la capacidad de carga (que no se si es en toneladas o en kilogramos) o la clase del vehículo (que habría que hacer un array de traducción completo).
  return (
    <div className={(props.expandir ? "vehiculo-expandido" : "") + " vehiculo"}>
      {props.vehiculo.fallo
        ? (<p className="error">Parece que ha habido un error al conectar con la(s) API.</p>)
        : (<div>
          {props.expandir
            ? <div className="titulo-vehiculo">{props.vehiculo.name ?? "Sin nombre"}</div>
            : <div className="titulo-vehiculo"><Link to={"/vehiculo/" + url}>{props.vehiculo.name ?? "Sin nombre"}</Link></div>}
          <p>Modelo: {props.vehiculo.model ?? "Desconocido"}</p>
          <p>Fabricante: {props.vehiculo.manufacturer ?? "Desconocido"}</p>
          <p>Costo en créditos: {props.vehiculo.cost_in_credits ?? "Desconocido"}</p>
          <p>Longitud: {formatearMedida(props.vehiculo.length) ?? "Desconocido"}</p>
          <p>Velocidad atmosférica máxima: {props.vehiculo.max_atmosphering_speed ?? "Desconocido"}</p>
          <p>Cantidad de tripulación: {props.vehiculo.crew ?? "Desconocido"}</p>
          <p>Cantidad de pasajeros: {props.vehiculo.passengers ?? "Desconocido"}</p>
          <p>Capacidad de carga: {props.vehiculo.cargo_capacity ?? "Desconocido"}</p>
          <p>Consumibles: {traducirTiempo(props.vehiculo.consumables) ?? "Desconocido"}</p>
          <p>Clase de vehículo: {props.vehiculo.vehicle_class ?? "Desconocido"}</p>
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
          </div>)}        </div>)}
    </div>
  )
}

export default Vehiculo;
