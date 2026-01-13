import React from 'react';
import FormularioInsercionDisco from '../components/Formularios/FormularioInsercionDisco.jsx';
import { validarDisco } from '../libraries/validaciones.js';
import useDiscos from '../hooks/useDiscos.js';

//Página que mostrará un formulario para guardar un nuevo disco.
function InsertarDisco() {

  const { guardarDiscos } = useDiscos();

  return (
    <>
      <h2>Formulario para insertar un disco.</h2>
      <FormularioInsercionDisco guardar={guardarDiscos} validador={(disco) => validarDisco(disco, true)} />
    </>
  )
}

export default InsertarDisco;
