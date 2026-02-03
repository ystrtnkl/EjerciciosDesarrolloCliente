import React, { useState } from "react";
import useSesion from "./useSesion.js";
import { validarUuid } from "../libraries/validaciones.js";

//Hook personalizado para las operaciones a las bases de datos de Supabase (requiere la sesión, así que tiene que usarse dentro del ProovedorSesion).
const useSupabase = () => {

    const { supabaseConexion } = useSesion(); //Importando la misma conexión que ya se creó previamente.
    //Los estados de cargando y error se manejan en este hook;
    const [cargandoSupabase, setCargandoSupabase] = useState(false);
    const [errorSupabase, setErrorSupabase] = useState("");

    //Funciones para objetos públicos (no requieren del uuid del usuario para autenticar la operación):

    //Función unificada para recibir datos públicos (que no requieran uuid de usuario).
    //Parámetro de tabla: nombre de la tabla, en este caso tiene que ser una cuyos items no estén privados para cada usuario.
    //Parámetro de limite: el límite máximo de objetos que se recibirán.
    //Parámetro de orden: un objeto con "propiedad" que indica la propiedad con la que ordenar, y "descendente" en true o false para alterar el orden.
    //Parámetro de filtros: un objeto con "propiedad" que indica la propiedad a filtrar y "valor" que indica como deberá de ser.
    //Parámetro de sentenciaSelect: por si se quiere recibir propiedades concretas o hacer un join.
    const obtenerPublico = async (tabla, limite, orden = { propiedad: "uuid", descendente: true }, filtros = { propiedad: "uuid", valor: "%" }, sentenciaSelect = "*") => {
        setErrorSupabase("");
        setCargandoSupabase(true);
        try {
            const { data, error } = await supabaseConexion.from(tabla).select(sentenciaSelect ?? "*").limit(limite ?? 50).order(orden?.propiedad ?? "uuid", orden?.descendente).ilike(filtros?.propiedad, filtros?.valor);
            if (error) throw error;
            if (data) return data;
            return []; //En caso de no devolver nada.
        } catch (e) {
            setErrorSupabase(e?.message || "No se ha(n) podido ver el/los objeto(s)");
        } finally {
            setCargandoSupabase(false);
        }
    }

    //Inserta un objeto en una tabla pública especificando además su dueño (uuid) (esto puede estar vacío ya que pueden haber objetos sin dueño).
    const insertarPublico = async (tabla, datosInsercion) => {
        setErrorSupabase("");
        setCargandoSupabase(true);
        try {
            const datos = { ...datosInsercion, uuid: self.crypto.randomUUID() }; //Aquí es donde se genera el UUID.
            const { data, error } = await supabaseConexion.from(tabla).insert(datos);
            if (error) throw error;
            if (data) return data;
            return datos;
        } catch (e) {
            setErrorSupabase(e?.message || "No se ha podido insertar el objeto (puede que los datos no sean válidos o no tengas permisos)");
        } finally {
            setCargandoSupabase(false);
        }
    }

    //Edita los datos de un objeto (método patch) a partir de un uuid (que exista).
    const editarPublico = async (tabla, uuid, nuevo) => {
        setErrorSupabase("");
        setCargandoSupabase(true);
        try {
            //No se permite cambiar de uuid o de dueño.
            if (!validarUuid(uuid) || nuevo.uuid) throw new Error("Los datos de edición no son válidos");
            const { data, error } = await supabaseConexion.from(tabla).update(nuevo).eq("uuid", uuid);
            if (error) throw error;
            if (data) return data;
            return uuid;
        } catch (e) {
            setErrorSupabase(e?.message || "No se ha podido editar el objeto (puede que no exista, que los datos no sean válidos o no tengas permisos)");
        } finally {
            setCargandoSupabase(false);
        }
    }

    //Borra un objeto a partir de su uuid, si existe.
    const borrarPublico = async (tabla, uuid, campoPersonalizado) => {
        setErrorSupabase("");
        setCargandoSupabase(true);
        try {
            if (!validarUuid(uuid)) throw new Error("El uuid no es válido");
            const { data, error } = await supabaseConexion.from(tabla).delete().eq(campoPersonalizado ?? "uuid", uuid);
            if (error) throw error;
            if (data) return data;
            return true;
        } catch (e) {
            setErrorSupabase(e?.message || "No se ha podido borrar el objeto (puede que no exista o no tengas permisos)");
        } finally {
            setCargandoSupabase(false);
        }
    }


    //Funciones para objetos privados (requieren el uuid del usuario para autenticar la operación):

    //Función unificada para recibir datos privados (que requieran uuid de usuario).
    //Parámetro de tabla: nombre de la tabla, en este caso tiene que ser una cuyos items no estén privados para cada usuario.
    //Parámetro de limite: el límite máximo de objetos que se recibirán.
    //Parámetro de orden: un objeto con "propiedad" que indica la propiedad con la que ordenar, y "descendente" en true o false para alterar el orden.
    //Parámetro de filtros: un objeto con "propiedad" que indica la propiedad a filtrar y "valor" que indica como deberá de ser.
    //Parámetro de sentenciaSelect: por si se quiere recibir propiedades concretas o hacer un join.
    const obtenerPrivado = async (uuidUsuario, tabla, limite, orden = { propiedad: "uuid", descendente: true }, filtros = { propiedad: "uuid", valor: "%" }, sentenciaSelect = "*") => {
        setErrorSupabase("");
        setCargandoSupabase(true);
        try {
            const { data, error } = await supabaseConexion.from(tabla).select(sentenciaSelect ?? "*").limit(limite ?? 50).order(orden?.propiedad ?? "uuid", orden?.descendente).ilike(filtros?.propiedad, filtros?.valor).eq("uuid_usuario", uuidUsuario);
            if (error) throw error;
            if (data) return data;
            return []; //En caso de no devolver nada.
        } catch (e) {
            setErrorSupabase(e?.message || "No se ha(n) podido ver el/los objeto(s)");
        } finally {
            setCargandoSupabase(false);
        }
    }

    //Crea un nuevo objeto asignado al usuario iniciado sesión.
    const insertarPrivado = async (uuidUsuario, tabla, datosInsercion) => {
        setErrorSupabase("");
        setCargandoSupabase(true);
        try {
            const datos = { ...datosInsercion, uuid: self.crypto.randomUUID(), uuid_usuario: uuidUsuario };
            const { data, error } = await supabaseConexion.from(tabla).insert(datos);
            if (error) throw error;
            if (data) return data;
            return datos;
        } catch (e) {
            setErrorSupabase(e?.message || "No se ha podido crear el objeto");
        } finally {
            setCargandoSupabase(false);
        }
    }

    //Actualiza los datos de un objeto privado (si tiene permisos).
    const editarPrivado = async (uuidUsuario, tabla, uuid, nuevo) => {
        setErrorSupabase("");
        setCargandoSupabase(true);
        try {
            if (!validarUuid(uuid) || nuevo.uuid) throw new Error("Los datos de edición no son válidos");
            const { data, error } = await supabaseConexion.from(tabla).update(nuevo).eq("uuid", uuid).eq("uuid_usuario", uuidUsuario);
            if (error) throw error;
            if (data) return data;
            return uuid;
        } catch (e) {
            setErrorSupabase(e?.message || "No se ha podido editar el objeto");
        } finally {
            setCargandoSupabase(false);
        }
    }

    //Borra un objeto privado (si tiene permisos).
    const borrarPrivado = async (uuidUsuario, tabla, uuid, campoPersonalizado) => {
        setErrorSupabase("");
        setCargandoSupabase(true);
        try {
            if (!validarUuid(uuid)) throw new Error("El uuid no es válido");
            const { data, error } = await supabaseConexion.from(tabla).delete().eq(campoPersonalizado ?? "uuid", uuid).eq("uuid_usuario", uuidUsuario);
            if (error) throw error;
            if (data) return data;
            return true;
        } catch (e) {
            setErrorSupabase(e?.message || "No se ha podido borrar el objeto");
        } finally {
            setCargandoSupabase(false);
        }
    }

    //En principio un usuario no debería poder ver/editar/borrar los objetos de otro, pero esa restricción se deja para más adelante.

    return { obtenerPublico, cargandoSupabase, errorSupabase, insertarPublico, editarPublico, borrarPublico, obtenerPrivado, insertarPrivado, editarPrivado, borrarPrivado };
};

export default useSupabase;
