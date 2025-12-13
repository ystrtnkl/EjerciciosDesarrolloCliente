import React, { useEffect, useState } from 'react';
import { traerDatos } from '../libraries/traerDatos.js';
import ListaPersonajes from '../components/Personajes/ListaPersonajes.jsx';

//Página para mostrar todos los personajes (en teoría la API solo puede devolver 10).
function Personajes() {

  const [fallo, setFallo] = useState(false); //Si falla, el estado fallo tendrá datos. Como se evalua de manera binaria, inicializarlo con {} provocaría que termine en true, se necesita que solo se considere true si tiene un objeto con datos, así que se inicializa con false.
  const [personajes, setPersonajes] = useState([]); //Estado para los personajes.

  //Recibe los personajes de la API.
  const recibirDatos = async () => {
    try {
      const personajesTraidos = await traerDatos("people", true);
      setPersonajes(personajesTraidos);
    } catch (error) {
      setFallo(error);
    }
  }
  useEffect(() => {
    recibirDatos();
  }, []);

  return (
    <>
      <h2>Personajes de Star Wars.</h2>
      {fallo
        ? (<p className="error">Parece que ha habido un error al conectar con la(s) API.</p> /*Si hay algún error, notifica al usuario.*/)
        : (<ListaPersonajes personajes={personajes} />)}


    </>
  )
}

export default Personajes;
