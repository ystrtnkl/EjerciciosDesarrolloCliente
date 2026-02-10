import React, { useState, useEffect } from 'react';
import Cargando from '../Principal/Cargando.jsx';
import InputBasico from './InputBasico.jsx';
import { manejadorInput } from '../../libraries/manejadorInput.js';
import { validarUuid, validarDatosProducto, validarNombreProducto, validarPesoProducto, validarPrecioProducto, validarDescripcionProducto, validarUrl } from '../../libraries/validaciones.js';
import CajaError from '../Principal/CajaError.jsx';
import useProductos from '../../hooks/useProductos.js';
import { useNavigate } from 'react-router-dom';
import useSesion from '../../hooks/useSesion.js';

//Formulario para editar o registrar un nuevo producto.
function FormularioProducto(props) {

  //Los datos por defecto pueden estar vacíos (crear producto) o rellenos con el producto original (editar).
  const datosOriginales = props.editar ? { nombre: props.previo?.nombre ?? "", peso: props.previo?.peso ?? 0, precio: props.previo?.precio ?? 0, url_imagen: props.previo?.url_imagen ?? "https://i.ibb.co/8SQJtJ1/sinportada.jpg", descripcion: props.previo?.descripcion ?? "" }
    : { nombre: "", peso: 0, precio: 0, url_imagen: "https://i.ibb.co/8SQJtJ1/sinportada.jpg", descripcion: "" }
  const [datosProducto, setDatosProducto] = useState(datosOriginales);
  const { cargandoSupabase, errorSupabase, nuevoProducto, cambiarProducto } = useProductos();
  const navegar = useNavigate();
  const { soyAdmin } = useSesion(); //Solo los administradores pueden ver esto.

  //Valida los datos antes de enviar, aunque también se validan cada vez que cambian.
  const validar = () => {
    return (props.editar ? validarUuid(props.uuid) : true) && validarDatosProducto(datosProducto);
  }

  //Envía a guardar/editar.
  const enviar = async (e) => {
    e.preventDefault();
    //En la base de datos hay un campo llamado "duegno", que en teoría debería indicar el uuid del creador del producto. Esto todavía no se utiliza, se implementará más adelante.
    if (validar()) {
      if (props.editar) {
        const resultado = await cambiarProducto(props.uuid, { ...datosProducto, peso: parseFloat(datosProducto.peso), precio: parseFloat(datosProducto.precio) });
        if (resultado) navegar("/gestor");
      } else {
        const resultado = await nuevoProducto({ ...datosProducto, peso: parseFloat(datosProducto.peso), precio: parseFloat(datosProducto.precio)});
        if (resultado) navegar("/producto/" + resultado);
      }
    }
  }

  //Reestablece los inputs a sus valores originales.
  const reset = (e) => {
    e.preventDefault();
    setDatosProducto(datosOriginales)
  }

  useEffect(() => {
    if (!soyAdmin) navegar("/");
  }, []);

  return (
    <>
      <form onChange={(e) => { manejadorInput(e, setDatosProducto, datosProducto) }}>
        <InputBasico nombre="nombre" titulo="Nombre del producto:" tipo="text" valor={datosProducto.nombre} validador={validarNombreProducto} mensajeError="El nombre del producto debe tener entre 3 y 128 carácteres" />
        <InputBasico nombre="peso" titulo="Peso del producto en gramos:" tipo="number" valor={datosProducto.peso} validador={validarPesoProducto} mensajeError="El peso del producto debe de ser un número positivo (y en gramos)" />
        <InputBasico nombre="precio" titulo="Precio del producto en euros:" tipo="number" valor={datosProducto.precio} validador={validarPrecioProducto} mensajeError="El precio del producto debe de ser un número positivo" />
        {/*Permite ver la imágen a tiempo real según se escribe la URL.*/}
        <img src={datosProducto.url_imagen ?? "https://i.ibb.co/8SQJtJ1/sinportada.jpg"} alt="Sin portada" />
        <InputBasico nombre="url_imagen" titulo="URL de la imágen:" tipo="text" valor={datosProducto.url_imagen} validador={validarUrl} mensajeError="Debes poner una URL válida" />
        <InputBasico nombre="descripcion" titulo="Descripción:" tipo="textarea" valor={datosProducto.descripcion} validador={validarDescripcionProducto} mensajeError="La descripción del producto debe tener menos de 512 carácteres" />
        <button onClick={enviar}>{props.editar ? "Editar producto" : "Registrar producto"}</button>
        <button onClick={reset}>Reiniciar</button>
      </form>
      {cargandoSupabase && (<Cargando />)}
      {errorSupabase && (<CajaError texto={errorSupabase} />)}
    </>
  )
}

export default FormularioProducto;
