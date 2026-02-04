import React from 'react';
import './Producto.css';
import { Link } from 'react-router-dom';
import imgCarrito from '../../assets/carrito.png';
import imgPapelera from '../../assets/eliminar.png';
import imgLapiz from '../../assets/editar.png';
import { floatAPrecio, floatAGramos } from '../../libraries/formateos.js';
import mas1 from '../../assets/agnadir1.png';
import mas10 from '../../assets/agnadir10.png';
import menos1 from '../../assets/eliminar1.png';
import menos10 from '../../assets/eliminar10.png';

//Componente que representa un producto.
const Producto = (props) => {

  return (
    <div className="producto">
      <Link to={"/producto/" + props.producto.uuid}><h3>{props.producto.nombre ?? "Sin nombre"}</h3></Link>
      <img src={props.producto.url_imagen ?? "#"} alt="Sin imágen" />
      <p>Peso: <strong>{floatAGramos(props.producto.peso ?? 0)}</strong> {props.enLista && (<span>(Total: {floatAGramos(props.producto.peso * props.producto.cantidad)})</span>)}</p>
      <p>Precio: <strong>{floatAPrecio(props.producto.precio)} {props.enLista && (<span>(Total: {floatAPrecio(props.producto.precio * props.producto.cantidad)})</span>)}</strong></p>
      <p>{props.producto.descripcion ?? "Sin descripción"}</p>
      {/*En caso de ver el componente en una página única o sin tener cuenta, no se debería ver el botón de añadir a la lista.*/}
      {props.agnadir && (<button className="boton-producto boton-agnadir" id={"a_" + props.producto.uuid}><img src={imgCarrito} alt="Añadir al carrito" /></button>)}
      {props.borrar && (<button className="boton-producto boton-borrar" id={"b_" + props.producto.uuid}><img src={imgPapelera} alt="Borrar" /></button>)}
      {props.editar && (<button className="boton-producto boton-editar" id={"e_" + props.producto.uuid}><img src={imgLapiz} alt="Editar" /></button>)}
      {props.enLista && (<> {/*Esto aparecerá cuando el producto sea representado en una lista.*/}
        <button id={"ac_" + props.producto.uuid} className="eliminar-10 alterar-cantidad"><img src={menos10} alt="-10" /></button>
        <button id={"ac_?" + props.producto.uuid} className="eliminar-1 alterar-cantidad"><img src={menos1} alt="-1" /></button>
        <h2 className="indicador-cantidad">{props.producto.cantidad}</h2>
        <button id={"ac_??" + props.producto.uuid} className="agnadir-1 alterar-cantidad"><img src={mas1} alt="+1" /></button>
        <button id={"ac_???" + props.producto.uuid} className="agnadir-10 alterar-cantidad"><img src={mas10} alt="+10" /></button>
        <br />
        <button className="boton-producto boton-borrar-lista alterar-cantidad" id={"ac_????" + props.producto.uuid}><img src={imgPapelera} alt="Borrar" /></button>
        <input type="text" /><button>a</button>
      </>)}
    </div>
  )
}

export default Producto;