import React from 'react';
import FormularioInsercionDisco from '../components/Formularios/FormularioInsercionDisco.jsx';
import { guardarDiscos } from '../libraries/persistencia.js';

//Página que mostrará un formulario para guardar un nuevo disco.
function InsertarDisco() {

  const guardar = (disco) => { //Esta función finalmente guardaría el disco generado por el formulario.
    guardarDiscos([disco]);
  }

  return (
    <>
      <h2>Formulario para insertar un disco.</h2>
      <FormularioInsercionDisco guardar={guardar} />
    </>
  )
}

export default InsertarDisco;
