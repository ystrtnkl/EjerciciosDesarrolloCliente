import React, { useState } from "react";
import { peticionGenerica } from "../libraries/peticionHttp.js";

//Hook personalizado para hacer peticiones HTTP a urls, es un hook y no una libreria js normal ya que maneja estados de cargando y error (al ser un hooks, se vuelven únicos para cada uno de sus usuarios al contrario que un contexto).
export const useAPI = () => {

    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);

    

    //Encapsulador de la función de petición genérica para además manejar los estados de error y cargando.
    const peticion = async (url, metodo = "GET", body = {}, headers = []) => {
        try {
            setError(null);
            setCargando(true);
            const resultado = await peticionGenerica(url, metodo, body, headers);
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

    const leerTodos = async (url) => {
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
        error, cargando, peticion, leer, crear, borrar, editar, actualizar, leerTodos
    }
}