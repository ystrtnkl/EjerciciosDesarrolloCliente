import React from 'react';
import { Link } from 'react-router-dom';
import './Nave.css';

function Nave(props) {

  const url = props.nave.url ? props.nave.url.replace(/\//g, "").match(/(\d+)$/)[0] : "";

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
          <p>Longitud: {props.nave.length ?? "Desconocido"}</p>
          <p>Velocidad atmosférica máxima: {props.nave.max_atmosphering_speed ?? "Desconocido"}</p>
          <p>Cantidad de tripulación: {props.nave.crew ?? "Desconocido"}</p>
          <p>Cantidad de pasajeros: {props.nave.passengers ?? "Desconocido"}</p>
          <p>Capacidad de carga: {props.nave.cargo_capacity ?? "Desconocido"}</p>
          <p>Consumibles: {props.nave.consumables ?? "Desconocido"}</p>
          <p>Nota de hiperconducción: {props.nave.hyperdrive_rating ?? "Desconocido"}</p>
          <p>MGLT: {props.nave["MGLT"] ?? "Desconocido"}</p>
          <p>Clase de nave: {props.nave.starship_class ?? "Desconocido"}</p>
          {props.expandir ? (<p>peliculas y personajes</p>) : ""}
        </div>)}
    </div>
  )
}

export default Nave;
