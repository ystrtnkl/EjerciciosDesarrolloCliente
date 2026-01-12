import React, { useState, useEffect } from 'react';
import './ListaDiscos.css';
import Disco from './Disco.jsx';
import imgCargando from '../../assets/cargando.gif';
import { useNavigate } from 'react-router';
import useDiscos from '../../hooks/useDiscos.js';

//Componente para listar discos.
const ListaDiscos = (props) => {

  const { borrarDisco, error, cargando, discosCargados, getTodosLosDiscos } = useDiscos();
  const [discosMostrados, setDiscosMostrados] = useState([]); //Array copia de discos que hace referencia a los que se van a mostrar (no los cargados en la applicación).
  const [buscado, setBuscado] = useState(""); //Lo que se está buscando en los filtros.
  const navegar = useNavigate();

  //Función handler para borrar (hace la acción en la base de datos y en la interfaz).
  const borrar = async (uuid) => {
    await borrarDisco(uuid);
    setDiscosMostrados(discosMostrados.filter((e) => e.id !== uuid));
  }

  //Función de evento para la lista de discos, hace operaciones con los botones de borrar o editar (onClick).
  const botonEnDisco = (e) => {
    if (e.target.id.startsWith("ed_")) navegar("/editarDisco/" + e.target.id.replaceAll("ed_", "")); //Ir a la página de edición.
    if (e.target.id.startsWith("el_")) borrar(e.target.id.replaceAll("el_", "")); //Borrar directamente.
  }

  //Función que se ejecuta cada vez que se escribe algo distinto en los filtros, solo altera los discos mostrados, no los cargados.
  const actualizarBusqueda = (e) => {
    setBuscado(e.target.value);
    setDiscosMostrados([...discosCargados].filter((ee) => {
      return ee.nombre.toLowerCase().includes(e.target.value.toLowerCase()) || ee.grupo.toLowerCase().includes(e.target.value.toLowerCase());
    }));
  }

  //Función para reiniciar los filtros, haciendo que los discos mostrados sean los mismos que los cargados.
  const reiniciarFiltros = () => {
    setDiscosMostrados(discosCargados);
    setBuscado("");
  }

  useEffect(() => {
    getTodosLosDiscos(true);
    setDiscosMostrados(discosCargados);
  }, []);

  return (
    <div>
      {/*Se puede decidir no mostrar las opciones de filtrado.*/}
      {JSON.stringify(discosCargados)}
      {JSON.stringify(discosMostrados)}
      {cargando ? (<img src={imgCargando} alt="Cargando..." />) :
        (<div>
          {props.filtros && (<div>
            <input type="text" name="filtro" id="filtro" placeholder='Introduce un nombre, grupo o artista...' value={buscado} onChange={(e) => { actualizarBusqueda(e); }} />
            <input type="button" name="reset-filtros" id="reset-filtros" value="Reiniciar filtros" onClick={reiniciarFiltros} /><br />
          </div>)}
          <div className="lista" onClick={(e) => { botonEnDisco(e); }}>
            {!error && discosMostrados.length > 0 ? discosMostrados.map((e, i) => {
              return (<Disco key={i} disco={e} />)
            }) : (<p>No se han encontrado discos (o al menos no que coincidan con la búsqueda).</p>)}
          </div>
        </div>)}
    </div>
  )
}

export default ListaDiscos;