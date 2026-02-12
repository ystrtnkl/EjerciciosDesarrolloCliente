import React from 'react';
import imgAgnadir from '../../assets/agnadir.png';
import MiniLista from './MiniLista.jsx';

//Lista de las listas de la compra del usuario. Este componente solo será visible para usuarios que hayan iniciado sesión.
const ListaListas = (props) => {

  //Este componente no tiene funcionalidad de filtrado ni paginación, por lo que las listas a mostrar serán tal cual las que se pasen por props.

  return (
    <div>
      {props.escritura && (<button onClick={props.botonNuevo} className="boton-lista boton-nueva-lista"><img src={imgAgnadir} alt="Agregar producto" /></button>)}
      {props.listas.length ? (<>
        <div onClick={props.seleccionar}>
          {props.listas.sort((a, b) => { return parseInt(a.fecha) > parseInt(b.fecha) }).map((e) => {
            return (<MiniLista botonBorrar={props.escritura} key={e.uuid} uuid={e.uuid} nombre={e.nombre} />) //Básicamente esto es lo que aparecerá en la columna central.
          })}
        </div>
      </>) : (<p>No se ha encontrado ninguna lista</p>)}
    </div>
  )
}

export default ListaListas;