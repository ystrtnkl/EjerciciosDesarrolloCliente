import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { traerDatos } from '../libraries/traerDatos.js';
import Pelicula from '../components/Peliculas/Pelicula.jsx';


//Página de inicio de la aplicación, accesible desde / y desde /inicio.
function PeliculaConcreta() {

  const { id } = useParams();
  const [pelicula, setPelicula] = useState({});

  const recibirDatos = async () => {
    setPelicula(await traerDatos("films/" + id, false));
  }
  useEffect(() => {
    recibirDatos();
  }, []);

  return (
    <>
        {pelicula.episode_id 
        ? (<Pelicula pelicula={pelicula} expandir={true} />)
        : (pelicula.fallo || pelicula.detail == "Not found"
          ? (<p className="error">Parece que ha habido un error al conectar con la(s) API o la película no se ha encontrado.</p>)
          : (<img src="https://media.tenor.com/tga0EoNOH-8AAAAM/loading-load.gif" alt="Cargando..." />)
        )}
    </>
  )
}

export default PeliculaConcreta;
