import React from 'react';

function CajaError(props) {

  return (
    <>
        {props.enLinea ? 
        (<span className={props.nivel ? ("error error-" + props.nivel) : "error"}>
            {props.texto ? props.texto : ("Error")}
        </span>) : 
        (<p className={props.nivel ? ("error-" + props.nivel) : "error"}>
            {props.texto ? props.texto : ("Error")}
        </p>)}
    </>
  )
}

export default CajaError;
