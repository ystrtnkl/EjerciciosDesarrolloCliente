import React, { useEffect, useState } from 'react';
import { traerDatos } from '../libraries/traerDatos.js';
import ListaPersonajes from '../components/Personajes/ListaPersonajes.jsx';

//Página de inicio de la aplicación, accesible desde / y desde /inicio.
function Personajes() {

  const [personajes, setPersonajes] = useState([]);

  const recibirDatos = async () => {
    setPersonajes(await traerDatos("people", true));
  }
  useEffect(() => {
    recibirDatos();
  }, []);

  return (
    <>
        <h2>Personajes de Star Wars.</h2>
        {personajes.fallo
        ? (<p className="error">Parece que ha habido un error al conectar con la(s) API.</p>)
        : (<ListaPersonajes personajes={personajes} />)}
        

    </>
  )
}

export default Personajes;
