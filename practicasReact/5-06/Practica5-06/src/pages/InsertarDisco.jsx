import React from 'react';
import FormularioInsercionDisco from '../components/FormularioInsercionDisco';

function InsertarDisco() {

  const guardar = () => {
    console.log("asdofiusa")
  }

  return (
    <>
        <h2>Formulario para insertar un disco.</h2>
        <FormularioInsercionDisco guardar={guardar}/>
    </>
  )
}

export default InsertarDisco;
