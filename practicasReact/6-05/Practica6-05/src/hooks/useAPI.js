import React, { useState } from "react";
import { peticionGenerica } from "../libraries/peticionHttp.js";

//Hook personalizado para hacer peticiones HTTP a urls, es un hook y no una libreria js normal ya que maneja estados de cargando y error (al ser un hooks, se vuelven únicos para cada uno de sus usuarios al contrario que un contexto).
export const useAPI = () => {

    const [error, setError] = useState(null); //Estado que contiene el error si efectivamente hay un error (o null si no).
    const [cargando, setCargando] = useState(true); //Estado que es true solo mientras está cargando.

    //Encapsulador de la función de petición genérica para además manejar los estados de error y cargando.
    const peticion = async (url, metodo = "GET", body = {}, headers = []) => {
        try {
            setError(null);
            setCargando(true);
            const resultado = await peticionGenerica(url, metodo, body, headers); //Usa la función de fetch mejorado en la librería peticionHttp.js (que es un archivo normal, no un hook).
            setCargando(false);
            return resultado;
        } catch (error) {
            setError({ fallo: true, error });
            throw error;
        } finally {
            setCargando(false);
        }
    }

    //Lee una URL y devuelve su resultado.
    const leer = async (url) => {
        return await peticion(url);
    }

    //Hace un POST con un body JSON a una URL.
    const crear = async (url, body) => {
        return await peticion(url, "POST", body);
    }

    //Borra en una URL concreta.
    const borrar = async (url) => {
        return await peticion(url, "DELETE");
    }

    //Edita parcialmente un objeto a partir de una URL y unos datos de edición.
    const editar = async (url, body) => {
        return await peticion(url, "PATCH", body);
    }
    //Igual que la función anterior pero actualiza el objeto entero.
    const actualizar = async (url, body) => {
        return await peticion(url, "PUT", body);
    }

    return {
        error, cargando, peticion, leer, crear, borrar, editar, actualizar
    }
}