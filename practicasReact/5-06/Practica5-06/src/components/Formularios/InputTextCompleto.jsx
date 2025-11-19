import React, { useState } from 'react';

//Componente que hace referencia a un input normal y corriente pero con más funcionalidades.
const InputTextCompleto = (props) => {

  const [erroneo, setErroneo] = useState(false); //Para saber si este campo es erróneo (afecta al estilo y al mensaje de error).

  //Tiene la funcionalidad de: label con texto personalizado, estilo en caso de error, mensaje de error personalizado, nombre, valor y placeholder personalizados, capacidad de ser otro tipo distinto de text, función en caso de que cambie su valor.

  return (
    <>
      <label htmlFor={props.nombre ?? ''}>{props.titulo ?? "Parámetro desconocido"}</label>
      <input className={erroneo ? "mal" : "campo"} type={props.tipo ?? "text"} name={props.nombre ?? ''} id={props.nombre ?? ''} placeholder={props.ejemplo ?? "Introduce un dato"} onChange={(e) => {
        props.actualizarValor(e);
        if (props.validacion) setErroneo(!props.validacion(e.target.value));
      }} value={props.valor ?? ''} />
      <span className={erroneo ? "mal" : "oculto"}><br />{props.error ?? "Este campo es inválido."}</span>
      <br />
    </>
  )
}

export default InputTextCompleto;

