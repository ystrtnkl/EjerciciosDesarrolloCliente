import React, { useEffect, useState } from 'react';
import { traerDatos } from '../libraries/traerDatos.js';
import ListaPersonajes from '../components/Personajes/ListaPersonajes.jsx';

//Página para mostrar todos los personajes (en teoría la API solo puede devolver 10).
function Personajes() {

  const [personajes, setPersonajes] = useState([]); //Estado para los personajes.

  //Recibe los personajes de la API.
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
        ? (<p className="error">Parece que ha habido un error al conectar con la(s) API.</p> /*Si hay algún error, notifica al usuario.*/)
        : (<ListaPersonajes personajes={personajes} />)}
        

    </>
  )
}

export default Personajes;
