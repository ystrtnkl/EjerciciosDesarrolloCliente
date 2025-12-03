import React, { useEffect, useState } from 'react';
import { traerDatos } from '../libraries/traerDatos.js';
import ListaPeliculas from '../components/Peliculas/ListaPeliculas.jsx';

//Página que muestra todas las películas.
function Peliculas() {

  const [peliculas, setPeliculas] = useState([]); //Estado con las películas.

  //Se buscan las películas en la API una vez cargue el componente.
  const recibirDatos = async () => {
    setPeliculas(await traerDatos("films", true));
  }
  useEffect(() => {
    recibirDatos();
  }, []);

  return (
    <>
      <h2>Peliculas de Star Wars.</h2>
      {peliculas.fallo
        ? (<p className="error">Parece que ha habido un error al conectar con la(s) API.</p> /*Si falla, lo notifica al usuario.*/)
        : (<ListaPeliculas peliculas={peliculas} />)}


    </>
  )
}

export default Peliculas;
