import React from "react";
import useSesion from "./useSesion.js";

//Hook personalizado para las operaciones a Supabase (requiere la sesión, así que tiene que usarse dentro del ProovedorSesion)
const useSupabase = () => {

    const { supabaseConexion } = useSesion();

    //Función unificada para recibir productos.
    //Parámetro de limite: el límite máximo de productos que se recibirán.
    //Parámetro de orden: un objeto con "propiedad" que indica la propiedad con la que ordenar, y "descendente" en true o false para alterar el orden.
    //Parámetro de filtros: un objeto con "propiedad" que indica la propiedad a filtrar y "valor" que indica como deberá de ser.
    const obtenerProductos = async (limite, orden = { propiedad: "nombre", descendente: true }, filtros = { propiedad: "uuid", valor: "%" }) => {
        console.log(limite, orden, filtros)
        const { data, error } = await supabaseConexion.from("productos").select("*").limit(limite).order(orden?.propiedad ?? "uuid", orden?.descendente).ilike(filtros?.propiedad, filtros?.valor);
        if (error) throw error;
        if (data) return data;
        return []; //En caso de no devolver nada.
    }

    return { obtenerProductos };
};

export default useSupabase;
