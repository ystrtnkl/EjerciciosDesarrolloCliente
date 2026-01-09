import React, { useContext } from 'react';
import FormularioInsercionDisco from '../components/Formularios/FormularioInsercionDisco.jsx';
import { ContextoDiscos } from '../contexts/ProveedorDiscos.jsx';
import { validarDisco } from '../libraries/validaciones.js';

//Página que mostrará un formulario para guardar un nuevo disco.
function InsertarDisco() {

  const { guardarDiscos } = useContext(ContextoDiscos);

  return (
    <>
      <h2>Formulario para insertar un disco.</h2>
      <FormularioInsercionDisco guardar={(disco) => {guardarDiscos([disco])}} validador={(disco) => validarDisco(disco, true)} />
    </>
  )
}

export default InsertarDisco;
