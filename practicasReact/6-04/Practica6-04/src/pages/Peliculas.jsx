import { React, useContext } from 'react';
import ListaPeliculas from '../components/Peliculas/ListaPeliculas.jsx';
import { PeliculaContexto } from '../contexts/PeliculaProvider.jsx';

//Página que muestra todas las películas.
function Peliculas() {
  const { peliculas } = useContext(PeliculaContexto);
  return (
    <>
      <h2>Peliculas de Star Wars.</h2>
      {peliculas.fallo
        ? (<p className="error">Parece que ha habido un error al conectar con la(s) API.</p> /*Si falla, lo notifica al usuario.*/)
        : (<ListaPeliculas/>)}


    </>
  )
}

export default Peliculas;
