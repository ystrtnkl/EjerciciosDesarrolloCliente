import { React, createContext, useState, useEffect } from 'react';
import { traerDatos } from '../libraries/traerDatos.js';

//FALTA PONERLO EN APP.JSX




const PeliculaContexto = createContext();

const PeliculaProvider = (props) => {

    //Las pelícluas van a ser las mismas toda la aplicación, así que solo se reciben una vez, cuando cargue la aplicación. Luego se le pasa dicho array de películas a las páginas que lo necesiten.
    const [peliculas, setPeliculas] = useState([]);
    const recibirDatos = async () => {
        setPeliculas(await traerDatos("films", true));
    }
    useEffect(() => {
        recibirDatos();
    }, []);
    //Se podría hacer lo mismo con los personajes, pero algunas de las APIs solo devuelven hasta 10 a la vez, así que se trata a los personajes como un dato que puede variar en el tiempo, descargándolos cada vez.


    const exportaciones = {peliculas: peliculas};
    

  return (
    <PeliculaContexto value={exportaciones}>
        {props.children}
    </PeliculaContexto>
  )
}

export default PeliculaProvider;
export { PeliculaContexto }