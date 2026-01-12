import React, { useState } from "react";
import { peticionGenerica } from "../libraries/peticionHttp.js";
import { validarDisco, validarUuid, validarDiscos, validarDiscoSoft } from "../libraries/validaciones.js";


export const useAPI = () => {

    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);

    const URL_API = "http://localhost:3000/discos";

    //Encapsulador de la función de petición genérica para además manejar los estados de error y cargando.
    const peticion = async (url, metodo = "GET", body, headers) => {
        try {
            setError(null);
            setCargando(true);
            const resultado = await peticionGenerica(url, metodo, body, headers);
            if (!resultado.ok || resultado.code >= 400) throw new Error("La API devolvió un error");
            setCargando(false);
            return resultado;
        } catch (error) {
            setError({fallo: true, error});
            throw error;
        } finally {
            setCargando(false);
        }
    }

    const leer = async (url) => {
        return await peticion(url);
    }

    const crear = async (url, body) => {
        return await peticion(url, "POST", body);
    }

    const borrar = async (url) => {
        return await peticion(url, "DELETE");
    }

    const editar = async (url, body) => {
        return await peticion(url, "PATCH", body);
    }
    const actualizar = async (url, body) => {
        return await peticion(url, "PUT", body);
    }


    return {
        error, cargando, peticion, leer, crear, borrar, editar, actualizar
    }
}