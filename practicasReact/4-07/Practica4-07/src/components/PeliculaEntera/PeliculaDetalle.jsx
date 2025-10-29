import React, { useRef } from 'react';
import './PeliculaDetalle.css';
import Elenco from './Elenco.jsx';
import Taquilla from './Taquilla.jsx';
import { Link } from 'react-router-dom';

//Este componente muestra todos los datos de la película.
const PeliculaDetalle = (props) => {

  const { id, titulo, direccion, resumen, urlPortada, facturado, agnoExibicion } = props.pelicula;

  const expandidoPorDefecto = props.expandido ? true : false;

  //Referencias para los botones y los componentes que se alternan, así como funciones para esto mismo.
  const elencoRef = useRef(null);
  const taquillaRef = useRef(null);
  const elencoBotonRef = useRef(null);
  const taquillaBotonRef = useRef(null);
  const alternarElenco = () => {
    elencoRef.current.classList.toggle("oculto");
    elencoBotonRef.current.classList.toggle("pelicula_boton-deseleccionado");
  }
  const alternarTaquilla = () => {
    taquillaRef.current.classList.toggle("oculto");
    taquillaBotonRef.current.classList.toggle("pelicula_boton-deseleccionado");
  }


  return (
    <div className="pelicula-detalle_prnicipal">
      <div className="pelicula-detalle_datos">
        <div className="pelicula-detalle_foto"><img src={urlPortada ?? ""} /></div>
        <div>
          <h3 className="pelicula-detalle_titulo">
            {expandidoPorDefecto ? (titulo ?? "Sin título") : (<Link to={`/peliculas/${id}`}>{titulo ?? "Sin título"}</Link>)}
          </h3>
          <p>Dirección: {direccion?.join(", ") ?? "Nadie"}</p>
          <p>Año de exibición: {agnoExibicion ?? "????"}</p>
          <p>ID Interno: {id}</p>
          <p className="pelicula-detalle_resumen">{resumen ?? "Sin resumen"}</p>
        </div>
      </div>
      <button className={expandidoPorDefecto ? "" : "pelicula-detalle_boton-deseleccionado"} ref={elencoBotonRef} onClick={alternarElenco}>Elenco</button>
      <button className={expandidoPorDefecto ? "" : "pelicula-detalle_boton-deseleccionado"} ref={taquillaBotonRef} onClick={alternarTaquilla}>Taquilla</button>
      <div ref={elencoRef} className={expandidoPorDefecto ? "" : "oculto"}>
        <Elenco>
          {props.children}
        </Elenco>
      </div>

      <div className="oculto" ref={taquillaRef}>
        <Taquilla facturado={facturado ?? 0} />
      </div>
    </div>
  )
}

export default PeliculaDetalle;
