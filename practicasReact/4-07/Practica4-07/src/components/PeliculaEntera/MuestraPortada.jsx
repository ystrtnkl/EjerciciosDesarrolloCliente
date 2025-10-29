import React from 'react';
import './MuestraPortada.css';
import { Link } from 'react-router-dom';

//Componente para mostrar la portada de una película en la galería, puede redireccionar a la página de esa película.
const MuestraPortada = (props) => {

  const { urlPortada, titulo, direccion, id } = props.pelicula;

  return (
    <div className="muestra-portada_principal">
      <Link to={`/peliculas/${id}`} >
        <p>{titulo}, de {direccion.join(", ")}</p>
        <img src={urlPortada} alt="" />
      </Link>
    </div>
  )
}

export default MuestraPortada;
