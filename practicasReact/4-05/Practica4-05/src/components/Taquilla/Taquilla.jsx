import React from 'react';
import './Taquilla.css';

const Taquilla = (props) => {

    //El dinero recaudado se adapta al formato de euros en España.
    const precioFormateado = props.facturado.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }) ?? "Desconocido";

  return (
        <div className="taquilla_principal">
            <p>Recaudación total: <b>{precioFormateado}</b></p>
        </div>
  )
}

export default Taquilla;