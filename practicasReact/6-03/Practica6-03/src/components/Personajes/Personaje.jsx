import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Personaje.css';
import ListaPeliculas from '../Peliculas/ListaPeliculas';
import { traerMultiplesDatos } from '../../libraries/traerDatos.js';

//Componente para mostrar un personaje y las películas en las que sale (solo con el atributo "expandido" en true).
function Personaje(props) {

  const generoFormateado = { male: "Hombre", female: "Mujer", "n/a": "Otro" }[props.personaje.gender ?? "n/a"] ?? "Deconocido"; //Formatear el atributo género en español.
  //Por alguna razón el objeto de personaje no proporciona un atributo id, en su lugar hay que sacarlo manualmente del atributo url.
  const url = props.personaje.url ? props.personaje.url.replace(/\//g, "").match(/(\d+)$/)[0] : "";
  const [aparecionesPersonaje, setAparecionesPersonaje] = useState([]); //Estado para las películas en las que sale el personaje, permanecerá vacío si "expandido" no es true.

  //Llamar a la API para leer las pelĺiculas en las que aparece y guardarlas en el estado (solo con "expandido" en true).
  const leerApariciones = async () => {
    setAparecionesPersonaje(await traerMultiplesDatos(props.personaje.films));
  }
  useEffect(() => {
    if (props.expandir) {
      leerApariciones();
    }
  }, []);

  return (
    <div className={(props.expandir ? "personaje-expandido" : "") + " personaje"}>
      {props.personaje.fallo
        ? (<p className="error">Parece que ha habido un error al conectar con la(s) API.</p>)
        : (<div>
          {props.expandir
            ? <div className="titulo-personaje">{props.personaje.name ?? "Sin nombre"}</div>
            : <div className="titulo-personaje"><Link to={"/personaje/" + url}>{props.personaje.name ?? "Sin nombre"}</Link></div>}
          <p>Altura: {(props.personaje.height ?? "Desconocidos") + "cm"}</p>
          <p>Masa: {(props.personaje.mass ?? "Desconocidos") + "kg"}</p>
          <p>Color de pelo: {props.personaje.hair_color.toUpperCase() ?? "Desconocido"}</p>
          <p>Color de piel: {props.personaje.skin_color.toUpperCase() ?? "Desconocido"}</p>
          <p>Color de ojos: {props.personaje.eye_color.toUpperCase() ?? "Desconocido"}</p>
          <p>Año de nacimiento: {props.personaje.birth_year ?? "Desconocido" /*Se proporciona el año en formato Star Wars.*/}</p>
          <p>Género: {generoFormateado}</p>
          {props.expandir && (<div>
            <p><strong>Películas en las que aparece</strong></p>
            {aparecionesPersonaje.fallo
              ? (<p className="error">Parece que ha habido un error al conectar con la(s) API.</p>)
              : (<ListaPeliculas peliculas={aparecionesPersonaje} />) /*Además muestra las películas en las que aparece, solo con el atributo "expandido".*/}
          </div>)}
        </div>)}
    </div>
  )
}

export default Personaje;
