import React from 'react';

const InputCheckCompleto = (props) => {

  return (
    <>
        <label htmlFor={props.idFormateado ?? ''}>{props.titulo ?? "Opción desconocida"}</label>
        <input type="checkbox" id={props.idFormateado ?? ''} name={props.valor ?? ''} value={props.valor ?? ''} onChange={(e) => {props.actualizarValor(e)}} checked={props.estaChecked} />
        <br />
    </>
  )
}

export default InputCheckCompleto;

