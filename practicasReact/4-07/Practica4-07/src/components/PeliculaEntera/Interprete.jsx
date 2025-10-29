import React from 'react';
import './Interprete.css';
import { Link } from 'react-router-dom';

//Este componente representa un intérprete (actor) de una película.
const Interprete = (props) => {

  const { id, nombre, biografia, urlImagen } = props.interprete;

  //Al llamar al componente se puede especificar que sus datos se muestren de manera expandida por defecto, por ejemplo cuando se accede a la página propia del intérprete.
  const expandidoPorDefecto = props.expandido ? true : false;

  return (
    <div className="interprete_principal">
      <div className="interprete_foto"><img src={urlImagen ?? "#"} /></div>
      <div>
        <h3 className="pelicula-detalle_titulo">
          {expandidoPorDefecto ? (nombre ?? "Sin nombre") : (
            <Link to={`/interpretes/${id}`}>{nombre ?? "Sin nombre"}</Link>
          )}
        </h3>
        <p className="interprete_biografia">{biografia ?? "Sin biografía"}</p>
        <p>ID Interno: {id ?? 0}</p>
      </div>
    </div>
  )
}

export default Interprete;