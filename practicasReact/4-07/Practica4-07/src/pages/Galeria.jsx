import React, { useState } from 'react';
import BotonFiltrado from '../components/Botones/BotonFiltrado.jsx';
import MuestraPortada from '../components/PeliculaEntera/MuestraPortada.jsx';
import validaciones from '../libraries/validacionPeliculas.js';
import peliculasOriginal from '../assets/peliculas.json';

//Página donde se muestran las portadas de las películas, junto a algunos filtros.
function Galeria() {

  //Las funciones de filtrado funcionan correctamente, pero no se ha implementado la función de filtrar por un agente específico, así que se filtra por datos ya predefinidos.
  const filtrarPorInterprete = (interprete) => {
    setPeliculas([...peliculas].filter((e) => {
      return e.interpretes.some((ee) => {
        return ee.nombre === interprete
      })
    }));
  }
  const filtrarPorDirector = (director) => {
    setPeliculas([...peliculas].filter((e) => {
      return e.direccion.includes(director)
    }));
  }
  const filtrarPorTitulo = (titulo) => {
    setPeliculas([...peliculas].filter((e) => {
      return e.titulo === titulo
    }));
  }
  //Funciones para devolver el estado (array de películas) a su estado original.
  const peliculasPorDefecto = () => {
    return validaciones.filtrarPeliculasValidas(peliculasOriginal.peliculas);
  }
  const resetFiltros = () => {
    setPeliculas(peliculasPorDefecto());
  }

  const [peliculas, setPeliculas] = useState(peliculasPorDefecto());

  return (
    <>
      <h2>Esta es la página de Galeria.</h2>
      <p>Aquí puedes ver las portadas de todas las películas.</p>
      <div>
        {/*Los botones filtran por datos ya predefinidos porque no se implementó la funcionalidad de hacerlo por los datos que elija el usuario.*/}
        <BotonFiltrado funcion={() => { filtrarPorInterprete("Clara Jiménez") }} campo="Filtrar por intérprete" />
        <BotonFiltrado funcion={() => { filtrarPorDirector("Antonio Ibáñez") }} campo="Filtrar por director" />
        <BotonFiltrado funcion={() => { filtrarPorTitulo("Horizonte perdido") }} campo="Filtrar por título" />
        <BotonFiltrado funcion={resetFiltros} campo="Reset" />
      </div>
      <div>
        {peliculas.length > 0 ? peliculas.map((e, i) => <MuestraPortada key={i} pelicula={e} />) : "No se han encontrado portadas"}
      </div>
    </>
  )
}

export default Galeria;
