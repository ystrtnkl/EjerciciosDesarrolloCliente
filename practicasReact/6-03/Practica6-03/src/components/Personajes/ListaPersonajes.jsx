import React from 'react';
import Personaje from './Personaje.jsx';
import './ListaPersonajes.css';

//Botón sencillo para volver al inicio (/) usando el hook de useNavigate.
function ListaPersonajes(props) {

  return (
    <div className="lista-personajes">
      {props.personajes.length 
      ? (props.personajes.map((personaje) => {
        return (<Personaje key={personaje.id} personaje={personaje} />);
      }))
      : (<img src="https://media.tenor.com/tga0EoNOH-8AAAAM/loading-load.gif" alt="Cargando..." />)}
    </div>
  )
}

export default ListaPersonajes;
