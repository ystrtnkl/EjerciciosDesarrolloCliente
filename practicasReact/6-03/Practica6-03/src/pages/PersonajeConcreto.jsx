import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { traerDatos } from '../libraries/traerDatos.js';
import Personaje from '../components/Personajes/Personaje.jsx';
import cargando from '../assets/cargando.gif';


//Página para mostrar los detalles de un personaje en concreto.
function PersonajeConcreto() {

  const { id } = useParams(); //El id del personaje a buscar en la API es el que aparezca en la url.
  const [personaje, setPersonaje] = useState({}); //Estado con los detalles del personaje.

  //Busca al personaje en la API.
  const recibirDatos = async () => {
    setPersonaje(await traerDatos("people/" + id, false));
  }
  useEffect(() => {
    recibirDatos();
  }, []);

  return (
    <>
      {personaje.name
        ? (<Personaje personaje={personaje} expandir={true} /> /*Muestra el personaje en formato expandido.*/)
        : (personaje.fallo || personaje.detail == "Not found"
          ? (<p className="error">Parece que ha habido un error al conectar con la(s) API o la película no se ha encontrado.</p> /*Si hay algún error lo notifica al usuario.*/)
          : (<img className="cargando" src={cargando} alt="Cargando..." /> /*Mientras que el estado siga vacío mostrará un gif de carga.*/)
        )}
    </>
  )
}

export default PersonajeConcreto;
