import React from 'react';

//Componente que hace referencia a un <input type="checkbox" /> con más funcionalidades.
const InputCheckCompleto = (props) => {

  //Con el mismo componente se crea: un label con texto personalizado, un input checkbox con id y valor personalizados, y se llama a una función cada vez que se cambie su valor.

  return (
    <>
      <label htmlFor={props.idFormateado ?? ''}>{props.titulo ?? "Opción desconocida"}</label>
      <input type="checkbox" id={props.idFormateado ?? ''} name={props.valor ?? ''} value={props.valor ?? ''} onChange={(e) => { props.actualizarValor(e) }} checked={props.estaChecked} />
      <br />
    </>
  )
}

export default InputCheckCompleto;

