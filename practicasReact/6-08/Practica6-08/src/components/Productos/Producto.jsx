import React from 'react';
import './Producto.css';
import { Link } from 'react-router-dom';

//Componente que representa un producto.
const Producto = (props) => {

  return (
    <div className="producto">
      <Link to={"/producto/" + props.producto.uuid}><h3>{props.producto.nombre ?? "Sin nombre"}</h3></Link>
      <img src={props.producto.url_imagen ?? "#"} alt="Sin imágen" />
      <p>Peso: {props.producto.peso ?? 0}g</p>
      <p>Precio: <strong>{props.producto.precio?.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }) ?? "0.00€"}</strong></p>
      <p>{props.producto.descripcion ?? "Sin descripción"}</p>
      {props.agnadir && (<button className="boton-agnadir" id={"p_" + props.producto.uuid}>Añadir a la lista</button>)}
    </div>
  )
}

export default Producto;