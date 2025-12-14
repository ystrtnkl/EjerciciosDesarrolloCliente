import { React, useContext } from 'react';
import Pelicula from './Pelicula.jsx';
import './ListaPeliculas.css';
import cargando from '../../assets/cargando.gif';
import { PeliculaContexto } from '../../contexts/PeliculaProvider.jsx';

//Componente que lista las peliculas en el array pasado por parámetros.
function ListaPeliculas(props) {

  const { peliculas, fallo } = useContext(PeliculaContexto); //Las películas se reciben del contexto, ya que se han descargado al inicio de la aplicación.
  const peliculasMostrar = props.peliculas ? props.peliculas : peliculas; //También es posible recibirlas de props, en caso de que dicha propiedad exista.

  return (
    <div className="lista-pelicula">
      {peliculasMostrar.length
        ? (peliculasMostrar.map((pelicula, i) => {
          return (<Pelicula key={pelicula.episode_id ?? i} pelicula={pelicula} />);
        }))
        : fallo
          ? (<p className="error">Parece que ha habido un error al conectar con la(s) API.</p>)
          : (<img className="cargando" src={cargando} alt="Cargando..." />) /*Mientras que las películas no están presnetes, muestra un gif de carga.*/}

    </div>
  )
}

export default ListaPeliculas;
