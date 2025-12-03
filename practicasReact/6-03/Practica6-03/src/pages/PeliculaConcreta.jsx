import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { traerDatos } from '../libraries/traerDatos.js';
import Pelicula from '../components/Peliculas/Pelicula.jsx';
import cargando from '../assets/cargando.gif';


//Página para mostrar una película concreta.
function PeliculaConcreta() {

  const { id } = useParams(); //Se pregunta a la API por la película con el id establecido en la url.
  const [pelicula, setPelicula] = useState({}); //Estado para la película.

  //Se llama a la API en busca de esa película una vez cargue el componente.
  const recibirDatos = async () => {
    setPelicula(await traerDatos("films/" + id, false));
  }
  useEffect(() => {
    recibirDatos();
  }, []);

  return (
    <>
      {pelicula.title /*Si el objeto tiene "title" es que la película ha cargado bien.*/
        ? (<Pelicula pelicula={pelicula} expandir={true} /> /*Muestra la película en formato expandido.*/)
        : (pelicula.fallo || pelicula.detail == "Not found"
          ? (<p className="error">Parece que ha habido un error al conectar con la(s) API o la película no se ha encontrado.</p> /*Si hay algún error lo notifica al usuario.*/)
          : (<img className="cargando" src={cargando} alt="Cargando..." /*Mientras que el estado siga vacío mostrará un gif de carga.*/ />)
        )}
    </>
  )
}

export default PeliculaConcreta;
