import React, {useState} from 'react';
import PeliculaDetalle from './PeliculaDetalle.jsx';
import './Pelicula.css';

//Este componente representa una película entera con sus datos, está reciclado de otro ejercicio.
const Pelicula = (props) => {

    const { titulo, urlPortada } = props.pelicula;

    const [mostrandoDetalles, setMostrandoDetalles] = useState(false);

    const alternarMostrarDetalles = () => {
        setMostrandoDetalles(!mostrandoDetalles);
    }

  return (
    <div className="pelicula_prnicipal">
        <span className={mostrandoDetalles ? "oculto" : ""}>
            <span className="pelicula_titulo-contraido">{titulo ?? "Sin título"}</span>
            <br />
            <img className="pelicula_portada-contraida" src={urlPortada ?? "#"} />
            <br />
        </span>
        
        <span className={mostrandoDetalles ? "" : "oculto"}>
            <PeliculaDetalle pelicula={props.pelicula}>
                {props.children}
            </PeliculaDetalle>
        </span>
        
        <button className="pelicula_boton-detalles" onClick={alternarMostrarDetalles}>{mostrandoDetalles ? "Ocultar detalles" : "Mostrar detalles"}</button>
    </div>
  )
}
       
export default Pelicula;
