import React from 'react';

//Botón sencillo para volver al inicio (/) usando el hook de useNavigate.
function BotonFiltrado(props) {

    const funcionIndefinida = () => {
        console.log("Este botón no filtra nada.");
    }

  return (
    <>
        <button onClick={props.funcion ?? funcionIndefinida}>Filtrar por {props.campo ?? "Campo indefinido"}</button>
    </>
  )
}

export default BotonFiltrado;
