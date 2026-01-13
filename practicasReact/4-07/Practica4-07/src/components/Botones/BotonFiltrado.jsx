import React from "react";

//Botón genérico para filtrar datos
function BotonFiltrado(props) {

  //Función que se ejecutaría en caso de no pasar ninguna por props.
  const funcionIndefinida = () => {
    //console.log("Este botón no filtra nada.");
  };

  return (
    <>
      <button onClick={props.funcion ?? funcionIndefinida}>
        {props.campo ?? "Campo indefinido"}
      </button>
    </>
  );
}

export default BotonFiltrado;
