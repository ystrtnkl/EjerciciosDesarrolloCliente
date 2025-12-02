import React, { useEffect, useState } from 'react';
import { traerDatos } from '../libraries/traerDatos.js';
import ListaPeliculas from '../components/Peliculas/ListaPeliculas.jsx';

//Página de inicio de la aplicación, accesible desde / y desde /inicio.
function Peliculas() {

  const [peliculas, setPeliculas] = useState([]);

  const recibirDatos = async () => {
    setPeliculas(await traerDatos("films"));
  }
  useEffect(() => {
    recibirDatos();
  }, []);

  return (
    <>
        <h2>Peliculas de Star Wars.</h2>
        <ListaPeliculas peliculas={peliculas} />

    </>
  )
}

export default Peliculas;
