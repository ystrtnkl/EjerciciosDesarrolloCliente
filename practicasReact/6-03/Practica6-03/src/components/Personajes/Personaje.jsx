import React from 'react';
import { Link } from 'react-router-dom';
import './Personaje.css';

//Botón sencillo para volver al inicio (/) usando el hook de useNavigate.
function Personaje(props) {

  const generoFormateado = {male: "Hombre", female: "Mujer", "n/a": "Otro"}[props.personaje.gender] ?? "Deconocido";

  return (
    <div className={(props.expandir && "personaje-expandido") + " personaje"}>
      {props.expandir
      ? <div className="titulo-personaje">{props.personaje.name ?? "Sin nombre"}</div>
      : <div className="titulo-personaje"><Link to={"/personaje/" + (props.personaje.url.match(/(\d+)$/)[0] ?? "")}>{props.personaje.name ?? "Sin nombre"}</Link></div>}
      <p>Altura: {props.personaje.height ?? "Desconocido"}</p>
      <p>Masa: {props.personaje.mass ?? "Desconocido"}</p>
      <p>Color de pelo: {props.personaje.hair_color ?? "Desconocido"}</p>
      <p>Color de piel: {props.personaje.skin_color ?? "Desconocido"}</p>
      <p>Color de ojos: {props.personaje.eye_color ?? "Desconocido"}</p>
      <p>Año de nacimiento: {props.personaje.birth_year ?? "Desconocido"}</p>
      <p>Género: {generoFormateado}</p>
      {props.expandir && (<div>
        <p><strong>Películas en las que aparece</strong></p>
        <li>
          ...
        </li>
      </div>)}
      
    </div>
  )
}

export default Personaje;
