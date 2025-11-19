import React, { useState, useEffect } from 'react';
import './ListaDiscos.css';
import Disco from './Disco.jsx';
import { reemplazarDiscos/*, borrarDisco*/ } from '../../libraries/persistencia.js';

//Componente para listar discos.
const ListaDiscos = (props) => {

  const [discos, setDiscos] = useState([]); //Los discos se inicializan aquí, pero se rellenan con el valor inicial en el useEffect.
  const [discosMostrados, setDiscosMostrados] = useState([]); //Array copia de discos que hace referencia a los que se van a mostrar (no los cargados en la applicación).
  const [buscado, setBuscado] = useState(""); //Lo que se está buscando en los filtros.

  //Función handler para borrar, esta función se le pasa a cada disco renderizado ya que se llama desde sus botones.
  const borrar = (localizacion) => {
    //Lo más común sería que el disco se borre directamente cuando se presione el botón, pero la práctica dice que esto debe ser un sideEffect.
    /*borrarDisco(localizacion); 
    const discosOriginales = props.getDiscosOriginales()
    setDiscos(discosOriginales);
    setDiscosMostrados(discosOriginales);*/
    //Así que ahora en su lugar se reemplaza el storage cuando el estado cambie (en lugar de cambiar el estado porque el storage cambió).
    setDiscos([...discos].filter((e) => { return e.localizacion !== localizacion }));
  }

  //Función que se ejecuta cada vez que se escribe algo distinto en los filtros, solo altera los discos mostrados, no los cargados.
  const actualizarBusqueda = (e) => {
    setBuscado(e.target.value);
    setDiscosMostrados([...discos].filter((ee) => {
      return ee.nombre.toLowerCase().includes(e.target.value.toLowerCase()) || ee.grupo.toLowerCase().includes(e.target.value.toLowerCase());
    }));
  }

  //Función para reiniciar los filtros, haciendo que los discos mostrados sean los mismos que los cargados.
  const reiniciarFiltros = () => {
    setDiscosMostrados(discos);
    setBuscado("");
  }

  //Al cargar el componente.
  useEffect(() => {
    setDiscos(props.getDiscosOriginales()); //Se leen todos los discos
  }, []); //En teoría VSCode dice que esto está mal, que no se puede alterar un estado desde un useEffect, pero a efectos prácticos sí funciona.

  useEffect(() => { //La práctica dice que se tienen que actualizar todos los discos cada vez que el estado cambie debido a un sideEffect (en lugar de alterar solo el disco concreto)
    reemplazarDiscos(discos ?? []);
    setDiscosMostrados(discos ?? []);
  }, [discos]);

  return (
    <div>
      {/*Se puede decidir no mostrar las opciones de filtrado.*/}
      {props.filtros && (<div>
        <input type="text" name="filtro" id="filtro" placeholder='Introduce un nombre, grupo o artista...' value={buscado} onChange={(e) => { actualizarBusqueda(e); }} />
        <input type="button" name="reset-filtros" id="reset-filtros" value="Reiniciar filtros" onClick={reiniciarFiltros} /><br />
      </div>)}
      <div className="lista">
        {discosMostrados.length > 0 ? discosMostrados.map((e, i) => {
          return (<Disco key={i} disco={e} borrar={borrar} />)
        }) : (<p>No se han encontrado discos (o al menos no que coincidan con la búsqueda).</p>)}
      </div>
    </div>
  )
}

export default ListaDiscos;