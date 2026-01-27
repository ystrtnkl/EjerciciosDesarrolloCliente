import React, { useState } from "react";
import useSesion from "./useSesion.js";
import { validarDatosProducto, validarDuegno, validarUuid } from "../libraries/validaciones.js";

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
            setErrorSupabase(e?.message || "No se ha(n) podido ver el/los producto(s)");
        } finally {
            setCargandoSupabase(false);
        }
    }

    //Inserta un producto especificando además su dueño (uuid) (esto puede estar vacío ya que pueden haber productos sin dueño).
    const insertarProducto = async (producto, duegno) => {
        setErrorSupabase("");
        setCargandoSupabase(true);
        try {
            if (!validarDatosProducto(producto) || !validarDuegno(duegno)) throw new Error("Los datos de inserción no son válidos");
            const datos = { ...producto, duegno, uuid: self.crypto.randomUUID() }; //Aquí es donde se genera el UUID.
            const { data, error } = await supabaseConexion.from("productos").insert(datos);
            if (error) throw error;
            if (data) return data;
            return datos;
        } catch (e) {
            setErrorSupabase(e?.message || "No se ha podido insertar el producto (puede que los datos no sean válidos o no tengas permisos)");
        } finally {
            setCargandoSupabase(false);
        }
    }

    //Edita los datos de un producto (método patch) a partir de un uuid (que exista).
    const editarProducto = async (uuid, nuevo) => {
        setErrorSupabase("");
        setCargandoSupabase(true);
        try {
            //No se permite cambiar de uuid o de dueño.
            if (!validarDatosProducto(nuevo) || !validarUuid(uuid) || nuevo.uuid || nuevo.duegno) throw new Error("Los datos de edición no son válidos");
            const datos = { ...nuevo };
            const { data, error } = await supabaseConexion.from("productos").update(datos).eq("uuid", uuid);
            if (error) throw error;
            if (data) return data;
            return { ...datos, uuid };
        } catch (e) {
            setErrorSupabase(e?.message || "No se ha podido editar el producto (puede que no exista, que los datos no sean válidos o no tengas permisos)");
        } finally {
            setCargandoSupabase(false);
        }
    }

    //Borra un producto a partir de su uuid, si existe.
    const borrarProducto = async (uuid) => {
        setErrorSupabase("");
        setCargandoSupabase(true);
        try {
            if (!validarUuid(uuid)) throw new Error("El uuid no es válido");
            const { data, error } = await supabaseConexion.from("productos").delete().eq("uuid", uuid);
            if (error) throw error;
            if (data) return data;
            return true;
        } catch (e) {
            setErrorSupabase(e?.message || "No se ha podido borrar el producto (puede que no exista o no tengas permisos)");
        } finally {
            setCargandoSupabase(false);
        }
    }

    //En principio un usuario no debería poder ver/editar/borrar los productos de otro, pero esa restricción se deja para más adelante.

    return { obtenerProductos, cargandoSupabase, errorSupabase, insertarProducto, editarProducto, borrarProducto };
};

export default useSupabase;
