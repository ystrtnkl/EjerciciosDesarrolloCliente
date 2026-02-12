import React, { useState } from "react";
import { supabaseConexion, URL_APP } from '../supabase/supabase.js';

//Hook para las operaciones de autenticación que maneja además estados de cargando y error.
const useAutenticacionSupabase = () => {

    const [cargandoAutenticacion, setCargandoAutenticacion] = useState(false);
    const [errorAutenticacion, setErrorAutenticacion] = useState("");

    //Intenta crear una cuenta a partir del nombre, correo y contraseña. 
    const crearCuentaSupabase = async (nombre, correo, contrasegna) => {
        setErrorAutenticacion("");
        setCargandoAutenticacion(true);
        try {
            const { data, error } = await supabaseConexion.auth.signUp({ email: correo, password: contrasegna, options: { data: { display_name: nombre } } });
            if (error) throw error;
            //Si tiene éxito, no crea la cuenta sino que manda un correo al usuario para terminar de crearla, la función no hace nada más.
            if (data) setErrorAutenticacion("ATENCIÓN: Comprueba tu correo electrónico y confírmalo para crear la cuenta (si no te llega, puede que la dirección de correo ya esté en uso o esté en la bandeja de spam)");
        } catch (e) {
            //Lamentablemente, el SDK no ofrece opciones para saber si el correo ya está en uso antes de hacer la cuenta (al menos no sin intentar hacer login antes), en caso de crear una cuenta con una dirección repetida no da ningún error, simplemente el correo de confirmación nunca llega.
            setErrorAutenticacion("Ha habido un error al intentar crear la cuenta, el correo ya está en uso o el servidor está fallando, prueba con otros campos o intentalo más tarde");
        } finally {
            setCargandoAutenticacion(false);
        }
    }

    //Intenta iniciar sesión dados un correo y una contraseña, si tiene éxito establece la sesión y redirige, si no da error.
    const iniciarSesionSupabase = async (correo, contrasegna) => {
        setErrorAutenticacion("");
        setCargandoAutenticacion(false);
        try {
            const { data, error } = await supabaseConexion.auth.signInWithPassword({
                email: correo, password: contrasegna,
                options: {
                    emailRedirectTo: URL_APP + "/gestor",
                }
            });
            if (error) throw error;
            if (data) return data;
        } catch (e) {
            setErrorAutenticacion("Las credenciales no son correctas o ha habido un error");
        } finally {
            setCargandoAutenticacion(false);
        }
    }

    //Cierra la sesión y limpia el localStorage para que sea como si se entrase por primera vez.
    const cerrarSesionSupabase = async () => {
        setCargandoAutenticacion(true);
        setErrorAutenticacion("");
        try {
            await supabaseConexion.auth.signOut();
            await localStorage.clear(); //Se borra el localStorage porque es aquí donde se guarda el token de sesión de Supabase.
            return true;
        } catch (error) {
            setErrorAutenticacion(error.message);
        } finally {
            setCargandoAutenticacion(false);
        }
    }

    //Recoje los datos del usuario a partir de la sesión activa.
    const obtenerUsuarioSupabase = async () => {
        setCargandoAutenticacion(true);
        setErrorAutenticacion("");
        try {
            const { data, error } = await supabaseConexion.auth.getUser();
            if (error) throw error;
            return data;
        } catch (error) {
            setErrorAutenticacion(error.message);
        } finally {
            setCargandoAutenticacion(false);
        }
    }

    //Devuelve true si el usuario es administrador.
    const getAdmin = async (uuid) => {
        setCargandoAutenticacion(true);
        try {
            const { data, error } = await supabaseConexion.from("roles").select("*").limit(1).eq("id_rol", uuid);
            if (error) throw error;
            if (data.length) return data[0]?.rol === "admin";
            return false;
        } catch (e) {
            return false;
        } finally {
            setCargandoAutenticacion(false);
        }
    }

    //Hace que el usuario con x correo se vuelva admin, esto solo lo pueden hacerl os administradores.
    const setAdmin = async (correo, permisos) => {
        setCargandoAutenticacion(true);
        setErrorAutenticacion("");
        try {
            //No es explicitamente necesario comprobar que el usuario que hace esto sea admin, ya que si no lo es el propio servidor devolverá error.
            if (typeof correo !== 'string') throw new Error("No se ha encontrado el usuario");
            const { data, error } = await supabaseConexion.from("roles").update({ rol: permisos ? "admin" : "usuario" }).eq("correo", correo);
            if (error) throw error;
            //if (data?.length !== 1) throw new Error("No se ha encontrado el usuario"); //Opción antigua que seleccionaba el número de filas editadas.
            return true;
        } catch (e) {
            setErrorAutenticacion(e?.message ?? "No se han podido alterar los permisos");
            return false;
        } finally {
            setCargandoAutenticacion(false);
        }
    }

    //Devuelve los datos de la tabla de roles, se usa para que el administrador edite los roles de los usuarios.
    const listarRoles = async () => {
        setCargandoAutenticacion(true);
        setErrorAutenticacion("");
        try {
            //Por ahora la plicación está pensada en magnitudes pequeñas, así que esta función devuelve los permisos de todos los usuarios (con un límite de 100). Para mejor escalabilidad habría que implementar una paginación y una búsqueda.
            const { data, error } = await supabaseConexion.from("roles").select("*").limit(100);
            if (error) throw error;
            if (data) return data;
            return [];
        } catch (error) {
            setErrorAutenticacion(error.message);
            return []
        } finally {
            setCargandoAutenticacion(false);
        }
    }

    //Devuelve los datos del perfil del usuario.
    const getPerfil = async (uuid) => {
        setCargandoAutenticacion(true);
        setErrorAutenticacion("");
        try {
            const { data, error } = await supabaseConexion.from("perfil").select("*").limit(1).eq("id_usuario", uuid);
            if (error) throw error;
            if (data.length) return data[0];
            return [];
        } catch (error) {
            setErrorAutenticacion(error.message);
            return []
        } finally {
            setCargandoAutenticacion(false);
        }
    }

    //Cambia los datos del perfil del usuario
    const setPerfil = async (uuid, datos) => {
        setCargandoAutenticacion(true);
        setErrorAutenticacion("");
        try {
            const { data: data1, error: error1 } = await supabaseConexion.from("perfil").update({ ...datos, id_usuario: undefined }).eq("id_usuario", uuid);
            if (error1) throw error1;
            const { data: data2, error: error2 } = await supabaseConexion.auth.updateUser({ data: { display_name: datos.nombre_completo } }); //Aquí se está editanto una fila en el esquema auth.
            if (error2) throw error2;
            return true;
        } catch (e) {
            setErrorAutenticacion(e?.message ?? "No se ha podido editar el perfil");
            return false;
        } finally {
            setCargandoAutenticacion(false);
        }
    }

    return { cargandoAutenticacion, errorAutenticacion, crearCuentaSupabase, iniciarSesionSupabase, cerrarSesionSupabase, obtenerUsuarioSupabase, getAdmin, setAdmin, getPerfil, setPerfil, listarRoles };
};

export default useAutenticacionSupabase;
