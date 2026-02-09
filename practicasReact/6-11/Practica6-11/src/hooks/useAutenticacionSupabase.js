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

    //Devuelve true si el usuario actual es administrador.
    const getAdmin = async () => {

    }

    //Hace que el usuario con x correo se vuelva admin, esto solo lo pueden hacerl os administradores.
    const setAdmin = async (correo, permisos) => {
        if (await !getAdmin()) return false;



    }

    //Devuelve los datos del perfil del usuario actual.
    const getPerfil = async () => {

    }

    //Cambia los datos del perfil del usuario actual
    const setPerfil = async (datos) => {

    }

    return { cargandoAutenticacion, errorAutenticacion, crearCuentaSupabase, iniciarSesionSupabase, cerrarSesionSupabase, obtenerUsuarioSupabase, getAdmin, setAdmin, getPerfil, setPerfil };
};

export default useAutenticacionSupabase;
