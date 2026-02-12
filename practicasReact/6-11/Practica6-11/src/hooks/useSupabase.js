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

    //Función unificada para recibir datos públicos (que no requieran uuid de usuario), sus parámetros están envueltos en un objeto con estas propiedades:
    //Parámetro de tabla (este NO está dentro del objeto, es un parametro aparte): nombre de la tabla, en este caso tiene que ser una cuyos items no estén privados para cada usuario.
    //Parámetro de limite: el límite máximo de objetos que se recibirán.
    //Parámetro de orden: un objeto con "propiedad" que indica la propiedad con la que ordenar, y "descendente" en true o false para alterar el orden.
    //Parámetro de filtros: un objeto con "propiedad" que indica la propiedad a filtrar y "valor" que indica como deberá de ser. inverso indica como se buscará (mirar if para más información).
    //Parámetro de sentenciaSelect: por si se quiere recibir propiedades concretas o hacer un join.
    const obtenerPublico = async (tabla, opciones = { limite: 50, orden: { propiedad: "uuid", descendente: true }, filtros: { propiedad: "uuid", valor: "%", invertido: 0 }, sentenciaSelect: "*" }) => {
        setErrorSupabase("");
        setCargandoSupabase(true);
        try {
            //Esta era la manera antigua con toda la consulta seguida: 
            //const { data, error } = await supabaseConexion.from(tabla).select(opciones?.sentenciaSelect ?? "*").limit(opciones?.limite ?? 50).order(opciones?.orden?.propiedad ?? "uuid", opciones?.orden?.descendente).ilike(opciones?.filtros?.propiedad ?? "uuid", opciones?.filtros?.valor ?? "%");
            let consulta = supabaseConexion.from(tabla).select(opciones?.sentenciaSelect ?? "*").limit(opciones?.limite ?? 50).order(opciones?.orden?.propiedad ?? "uuid", opciones?.orden?.descendente ?? false);
            //Es posible hacer que el filtrado busque que sea igual a x o no igual a x.
            if (opciones?.filtros?.invertido === 1) {
                consulta = consulta.not(opciones?.filtros?.propiedad ?? "uuid", "ilike", opciones?.filtros?.valor ?? "%"); //No coincida.
            } else if (opciones?.filtros?.invertido === 2) {
                consulta = consulta.eq(opciones?.filtros?.propiedad ?? "uuid", opciones?.filtros?.valor ?? "%"); //Sea igual.
            } else {
                consulta = consulta.ilike(opciones?.filtros?.propiedad ?? "uuid", opciones?.filtros?.valor ?? "%"); //Coincida.
            }
            const { data, error } = await consulta;
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
    //Parámetro tabla: nombre de la tabla en la que insertar.
    //Parámetro datosInsercion: objeto con los datos a insertar en la tabla, importante incluir todos los campos y no añadir ninguno extra.
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
    //Parámetro tabla: nombre de la tabla a editar los datos.
    //Parámetro uuid: filtra por el uuid para editar 1 inserción.
    //Parámetro nuevo: objeto con los datos a editar en modo patch.
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
    //Parámetro tabla: nombre de la tabla donde borrar la fila.
    //Parámetro uuid: uuid de la fila a borrar.
    //Parámetro campoPersonalizado: buscar por otro campo que no sea "uuid".
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

    //Función unificada para recibir datos privados (que requieran uuid de usuario) (recibe un objeto de opciones con estas propiedades):
    //parámetro de uuidUsuario (parámetro normal, NO en el objeto): el uuid del usuario con el cual autenticar la operación.
    //Parámetro de tabla (parámetro normal, NO en el objeto): nombre de la tabla, en este caso tiene que ser una cuyos items no estén privados para cada usuario.
    //Parámetro de limite: el límite máximo de objetos que se recibirán.
    //Parámetro de orden: un objeto con "propiedad" que indica la propiedad con la que ordenar, y "descendente" en true o false para alterar el orden.
    //Parámetro de filtros: un objeto con "propiedad" que indica la propiedad a filtrar y "valor" que indica como deberá de ser.
    //Parámetro de sentenciaSelect: por si se quiere recibir propiedades concretas o hacer un join.
    const obtenerPrivado = async (uuidUsuario, tabla, opciones = { limite: 50, orden: { propiedad: "uuid", descendente: true }, filtros: { propiedad: "uuid", valor: "%" }, sentenciaSelect: "*" }) => {
        setErrorSupabase("");
        setCargandoSupabase(true);
        try {
            const { data, error } = await supabaseConexion.from(tabla).select(opciones?.sentenciaSelect ?? "*").limit(opciones?.limite ?? 50).order(opciones?.orden?.propiedad ?? "uuid", opciones?.orden?.descendente).ilike(opciones?.filtros?.propiedad ?? "uuid", opciones?.filtros?.valor ?? "%").eq("uuid_usuario", uuidUsuario);
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
    //Parámetro tabla: nombre de la tabla donde insertar.
    //Parámetro datosInsercion, similar a insertarPublico, los datos a insertar.
    //Parámetro omitirUuid: es posible no querer incluir el uuid porque la fila se identifica por otro campo.
    const insertarPrivado = async (uuidUsuario, tabla, datosInsercion, omitirUuid) => {
        setErrorSupabase("");
        setCargandoSupabase(true);
        try {
            const datos = { ...datosInsercion, uuid: omitirUuid ? undefined : self.crypto.randomUUID(), uuid_usuario: uuidUsuario };
            const { data, error } = await supabaseConexion.from(tabla).insert(datos);
            if (error) throw error;
            if (data) return data;
            return datos ?? true;
        } catch (e) {
            setErrorSupabase(e?.message || "No se ha podido crear el objeto");
        } finally {
            setCargandoSupabase(false);
        }
    }

    //Actualiza los datos de un objeto privado (si tiene permisos).
    //Parámetro tabla: nombre de la tabla donde editar.
    //Parámetro uuid: uuid de la fila a editar.
    //Parámetro nuevo: objeto con los datos a editar en modo patch,
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
    //Parámetro tabla: nombre de la tabla donde borrar.
    //Parámetro uuid: uuid con la fila a borrar.
    //Parámetro campoPersonalizado: buscar por otro campo que no sea "uuid".
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
