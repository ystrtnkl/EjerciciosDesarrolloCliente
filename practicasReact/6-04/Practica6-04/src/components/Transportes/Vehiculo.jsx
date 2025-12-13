import React from 'react';
import { Link } from 'react-router-dom';
import './Vehiculo.css';

function Vehiculo(props) {

  const url = props.vehiculo.url ? props.vehiculo.url.replace(/\//g, "").match(/(\d+)$/)[0] : "";

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
          <p>Longitud: {props.vehiculo.length ?? "Desconocido"}</p>
          <p>Velocidad atmosférica máxima: {props.vehiculo.max_atmosphering_speed ?? "Desconocido"}</p>
          <p>Cantidad de tripulación: {props.vehiculo.crew ?? "Desconocido"}</p>
          <p>Cantidad de pasajeros: {props.vehiculo.passengers ?? "Desconocido"}</p>
          <p>Capacidad de carga: {props.vehiculo.cargo_capacity ?? "Desconocido"}</p>
          <p>Consumibles: {props.vehiculo.consumables ?? "Desconocido"}</p>
          <p>Clase de vehículo: {props.vehiculo.vehicle_class ?? "Desconocido"}</p>
          {props.expandir ? (<p>peliculas y personajes</p>) : ""}
        </div>)}
    </div>
  )
}

export default Vehiculo;
