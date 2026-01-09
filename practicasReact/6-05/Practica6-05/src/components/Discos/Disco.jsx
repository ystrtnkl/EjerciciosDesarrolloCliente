import React from 'react';
import './Disco.css';
import { Link } from 'react-router-dom';
//Este componente usa imágenes en la carpeta de assets.
import imgBorrar from '../../assets/eliminar.png';
import imgEditar from '../../assets/editar.png';
import sinPortada from '../../assets/sinportada.jpg';

//Elemento para renderizar un solo disco, recibe por props el disco y la función a ejecutar (pasandole el evento) al presionar sobre borrar.
const Disco = (props) => {
  return (
    <div className="disco">
      <h2><Link to={`/listarDisco/${props.disco.id}`} >{props.disco.nombre ?? 'Sin nombre'} </Link></h2>
      <p>Grupo o artista: <strong>{props.disco.grupo ?? 'Desconocido'}</strong></p>
      <p>Año: <strong>{props.disco.agno ? props.disco.agno : 'Desconocido'}</strong></p>
      <p>Género(s): <strong>{props.disco.genero.join(", ") ?? "Ninguno"}</strong></p>
      <p>Prestado: <strong>{props.disco.prestado ? "Sí" : "No"}</strong></p>
      <img className="disco-portada" src={props.disco.caratula ? props.disco.caratula : (sinPortada ?? '#')} alt="" /><br />
      {/*Los eventos de click en editar o borrar se manejan en el elemento de lista*/}
      <button className="disco-eliminar" ><img id={"el_" + props.disco.id} src={imgBorrar} alt="Eliminar disco" /></button>
      <button className="disco-editar" ><img id={"ed_" + props.disco.id} src={imgEditar} alt="Editar disco" /></button>
    </div>
  )
}

export default Disco;