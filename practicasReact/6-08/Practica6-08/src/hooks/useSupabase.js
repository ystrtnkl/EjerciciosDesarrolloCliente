import React, { useState } from "react";
import useSesion from "./useSesion.js";

//Hook personalizado para las operaciones a las bases de datos de Supabase (requiere la sesión, así que tiene que usarse dentro del ProovedorSesion).
const useSupabase = () => {

    const { supabaseConexion } = useSesion(); //Importando la misma conexión que ya se creó previamente.
    //Los estados de cargando y error se manejan en este hook;
    const [cargandoSupabase, setCargandoSupabase] = useState(false);
    const [errorSupabase, setErrorSupabase] = useState("");

    //Función unificada para recibir productos.
    //Parámetro de limite: el límite máximo de productos que se recibirán.
    //Parámetro de orden: un objeto con "propiedad" que indica la propiedad con la que ordenar, y "descendente" en true o false para alterar el orden.
    //Parámetro de filtros: un objeto con "propiedad" que indica la propiedad a filtrar y "valor" que indica como deberá de ser.
    const obtenerProductos = async (limite, orden = { propiedad: "nombre", descendente: true }, filtros = { propiedad: "uuid", valor: "%" }) => {
        setErrorSupabase("");
        setCargandoSupabase(true);
        try {
            const { data, error } = await supabaseConexion.from("productos").select("*").limit(limite).order(orden?.propiedad ?? "uuid", orden?.descendente).ilike(filtros?.propiedad, filtros?.valor);
            if (error) throw error;
            if (data) return data;
            return []; //En caso de no devolver nada.
        } catch (e) {
            setErrorSupabase(e?.message);
        } finally {
            setCargandoSupabase(false);
        }
    }

    //Próximamente, aquí habrán funciones para alteración de las listas.
    //No se incluyen aquí las operaciones de autenticación ya que este hook requiere del contexto de sesión, es necesario haber establecido todo lo relacionado con la sesión antes de usar estas funciones.

    return { obtenerProductos, cargandoSupabase, errorSupabase };
};

export default useSupabase;
