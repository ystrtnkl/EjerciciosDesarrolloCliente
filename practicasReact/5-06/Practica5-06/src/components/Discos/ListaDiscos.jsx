import React, { useState, useEffect } from 'react';
import './ListaDiscos.css';
import Disco from './Disco.jsx';
import { borrarDisco } from '../../libraries/persistencia.js';

const ListaDiscos = (props) => {

    //const [discos, setDiscos] = useState(props.getDiscosOriginales());
    //const [discosMostrados, setDiscosMostrados] = useState(discos);
    const [discos, setDiscos] = useState([]);
    const [discosMostrados, setDiscosMostrados] = useState([]);
    const [buscado, setBuscado] = useState("");

    const borrar = (localizacion) => {
        borrarDisco(localizacion);
        const discosOriginales = props.getDiscosOriginales()
        setDiscos(discosOriginales);
        setDiscosMostrados(discosOriginales);
    }

    const actualizarBusqueda = (e) => {
        setBuscado(e.target.value);
        setDiscosMostrados([...discos].filter((ee) => {
            return ee.nombre.toLowerCase().includes(e.target.value.toLowerCase()) || ee.grupo.toLowerCase().includes(e.target.value.toLowerCase()) ;
        }));
    }

    const reiniciarFiltros = () => {
        setDiscos(props.getDiscosOriginales());
        setDiscosMostrados(discos);
        setBuscado("");
    }

    useEffect(() => {
        const discosOriginales = props.getDiscosOriginales();
        setDiscos(discosOriginales);
        setDiscosMostrados(discosOriginales);
    }, []);

  return (
    <div>
      {props.filtros && (<div>
        <input type="text" name="filtro" id="filtro" placeholder='Introduce un nombre, grupo o artista...' value={buscado} onChange={(e) => {actualizarBusqueda(e);}} />
        <input type="button" name="reset-filtros" id="reset-filtros" value="Reiniciar filtros" onClick={reiniciarFiltros} /><br />
      </div>)}
      <div className="lista">
        {discosMostrados.length > 0 ? discosMostrados.map((e, i) => {
            return (<Disco key={i} disco={e} borrar={borrar}/>)
        }) : (<p>No se han encontrado discos (o al menos no que coincidan con la búsqueda).</p>)}
      </div>
    </div>
  )
}

export default ListaDiscos;