import React from 'react';
import FormularioInsercionDisco from '../components/Formularios/FormularioInsercionDisco.jsx';
import { guardarDiscos } from '../libraries/persistencia.js';

function InsertarDisco() {

  const guardar = (disco) => {
      guardarDiscos([disco]);
  }

  return (
    <>
        <h2>Formulario para insertar un disco.</h2>
        <FormularioInsercionDisco guardar={guardar}/>
    </>
  )
}

export default InsertarDisco;
