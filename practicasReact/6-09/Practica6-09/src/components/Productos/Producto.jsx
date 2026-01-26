import React from 'react';
import './Producto.css';
import { Link } from 'react-router-dom';
import imgCarrito from '../../assets/carrito.png';
import imgPapelera from '../../assets/eliminar.png';
import imgLapiz from '../../assets/editar.png';

//Componente que representa un producto.
const Producto = (props) => {

  return (
    <div className="producto">
      <Link to={"/producto/" + props.producto.uuid}><h3>{props.producto.nombre ?? "Sin nombre"}</h3></Link>
      <img src={props.producto.url_imagen ?? "#"} alt="Sin imágen" />
      <p>Peso: {props.producto.peso ?? 0}g</p>
      <p>Precio: <strong>{props.producto.precio?.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }) ?? "0.00€"}</strong></p>
      <p>{props.producto.descripcion ?? "Sin descripción"}</p>
      {/*En caso de ver el componente en una página única o sin tener cuenta, no se debería ver el botón de añadir a la lista.*/}
      {props.agnadir && (<button className="boton-producto boton-agnadir" id={"p_" + props.producto.uuid}><img src={imgCarrito} alt="Añadir al carrito" /></button>)}
      {props.borrar && (<button className="boton-producto boton-borrar" id={"b_" + props.producto.uuid}><img src={imgPapelera} alt="Borrar" /></button>)}
      {props.editar && (<button className="boton-producto boton-editar" id={"e_" + props.producto.uuid}><img src={imgLapiz} alt="Editar" /></button>)}
    </div>
  )
}

export default Producto;