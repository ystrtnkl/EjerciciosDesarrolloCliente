import React, { useRef } from 'react';
import './Pelicula.css';
import Elenco from '../Elenco/Elenco.jsx';
import Taquilla from '../Taquilla/Taquilla.jsx';

//Este componente representa una película entera con sus datos, está reciclado de otro ejercicio.
const Pelicula = (props) => {

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
    <div className="pelicula_prnicipal">
      <div className="pelicula_datos">
        <div className="pelicula_foto"><img src={props.portada ?? ""} /></div>
        <div>
          <h3 className="pelicula_titulo">{props.titulo ?? "Sin título"}</h3>
          <p>Dirección: {props.direccion?.join(", ") ?? "Nadie"}</p>
          <p className="pelicula_resumen">{props.resumen ?? "Sin resumen"}</p>
        </div>
      </div>
      <button className="pelicula_boton-deseleccionado" ref={elencoBotonRef} onClick={alternarElenco}>Elenco</button>
      <button className="pelicula_boton-deseleccionado" ref={taquillaBotonRef} onClick={alternarTaquilla}>Taquilla</button>
      <div ref={elencoRef} className="oculto">
        <Elenco> 
        {props.children}    
      </Elenco>
      </div>
      
      <div className="oculto" ref={taquillaRef}>
        <Taquilla facturado={props.facturado ?? 0} />
      </div>
    </div>
  )
}
       
export default Pelicula;
