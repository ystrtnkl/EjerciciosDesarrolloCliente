import React, { useState } from 'react';
import PeliculaDetalle from './PeliculaDetalle.jsx';
import './Pelicula.css';

//Este componente representa una película entera con sus datos, puede redireccionar a la página de dicha película o a la de cada intérprete.
const Pelicula = (props) => {

    const { titulo, urlPortada, agnoExibicion } = props.pelicula;

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
                <p>{agnoExibicion ?? "Año desconocido"}</p>
            </span>

            <span className={mostrandoDetalles ? "" : "oculto"}>
                {/*Aquí se mostrarían los datos extendidos de la película, esto podría ocurrir por defecto si así se especifíca.*/}
                <PeliculaDetalle pelicula={props.pelicula}>
                    {props.children}
                </PeliculaDetalle>
            </span>

            <button className="pelicula_boton-detalles" onClick={alternarMostrarDetalles}>
                {mostrandoDetalles ? "Ocultar detalles" : "Mostrar detalles"}
            </button>
        </div>
    )
}

export default Pelicula;
