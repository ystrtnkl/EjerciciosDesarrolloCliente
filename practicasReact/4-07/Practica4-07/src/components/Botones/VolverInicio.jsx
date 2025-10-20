import React from 'react';
import { useNavigate } from 'react-router-dom';

//Botón sencillo para volver al inicio (/) usando el hook de useNavigate.
function VolverInicio() {

    const navegar = useNavigate();

  return (
    <>
        <button onClick={() => navegar("/")}>Volver al inicio</button>
    </>
  )
}

export default VolverInicio;
