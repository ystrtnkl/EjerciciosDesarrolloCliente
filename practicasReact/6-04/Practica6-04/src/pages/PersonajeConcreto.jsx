import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { traerDatos } from '../libraries/traerDatos.js';
import Personaje from '../components/Personajes/Personaje.jsx';
import cargando from '../assets/cargando.gif';

//Página para mostrar los detalles de un personaje en concreto.
function PersonajeConcreto() {

  const [fallo, setFallo] = useState(false); //Si falla, el estado fallo tendrá datos. Como se evalua de manera binaria, inicializarlo con {} provocaría que termine en true, se necesita que solo se considere true si tiene un objeto con datos, así que se inicializa con false.
  const { id } = useParams(); //El id del personaje a buscar en la API es el que aparezca en la url.
  const [personaje, setPersonaje] = useState({}); //Estado con los detalles del personaje.

  //Busca al personaje en la API.
  const recibirDatos = async () => {
    try {
      const personajesTraidos = await traerDatos("people/" + id, false);
      setPersonaje(personajesTraidos);
    } catch (error) {
      setFallo(error);
    }
  }
  useEffect(() => {
    recibirDatos();
  }, []);

  return (
    <>
      {personaje.name
        ? (<Personaje personaje={personaje} expandir={true} /> /*Muestra el personaje en formato expandido.*/)
        : (fallo || personaje.detail == "Not found"
          ? (<p className="error">Parece que ha habido un error al conectar con la(s) API o la película no se ha encontrado.</p> /*Si hay algún error lo notifica al usuario.*/)
          : (<img className="cargando" src={cargando} alt="Cargando..." /> /*Mientras que el estado siga vacío mostrará un gif de carga.*/)
        )}
    </>
  )
}

export default PersonajeConcreto;
