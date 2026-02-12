import React, { useState } from 'react';
import CajaError from '../Principal/CajaError.jsx';

//Componente unificado para todo tipo de inputs, admite validaciones, errores, checkboxes, textareas, inputs normales, etc.
function InputBasico(props) {
  const [correcto, setCorrecto] = useState(true);
  const funcionValidadora = props.validador ?? (() => true);

  return (
    <div className="input-basico">
      <label htmlFor={props.nombre}>{props.titulo}</label>
      {props.tipo === "textarea" ? (<><br />
        <textarea
          cols="30" rows="300"
          readOnly={props.bloqueado ? true : false}
          name={props.nombre ?? ''} id={props.nombre ?? ''}
          onChange={(e) => { setCorrecto(funcionValidadora(e.target.value) ?? true) }}
          value={props.valor ?? ''} />
          </>
      ) : (
        <input
          onChange={(e) => { setCorrecto(funcionValidadora(props.tipo === "number" ? parseFloat(e.target.value) : e.target.value) ?? true) }}
          type={props.tipo ?? "text"}
          value={props.valor ?? ''}
          name={props.nombre ?? ''}
          id={props.nombre ?? ''}
          readOnly={props.bloqueado ? true : false}
          checked={props.tipo === "checkbox" && props.estaChecked}
          placeholder={props.placeholder ?? ''}
        />
      )}
      {!correcto && (<CajaError texto={props.mensajeError ?? ''} nivel="input" />)}
    </div>
  );
}

export default InputBasico;
