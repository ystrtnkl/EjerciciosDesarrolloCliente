import React, { useState } from 'react';

const InputTextCompleto = (props) => {

    const [erroneo, setErroneo] = useState(false);

  return (
    <>
        <label htmlFor={props.nombre ?? ''}>{props.titulo ?? "Parámetro desconocido"}</label>
        <input type={props.tipo ?? "text"} name={props.nombre ?? ''} id={props.nombre ?? ''} placeholder={props.ejemplo ?? "Introduce un dato"} onChange={(e) => {
            props.actualizarValor(e); 
            if (props.validacion) setErroneo(!props.validacion(e.target.value));
        }} value={props.valor ?? ''} />
        <span className={erroneo ? "mal" : "oculto"}><br />{props.error ?? "Este campo es inválido."}</span>
        <br />
    </>
  )
}

export default InputTextCompleto;

