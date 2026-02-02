import React, { useState, useEffect } from 'react';
import Producto from './Producto.jsx';
import CajaError from '../Principal/CajaError.jsx';
import { useNavigate } from 'react-router-dom';
import useProductos from '../../hooks/useProductos.js';
//import imgRecargar from '../../assets/recargar.png'; //En caso de querer el botón de recarga. También necesitaría cargaInicial del hook useProductos.
import imgAgnadir from '../../assets/agnadir.png';
import { floatAPrecio } from '../../libraries/formateos.js';

//Componente que lista los productos.
const ListaProductos = (props) => {

  const criteriosControles = ["nombre", "peso", "precio"];
  const [textoFiltrado, setTextoFiltrado] = useState("");
  const [ordenanzaActual, setOrdenanzaActual] = useState(criteriosControles[0]);
  const [filtradoActual, setFiltradoActual] = useState(criteriosControles[0]);
  const [ordenInverso, setOrdenInverso] = useState(false);
  const [productosMostrados, setProductosMostrados] = useState([]);
  const navegar = useNavigate();
  const { eliminarProducto } = useProductos();

  //Cuando se presione uno de los botones del producto.
  const clickProducto = async (e) => {
    if (e.target.classList.contains("boton-producto")) {
      if (e.target.id.startsWith("a_")) { //Botón de añadir a la lista.
        const uuid = e.target.id.replaceAll("a_", ""); //Esto será usado más adelante cuando se implemente la funcionalidad de la lista.
        
      } else if (e.target.id.startsWith("b_")) { //Botón de borrar producto.
        const uuid = e.target.id.replaceAll("b_", "");
        await eliminarProducto(uuid);
        if (!props.controles) navegar("/gestor");
      } else if (e.target.id.startsWith("e_")) { //Botón de editar producto.
        const uuid = e.target.id.replaceAll("e_", "");
        navegar("/editarProducto/" + uuid);
      }
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
    //Se podría añadir que cuando busques el nombre de un producto, aparezca incluso si no está en la lista de productos cargados (osea, productos que están en la base de datos pero no en los 50 cargados).
    //Pero hacer esto empeoraría el rendimiento ya que habría que, o descargarlos todos o hacer una consulta a la base de datos cada vez que se presione una tecla o se busque.
    //Esto sería más interesante añadirlo cuando se implemente el WebSocket.
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
  }, [ordenInverso, ordenanzaActual, filtradoActual, textoFiltrado, props.productos]);
  useEffect(() => {
    resetControles();
  }, []);

  return (
    <div>
      {/*Los usuarios sin la sesión iniciada no pueden ver esta parte.*/ props.controles && (<div>
        <button onClick={() => {navegar("/nuevoProducto")}} className="boton-producto boton-nuevo-producto"><img src={imgAgnadir} alt="Agregar producto" /></button>
        {/*<button onClick={cargaInicial} className="boton-producto boton-recargar-productos"><img src={imgRecargar} alt="Recargar" /></button><br />*/} {/*Anteriormente había un botón para re-descargar los productos manualmente, está deshabilitado pero no se borra porque podría ser útil más adelante.*/}
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
          floatAPrecio(productosMostrados?.reduce((a, e) => {
            return a + (e.precio ?? 0)
          }, 0) / productosMostrados?.length)}</p>)
          : (<CajaError texto="No se puede calcular el precio medio" />)}
      </div>)}
      <div className="lista-productos" onClick={clickProducto}>
        {productosMostrados.length ? productosMostrados
          .map((e) => {
            return (<Producto key={e.uuid} producto={e} agnadir={props.controles} borrar={props.borrarProductos} editar={props.editarProductos} />)
          }) : (<CajaError texto="No se han encontrado productos (al menos no que coincidan con los criterios)" />)}
      </div>
    </div>
  )
}

export default ListaProductos;