import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { traerDatos } from '../libraries/traerDatos.js';
import Personaje from '../components/Personajes/Personaje.jsx';


//Página de inicio de la aplicación, accesible desde / y desde /inicio.
function PersonajeConcreto() {

  const { id } = useParams();
  const [personaje, setPersonaje] = useState({});

  const recibirDatos = async () => {
    setPersonaje(await traerDatos("people/" + id, false));
  }
  useEffect(() => {
    recibirDatos();
  }, []);

  return (
    <>
        {personaje.name 
        ? (<Personaje personaje={personaje} />)
        : (personaje.fallo || personaje.detail == "Not found"
          ? (<p className="error">Parece que ha habido un error al conectar con la(s) API o la película no se ha encontrado.</p>)
          : (<img src="https://media.tenor.com/tga0EoNOH-8AAAAM/loading-load.gif" alt="Cargando..." />)
        )}
    </>
  )
}

export default PersonajeConcreto;
