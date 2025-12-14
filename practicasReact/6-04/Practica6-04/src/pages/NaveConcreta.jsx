import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { traerDatos } from '../libraries/traerDatos.js';
import Nave from '../components/Transportes/Nave.jsx';
import cargando from '../assets/cargando.gif';

//Página para mostrar una nave concreta (pasada por url) similar a PersonajeConcreto.
function NaveConcreto() {

  const [fallo, setFallo] = useState(false); //Si falla, el estado fallo tendrá datos. Como se evalua de manera binaria, inicializarlo con {} provocaría que termine en true, se necesita que solo se considere true si tiene un objeto con datos, así que se inicializa con false.
  const { id } = useParams(); //El id de la nave a buscar en la API es el que aparezca en la url.
  const [nave, setNave] = useState({}); //Estado con los detalles de la película.

  const recibirDatos = async () => {
    try {
      const navesTraidos = await traerDatos("starships/" + id, false);
      setNave(navesTraidos);
    } catch (error) {
      setFallo(error);
    }
  }
  useEffect(() => {
    recibirDatos();
  }, []);

  return (
    <>
      {nave.name
        ? (<Nave nave={nave} expandir={true} />)
        : (fallo || nave.detail == "Not found"
          ? (<p className="error">Parece que ha habido un error al conectar con la(s) API o la película no se ha encontrado.</p> /*Si hay algún error lo notifica al usuario.*/)
          : (<img className="cargando" src={cargando} alt="Cargando..." /> /*Mientras que el estado siga vacío mostrará un gif de carga.*/)
        )}
    </>
  )
}

export default NaveConcreto;
