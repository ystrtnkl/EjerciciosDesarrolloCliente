import React from 'react';
import FormularioInsercionDisco from '../components/Formularios/FormularioInsercionDisco.jsx';

function InsertarDisco() {

  const guardar = (disco) => {
    console.log(disco)
  }

  return (
    <>
        <h2>Formulario para insertar un disco.</h2>
        <FormularioInsercionDisco guardar={guardar}/>
    </>
  )
}

export default InsertarDisco;
