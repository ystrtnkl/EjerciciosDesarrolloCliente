import React from 'react';

//Este componente está pensado que sea la parte privada de la app, osea que solo los usuarios con la sesión iniciada puedan verlo.
function GestorListas(props) {

  return (
    <div>
      <p>Gestor de listas, este componente solo es accesible a usuarios con la sesión iniciada.</p>
      {props.logeado && (<div>
        <p>Este será el contenido exclusivo de {props.usuario?.user_metadata?.display_name}.</p>
      </div>)}

    </div>
  );
}

export default GestorListas;
