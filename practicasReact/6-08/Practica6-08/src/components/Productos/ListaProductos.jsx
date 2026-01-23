import React, { useState, useEffect } from 'react';
import Producto from './Producto.jsx';
import CajaError from '../Principal/CajaError.jsx';

//Componente que lista los productos.
const ListaProductos = (props) => {

  const criteriosControles = ["nombre", "peso", "precio"];
  const [textoFiltrado, setTextoFiltrado] = useState("");
  const [ordenanzaActual, setOrdenanzaActual] = useState(criteriosControles[0]);
  const [filtradoActual, setFiltradoActual] = useState(criteriosControles[0]);
  const [ordenInverso, setOrdenInverso] = useState(false);
  const [productosMostrados, setProductosMostrados] = useState([]);

  //Cuando se presione el botón de añadir a la lista.
  const clickAgnadirProducto = (e) => {
    if (e.target.classList.contains("boton-agnadir")) {
      const uuidAgnadir = e.target.id.replaceAll("p_", ""); //Esto será usado más tarde a la hora de añadir productos a x lista.
    }
  }

  //Reestablece los filtros y muestra todos los productos.
  const resetControles = () => {
    setFiltradoActual(criteriosControles[0]);
    setOrdenInverso(false);
    setOrdenanzaActual(criteriosControles[0]);
    setTextoFiltrado("");
    setProductosMostrados(props.productos);
  }
  useEffect(() => {
    //Aplicar filtros y ordenanzas.
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
  useEffect(() => {
    resetControles();
  }, []);

  return (
    <div>
      {/*Los usuarios sin la sesión iniciada no pueden ver esta parte.*/ props.controles && (<div>
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
        <p>Hay {productosMostrados?.length ?? 0} productos cargados</p>
        {productosMostrados.length ? (<p>El precio medio es {
          (productosMostrados?.reduce((a, e) => {
            return a + (e.precio ?? 0)
          }, 0) / productosMostrados?.length).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</p>)
          : (<CajaError texto="No se puede calcular el precio medio" />)}
      </div>)}

      <div onClick={props.botonAgnadir && clickAgnadirProducto}>
        {productosMostrados.length ? productosMostrados
          .map((e) => {
            return (<Producto key={e.uuid} producto={e} agnadir={props.controles} />)
          }) : (<CajaError texto="No se han encontrado productos (al menos no que coincidan con los criterios)" />)}
      </div>
    </div>
  )
}

export default ListaProductos;