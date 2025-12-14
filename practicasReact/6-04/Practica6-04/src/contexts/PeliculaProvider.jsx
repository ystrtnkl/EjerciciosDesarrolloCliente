import { React, createContext, useState, useEffect } from 'react';
import { traerDatos } from '../libraries/traerDatos.js';

const PeliculaContexto = createContext(); //Contexto que podrán usar los componentes para consultar las películas ya descargadas.

//Provider (que también da un contexto) de las películas, que se descargan solo al inicio.
const PeliculaProvider = (props) => {

  const [fallo, setFallo] = useState(false); //Si falla, el estado fallo tendrá datos. Como se evalua de manera binaria, inicializarlo con {} provocaría que termine en true, se necesita que solo se considere true si tiene un objeto con datos, así que se inicializa con false.
  //Las pelícluas van a ser las mismas toda la aplicación, así que solo se reciben una vez, cuando cargue la aplicación. Luego se le pasa dicho array de películas a las páginas que lo necesiten.
  const [peliculas, setPeliculas] = useState([]);
  const recibirDatos = async () => {
    try {
      const peliculasTraidas = await traerDatos("films", true);
      setPeliculas(peliculasTraidas);
    } catch (error) {
      setFallo(error);
    }

  }
  useEffect(() => {
    recibirDatos();
  }, []);
  //Se podría hacer lo mismo con los personajes, pero algunas de las APIs solo devuelven hasta 10 a la vez, así que se trata a los personajes como un dato que puede variar en el tiempo, descargándolos cada vez.


  const exportaciones = { peliculas: peliculas, fallo: fallo }; //Se exportan el array de peliculas y un posible fallo que ocurra.
  //El motivo por el que no se hace esto mismo con personajes, naves o vehículos está en NOTAS.txt.

  return (
    <PeliculaContexto value={exportaciones}>
      {props.children}
    </PeliculaContexto>
  )
}

export default PeliculaProvider;
export { PeliculaContexto }