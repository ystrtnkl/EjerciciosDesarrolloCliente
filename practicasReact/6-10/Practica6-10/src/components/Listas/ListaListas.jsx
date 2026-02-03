import React from 'react';
import imgAgnadir from '../../assets/agnadir.png';

//Lista de las listas de la compra del usuario. Este componente solo será visible para usuarios que hayan iniciado sesión.
const ListaListas = (props) => {

  //Este componente no tiene funcionalidad de filtrado ni paginación, por lo que las listas a mostrar serán tal cual las que se pasen por props.
  

  return (
    <div>
      {JSON.stringify(props.listas)}
      <button onClick={props.botonNuevo} className="boton-lista boton-nueva-lista"><img src={imgAgnadir} alt="Agregar producto" /></button>
      {props.listas.length ? (<>
        <div onClick={() => {}}>
          listas
        </div>
      </>) : (<p>No hay ninguna lista asignada a tu usuario</p>)}
    </div>
  )
}

export default ListaListas;