import React from 'react';
import imgAgnadir from '../../assets/agnadir.png';
import MiniLista from './MiniLista.jsx';

//Lista de las listas de la compra del usuario. Este componente solo será visible para usuarios que hayan iniciado sesión.
const ListaListas = (props) => {

  //Este componente no tiene funcionalidad de filtrado ni paginación, por lo que las listas a mostrar serán tal cual las que se pasen por props.
  

  return (
    <div>
      {JSON.stringify(props.listas)}
      <button onClick={props.botonNuevo} className="boton-lista boton-nueva-lista"><img src={imgAgnadir} alt="Agregar producto" /></button>
      {props.listas.length ? (<>
        <div onClick={props.seleccionar}>
          {props.listas.sort((a, b) => {return parseInt(a.fecha) > parseInt(b.fecha)}).map((e) => {
            return (<MiniLista key={e.uuid} uuid={e.uuid} nombre={e.nombre}/>)
          })}
        </div>
      </>) : (<p>No hay ninguna lista asignada a tu usuario</p>)}
    </div>
  )
}

export default ListaListas;