import React from 'react';
import Personaje from './Personaje.jsx';
import './ListaPersonajes.css';
import cargando from '../../assets/cargando.gif';

//Componente que lista todos los personajes pasados por parámetros, se puede establecer un límite en props.limite.
function ListaPersonajes(props) {

  return (
    <div className="lista-personajes">
      {props.personajes.length
        ? (props.personajes.map((personaje, i) => {
          if ((props.limitado && i < props.limitado) || !props.limitado) { //Si no se establece el límite se mostrarán todos.
            //Lamentablemente la API no devuelve más de 10 personajes (actualmente se supone que hay 82).
            return (<Personaje key={personaje.id ?? i} personaje={personaje} />);
          }
        }))
        : (<img className="cargando" src={cargando} alt="Cargando..." />)}
    </div>
  )
}

export default ListaPersonajes;
