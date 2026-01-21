import React, { useState, useEffect } from 'react';
import Producto from './Producto';

const ListaProductos = (props) => {

  const criteriosControles = ["nombre", "peso", "precio"];
  const [textoFiltrado, setTextoFiltrado] = useState("");
  const [ordenanzaActual, setOrdenanzaActual] = useState(criteriosControles[0]);
  const [filtradoActual, setFiltradoActual] = useState(criteriosControles[0]);
  const [ordenInverso, setOrdenInverso] = useState(false);
  const [productosMostrados, setProductosMostrados] = useState([]);

  const clickAgnadirProducto = (e) => {
    if (e.target.classList.contains("boton-agnadir")) {
      const uuidAgnadir = e.target.id.replaceAll("p_", ""); //Esto será usado más tarde
    }
  }

  const resetControles = () => {
    setFiltradoActual(criteriosControles[0]);
    setOrdenInverso(false);
    setOrdenanzaActual(criteriosControles[0]);
    setTextoFiltrado("");
    setProductosMostrados(props.productos);
  }
  useEffect(() => {
    resetControles();
  }, []);
  useEffect(() => {
    setProductosMostrados(props.productos.sort((a, b) => {
      const objA = ordenInverso ? b : a;
      const objB = ordenInverso ? a : b;
      return typeof a[ordenanzaActual] === "string" ?
        objA[ordenanzaActual].localeCompare(objB[ordenanzaActual], 'es', { sensitivity: 'base' })
        : objA[ordenanzaActual] > objB[ordenanzaActual];
    }).filter((e) => {
      return typeof e[filtradoActual] === "string" ?
        e[filtradoActual].toLowerCase().includes(textoFiltrado)
        : e[filtradoActual] <= textoFiltrado;
    }));
  }, [ordenInverso, ordenanzaActual, filtradoActual, textoFiltrado]);

  return (
    <div>
      {props.controles && (<div>
        <input type="text" value={textoFiltrado} onChange={(e) => { setTextoFiltrado(e.target.value) }} /><br />
        {criteriosControles.map((e, i) => {
          //Se está usando un evento onClick aquí, como siempre habrán solo 3 botones de filtrado el cambiar el evento onClick al elemento padre apenas mejorará el rendimiento, la diferencia será minima. Por otra parte complicaría bastante más el código.
          //Si hubiese una cantidad variable de criterios por los que filtrar o hubiesen algunos más que 3 si que rentaría más (en términos de rendimiento) usar la propagación de eventos, para un caso tan mínimo como este no es tan necesario.
          return (<button className={e === filtradoActual ? "boton-activado" : "boton"} onClick={() => { setFiltradoActual(e); setTextoFiltrado("") }} key={i}>Filtrar por {e}</button>)
        })}
        <button onClick={resetControles}>Reset filtros</button>
        <br />
        <label htmlFor="ordenInverso">Orden inverso</label>
        <input type="checkbox" id="ordenInverso" name="orderInverso" checked={ordenInverso} onChange={(e) => { setOrdenInverso(e.target.checked) }} />
        {criteriosControles.map((e, i) => {
          //Se está usando un evento onClick aquí, como siempre habrán solo 3 botones de ordenar el cambiar el evento onClick al elemento padre apenas mejorará el rendimiento, la diferencia será minima. Por otra parte complicaría bastante más el código.
          //Si hubiese una cantidad variable de criterios por los que ordenar o hubiesen algunos más que 3 si que rentaría más (en términos de rendimiento) usar la propagación de eventos, para un caso tan mínimo como este no es tan necesario.
          return (<button className={e === ordenanzaActual ? "boton-activado" : "boton"} key={i} onClick={() => { setOrdenanzaActual(e) }}>Ordenar por {e}</button>)
        })}

        {/*Estéticamente, esta información queda mejor al principio para no tener que bajar hasta abajo del todo.*/}
        <p>Hay {productosMostrados?.length ?? 0} productos</p>
        {productosMostrados.length ? (<p>El precio medio es {
          (productosMostrados?.reduce((a, e) => {
            return a + (e.precio ?? 0)
          }, 0) / productosMostrados?.length).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</p>)
          : (<p>No se puede calcular el precio medio</p>)}
      </div>)}

      {props.botonAgnadir && (<div onClick={clickAgnadirProducto}>
        {productosMostrados ? productosMostrados
          .map((e) => {
            return (<Producto key={e.uuid} producto={e} agnadir={true} />)
          }) : (<p>No se han encontrado productos (al menos no que coincidan con los criterios)</p>)}
      </div>)}
    </div>
  )
}

export default ListaProductos;