import React from 'react';
import './Pelicula.css';
import Contenedor from '../Ejercicio1/Contenedor.jsx';

//Este componente representa una película entera con sus datos
const Pelicula = (props) => {
  //En el ejercicio se pide que el resumen de la película se pase mediante children, pero ha sido mejor usar props ya que children ya se usa dentro de Contenedor
  return (
    <div className="pelicula_prnicipal">
      <div className="pelicula_datos">
        <div className="pelicula_foto"><img src={props.portada} /></div>
        <div>
          <h3 className="pelicula_titulo">{props.titulo}</h3>
          <p>Dirección: {props.direccion.join(", ")}</p>
          <p className="pelicula_resumen">{props.resumen}</p>
        </div>
      </div>
      <Contenedor> 
        {props.children}    
      </Contenedor>
    </div>
  )
}
       
export default Pelicula;
