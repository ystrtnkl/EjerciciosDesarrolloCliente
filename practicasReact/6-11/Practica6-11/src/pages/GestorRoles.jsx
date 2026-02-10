import React from 'react';
import FormularioAdmin from '../components/Formularios/FormularioAdmin';

function GestorRoles() {

  return (
    <>
        <h2>Gestor de roles.</h2>
        <p>Solo los administradores pueden ver esto, introduce el correo del usuario que quieras alterar sus permisos</p>
        <FormularioAdmin />
    </>
  )
}

export default GestorRoles;
