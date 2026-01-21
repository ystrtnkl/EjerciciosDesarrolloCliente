import React, { createContext, useState, useEffect } from "react";
import { supabaseConexion } from '../supabase/supabase.js';

const ContextoProductos = createContext();

//Contexto para los productos de la app
const ProveedorProductos = (props) => {

  const [cargandoProductos, setCargandoProductos] = useState(false);
  const [errorProductos, setErrorProductos] = useState("");
  const [productosCargados, setProductosCargados] = useState([]);

  //Función unificada para recibir productos.
  //Parámetro de limite: el límite máximo de productos que se recibirán.
  //Parámetro de orden: un objeto con "propiedad" que indica la propiedad con la que ordenar, y "descendente" en true o false para alterar el orden.
  //Parámetro de filtros: un objeto con "propiedad" que indica la propiedad a filtrar y "valor" que indica como deberá de ser.
  const obtenerProductos = async (limite, orden, filtros = {propiedad: "uuid", valor: "%"}) => {
    setCargandoProductos(true);
    setErrorProductos("");
    try {
      const { data, error } = await supabaseConexion.from("productos").select("*").limit(limite).order(orden?.propiedad ?? "uuid", orden?.descendente).ilike(filtros?.propiedad, filtros?.valor);
      if (error) throw error;
      if (data) return data;
      return []; //En caso de no devolver nada.
    } catch (e) {
      console.log(e)
      setErrorProductos(e?.message);
    } finally {
      setCargandoProductos(false);
    }
  }
  
  const cargaInicial = async () => {
    await setProductosCargados(await obtenerProductos(50, {propiedad: "nombre", descendente: true}));
  }
  useEffect(() => {
    cargaInicial();
  }, []);

  const datosProveer = {
    cargandoProductos, errorProductos, productosCargados, obtenerProductos
  }

  return (
    <>
      <ContextoProductos.Provider value={datosProveer}>
        {props.children}
      </ContextoProductos.Provider>
    </>
  );
};

export default ProveedorProductos;
export { ContextoProductos };